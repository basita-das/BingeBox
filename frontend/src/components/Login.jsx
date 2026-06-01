/**
 * Login.jsx — Login form UI; collects username/password and submits them to the parent onLogin handler.
 */
import { useState } from "react";
import "./Login.css";

const MARQUEE_ROWS = 5;
const MARQUEE_WORDS_PER_ROW = 10;

function LoginMarquee() {
  return (
    <div className="login-bg-animation" aria-hidden="true">
      {Array.from({ length: MARQUEE_ROWS }, (_, row) => (
        <div
          key={row}
          className="login-marquee-row"
          style={{ "--marquee-duration": `${18 + row * 4}s` }}
        >
          <div className="login-marquee-track">
            {Array.from({ length: MARQUEE_WORDS_PER_ROW * 2 }, (_, i) => (
              <span key={i} className="login-marquee-word">
                BingeBox
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function usernameChange(e) {
    setUsername(e.target.value);
  }
  function passwordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="bg">
      <LoginMarquee />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log in to BingeBox</h2>
        <label htmlFor="login-username">Username</label>
        <input
          id="login-username"
          type="text"
          value={username}
          onChange={usernameChange}
          required
          placeholder="Type your username"
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={passwordChange}
          required
          placeholder="Type your password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
