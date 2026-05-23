import {
  useCallback,
  useMemo,
} from 'react';

import type { ReactNode } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { LocalStorageKeys } from '@app/config/LocalStorageKeys';
import { usersService } from '@app/services/usersService';
import { LaunchScreen } from '@view/components/LaunchScreen';
import { type User } from '@app/entities/User';

import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const accessToken = localStorage.getItem(
    LocalStorageKeys.ACCESS_TOKEN,
  );

  const signedIn = Boolean(accessToken);

  const {
    data,
    isFetching,
    isSuccess,
  } = useQuery<User>({
    queryKey: ['users', 'me'],
    queryFn: async () => {
      try {
        return await usersService.me();
      } catch {
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);

        queryClient.removeQueries({
          queryKey: ['users', 'me'],
        });

        toast.error('Sua sessão expirou!');

        throw new Error('Session expired');
      }
    },
    enabled: signedIn,
    staleTime: Infinity,
    retry: false,
  });

  const signIn = useCallback((newAccessToken: string) => {
    localStorage.setItem(
      LocalStorageKeys.ACCESS_TOKEN,
      newAccessToken,
    );

    window.location.reload();
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);

    queryClient.removeQueries({
      queryKey: ['users', 'me'],
    });

    queryClient.clear();

    window.location.reload();
  }, [queryClient]);

  const value = useMemo(() => ({
    user: data,
    signedIn: isSuccess && signedIn,
    signIn,
    signOut,
  }), [
    data,
    isSuccess,
    signedIn,
    signIn,
    signOut,
  ]);

  return (
    <AuthContext.Provider value={value}>
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
