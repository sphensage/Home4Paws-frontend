import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/stylesheets/loginform.css";
import { useAuth } from "../AuthContext";
import RouteButton from "../components/RouteButton";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use AuthContext instead of direct API call

  // State for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add("was-validated");
      return;
    }

    setLoading(true);

    // Use AuthContext login (handles token storage automatically)
    const result = await login(email, password);
    setLoading(false);

    if (!result.success) {
      alert(result.message || "Login failed");
      return;
    }

    // User is now logged in (token stored, user in context)
    // No alert needed - just redirect
    navigate("/");
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
        <label htmlFor="emailInput" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="invalid-feedback">Please enter a valid email.</div>
      </div>

      <div className="mb-5">
        <label htmlFor="passwordInput" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="invalid-feedback">Password is required.</div>
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