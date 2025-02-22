import {
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Label,
  Input,
  DatePicker,
  Icon,
} from '@/components/ui';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { format } from 'date-fns';

import { FormikProps, useFormik } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { InfoRow } from './inventory-info-row';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import { useAddSubOperation, useUpdateSubOperation } from '@/hooks/api/mutations/operations/useOperationsMutation';
// import { UpdateOperationPayload, useUpdateOperation } from '@/hooks/api/mutations/operations/useUpdateOperation';

interface Operation {
  id: string;
  name: string;
}

interface OperationFormProps {
  customOperations: Operation[];
  selectedInventory: any[];
  selectedOperations?: any[];
  editingOperationId?: string | null;
  onCancel?: (e: any) => void;
  operation: any;
}

const formatDate = (date: string | number | Date) => format(new Date(date), 'yyyy-MM-dd');
//const formatTime = (time: any) => format(new Date(`1970-01-01T${time}:00`), 'hh:mm ss');

const OperationForm: React.FC<OperationFormProps> = ({
  //formik,
  customOperations,
  selectedInventory,
  selectedOperations = [],
  editingOperationId,
  onCancel,
  operation
}) => {
  const { userID } = useGetUserInfo();
  const { mutateAsync: addSubOperation, isLoading: isAddingSubOperation } = useAddSubOperation()
  const { mutateAsync: updateSubOperation, isLoading: isUpdatingSubOperation } = useUpdateSubOperation(operation.id, operation?.batch)

  const formik = useFormik({
    initialValues: {
      input_source: '',
      operation_type: '',
      start_date: '',
      start_time: '',
      end_date: '',
      end_time: '',
      input_quantity: '',
      quantity_produced: 0,
      waste_produced: 0,
      user: userID,
      batch: operation?.id
    },
    onSubmit: async (values) => {
      const { start_date, end_date, start_time, end_time, input_quantity } = values
      const payload = {
        ...values,
        input_quantity: Number(input_quantity),
        start_date: start_date ? format(new Date(start_date), 'yyyy-MM-dd') : null,
        end_date: end_date ? format(new Date(end_date), 'yyyy-MM-dd') : null,
        start_time: start_time ? format(new Date(`1970-01-01T${start_time}:00`), 'hh:mm:ss') : null,
        end_time: end_time ? format(new Date(`1970-01-01T${end_time}:00`), 'hh:mm:ss') : null
      }

      if (editingOperationId) {
        await updateSubOperation(payload)
      } else {
        await addSubOperation(payload)
        formik.resetForm()
        onCancel!(false)
      }
    },
  });

  const renderTriggerButton = (title: string, caption: string) => {
    return (
      <div className='w-full flex flex-col gap-1'>
        <Label className='text-left text-md'>{title} information</Label>
        <p className='text-tertiary font-normal text-sm text-left'>{caption}</p>
      </div>
    )
  }

  const computedSources = useMemo(() => {
    return selectedOperations?.length ? selectedOperations.map((item) => {
      return {
        label: `${item.operation_type} - ${item.quantity_left}kg`,
        id: item?.id,
        key: item.operation_type,
        quantity_left: item.quantity_left
      }
    }) : []
  }, [selectedOperations])

  const inputSources = [
    {
      label: `From Inventory - ${operation.quantity_left}kg`,
      id: editingOperationId ? operation?.input_source : operation?.id,
      key: 'Inventory',
      quantity_left: operation.quantity_left
    },
    ...computedSources
  ]

  const selectedSource = () => {
    return inputSources.find((item) => item.id === formik.values.input_source) || {}
  }

  const handleSource = (val: string) => {
    const source = inputSources.find((item) => item.id === val)
    if (source) formik.setFieldValue('input_source', source.id)
  }

  const handleInputQuantity = (id: string, val: any) => {
    formik.setFieldValue('input_quantity', Number(val))
  }

  const sourceTotalQty = useMemo(() => {
    return selectedInventory.reduce((sum: number, item: any) => sum + item.input_quantity, 0)
  }, [selectedInventory])

  const handleCancelClick = (e: any) => {
    e.stopPropagation()
    if (editingOperationId) {
      resetEditForm()
    } else {
      formik.resetForm();
      onCancel!(false)
    }
  };

  const resetEditForm = () => {
    const start_time = operation.start_time ? operation.start_time.split(':')[0] + ':' + operation.start_time.split(':')[1] : ''
    const end_time = operation.end_time ? operation.end_time.split(':')[0] + ':' + operation.end_time.split(':')[1] : ''

    formik.setValues({
      ...formik.values,
      input_source: operation.input_source ?? '',
      operation_type: operation.operation_type ?? '',
      start_date: operation.start_date ?? '',
      start_time,
      end_date: operation.end_date ?? '',
      end_time,
      input_quantity: operation.input_quantity ?? '',
      quantity_produced: operation.quantity_produced ?? 0,
      waste_produced: operation.waste_produced ?? 0,
    })
  }

  useEffect(() => {
    if (editingOperationId) resetEditForm()
  }, [editingOperationId])

  return (
    <form className='w-full flex flex-col gap-4' onSubmit={formik.handleSubmit}>
      <Accordion type='multiple' className='w-full'>
        <AccordionItem className='border-0' value="input">
          <AccordionTrigger
            className='no-underline hover:no-underline focus:no-underline !pt-0'
          // onClick={() => {
          //   setState({ ...state, input: true })
          // }}
          >
            {renderTriggerButton('Input', 'Important information before starting an operation')}
          </AccordionTrigger>
          <AccordionContent>
            <div className='space-y-4'>
              <div className='w-full flex flex-col gap-2'>
                <Label>Input source</Label>
                <Select
                  value={formik.values.input_source}
                  onValueChange={(value) => handleSource(value)}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder='Select input source'
                      className='text-placeholder font-normal'
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {inputSources.map((sources) => (
                      <SelectItem key={sources.key} value={sources.id}>
                        {sources.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formik.values.input_source && (
                <SourceDetails
                  formik={formik}
                  totalQty={sourceTotalQty}
                  handleChange={handleInputQuantity}
                  source={selectedSource()}
                />
              )}
              <div className='w-full flex flex-col gap-2'>
                <Label>Operation type</Label>
                <Select
                  value={formik.values.operation_type}
                  onValueChange={(value) => formik.setFieldValue('operation_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder='Select operation type'
                      className='text-placeholder font-normal'
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {customOperations.map((operation) => (
                      <SelectItem key={operation.id} value={operation.name}>
                        {operation.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='w-full flex flex-col md:flex-row gap-4'>
                <div className='w-full'>
                  <Label>Date started</Label>
                  <DatePicker
                    date={formik.values.start_date ? new Date(formik.values.start_date) : undefined}
                    onDateChange={(date) => {
                      const formattedDate = date ? formatDate(date) : '';
                      formik.setFieldValue('start_date', formattedDate);
                    }}
                  />
                </div>
                <div className='w-full'>
                  <Label>Time started</Label>
                  <Input
                    id='start_time'
                    type='time'
                    placeholder='e.g. 08:00 AM'
                    name='start_time'
                    value={formik.values.start_time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type='multiple' className='w-full'>
        <AccordionItem className='border-0' value="output">
          <AccordionTrigger
            className='no-underline hover:no-underline focus:no-underline !pt-0'
          // onClick={() => {
          //   setState({ ...state, output: true })
          // }}
          >
            {renderTriggerButton('Output', 'Fill this section after the operation is completed')}
          </AccordionTrigger>
          <AccordionContent>
            <div className='space-y-4'>
              <div className='w-full flex flex-col md:flex-row gap-4'>
                <div className='w-full'>
                  <Label>Date finished</Label>
                  <DatePicker
                    date={formik.values.end_date ? new Date(formik.values.end_date) : undefined}
                    onDateChange={(date) => {
                      const formattedDate = date ? formatDate(date) : '';
                      formik.setFieldValue('end_date', formattedDate);
                    }}
                  />
                </div>
                <div className='w-full'>
                  <Label>Time finished</Label>
                  <Input
                    id='end_time'
                    type='time'
                    placeholder='e.g. 05:30 PM'
                    name='end_time'
                    value={formik.values.end_time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
              <div className='w-full relative'>
                <Label htmlFor='quantity_produced' className='mb-1 block'>
                  Quantity produced
                </Label>
                <div className='relative flex items-center'>
                  <Input
                    id='quantity_produced'
                    type='number'
                    placeholder='0'
                    name='quantity_produced'
                    className='pr-16'
                    value={formik.values.quantity_produced}
                    onChange={(e) => {
                      const { value } = e.target
                      if (value > formik.values.input_quantity) return
                      formik.handleChange(e)
                    }}
                    onBlur={formik.handleBlur}
                  />
                  <span className='absolute right-3 text-gray-500'>{formik.values.input_quantity}kg</span>
                </div>
              </div>
              <div className='w-full relative'>
                <Label htmlFor='waste_produced' className='mb-1 block'>
                  Waste produced
                </Label>
                <div className='relative flex items-center'>
                  <Input
                    id='waste_produced'
                    type='number'
                    placeholder='0'
                    name='waste_produced'
                    className='pr-16'
                    max={formik.values.input_quantity}
                    value={formik.values.waste_produced}
                    onChange={(e) => {
                      const { value } = e.target
                      if (value > formik.values.input_quantity) return
                      formik.handleChange(e)
                    }}
                    onBlur={formik.handleBlur}
                  />
                  <span className='absolute right-4 text-gray-500'>{formik.values.input_quantity}kg</span>
                </div>
              </div>
              <div>
                <label
                  className='flex items-center w-fit'
                >
                  <input
                    type='checkbox'
                    className='h-4 w-4 rounded checked:bg-green-500 focus:ring-0'
                  // checked={selectedValues.includes(option.value)}
                  // onChange={() => handleSelect(option.value)}
                  />
                  <span className='ml-2 font-normal text-gray-700'>Ready for sale</span>
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className='w-full flex justify-start space-x-2'>
        <Button
          variant='outline'
          type='submit'
          //type='button'
          disabled={isAddingSubOperation || isUpdatingSubOperation}
          className='w-auto'
        >
          {editingOperationId ?
            <>{isUpdatingSubOperation ? 'Updating...' : 'Update Operation'}</> :
            <>{isAddingSubOperation ? 'Adding...' : 'Add Operation'}</>
          }
        </Button>
        <Button
          type='button'
          disabled={isAddingSubOperation || isUpdatingSubOperation}
          onClick={handleCancelClick}
          className='w-auto border-0'
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

interface InterventionSectionProps {
  handleChange: (id: any, value: any) => void;
  formik: FormikProps<any>;
  totalQty: number;
  source: any;
}

const SourceDetails = ({ source, handleChange, formik, totalQty }: InterventionSectionProps) => {
  const [show, setShow] = useState(true)

  return (
    <div className='w-full flex flex-col gap-2'>
      <p className='text-xs text-primary font-medium mb-2'>
        Total quantity: <span className='text-quaternary font-normal'>{totalQty}kg</span>
      </p>
      <div className='w-full border border-[#D5D7DA] p-3 rounded-xl shadow-sm'>
        <div className='flex items-start justify-between'>
          <p className='text-sm font-medium'>{source?.key}</p>
          <div className='flex items-center'>
            <button
              type='button'
              className='px-2'
            //onClick={() => onDelete(inventory.id)}
            >
              <Icon name="trash" className='w-4 h-4 text-quaternary' />
            </button>
            <button type='button' className='px-2' onClick={() => setShow(!show)}>
              {show ?
                <Icon name="chevron-up" className='w-4 h-4 text-white hidden sm:block' /> :
                <Icon name="chevron-down" className='w-4 h-4 text-primary hidden sm:block' />
              }
            </button>
          </div>
        </div>
        {show && (
          <div className='grid grid-cols-1 gap-4 mt-4'>
            <InfoRow
              label='Input quantity'
              onChange={handleChange}
              inventory={{ quantity: totalQty, input_quantity: formik.values.input_quantity, quantity_left: source.quantity_left }}
              icon='scales'
              showInput={true}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default OperationForm;
