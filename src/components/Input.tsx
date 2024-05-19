import React, { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute, useId } from "react";

interface InputTypes {
    name?: string
    autoComplete?: HTMLInputAutoCompleteAttribute
    type?: HTMLInputTypeAttribute
    id?: string
    label?: string
    required?: boolean,
}

const Input = ({ name, autoComplete, type, id, label, required }: InputTypes) => {
  const elId = id ?? useId()

  const focusInput = () => {
    const input = $(`#${elId}`)
    if(!input) return
    input.get(0)?.focus()
  }

  return (
    <div onClick={focusInput} className="rounded-md px-4 py-3 bg-gray-600 text-gray-100 flex flex-col cursor-text z-10">
      <label className="cursor-text" htmlFor={elId}>{label}</label>
      <input
      id={elId}
      className="bg-inherit outline-none"
      name={name}
      autoComplete={autoComplete}
      type={type}
      required={required}
      />
    </div>
  );
};

export default Input;
