import React, { useState } from 'react';
import { useAuthContext } from '../../app/contexts/auth/context';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const { login } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    login({email, password});

  };

  return (
    <form className="_social_login_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-12">
          <div className="_social_login_form_input _mar_b14">
            <label className="_social_login_label _mar_b8">Email</label>
            <input type="email" className="form-control _social_login_input" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
        </div>
        <div className="col-xl-12">
          <div className="_social_login_form_input _mar_b14">
            <label className="_social_login_label _mar_b8">Password</label>
            <input type="password" className="form-control _social_login_input" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
        </div>
      </div>

      <div className="row _mar_b20">
        <div className="col-lg-6">
          <div className="form-check _social_login_form_check">
            <input className="form-check-input _social_login_form_check_input" type="checkbox" id="remember" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
            <label className="form-check-label _social_login_form_check_label" htmlFor="remember">Remember me</label>
          </div>
        </div>
        <div className="col-lg-6 text-end">
          <p className="_social_login_form_left_para _pointer">Forgot password?</p>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="_social_login_form_btn _mar_t40 _mar_b60">
            <button type="submit" className="_social_login_form_btn_link _btn1">Login now</button>
          </div>
        </div>
      </div>
    </form>
  );
};