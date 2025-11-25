import React from 'react';
import { AuthLayout } from './authLayout';
import { LoginForm } from './loginForm';
import { SocialLoginButton } from './socialLoginButton';
import { Link } from 'react-router';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout imageSrc="/images/login.png" side="left">
      <div className="_social_login_content">
        <div className="_social_login_left_logo _mar_b28">
          <img src="/images/logo.svg" alt="Logo" className="_left_logo" />
        </div>
        <p className="_social_login_content_para _mar_b8">Welcome back</p>
        <h4 className="_social_login_content_title _titl4 _mar_b50">Login to your account</h4>

        <SocialLoginButton text="Or sign-in with google" />
        <div className="_social_login_content_bottom_txt _mar_b40"><span>Or</span></div>

        <LoginForm />

        <div className="_social_login_bottom_txt">
          <p className="_social_login_bottom_txt_para">
            Don't have an account? <Link to="/signup">Create New Account</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};