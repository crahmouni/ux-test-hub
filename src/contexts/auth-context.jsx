import { useContext, createContext, useState, useEffect } from "react";
import { profile } from "../services/api-service";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    profile()
      .then((data) => setUser(data))
      .catch(() => setUser(null));
  }, []);

  function login(user) {
    setUser(user);
  }

  function logout() {
    setUser(null);
  }

  const contextData = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {user === undefined ? <p>Loading...</p> : children} {/* 🔹 Muestra un mensaje de carga temporal */}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
