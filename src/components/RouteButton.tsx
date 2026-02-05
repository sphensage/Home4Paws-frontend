import { Link } from "react-router-dom";

interface Props {
  children: string;
  linkto: string;
  classes: string;
  textcolor: string;
  bgcolor: string;
}

const Button = ({ children, linkto, classes, textcolor, bgcolor }: Props) => {
  return (
    <Link to={"/" + linkto}>
      <button type="button" className={classes} style={{ color: textcolor, backgroundColor: bgcolor}}>
        {children}
      </button>
    </Link>
  );
};

export default Button;
