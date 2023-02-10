import { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextData {
  user?: User;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user = localStorage.getItem("@Xati:user");

    if (user != null) setUser(JSON.parse(user));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
