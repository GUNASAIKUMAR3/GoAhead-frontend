import { useState } from "react";

let toastQueue = [];
let idCounter = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type) => {
    const newToast = {
      id: idCounter++,
      message,
      type,
    };

    toastQueue.push(newToast);
    setToasts([...toastQueue]);

    setTimeout(() => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== newToast.id));
    }, 3000); // Remove toast after 3 seconds
  };

  return {
    toasts,
    showToast,
  };
};

export const toast = (message, type) => {
  // You can customize this based on your preferred way to show toast notifications globally
  const toastElement = document.createElement("div");
  toastElement.className = `toast toast-${type}`;
  toastElement.textContent = message;

  document.body.appendChild(toastElement);
  setTimeout(() => {
    toastElement.remove();
  }, 3000); // Toast duration
};
