import { useEffect } from 'react';

const CustomAlert = () => {
    useEffect(() => {
        const handleBeforeUnload = (event) => {
          const message = 'Are you sure you want to refresh the page?';
          event.returnValue = message; // Standard for most browsers
          return message; // For some older browsers
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, []);
  return null; 
};

export default CustomAlert;

