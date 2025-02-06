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
import { useMemo, useState } from 'react';
import { InfoRow } from './inventory-info-row';

const INVENTORY = 'inventory'

interface Operation {
  id: string;
  name: string;
}

interface OperationFormProps {
  //formik: FormikProps<any>;
  customOperations: Operation[];
  handleUpdateOperation: (values: any) => void;
  isUpdating: boolean;
  selectedInventory: any;
  editingOperationId: string | null;
  addedOperations: any[];
  setAddedOperations: (e: any) => void;
  setShowOperationInputs?: (e: any) => void;
}

const formatDate = (date: string | number | Date) => format(new Date(date), 'dd/MM/yyyy');
const formatTime = (time: any) => format(new Date(`1970-01-01T${time}:00`), 'h:mm a');

const OperationForm: React.FC<OperationFormProps> = ({
  //formik,
  customOperations,
  handleUpdateOperation,
  isUpdating,
  selectedInventory,
  editingOperationId,
  setAddedOperations,
  addedOperations,
  setShowOperationInputs
}) => {
  //const [state, setState] = useState({ input: true, output: false })

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
    },
    onSubmit: async (values) => {
      if (editingOperationId) {
        handleUpdateOperation(values);
      } else {
        //await handleSaveOperation(values);
        const payload = { ...values, id: addedOperations?.length + 1 }
        setAddedOperations([...addedOperations, payload])
        formik.resetForm()
        if (setShowOperationInputs) setShowOperationInputs(false)
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

  const inputSources = [
    { label: 'From Inventory - 1,598kg', key: 'inventory' }
  ]

  const handleSource = (val: string) => {
    const source = inputSources.find((item) => item.key === val)
    if (source) formik.setFieldValue('input_source', source.key)
  }

  const handleInputQuantity = (id: string, val: any) => {
    formik.setFieldValue('input_quantity', Number(val))
  }

  const sourceTotalQty = useMemo(() => {
    return selectedInventory.reduce((sum: number, item: any) => sum + item.quantity, 0)
  }, [selectedInventory])

  return (
    <div className='w-full flex flex-col gap-4'>
      <Accordion type='multiple' className='w-full'>
        <AccordionItem value="input">
          <AccordionTrigger
            className='no-underline hover:no-underline focus:no-underline !pt-0 '
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
                      <SelectItem key={sources.key} value={sources.key}>
                        {sources.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formik.values.input_source === INVENTORY && <InventorySection formik={formik} totalQty={sourceTotalQty} handleChange={handleInputQuantity} />}
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
        <AccordionItem value="output">
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span className='absolute right-3 text-gray-500'>kg</span>
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
                    value={formik.values.waste_produced}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span className='absolute right-4 text-gray-500'>kg</span>
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
          type='button'
          onClick={() => isUpdating ? handleUpdateOperation(formik.values) : formik.handleSubmit()}
          className='w-auto'
        >
          {isUpdating ? 'Updating...' : editingOperationId ? 'Update Operation' : 'Add Operation'}
        </Button>
        {setShowOperationInputs && (
          <Button
            type='button'
            onClick={() => setShowOperationInputs(false)}
            className='w-auto border-0'
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

interface InterventionSectionProps {
  handleChange: (id: any, value: any) => void;
  formik: FormikProps<any>;
  totalQty: number;
}

const InventorySection = ({ handleChange, formik, totalQty }: InterventionSectionProps) => {
  const [show, setShow] = useState(true)

  return (
    <div className='w-full flex flex-col gap-2'>
      <p className='text-xs text-primary font-medium mb-2'>
        Total quantity: <span className='text-quaternary font-normal'>0kg</span>
      </p>
      <div className='w-full border border-[#D5D7DA] p-3 rounded-xl shadow-sm'>
        <div className='flex items-start justify-between'>
          <p className='text-sm font-medium'>Inventory</p>
          <div className='flex items-center'>
            <button
              type='button'
              className='px-2'
            //onClick={() => onDelete(inventory.id)}
            >
              <Icon name="trash-03" className='w-4 h-4 text-white hidden sm:block' />
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
              inventory={{ quantity: totalQty }}
              value={formik.values.input_quantity}
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
