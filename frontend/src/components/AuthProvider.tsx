import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { auth, provider } from '../firebaseConfig'; // Importando auth e provider do seu firebaseConfig
import { onAuthStateChanged, signInWithPopup, signInWithEmailAndPassword, User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        navigate('/'); // Redireciona para a página principal após o login
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    navigate('/'); // Redireciona para a página principal após o login
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    navigate('/'); // Redireciona para a página principal após o login
  };

  const signOut = async () => {
    await auth.signOut();
    navigate('/login'); // Redireciona para a página de login após o logout
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exportando o hook useAuth
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};