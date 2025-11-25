// src/components/auth/AuthToggle.tsx
import React, { useState } from 'react';
import { LoginPage } from './loginPage';
import { SignUpPage } from './signUpPage';


export const AuthToggle: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {/* Optional debug toggle */}
      {/* <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999, background: 'white', padding: '10px', borderRadius: '8px' }}>
        <button onClick={() => setIsLogin(true)} style={{ marginRight: 10 }}>Login</button>
        <button onClick={() => setIsLogin(false)}>Sign Up</button>
      </div> */}

      {isLogin ? <LoginPage /> : <SignUpPage />}
    </>
  );
};