import { createContext } from 'react';
import type { User } from '@app/entities/User';

interface AuthProviderValue {
  signedIn: boolean;
  user?: User;
  signIn: (accessToken: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthProviderValue);
