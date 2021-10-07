interface SnackbarContainerProps {}

const SnackbarContainer: React.FC<SnackbarContainerProps> = ({ children }) => {
	return <div style={{ position: "fixed", bottom: 0, left: 0 }}>{children}</div>;
};

export default SnackbarContainer;
