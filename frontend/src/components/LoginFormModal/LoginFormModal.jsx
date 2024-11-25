import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { useModal } from "../../context/Modal";

const LoginFormModal = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data?.errors) {
          setErrors(data.errors);
        }
      });
  };
  return (
    <div className="login-box">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="credential" className="label">
          Credential:
          <br></br>
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
        <br></br>
        <br></br>

        <label htmlFor="password" className="label">
          Password:
          <br></br>
          <input
            type="text"
            id="password-input"
            name="password"
            placeholder="Insert password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {errors.message && <p>{errors.message}</p>}
        <br></br>
        <br></br>
        {/* <button type="submit">Log In</button> */}
        <button className="button-75" role="button" type="submit">
          <span className="text">Log In</span>
        </button>
      </form>
    </div>
  );
};

export default LoginFormModal;
