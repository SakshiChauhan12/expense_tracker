import {createContext,useContext,useState} from 'react';

const FormContext=createContext();
//  created a function which allows to use context named FormContext
export function useFormValues(){
    return useContext(FormContext);
}
//creating a provider which will provide the values to the components
export const FormValuesProvider=({children})=>{
    const [formValues,setFormValues]=useState({});
    const setFormValue=(value,key)   =>{
        setFormValues(currentFormValues=>({...currentFormValues,[key]:value}));

    };

    const resetFormValues=()=>{
        setFormValues({});
    
    };
    return(
        <FormContext.Provider value={{formValues,setFormValue,resetFormValues,setFormValues}}>
            {children}
        </FormContext.Provider>

    );
    
    

}


export default FormContext;