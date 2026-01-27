import { Link } from "react-router-dom";

interface Props {
  children: string;
  profile: string;
  classes: string;
  color: string;
}

const Button = ({ children, profile, classes, color }: Props) => {
  return (
    <Link to={"/" + profile}>
      <button type="button" className={classes} style={{ color }}>
        {children}
      </button>
    </Link>
  );
};

export default Button;
