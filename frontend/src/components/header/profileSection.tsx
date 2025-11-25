import { useState, useRef, useEffect } from 'react'
import {ProfileDropdown} from './profileDropdown'
import { useAuthContext } from '../../app/contexts/auth/context'
import { DEFAULT_IMG_USER } from '../../constants/app.constant'

export const ProfileSection: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user } = useAuthContext();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="_header_nav_profile" ref={dropdownRef}>
      <div className="_header_nav_profile_image">
        <img src={user?.profile_img || DEFAULT_IMG_USER} alt="Profile" className="_nav_profile_img" />
      </div>
      <div className="_header_nav_dropdown">
        <p className="_header_nav_para"> {user?.first_name} {user?.last_name}  </p>
        <button
          className="_header_nav_dropdown_btn _dropdown_toggle"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6">
            <path fill="#112032" d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z" />
          </svg>
        </button>
      </div>

      {/* Dropdown appears on click */}
      {showDropdown && <ProfileDropdown />}
    </div>
  )
}