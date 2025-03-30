import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields are required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    try {
      await auth.login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.log('Error logging in');
      setError('Invalid email or password. Please try again.');
    }
  };

  useEffect(() => {
    if (auth.isLoggedIn && auth.user) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.companyTagline}>Energizing World's Electric Future</h2>
      <h3 className={styles.loginHeading}>Sign In</h3>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          type='email'
          className={styles.loginInput}
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          className={styles.loginInput}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.loginButton}>Submit</button>
      </form>
    </div>
  );
};

export { Login };