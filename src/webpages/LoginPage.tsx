import LoginForm from "../forms/LoginForm";
import "/src/stylesheets/loginform.css";

const LoginPage = () => {
  return (
    <div className="vh-100 w-100 bg-image">
      <div className="col-12 col-md-5 vh-100 float-end bg-fix">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
