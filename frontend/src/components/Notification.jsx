/**
 * src/components/Notification.jsx — Success/error messages.
 *
 * WHY: We need to show users feedback like "Account created!" or
 * "Invalid password". This component renders a colored banner
 * that automatically fades away after a few seconds.
 *
 * PROPS:
 *   message — The text to display
 *   type    — "success" or "error" (changes the color)
 *   onClose — Function to clear the message
 */
import { useEffect } from 'react';

export default function Notification({ message, type = 'error', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 5000);   // auto-dismiss after 5 seconds
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      <span>{type === 'success' ? '✅' : '❌'} {message}</span>
      <button className="notification-close" onClick={onClose}>×</button>
    </div>
  );
}
