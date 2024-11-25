import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as sessionActions from "../../store/session";
import { Navigate } from "react-router-dom";
import "./SignupForm.css";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);

  if (sessionUser) return <Navigate to="/" replace={true} />;

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
      ).catch(async (res) => {
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
        <label htmlFor="firstName">
          First name:
          <br />
          <input
            type="text"
            id="firstName-input"
            name="firstName"
            placeholder="Insert your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <br></br>
        {errors.firstName && <p>{errors.firstName}</p>}
        <br></br>
        <label htmlFor="lastName">
          Last name:
          <br />
          <input
            type="text"
            id="lastName-input"
            name="lastName"
            placeholder="Insert your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <br></br>
        {errors.lastName && <p>{errors.lastName}</p>}
        <br></br>
        <label htmlFor="username">
          Username:
          <br />
          <input
            type="text"
            id="username-input"
            name="username"
            placeholder="Insert a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br></br>
        {errors.username && <p>{errors.username}</p>}
        <br></br>
        <label htmlFor="email">
          Email:
          <br />
          <input
            type="text"
            id="email-input"
            name="email"
            placeholder="Insert your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br></br>
        {errors.email && <p>{errors.email}</p>}
        <br></br>
        <label htmlFor="password">
          Password:
          <br />
          <input
            type="text"
            id="password-input"
            name="password"
            placeholder="Insert a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br></br>
        {errors.password && <p>{errors.password}</p>}
        <br></br>
        <label htmlFor="confirm-password">
          Confirm password:
          <br />
          <input
            type="text"
            id="confirm-password-input"
            name="confirm-password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br></br>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <br></br>
        <button className="button-75" role="button" type="submit">
          <span className="text">Sign Up</span>
        </button>
      </form>
    </div>
  );
};

export default SignupFormPage;
