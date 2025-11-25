// src/components/auth/AuthLayout.tsx
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  imageSrc?: string;
  darkImageSrc?: string;
  side?: 'left' | 'right';
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  imageSrc = "/images/login.png",
  darkImageSrc,
  side = 'left'
}) => {
  const isRight = side === 'right';

  return (
    <section className={`_social_login_wrapper _layout_main_wrapper ${isRight ? '_social_registration_wrapper' : ''}`}>
      {/* Shapes */}
      <div className="_shape_one">
        <img src="/images/shape1.svg" alt="" className="_shape_img" />
        <img src="/images/dark_shape.svg" alt="" className="_dark_shape" />
      </div>
      <div className="_shape_two">
        <img src="/images/shape2.svg" alt="" className="_shape_img" />
        <img src="/images/dark_shape1.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>
      <div className="_shape_three">
        <img src="/images/shape3.svg" alt="" className="_shape_img" />
        <img src="/images/dark_shape2.svg" alt="" className="_dark_shape _dark_shape_opacity" />
      </div>

      <div className={`_social_login_wrap ${isRight ? '_social_registration_wrap' : ''}`}>
        <div className="container">
          <div className="row align-items-center">
            {/* Image Side */}
            <div className={`col-xl-8 col-lg-8 col-md-12 col-sm-12 ${isRight ? 'order-2 order-xl-1' : ''}`}>
              <div className={`_social_login_left ${isRight ? '_social_registration_right' : ''}`}>
                <div className="_social_registration_right_image">
                  <img src={imageSrc} alt="Auth illustration" style={{maxWidth: '600px'}} />
                </div>
                {darkImageSrc && (
                  <div className="_social_registration_right_image_dark">
                    <img src={darkImageSrc} alt="Dark illustration" />
                  </div>
                )}
              </div>
            </div>

            {/* Form Side */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};