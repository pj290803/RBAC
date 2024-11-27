import { createContext, useState, useContext } from 'react';
import { authenticator } from 'otplib';

// Initialize Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [mfaSecret, setMfaSecret] = useState(null); 

  const login = (email, password) => {
    if (user && mfaSecret) {
      return { mfaRequired: true };
    }
  };

  const verifyMfa = (token) => {
    if (!mfaSecret) return false;
    return authenticator.verify({ token, secret: mfaSecret });
  };

  return (
    <AuthContext.Provider value={{ user, login, verifyMfa, setMfaSecret }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to Use Context
export const useAuth = () => useContext(AuthContext);
