import React, { useState } from "react";
import styles from './login.module.css';

interface LoginProps {
  onSubmit: (username: string, password: string, email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password,email);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.login}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
