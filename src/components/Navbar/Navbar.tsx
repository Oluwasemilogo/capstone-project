import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.svg";
import styles from "./Navbar.module.css";
import classNames from "classnames";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string, email: string) => {
    // Handle login logic here
    fetch("https://linkr-mvp2.onrender.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          // if (data.success === "true") {
          navigate("/");
          console.log(data.message);
          localStorage.setItem("token", data.token);
          console.log(data.token);
          setIsLoggedIn(true); // Update isLoggedIn state
        }
        //  else {
        //   // Handle authentication failure
        //   console.log(data);
        // }
        // }
      )
      .catch((error) => {
        // Handle network or API errors
        console.log("Error:", error);
      });
  };

  const handleSignUp = (username: string, password: string, email: string) => {
    // Handle sign up logic here
    fetch("https://linkr-mvp2.onrender.com/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === "true") {
          navigate("/");
          console.log(data.message);
          setIsLoggedIn(true); // Update isLoggedIn state
        } else {
          // Handle sign up failure
          console.log("Sign up failed");
        }
      })
      .catch((error) => {
        // Handle network or API errors
        console.log("Error:", error);
      });
  };

  const menuBtnClasses = classNames(styles.menuBtn, showMenu && styles.open);
  const mobileMenuClasses = classNames(
    styles.navbarContainer,
    showMenu && styles.open
  );

  return (
    <header className={styles.fixed}>
      <div className={styles.container}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>
        <div className={menuBtnClasses} onClick={() => setShowMenu(!showMenu)}>
          <div className={styles.menuBtnBurger}></div>
        </div>
        <div className={mobileMenuClasses}>
          <nav className={styles.navbar}>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/features">Features</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/resources">Resources</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.btnContainer}>
            <button className={styles.login} onClick={() => setShowLogin(true)}>
              Login
            </button>
            <button
              className={styles.signUpBtn}
              onClick={() => setShowSignUp(true)}
            >
              Sign up
            </button>
            {showLogin && <Login onSubmit={handleLogin} />}
            {showSignUp && <SignUp onSubmit={handleSignUp} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
