import CloseIcon from "@mui/icons-material/Close";

export interface DialogueProps {
	dialogueIsOpen?: boolean;
	setDialogueOpen: (value: boolean) => any;
	title: string;
	onClose?: () => any;
	minHeight?: string;
}

const Dialogue: React.FC<DialogueProps> = ({
	dialogueIsOpen = false,
	setDialogueOpen,
	children,
	title,
	onClose = () => {},
	minHeight = "0px",
}) => {
	const closeDialogue = () => {
		onClose();
		setDialogueOpen(false);
	};

	if (dialogueIsOpen)
		return (
			<div
				className="w-full h-screen absolute right-0 left-0 top-0 bottom-0 flex items-center justify-center shadow-2xl overflow-hidden py-20"
				style={{ backgroundColor: "#00000088" }}
				onClick={closeDialogue}
			>
				<div
					className="w-192 py-4 px-8 max-h-full overflow-auto flex flex-col"
					style={{ backgroundColor: "#292929", minHeight: minHeight }}
					onClick={e => e.stopPropagation()}
				>
					<div className="flex items-center">
						<span className="py-4 text-2xl flex-grow">{title}</span>
						<CloseIcon onClick={closeDialogue} className="cursor-pointer" />
					</div>
					<div className="flex-grow flex flex-col">{children}</div>
				</div>
			</div>
		);
	else return <div className="absolute"></div>;
};

export default Dialogue;
