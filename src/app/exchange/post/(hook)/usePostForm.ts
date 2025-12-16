import { useState } from "react";

export type FormState = {
  photo: File[];
  title: string;
  category: string;
  size: string;
  condition: string;
  wantCategory: string;
  wantSize: string;
  spot: string;
  description: string;
};

const initialFormState: FormState = {
  photo: [],
  title: "",
  category: "",
  size: "",
  condition: "",
  wantCategory: "",
  wantSize: "",
  spot: "",
  description: "",
};

export function usePostForm(onSubmit?: (form: FormState) => void) {
  const [form, setForm] = useState<FormState>(initialFormState);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const reset = () => {
    setForm(initialFormState);
  };

  const submit = () => {
    onSubmit?.(form);
  };

  return {
    form,
    update,
    reset,
    submit,
  };
}
