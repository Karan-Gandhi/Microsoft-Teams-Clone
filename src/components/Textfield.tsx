import { useState } from "react";
import { isWithinIntervals } from "../utils/BrowserUtils";

export interface TextfieldProps {
  type?: string;
  className?: string;
  placeholder?: string;
  label?: string;
  hintText?: string;
  backgroundColor?: string;
  value?: string;
  onChange?: (value: string) => any;
  onSubmit?: (value: string) => any;
  focus?: boolean;
  textfieldRef?: React.ForwardedRef<HTMLInputElement>;
  highlightText?: string[];
}

const Textfield: React.FC<TextfieldProps> = ({
  type = "text",
  className = "",
  placeholder = "",
  onChange = () => {},
  label = "",
  hintText = "",
  backgroundColor = "#ecf2f7",
  onSubmit = () => {},
  value,
  textfieldRef,
  highlightText = [],
}) => {
  const [inputId] = useState<string>(`input-textfield-${Math.random()}`);
  const intervals = highlightText.map((text) => [
    (value || "").toUpperCase().indexOf(text.toUpperCase()),
    ((value || "").toUpperCase().indexOf(text.toUpperCase()) || 0) + text.length,
  ]);
  console.log(intervals, highlightText);

  return (
    <div className="flex flex-col w-full mb-2">
      {label && (
        <label htmlFor={inputId} className="font-bold mb-2" style={{ color: "#747c84" }}>
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute h-full px-4 py-2 my-2">
          {value?.split("").map((element, idx) => (
            <span key={idx.toString()} style={(isWithinIntervals(intervals, idx) && { background: "black", opacity: 0.5 }) || {}}>
              {element}
            </span>
          ))}
        </div>
        <input
          id={inputId}
          style={{ backgroundColor }}
          className={`px-4 py-2 rounded-lg w-full ${className}`}
          placeholder={placeholder}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmit(e.currentTarget.value);
          }}
          value={value}
          ref={textfieldRef}
        />
      </div>

      <div className="text-sm font-medium mt-1" style={{ color: "#a6aeb8" }}>
        {hintText}
      </div>
    </div>
  );
};

export default Textfield;
