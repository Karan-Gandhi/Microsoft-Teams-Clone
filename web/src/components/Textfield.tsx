import { useState } from "react";

interface TextfieldProps {
	type?: string;
	className?: string;
	placeholder?: string;
	label?: string;
	hintText?: string;
	onChange?: (value: string) => any;
}

const Textfield: React.FC<TextfieldProps> = ({ type = "text", className = "", placeholder = "", onChange = () => {}, label = "", hintText = "" }) => {
	const [inputId] = useState<string>(`input-textfield-${Math.random()}`);

	return (
		<div className="flex flex-col w-full mb-2">
			{label && (
				<label htmlFor={inputId} className="font-bold mb-2" style={{ color: "#747c84" }}>
					{label}
				</label>
			)}
			<input
				id={inputId}
				style={{ backgroundColor: "#ecf2f7" }}
				className={`px-4 py-2 rounded-lg w-full ${className}`}
				placeholder={placeholder}
				type={type}
				onChange={e => onChange(e.target.value)}
			/>
			<div className="text-sm font-medium mt-1" style={{ color: "#a6aeb8" }}>
				{hintText}
			</div>
		</div>
	);
};

export default Textfield;
