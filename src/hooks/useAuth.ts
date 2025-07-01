import { useState } from 'react';

export const useAuth = () => {
  // Placeholder: no real authentication, just a mock user
  const [user, setUser] = useState<{ id: string; email: string } | null>({ id: 'demo-user', email: 'demo@example.com' });
  const [loading] = useState(false);

  // Placeholder sign in/out/up functions
  const signUp = async (email: string) => {
    setUser({ id: 'demo-user', email });
    return { data: { user: { id: 'demo-user', email } }, error: null };
  };

  const signIn = async (email: string) => {
    setUser({ id: 'demo-user', email });
    return { data: { user: { id: 'demo-user', email } }, error: null };
  };

  const signOut = async () => {
    setUser(null);
    return { error: null };
  };

  return {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  };
};