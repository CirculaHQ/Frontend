import { Operation } from "@/types/operations";

export const matchInventories = (operation: Operation, inventories: any) => {
    try {
      // Extract the inventory IDs and input quantities from the operation
      const inventoryIds = operation.inventories || [];
      const inputQuantities = operation.input_quantities || [];

      // Create an array to store matched inventories
      let matchedInventories: any = [];

      // Iterate over the inventories and input_quantities to match them
      inventoryIds.forEach((inventoryId, idx) => {
        const inventory = inventories.find((item: any) => item.id === inventoryId);
        if (inventory) {
          // Push the matching inventory with its corresponding input quantity
          matchedInventories.push({
            ...inventory,
            input_quantity: inputQuantities[idx]
          });
        }
      });
      return matchedInventories;
    } catch (err) {
      console.error('Error adding operation:', err);
    }
  }