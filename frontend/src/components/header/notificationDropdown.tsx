import { useEffect } from 'react'

interface NotificationDropdownProps {
  onClose: () => void
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  useEffect(() => {
    const handleClickOutside = () => onClose()
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [onClose])

  return (
    <div id="_notify_drop" className="_notification_dropdown" onClick={e => e.stopPropagation()}>
      {/* Your full notification dropdown content here - same as original HTML */}
      <div className="_notifications_content">
        <h4 className="_notifications_content_title">Notifications 2</h4>
        {/* ... rest of your long notification list ... */}
        {/* I'll keep it short for brevity, paste the rest from your HTML */}
      </div>
      {/* ... */}
    </div>
  )
}