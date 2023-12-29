import { Textarea } from "@/components/ui/textarea";
import { 
  FieldErrors, 
  FieldValues, 
  UseFormRegister
} from "react-hook-form";

interface TextInputProps {
  placeholder?: string;
  id: string;
  value?:string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors
}

export default function TextInput({
    placeholder, 
    id, 
    value,
    type, 
    required, 
    register,
  }:TextInputProps
) {
  return (
    <div className="relative w-full">
      <Textarea
        id={id}
        value={value}
        autoComplete={id}
        {...register("content", { required })}
        placeholder={placeholder}
        className="
          text-black
          font-light
          mt-4 md:mt-8
          py-2
          px-4
          bg-neutral-100 
          w-full md:w-3/4
          focus:outline-none
        "
      />
    </div>
  )
}
