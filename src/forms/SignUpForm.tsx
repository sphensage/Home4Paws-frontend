import { useState } from "react";
import "/src/stylesheets/signupform.css";

function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;

  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
}

const SignUpForm = () => {
  const [phone, setPhone] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add("was-validated");
  };

  return (
    <form
      className="form-bg-box flex-column needs-validation"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="form-label w-100 text-start mb-2">Name</label>
      <div className="d-flex flex-row gap-2 mb-3">
        <div>
          <input
            id="firstName"
            type="text"
            className="form-control"
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <input
            id="lastName"
            type="text"
            className="form-control"
            placeholder="Last Name "
            required
          />
        </div>
      </div>
      <div className="d-flex flex-row gap-2 mb-3 w-100">
        <input
          id="month"
          type="number"
          className="form-control w-100"
          placeholder="Month"
          min={1}
          max={12}
          required
        />
        <input
          id="day"
          type="number"
          className="form-control w-100"
          placeholder="Day"
          min={1}
          max={31}
          required
        />
        <input
          id="year"
          type="number"
          className="form-control w-100"
          placeholder="Year"
          min={1900}
          max={2020}
          required
        />
      </div>
      <label htmlFor="emailInput" className="form-label w-100 text-start mb-2">
        Email Address
      </label>
      <div className="w-100 mb-3">
        <input
          id="emailInput"
          type="text"
          className="form-control"
          placeholder="name@example.com"
          required
        />
      </div>
      <label htmlFor="phoneInput" className="form-label w-100 text-start mb-2">
        Phone Number
      </label>
      <div className="w-100 mb-3">
        <input
          id="phoneInput"
          type="tel"
          className="form-control"
          value={phone}
          placeholder="012 345 6789"
          onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
          maxLength={12}
          required
        />
      </div>
      <label htmlFor="phoneInput" className="form-label w-100 text-start mb-2">
        Password
      </label>
      <div className="d-flex flex-row gap-2 mb-3">
        <div>
          <input
            id="passwordInput"
            type="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div>
          <input
            id="confirmPassInput"
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            required
          />
        </div>
      </div>
      <button
        className="btn btn-secondary w-100 mt-5"
        style={{ background: "#8b2e58", border: "0px solid black" }}
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
