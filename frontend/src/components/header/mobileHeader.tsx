import { FC } from 'react'

export const MobileHeader: FC = () => {
  return (
    <div className="_header_mobile_menu">
      <div className="_header_mobile_menu_wrap">
        <div className="container">
          <div className="_header_mobile_menu">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="_header_mobile_menu_top_inner">

                  {/* Logo */}
                  <div className="_header_mobile_menu_logo">
                    <a href="/feed" className="_mobile_logo_link">
                      <img
                        src="/images/logo.svg"
                        alt="Logo"
                        className="_nav_logo"
                      />
                    </a>
                  </div>

                  {/* Right side: Search + (optional menu toggle) */}
                  <div className="_header_mobile_menu_right">
                    {/* Search Icon */}
                    <form className="_header_form_grp">
                      <a href="#0" className="_header_mobile_search">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          fill="none"
                          viewBox="0 0 17 17"
                        >
                          <circle cx="7" cy="7" r="6" stroke="#666" />
                          <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
                        </svg>
                      </a>
                    </form>

                    {/* Optional Hamburger Menu (uncomment if you want it back) */}
                    {/* 
                    <div className="_header_mobile_toggle">
                      <form action="/mobileMenu.html">
                        <button type="submit" className="_header_mobile_btn_link">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="14"
                            fill="none"
                            viewBox="0 0 18 14"
                          >
                            <path
                              stroke="#666"
                              strokeLinecap="round"
                              strokeWidth="1.5"
                              d="M1 1h16M1 7h16M1 13h16"
                            />
                          </svg>
                        </button>
                      </form>
                    </div>
                    */}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}