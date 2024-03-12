import React, { createContext, useContext, useState } from "react";

interface UserProfile {
  firstName: string;
  lastName: string;
  uid: string;
  // Other user properties
}

interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

const initialUserContext: UserContextType = {
  user: null,
  setUser: () => {},
};

const UserContext = createContext<UserContextType>(initialUserContext);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
