import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useModal } from "../../context/Modal";

const LoginFormModal = ({ navigate }) => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisable, setIsDisable] = useState(true);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await dispatch(sessionActions.login({ credential, password }));
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
    setIsDisable(!(credential.length >= 4 && password.length >= 6));
  }, [credential, password]);

  return (
    <div className="login-box">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="credential" className="label">
          <input
            type="text"
            id="credential-input"
            name="credential"
            placeholder="Insert username or email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>

        <label htmlFor="password" className="label">
          <input
            type="password"
            id="password-input"
            name="password"
            placeholder="Insert password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errors.message && (
          <p className="invalidCredentials">{errors.message}</p>
        )}
        <button
          className={isDisable ? "disable-button" : "enabled-button"}
          role="button"
          type="submit"
          disabled={isDisable}
        >
          <span className="text">Log In</span>
        </button>
      </form>
    </div>
  );
};

export default LoginFormModal;
