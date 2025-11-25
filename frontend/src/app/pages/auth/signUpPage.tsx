// src/components/auth/SignUpPage.tsx
import React from 'react';
import { AuthLayout } from '../../../components/auth/authLayout';
import { SocialLoginButton } from '../../../components/auth/socialLoginButton';
import { SignUpForm } from '../../../components/auth/signUpForm';
import { Link } from 'react-router';

export const SignUpPage: React.FC = () => {
  return (
    <AuthLayout
      imageSrc="/images/registration.png"
      darkImageSrc="/images/registration1.png"
      side="left"
    >
      <div className="_social_registration_content">
        <div className="_social_registration_right_logo _mar_b28">
          <img src="/images/logo.svg" alt="Logo" className="_right_logo" style={{maxWidth: '600px'}} />
        </div>
        <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
        <h4 className="_social_registration_content_title _titl4 _mar_b50">Registration</h4>

        <SocialLoginButton text="Register with google" />
        <div className="_social_registration_content_bottom_txt _mar_b40"><span>Or</span></div>

        <SignUpForm />

        <div className="_social_registration_bottom_txt">
          <p className="_social_registration_bottom_txt_para">
            Already have an account? <Link to="/login" > Sign In </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};