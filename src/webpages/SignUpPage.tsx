import SignUpForm from "../forms/SignUpForm";
import "/src/stylesheets/signupform.css";

const SignUpPage = () => {
  return (
    <div className="vh-100 w-100 bg d-flex justify-content-center align-items-center">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
