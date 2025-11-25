import React from 'react';

interface Props {
  text?: string;
}

export const SocialLoginButton: React.FC<Props> = ({ text = "Or sign-in with google" }) => {
  return (
    <button type="button" className="_social_login_content_btn _mar_b40">
      <img src="/images/google.svg" alt="Google" className="_google_img" />
      <span>{text}</span>
    </button>
  );
};