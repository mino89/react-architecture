import { useState } from "react";

export const useForm = (data:any, onSubmit: Function) =>{
    const [formData, setFormData] = useState<any>(data);
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return{
        formData,
        setData: setFormData,
        handleSubmit,
        handleChange
    }
}