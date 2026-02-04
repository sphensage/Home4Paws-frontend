import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/stylesheets/loginform.css";
import { useAuth } from "../AuthContext";
import RouteButton from "../components/RouteButton";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsError(false);

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      setIsError(true); // Triggers red borders and error message
      return;
    }

    navigate("/");
  };

  // Border style applied when isError is true
  const errorBorderStyle = isError 
    ? { borderColor: "#dc3545" } 
    : {};

  // Handlers to clear error state as soon as typing begins
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isError) setIsError(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (isError) setIsError(false);
  };

  return (
    <form
      className="form-box w-30 needs-validation"
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fw-bold fs-4 text-center">Home4Paws Login</p>
      <p
        className="mb-4 text-center"
        style={{ color: "GrayText", padding: "10px" }}
      >
        Log in or create a PawFinder account to access all Home4Paws content
      </p>

      <div className="mb-3">
        {/* Login error message above the label */}
        {isError && (
          <div className="text-danger fw-bold mb-1" style={{ fontSize: "0.9rem" }}>
            Login is invalid, try again.
          </div>
        )}
        
        <label htmlFor="emailInput" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          style={errorBorderStyle}
          id="emailInput"
          placeholder="name@example.com"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {/* Only show 'required' message if we haven't reached the "Login Failed" state */}
        {!isError && <div className="invalid-feedback">Please enter a valid email.</div>}
      </div>

      <div className="mb-5">
        <label htmlFor="passwordInput" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          style={errorBorderStyle}
          id="passwordInput"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        {/* Only show 'required' message if we haven't reached the "Login Failed" state */}
        {!isError && <div className="invalid-feedback">Password is required.</div>}
      </div>

      <button
        type="submit"
        className="btn btn-secondary w-100 mb-3"
        style={{ background: "#8b2e58", border: "0px solid black" }}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <RouteButton
        linkto="signup"
        classes="btn btn-light w-100"
        textcolor="#8b2e58"
      >
        Sign up
      </RouteButton>
    </form>
  );
};

export default LoginForm;
