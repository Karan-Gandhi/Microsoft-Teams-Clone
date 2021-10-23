import Button from "./Button";

interface PrimaryButtonProps {
  type?: "submit" | "button" | "reset" | undefined;
  className?: string;
  noPadding?: boolean;
  onClick?: () => any;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      {...rest}
      backgroundColor="#6264a7"
      hoverBackgroudColor="#2f3054"
      color="#fff"
      hoverColor="#fff"
      noPadding
      noRounded
      className={"px-4 py-2 rounded-md " + rest.className}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
