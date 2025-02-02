import { useState, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import {
  addCustomOperation,
  CustomOperation,
  deleteCustomOperation,
  getCustomOperations,
  updateCustomOperation,
} from '@/hooks/api/mutations/settings/custom-operation';
import {
  addCustomMaterial,
  addCustomMaterialType,
  CustomMaterial,
  CustomMaterialType,
  deleteCustomMaterial,
  deleteCustomMaterialType,
  getCustomMaterials,
  getCustomMaterialTypes,
  updateCustomMaterial,
  updateCustomMaterialType,
} from '@/hooks/api/mutations/settings/custom-material';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import CurrencySettings from './CurrencySettings';
import CustomOperations from './CustomOperations';
import CustomMaterials from './CustomMaterials';
import ApplicationTheme from './ApplicationTheme';

const PreferencesSettings: React.FC = () => {
  const { userID } = useGetUserInfo();

  const [customOperations, setCustomOperations] = useState<CustomOperation[]>([]);
  const [customMaterials, setCustomMaterials] = useState<CustomMaterial[]>([]);
  const [materialTypes, setMaterialTypes] = useState<CustomMaterialType[]>([]);

  // States for forms and dialogs
  const [showAddOperationInput, setShowAddOperationInput] = useState(false);
  const [showAddMaterialInput, setShowAddMaterialInput] = useState(false);
  const [isAddMaterialTypeDialogOpen, setIsAddMaterialTypeDialogOpen] = useState(false);

  // States for editing
  const [editingOperation, setEditingOperation] = useState<CustomOperation | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<CustomMaterial | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<CustomMaterial | null>(null);
  const [editingMaterialType, setEditingMaterialType] = useState<CustomMaterialType | null>(null);

  // States for material type input handling
  const [materialTypeInputs, setMaterialTypeInputs] = useState<{ id: number; value: string }[]>([
    { id: Date.now(), value: '' },
  ]);
  const [addAnotherDisabled, setAddAnotherDisabled] = useState(true);

  // Formik for custom operation settings
  const operationFormik = useFormik({
    initialValues: {
      name: '',
      user: userID,
    },
    onSubmit: async (values) => {
      try {
        if (editingOperation) {
          await updateCustomOperation(editingOperation.id, values);
          setCustomOperations(
            customOperations.map((op) =>
              op.id === editingOperation.id ? { ...op, name: values.name } : op
            )
          );
          setEditingOperation(null);
        } else {
          const response = await addCustomOperation(values);
          const newOperation: CustomOperation = {
            ...values,
            id: response.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setCustomOperations([...customOperations, newOperation]);
        }
        operationFormik.resetForm();
        setShowAddOperationInput(false);
      } catch (error) {
        console.error('Error adding/updating operation:', error);
      }
    },
  });

  // Formik for custom material settings
  const materialFormik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values, { resetForm }) => {
      if (editingMaterial) {
        await handleUpdateMaterial(editingMaterial.id, values.name);
        setEditingMaterial(null);
      } else {
        await handleAddMaterial(values.name);
      }
      resetForm();
      setShowAddMaterialInput(false);
    },
  });

  // Formik for custom material type settings
  const materialTypeFormik = useFormik({
    initialValues: {
      name: editingMaterialType ? editingMaterialType.name : '',
      material: selectedMaterial ? selectedMaterial.id : '',
    },
    onSubmit: async (values) => {
      if (!selectedMaterial) return;

      try {
        if (editingMaterialType) {
          await handleUpdateMaterialType(editingMaterialType.id, values.name);
          setEditingMaterialType(null);
        } else {
          for (const input of materialTypeInputs) {
            if (input.value.trim() !== '') {
              await handleAddMaterialType(selectedMaterial.id, input.value);
            }
          }
        }

        materialTypeFormik.resetForm();
        setMaterialTypeInputs([{ id: Date.now(), value: '' }]);
        setAddAnotherDisabled(true);
        setIsAddMaterialTypeDialogOpen(false);
      } catch (error) {
        console.error('Error adding/updating material type:', error);
      }
    },
    enableReinitialize: true,
  });

  // custom materials
  const handleAddMaterial = async (name: string) => {
    try {
      const newMaterial = await addCustomMaterial({ name, user: userID });
      setCustomMaterials([...customMaterials, newMaterial]);
      setShowAddMaterialInput(false);
      setSelectedMaterial(newMaterial);
    } catch (error) {
      console.error('Error adding custom material:', error);
    }
  };

  const handleUpdateMaterial = async (id: string, name: string) => {
    try {
      const updatedMaterial = await updateCustomMaterial(id, { name });
      setCustomMaterials(customMaterials.map((m) => (m.id === id ? updatedMaterial : m)));
      setEditingMaterial(null);
    } catch (error) {
      console.error('Error updating custom material:', error);
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    try {
      await deleteCustomMaterial(id);
      setCustomMaterials(customMaterials.filter((m) => m.id !== id));
      if (selectedMaterial?.id === id) {
        setSelectedMaterial(null);
      }
    } catch (error) {
      console.error('Error deleting custom material:', error);
    }
  };

  // custom material types
  const handleAddMaterialType = async (materialId: string, name: string) => {
    try {
      const newMaterialType = await addCustomMaterialType({
        name,
        material: materialId,
        user: userID,
      });
      setMaterialTypes([...materialTypes, newMaterialType]);
    } catch (error) {
      console.error('Error adding custom material type:', error);
    }
    fetchCustomMaterialTypes(materialId);
  };

  const handleUpdateMaterialType = async (id: string, name: string) => {
    try {
      const updatedMaterialType = await updateCustomMaterialType(id, { name });
      setMaterialTypes(materialTypes.map((mt) => (mt.id === id ? updatedMaterialType : mt)));
      setEditingMaterialType(null);
    } catch (error) {
      console.error('Error updating custom material type:', error);
    }
  };

  const handleDeleteMaterialType = async (id: string) => {
    try {
      await deleteCustomMaterialType(id);
      setMaterialTypes(materialTypes.filter((mt) => mt.id !== id));
    } catch (error) {
      console.error('Error deleting custom material type:', error);
    }
    if (selectedMaterial) {
      fetchCustomMaterialTypes(selectedMaterial.id);
    }
  };

  // Fetch functions for custom operations, materials, and material types
  const fetchCustomOperations = async (limit: number = 10, offset: number = 0) => {
    if (userID) {
      try {
        const response = await getCustomOperations(limit, offset, '');
        setCustomOperations(response.results);
      } catch (error) {
        console.error('Error fetching operations:', error);
      }
    }
  };

  const fetchCustomMaterials = async () => {
    try {
      const response = await getCustomMaterials();
      setCustomMaterials(response.results);
    } catch (error) {
      console.error('Error fetching custom materials:', error);
    }
  };

  const fetchCustomMaterialTypes = async (materialId: string) => {
    try {
      const response = await getCustomMaterialTypes(10, 0, materialId);
      setMaterialTypes(response.results);
    } catch (error) {
      console.error('Error fetching custom material types:', error);
    }
  };

  // custom operation actions
  const handleDeleteOperation = async (id: string) => {
    try {
      await deleteCustomOperation(id);
      setCustomOperations(customOperations.filter((op) => op.id !== id));
    } catch (error) {
      console.error('Error deleting operation:', error);
    }
  };

  const handleEditOperation = (operation: CustomOperation) => {
    setEditingOperation(operation);
    operationFormik.setValues({
      name: operation.name,
      user: operation.user,
    });
    setShowAddOperationInput(true);
  };

  useEffect(() => {
    fetchCustomOperations();
    fetchCustomMaterials();
  }, [userID]);

  useEffect(() => {
    if (selectedMaterial) {
      fetchCustomMaterialTypes(selectedMaterial.id);
    } else {
      setMaterialTypes([]);
    }
  }, [selectedMaterial]);

  useEffect(() => {
    materialFormik.setValues({
      name: editingMaterial ? editingMaterial.name : '',
    });
  }, [editingMaterial]);

  useEffect(() => {
    materialTypeFormik.setValues({
      name: editingMaterialType ? editingMaterialType.name : '',
      material: selectedMaterial ? selectedMaterial.id : '',
    });
  }, [editingMaterialType, selectedMaterial]);

  // Handlers for material type input fields
  const handleAddAnotherInput = () => {
    if (materialTypeInputs.length < 4) {
      setMaterialTypeInputs([...materialTypeInputs, { id: Date.now(), value: '' }]);
    }
  };

  const handleMaterialTypeInputChange = (id: string, value: string) => {
    const updatedInputs = materialTypeInputs.map((input) =>
      input.id === Number(id) ? { ...input, value } : input
    );
    setMaterialTypeInputs(updatedInputs);
    setAddAnotherDisabled(updatedInputs[0]?.value.trim() === '');
  };

  const handleAddMaterialTypeDialogClose = () => {
    setIsAddMaterialTypeDialogOpen(false);
    setMaterialTypeInputs([{ id: Date.now(), value: '' }]);
    setAddAnotherDisabled(true);
  };

  useEffect(() => {
    if (isAddMaterialTypeDialogOpen) {
      setMaterialTypeInputs([{ id: Date.now(), value: '' }]);
      setAddAnotherDisabled(true);
    }
  }, [isAddMaterialTypeDialogOpen]);

  const materialTypeCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    customMaterials.forEach((material) => {
      counts[material.id] = materialTypes.filter((type) => type.material === material.id).length;
    });
    return counts;
  }, [customMaterials, materialTypes]);

  return (
    <>
      <div className='flex flex-col items-start mb-8'>
        <h2 className='text-lg font-semibold text-primary'>Preferences and customisation</h2>
        <p className='text-tertiary font-normal text-sm'>
          Manage your team members and their account permissions here.
        </p>
      </div>
      
      <ApplicationTheme />

      <CurrencySettings />

      <CustomOperations
        customOperations={customOperations}
        handleEditOperation={handleEditOperation}
        handleDeleteOperation={handleDeleteOperation}
        showAddOperationInput={showAddOperationInput}
        setShowAddOperationInput={setShowAddOperationInput}
        setEditingOperation={setEditingOperation}
        operationFormik={operationFormik}
        editingOperation={editingOperation}
      />

      <CustomMaterials
        customMaterials={customMaterials}
        materialTypes={materialTypes}
        materialTypeCounts={materialTypeCounts}
        selectedMaterial={selectedMaterial}
        setSelectedMaterial={setSelectedMaterial}
        isAddMaterialTypeDialogOpen={isAddMaterialTypeDialogOpen}
        setIsAddMaterialTypeDialogOpen={setIsAddMaterialTypeDialogOpen}
        handleAddMaterialTypeDialogClose={handleAddMaterialTypeDialogClose}
        materialTypeInputs={materialTypeInputs}
        handleMaterialTypeInputChange={handleMaterialTypeInputChange}
        addAnotherDisabled={addAnotherDisabled}
        handleAddAnotherInput={handleAddAnotherInput}
        materialTypeFormik={materialTypeFormik}
        materialFormik={materialFormik}
        showAddMaterialInput={showAddMaterialInput}
        setShowAddMaterialInput={setShowAddMaterialInput}
        handleDeleteMaterial={handleDeleteMaterial}
        handleDeleteMaterialType={handleDeleteMaterialType}
        setEditingMaterial={setEditingMaterial}
        editingMaterial={editingMaterial}
      />
    </>
  );
};

export default PreferencesSettings;
