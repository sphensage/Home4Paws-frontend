import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "/src/stylesheets/signupform.css";
import { useAuth } from "../AuthContext";
import { useAppStore } from "../useAppStore";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [validated] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [hideTooltips, setHideTooltips] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setSuccessMessage = useAppStore((state) => state.setSuccessMessage);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void
  ) => {
    const cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setter(cleanValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const passInput = document.getElementById(
      "passwordInput"
    ) as HTMLInputElement;
    const confirmInput = document.getElementById(
      "confirmPassInput"
    ) as HTMLInputElement;

    confirmInput.setCustomValidity("");

    if (passInput.value !== confirmInput.value) {
      confirmInput.setCustomValidity("Passwords do not match");
    }

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      setHideTooltips(false);
      return;
    }

    form.classList.add("was-validated");
    setHideTooltips(false);

    const userData = {
      name: `${firstName} ${lastName}`,
      email: (document.getElementById("emailInput") as HTMLInputElement).value,
      password: password,
      birthdate: `${(document.getElementById("year") as HTMLInputElement).value}-${String(
        (document.getElementById("month") as HTMLInputElement).value
      ).padStart(2, "0")}-${String(
        (document.getElementById("day") as HTMLInputElement).value
      ).padStart(2, "0")}`,
    };

    setIsSubmitting(true);
    try {
      const result = await signup(userData);

      if (result.success) {
        setSuccessMessage("Account Created Successfully! Welcome to Home4Paws.");
        navigate("/");
      } else {
        alert("Sign up failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Unexpected error during sign-up:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [birthDate, setBirthDate] = useState({ month: "", day: "", year: "" });

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, max } = e.target;
    let numericValue = parseInt(value);

    if (value === "") {
      setBirthDate({ ...birthDate, [id]: "" });
      return;
    }

    if (numericValue > Number(max)) {
      numericValue = Number(max);
    }

    setBirthDate({ ...birthDate, [id]: numericValue.toString() });
  };

  const handleInput = () => {
    if (validated) {
      setHideTooltips(true);
    }
  };

  return (
    <form
      className={`form-bg-box flex-column needs-validation ${
        hideTooltips ? "hide-tooltips" : ""
      } ${validated ? "was-validated" : ""}`}
      onSubmit={handleSubmit}
      onInput={handleInput}
      noValidate
    >
      <img
        src="/src/assets/faviconFinal3.svg"
        alt="Home4Paws Logo"
        className="mb-3"
      />
      <p className="fw-bold fs-4 text-center mb-4">
        Create Your PawFinder Account
      </p>
      <label className="form-label w-100 text-start mb-2">Name</label>
      <div className="d-flex flex-row gap-2 mb-3 position-relative">
        <div>
          <input
            id="firstName"
            type="text"
            className="form-control"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => handleNameChange(e, setFirstName)}
            required
          />
          <div className="invalid-tooltip">First name is required.</div>
        </div>
        <div>
          <input
            id="lastName"
            type="text"
            className="form-control"
            placeholder="Last Name "
            value={lastName}
            onChange={(e) => handleNameChange(e, setLastName)}
            required
          />
          <div className="invalid-tooltip">Last name is required.</div>
        </div>
      </div>
      <label className="form-label w-100 text-start mb-2">Birth Date</label>
      <div className="d-flex flex-row gap-2 mb-3 w-100">
        <input
          id="month"
          type="number"
          className="form-control w-100"
          placeholder="Month"
          min={1}
          max={12}
          maxLength={2}
          value={birthDate.month}
          onChange={handleDateChange}
          required
        />
        <input
          id="day"
          type="number"
          className="form-control w-100"
          placeholder="Day"
          min={1}
          max={31}
          maxLength={2}
          value={birthDate.day}
          onChange={handleDateChange}
          required
        />
        <input
          id="year"
          type="number"
          className="form-control w-100"
          placeholder="Year"
          min={1900}
          max={2020}
          maxLength={4}
          value={birthDate.year}
          onChange={handleDateChange}
          required
        />
      </div>
      <label htmlFor="emailInput" className="form-label w-100 text-start mb-2">
        Email Address
      </label>
      <div className="w-100 mb-3 position-relative">
        <input
          id="emailInput"
          type="email"
          className="form-control"
          placeholder="name@example.com"
          required
        />
        <div className="invalid-tooltip">
          Please enter a valid email address.
        </div>
      </div>
      <label htmlFor="passwordInput" className="form-label w-100 text-start mb-2">
        Password
      </label>
      <div className="d-flex flex-row gap-2 mb-3 position-relative">
        <div>
          <input
            id="passwordInput"
            type="password"
            className="form-control"
            placeholder="Password"
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="invalid-tooltip">Password is required.</div>
        </div>
        <div>
          <input
            id="confirmPassInput"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="invalid-tooltip">
            {confirmPassword === ""
              ? "Please confirm your password."
              : "Password do not match."}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn btn-secondary w-100 mt-5"
        style={{ background: "#8b2e58", border: "0px solid black" }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;