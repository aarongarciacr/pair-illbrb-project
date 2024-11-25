import { useDispatch } from "react-redux";
import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import "./SignupForm.css";

const SignupFormModal = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className="signup-box">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="firstName" id="firstName">
          First name:
          <input
            type="text"
            name="firstName"
            placeholder="Insert your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <label htmlFor="lastName" id="lastName">
          Last name:
          <input
            type="text"
            name="lastName"
            placeholder="Insert your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label htmlFor="username" id="username">
          Username:
          <input
            type="text"
            name="username"
            placeholder="Insert a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label htmlFor="email" id="email">
          Email:
          <input
            type="text"
            name="email"
            placeholder="Insert your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label htmlFor="password" id="password">
          Password:
          <input
            type="text"
            name="password"
            placeholder="Insert a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label htmlFor="confirm-password" id="confirm-password">
          Confirm password:
          <input
            type="text"
            name="confirm-password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

        <button className="button-75-signup" role="button" type="submit">
          <span className="text">Sign Up</span>
        </button>
      </form>
    </div>
  );
};

export default SignupFormModal;
