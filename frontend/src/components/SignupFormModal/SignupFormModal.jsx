import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useModal } from "../../context/Modal";
import "./SignupForm.css";

const SignupFormModal = ({ navigate }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisable, setIsDisable] = useState(true);

  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (password !== confirmPassword) {
      setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field.",
      });
      return;
    }

    try {
      await dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      );

      closeModal();
      navigate("/");
    } catch (res) {
      const data = await res.json();
      if (data?.errors) {
        setErrors(data.errors);
      }
    }
  };

  useEffect(() => {
    const isFormValid =
      username.trim() &&
      username.length >= 4 &&
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      password &&
      password.length >= 6 &&
      confirmPassword;

    setIsDisable(!isFormValid);
  }, [username, firstName, lastName, email, password, confirmPassword]);

  return (
    <div className="signup-box">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="name-group">
          <input
            type="text"
            name="firstName"
            placeholder="Insert your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            type="text"
            name="lastName"
            placeholder="Insert your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName || errors.firstName ? (
            <p className="error lastname-error">
              First and Last Name must be between 2 and 30 characters.
            </p>
          ) : (
            ""
          )}
        </div>

        <div className="username-group">
          <input
            type="text"
            name="username"
            placeholder="Insert a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && (
            <p className="error username-error">{errors.username}</p>
          )}
        </div>

        <div className="email-group">
          <input
            type="email"
            name="email"
            placeholder="Insert your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error email-error">{errors.email}</p>}
        </div>

        <div className="both-passwords-box">
          <div className="password-group">
            <input
              type="password"
              name="password"
              placeholder="Insert a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && (
              <p className="error password-error">{errors.password}</p>
            )}
          </div>

          <div className="confirm-password-group">
            <input
              type="password"
              name="confirm-password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <p className="error passwordConfirm-error">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        <button
          className={isDisable ? "disable-button" : "enabled-button"}
          id="signup-btn"
          disabled={isDisable}
          role="button"
          type="submit"
        >
          <span className="text">Sign Up</span>
        </button>
      </form>
    </div>
  );
};
export default SignupFormModal;
