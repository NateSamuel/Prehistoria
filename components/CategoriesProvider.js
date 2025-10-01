//implemented this using this resource for information about createContext: https://react.dev/reference/react/createContext

import React, { createContext, useContext, useState, useEffect } from "react";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  //this information is used to track correct questions, update the visuals of the dashboard
  const [categories, setCategories] = useState({
    TimePeriod: { isSelected: false, isComplete: false },
    Size: { isSelected: false, isComplete: false },
    Sound: { isSelected: false, isComplete: false },
    Teeth: { isSelected: false, isComplete: false },
    Food: { isSelected: false, isComplete: false },
    Skin: { isSelected: false, isComplete: false },
    Location: { isSelected: false, isComplete: false },
    Type: { isSelected: false, isComplete: false },
  });

  const [allCategoriesComplete, setAllCategoriesComplete] = useState(false);

  //marks the category complete
  const markCategoryComplete = (category) => {
    setCategories((prev) => {
      const updatedCategories = {
        ...prev,
        [category]: { ...prev[category], isComplete: true },
      };
      //if all categories are complete this sets a useState which will be passed back to DinoDashboard
      const allComplete = Object.values(updatedCategories).every(cat => cat.isComplete);
      setAllCategoriesComplete(allComplete);

      return updatedCategories;
    });
  };

  return (
    <CategoriesContext.Provider value={{
      categories,
      setCategories,
      markCategoryComplete,
      allCategoriesComplete
    }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);