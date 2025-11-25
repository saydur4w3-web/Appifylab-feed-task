import { Logo } from "./logo"
import { NavIcons } from "./navIcons"
import { ProfileSection } from "./profileSection"
import { SearchBar } from "./searchBar"


export const DesktopHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
      <div className="container _custom_container">
        <Logo />

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <SearchBar />
          <NavIcons />
          <ProfileSection />
        </div>
      </div>
    </nav>
  )
}