import React, { useState } from "react";
import { toast } from "sonner";
import { Fetch } from "../../utils/fetch";
import { useAuthContext } from "../../app/contexts/auth/context";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  agreeTerms: boolean;
}

export const SignUpForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    agreeTerms: true,
  });

  const { login } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.repeatPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await Fetch({
        url: "/auth/signup",
        method: "POST",
        data: {
          email: form.email,
          first_name: form.firstName,
          last_name: form.lastName,
          password: form.password,
        },
      });

      login({ email: form.email, password: form.password });
    } catch (err) {
      toast.error("Failed to sign up");
    }
  };

  return (
    <form className="_social_registration_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-xl-6">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="form-control _social_registration_input"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="form-control _social_registration_input"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-xl-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8">Email</label>
            <input
              type="email"
              name="email"
              className="form-control _social_registration_input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-xl-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control _social_registration_input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-xl-12">
          <div className="_social_registration_form_input _mar_b14">
            <label className="_social_registration_label _mar_b8">
              Repeat Password
            </label>
            <input
              type="password"
              name="repeatPassword"
              className="form-control _social_registration_input"
              value={form.repeatPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="form-check _social_registration_form_check _mar_b20">
            <input
              className="form-check-input _social_registration_form_check_input"
              type="checkbox"
              id="terms"
              name="agreeTerms"
              checked={form.agreeTerms}
              onChange={handleChange}
              required
            />
            <label
              className="form-check-label _social_registration_form_check_label"
              htmlFor="terms"
            >
              I agree to terms & conditions
            </label>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="_social_registration_form_btn _mar_t40 _mar_b60">
            <button
              type="submit"
              className="_social_registration_form_btn_link _btn1"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
