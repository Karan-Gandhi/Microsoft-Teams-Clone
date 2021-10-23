import Textfield, { TextfieldProps } from "./Textfield";

type PrimaryTextfieldProps = TextfieldProps;

const PrimaryTextfield: React.FC<PrimaryTextfieldProps> = ({ ...props }) => {
  return <Textfield backgroundColor="#353535" {...props} />;
};

export default PrimaryTextfield;
