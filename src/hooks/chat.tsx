import React, { createContext, useContext, useState } from 'react';

interface User {
  uid: string;
  name: string;
  photoUrl: string;
}

interface ChatContextData {
  userSelected: User | undefined;
  setUserSelected: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

interface ChatProviderProps {
  children: React.ReactNode;
}
export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [userSelected, setUserSelected] = useState<User>();

  return (
    <ChatContext.Provider
      value={{
        userSelected,
        setUserSelected,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export function useChat(): ChatContextData {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChat must be used within an ChatProvider');
  }

  return context;
}
