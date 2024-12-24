import { InputI } from "../../types";

const Input = ({
  label,
  name,
  disabled = false,
  type = "text",
  required = false,
  min,
  max,
  placeholder,
  multiple,
}: InputI) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="input-field min-h-[100px] max-h-[250px] "
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          min={min}
          max={max}
          multiple={multiple}
          required={required}
          disabled={disabled}
          className="input-field"
        />
      )}
    </div>
  );
};

export default Input;
