



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import styles from './Signup.module.css'; 



const Signup = () => {


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
      alert('Please enter a valid email address.');
      return;
    }
    setError('');

    try {
      await auth.signup(email, password);
      navigate('/dashboard');
    } 
    
    catch (error) {
      console.log('Error during signup:', error);
      setError('Signup failed. Please try again.');
    }
  };



  return (
    <div className={styles.signupContainer}>
      <h2 className={styles.companyTagline}>Energizing World's Electric Future</h2>
      <h3 className={styles.signupHeading}>Sign Up</h3>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <input
          type='email'
          className={styles.signupInput}
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          className={styles.signupInput}
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit' className={styles.signupButton}>Sign Up</button>
      </form>
    </div>
  );
};



export { Signup };