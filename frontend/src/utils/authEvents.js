// utils/authEvents.js
export const authEvents = {
  openModal: () => window.dispatchEvent(new CustomEvent('openAuthModal')),
  onOpen: (callback) => window.addEventListener('openAuthModal', callback),
  offOpen: (callback) => window.removeEventListener('openAuthModal', callback)
}