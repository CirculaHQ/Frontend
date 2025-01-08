import { 
    Button, 
    Icon, 
    Input, 
  } from '@/components/ui'; 
  import {
    DialogHeader,
    DialogFooter,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
  } from '@/components/ui/dialog';
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
  import { FormSection } from '@/components/shared'; 
  import type { CustomMaterial, CustomMaterialType } from '@/hooks/api/mutations/settings/custom-material'; 
  
  interface CustomMaterialsProps {
    customMaterials: CustomMaterial[];
    materialTypes: CustomMaterialType[];
    materialTypeCounts: { [key: string]: number };
    selectedMaterial: CustomMaterial | null;
    setSelectedMaterial: (material: CustomMaterial | null) => void;
    isAddMaterialTypeDialogOpen: boolean;
    setIsAddMaterialTypeDialogOpen: (value: boolean) => void;
    handleAddMaterialTypeDialogClose: () => void;
    materialTypeInputs: { id: number; value: string }[];
    handleMaterialTypeInputChange: (id: string, value: string) => void;
    addAnotherDisabled: boolean;
    handleAddAnotherInput: () => void;
    materialTypeFormik: any;
    materialFormik: any;
    showAddMaterialInput: boolean;
    setShowAddMaterialInput: (value: boolean) => void;
    handleDeleteMaterial: (id: string) => void;
    handleDeleteMaterialType: (id: string) => void;
    setEditingMaterial: (material: any) => void;
    editingMaterial: any;
  }
  
  const CustomMaterials: React.FC<CustomMaterialsProps> = ({ 
    customMaterials,
    materialTypes,
    materialTypeCounts,
    selectedMaterial,
    setSelectedMaterial,
    isAddMaterialTypeDialogOpen,
    setIsAddMaterialTypeDialogOpen,
    handleAddMaterialTypeDialogClose,
    materialTypeInputs,
    handleMaterialTypeInputChange,
    addAnotherDisabled,
    handleAddAnotherInput,
    materialTypeFormik,
    materialFormik,
    showAddMaterialInput,
    setShowAddMaterialInput,
    handleDeleteMaterial,
    handleDeleteMaterialType,
    setEditingMaterial,
    editingMaterial,
  }) => {
    return (
      <FormSection title='Custom materials' description='Supporting text goes here'> 
      {customMaterials.length === 0 ? (
        <div>
          <h2 className='text-sm text-secondary font-semibold'>No custom materials added</h2>
          <p className='text-sm text-tertiary font-normal'>
            Add a custom material to your account and they will show up here
          </p>
        </div>
      ) : (
        <div className='w-full'> 
          <Accordion type='multiple' className='w-full'> 
            {customMaterials.map((material) => ( 
              <AccordionItem value={material.id} key={material.id}> 
                <AccordionTrigger 
                  className='no-underline hover:no-underline focus:no-underline' 
                  onClick={() => { 
                    if (selectedMaterial?.id !== material.id) { 
                      setSelectedMaterial(material); 
                    } 
                  }} 
                > 
                  <div className='flex justify-between items-center w-full'> 
                    <div className='flex flex-col items-start gap-1'> 
                      <p className='text-sm font-medium'>{material.name}</p> 
                      <p className='text-sm text-gray-500'> 
                        {materialTypeCounts[material.id]} types 
                      </p> 
                    </div> 
                    <div className='flex items-center gap-4 mr-4'> 
                      <Dialog 
                        open={isAddMaterialTypeDialogOpen} 
                        onOpenChange={(open) => { 
                          setIsAddMaterialTypeDialogOpen(open); 
                          if (!open) { 
                            handleAddMaterialTypeDialogClose(); 
                          } 
                        }} 
                      > 
                        <DialogTrigger asChild> 
                          <p 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              setSelectedMaterial(material); // Ensure correct material is selected 
                              setIsAddMaterialTypeDialogOpen(true); 
                            }} 
                            className='text-xs text-gray-500 cursor-pointer hover:text-gray-700' 
                          > 
                            Add type 
                          </p> 
                        </DialogTrigger> 
                        <DialogContent 
                          className='sm:max-w-[425px]' 
                          onCloseAutoFocus={(e) => e.preventDefault()} 
                        > 
                          {/* Dialog content for adding material type */} 
                          <Icon name='zap-dark' className='w-10 h-10 mb-4' /> 
                          <DialogHeader> 
                            <DialogTitle>Add material type for {material.name}</DialogTitle> 
                            <DialogDescription> 
                              You can only add 4 items at the same time. 
                            </DialogDescription> 
                          </DialogHeader> 
  
                          <div className='grid gap-4 py-4'> 
                            {materialTypeInputs.map((input, index) => ( 
                              <Input 
                                key={input.id} 
                                id={`material-type-${index}`} 
                                label='Material type' 
                                placeholder='e.g. Cardboard paper' 
                                value={input.value} 
                                onChange={(e) => 
                                  handleMaterialTypeInputChange(input.id.toString(), e.target.value) 
                                } 
                              /> 
                            ))} 
                            <p 
                              className={`text-sm cursor-pointer text-left ${ 
                                addAnotherDisabled 
                                  ? 'text-gray-500' 
                                  : 'text-green-500 hover:text-green-700' 
                              }`} 
                              onClick={!addAnotherDisabled ? handleAddAnotherInput : undefined} 
                            > 
                              + Add another 
                            </p> 
                          </div> 
  
                          <DialogFooter className='flex flex-col sm:flex-row sm:justify-end sm:space-x-2 w-full'> 
                            <Button 
                              type='button' 
                              variant='outline' 
                              className='flex-1' 
                              onClick={() => { 
                                handleAddMaterialTypeDialogClose(); 
                              }} 
                            > 
                              Cancel 
                            </Button> 
                            <Button 
                              type='button' 
                              variant='secondary' 
                              className='flex-1' 
                              onClick={() => { 
                                materialTypeFormik.handleSubmit(); 
                              }} 
                            > 
                              Add item 
                            </Button> 
                          </DialogFooter> 
                        </DialogContent> 
                      </Dialog> 
                      <p 
                        className='text-xs text-gray-500 cursor-pointer hover:text-gray-700' 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          setEditingMaterial(material); 
                          setShowAddMaterialInput(true); 
                        }} 
                      > 
                        Edit 
                      </p> 
                      <Dialog> 
                        <DialogTrigger asChild> 
                          <p 
                            className='text-xs text-gray-500 cursor-pointer hover:text-gray-700' 
                            onClick={(e) => e.stopPropagation()} 
                          > 
                            Delete 
                          </p> 
                        </DialogTrigger> 
                        <DialogContent> 
                          <Icon name='trash-03' className='w-10 h-10 mb-4' /> 
                          <DialogHeader> 
                            <DialogTitle>Delete Custom material</DialogTitle> 
                            <DialogDescription> 
                              Are you sure you want to delete {material.name} from your material 
                              list? You cannot undo this action. 
                            </DialogDescription> 
                          </DialogHeader> 
                          <DialogFooter className='flex flex-col sm:flex-row sm:justify-end sm:space-x-2 w-full'> 
                            <Button variant='outline' className='flex-1'> 
                              Cancel 
                            </Button> 
                            <Button 
                              variant='secondary' 
                              className='flex-1' 
                              onClick={() => handleDeleteMaterial(material.id)} 
                            > 
                              Delete item 
                            </Button> 
                          </DialogFooter> 
                        </DialogContent> 
                      </Dialog> 
                    </div> 
                  </div> 
                </AccordionTrigger> 
                <AccordionContent> 
                  <div className='w-full divide-y'> 
                    {materialTypes 
                      .filter((type) => type.material === material.id) 
                      .map((type) => ( 
                        <div 
                          className='grid grid-cols-[1fr_auto] gap-4 items-center w-full py-4' 
                          key={type.id} 
                        > 
                          <div className='flex flex-col gap-0.5'> 
                            <p className='text-sm font-medium'>{type.name}</p> 
                          </div> 
                          <div className='flex items-center justify-end gap-4'> 
                            <p 
                              className='text-xs text-gray-500 cursor-pointer hover:text-gray-700'
                              onClick={() => { 
                                setEditingMaterial(type); 
                              }} 
                            > 
                              Edit 
                            </p> 
                            <Dialog> 
                              <DialogTrigger asChild> 
                                <p 
                                  className='text-xs text-gray-500 cursor-pointer hover:text-gray-700' 
                                  onClick={(e) => e.stopPropagation()} 
                                > 
                                  Delete 
                                </p> 
                              </DialogTrigger> 
                              <DialogContent> 
                                <Icon name='trash-03' className='w-10 h-10 mb-4' /> 
                                <DialogHeader> 
                                  <DialogTitle>Delete Custom material Type</DialogTitle> 
                                  <DialogDescription> 
                                    Are you sure you want to delete {type.name} from your material 
                                    type list? You cannot undo this action. 
                                  </DialogDescription> 
                                </DialogHeader> 
                                <DialogFooter className='flex flex-col sm:flex-row sm:justify-end sm:space-x-2 w-full'> 
                                  <Button 
                                    variant='outline' 
                                    className='flex-1' 
                                    onClick={(e) => e.stopPropagation()} 
                                  > 
                                    Cancel 
                                  </Button> 
                                  <Button 
                                    variant='secondary' 
                                    className='flex-1' 
                                    onClick={() => handleDeleteMaterialType(type.id)} 
                                  > 
                                    Delete item 
                                  </Button> 
                                </DialogFooter> 
                              </DialogContent> 
                            </Dialog> 
                          </div> 
                        </div> 
                      ))} 
                  </div> 
                </AccordionContent> 
              </AccordionItem> 
            ))} 
          </Accordion> 
        </div> 
        )}
  
        {showAddMaterialInput && ( 
          <form 
            onSubmit={(e) => { 
              e.preventDefault();
              materialFormik.handleSubmit(); 
            }} 
          > 
            <div className='flex flex-col gap-2'> 
              <Input 
                id='custom-material-name' 
                type='text' 
                placeholder='Custom material name' 
                name='name' 
                className='mb-2' 
                value={materialFormik.values.name} 
                onChange={materialFormik.handleChange} 
                onBlur={materialFormik.handleBlur} 
              /> 
            </div> 
            <div className='mt-2 flex items-center gap-2'> 
              <Button type='submit' variant='outline'> 
                {editingMaterial ? 'Update' : 'Add'} Material 
              </Button> 
              <Button 
                type='button' 
                variant='ghost' 
                onClick={() => { 
                  setShowAddMaterialInput(false); 
                  setEditingMaterial(null); 
                  materialFormik.resetForm(); 
                }} 
              > 
                Cancel 
              </Button> 
            </div> 
          </form> 
        )} 
  
        {!showAddMaterialInput && ( 
          <div className='mt-2 flex items-center gap-2'> 
            <Button 
              variant='outline' 
              onClick={() => { 
                setShowAddMaterialInput(true); 
                setEditingMaterial(null);  
                materialFormik.resetForm(); 
              }} 
            > 
              Add Material 
            </Button> 
          </div> 
        )} 
      </FormSection> 
    );
  };
  
  export default CustomMaterials;