import CloseIcon from "@mui/icons-material/Close";

interface DialogueProps {
	dialogueIsOpen?: boolean;
	setDialogueOpen: (value: boolean) => any;
	title: string;
}

const Dialogue: React.FC<DialogueProps> = ({
	dialogueIsOpen = false,
	setDialogueOpen,
	children,
	title,
}) => {
	if (dialogueIsOpen)
		return (
			<div
				className="w-full h-screen absolute right-0 left-0 top-0 bottom-0 flex items-center justify-center shadow-2xl overflow-hidden py-20"
				style={{ backgroundColor: "#00000088" }}
				onClick={() => setDialogueOpen(false)}
			>
				<div
					className="min-w-1/3 py-4 px-8 max-h-full overflow-auto"
					style={{ backgroundColor: "#292929" }}
					onClick={e => e.stopPropagation()}
				>
					<div className="flex items-center">
						<span className="py-4 text-2xl flex-grow">{title}</span>
						<CloseIcon
							onClick={() => setDialogueOpen(false)}
							className="cursor-pointer"
						/>
					</div>
					<div>{children}</div>
				</div>
			</div>
		);
	else return <div></div>;
};

export default Dialogue;
