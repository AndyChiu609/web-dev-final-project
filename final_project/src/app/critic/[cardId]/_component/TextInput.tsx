'use client'
import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister
} from "react-hook-form";

interface TextInputProps {
  placeholder?: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

export default function TextInput({
    placeholder, 
    id, 
    type, 
    required, 
    register,
  }:TextInputProps
) {
  return (
    <div className="relative w-full">
      <textarea
        id={id}
        autoComplete={id}
        {...register("content", { required })}
        placeholder={placeholder}
        className="
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100 
          w-full 
          rounded-full
          focus:outline-none
        "
      />
    </div>
  )
}
