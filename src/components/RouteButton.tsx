import { Link } from "react-router-dom";

interface Props {
  children: string;
  linkto: string;
  classes: string;
  textcolor: string;
}

const Button = ({ children, linkto, classes, textcolor }: Props) => {
  return (
    <Link to={"/" + linkto}>
      <button type="button" className={classes} style={{ color: textcolor }}>
        {children}
      </button>
    </Link>
  );
};

export default Button;
