import Button from "./Button";

interface IconButtonProps {
  type?: "submit" | "button" | "reset" | undefined;
  className?: string;
  noPadding?: boolean;
  onClick?: () => any;
}

const IconButton: React.FC<IconButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      {...rest}
      backgroundColor="#00000000"
      hoverBackgroudColor="#00000099"
      color="#fff"
      hoverColor="#fff"
      noPadding
      noRounded
      className={"px-2 py-2 rounded-md " + rest.className}
    >
      {children}
    </Button>
  );
};

export default IconButton;
