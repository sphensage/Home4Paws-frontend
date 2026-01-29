import RouteButton from "../components/RouteButton";
import "/src/stylesheets/loginform.css";

const LoginForm = () => {
  return (
    <div className="form-box w-30">
      <p className="fw-bold fs-4 text-center">Home4Paws Login</p>
      <p
        className="mb-4 text-center"
        style={{ color: "GrayText", padding: "10px" }}
      >
        Log in or create a PawFinder account to access all Home4Paws content
        such the ability to create and like posts.
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
        style={{ background: "#8b2e58", border: "0px solid black" }}
      >
        Login
      </button>
      <RouteButton
        linkto="signup"
        classes="btn btn-light w-100"
        textcolor="#8b2e58"
      >
        Sign up
      </RouteButton>
    </div>
  );
};

export default LoginForm;
