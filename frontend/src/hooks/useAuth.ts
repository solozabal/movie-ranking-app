// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider'; // O caminho deve estar correto

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context; // Retorna o contexto que inclui o usuário
};
