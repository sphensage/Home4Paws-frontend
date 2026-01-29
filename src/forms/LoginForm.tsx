import RouteButton from "../components/RouteButton";
import "/src/stylesheets/LoginForm.css";

const LoginForm = () => {
  return (
    <div className="form-box w-30">
      <p className="fw-bold fs-4">PAWS Login</p>
      <p className="mb-4">
        Log in or create a PetFinder account to access all PAWS.
      </p>
      <div className="mb-3">
        <label htmlFor="emailInput" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          placeholder="name@example.com"
        />
      </div>
      <div className="mb-5">
        <label htmlFor="passwordInput" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" id="passwordInput" />
      </div>
      <button
        type="button"
        className="btn btn-secondary w-100 mb-3"
        style={{ background: "rgb(146, 70, 89)", border: "0px solid black" }}
      >
        Login
      </button>
      <RouteButton
        profile="signup"
        classes="btn w-100"
        color="background:rgb(121, 77, 121)"
      >
        Sign up
      </RouteButton>
    </div>
  );
};

export default LoginForm;
