import { createContext, useContext, useReducer } from "react";
import dayjs from "dayjs";

const FormContext = createContext();

const formReducer = (state, action) => {
  switch (action.type) {
    case "updateFormData":
      return { ...state, ...action.payload };
    case "submitForm":
      // Handle form submission logic here
      // You can access the current form data from the `state` variable
      // For example, you can send the form data to a server
      console.log("Submitting form:", state);
      return state; // Optionally, return the updated state
    default:
      return state;
  }
};

export const FormProvider = ({ children }) => {
  const [formData, dispatch] = useReducer(formReducer, {
    carts: [],
    confirm: true,
    totalDays: "",
    rentalDate: dayjs().format("YYYY-MM-DD"),
    returnDate: "",
    size: "",
  });

  return (
    <FormContext.Provider value={{ formData, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  return useContext(FormContext);
};
