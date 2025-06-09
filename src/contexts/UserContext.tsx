import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  gender: 'male' | 'female';
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  getGreeting: () => string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const getGreeting = () => {
    if (!user) return '';
    return user.gender === 'male' ? `Brother ${user.name}` : `Sister ${user.name}`;
  };

  return (
    <UserContext.Provider value={{ user, setUser, getGreeting }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};