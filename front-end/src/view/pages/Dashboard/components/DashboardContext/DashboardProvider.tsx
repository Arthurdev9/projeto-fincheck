import {
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { LocalStorageKeys } from '@app/config/LocalStorageKeys';

import type { BankAccount } from '@app/entities/BankAccount';

import type { TransactionType } from '@app/entities/Transaction';

import { DashboardContext } from './DashboardContext';

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({
  children,
}: DashboardProviderProps) {
  const [
    areValuesVisible,
    setAreValuesVisible,
  ] = useState<boolean>(() => {
    const areValuesVisibleStoraged =
      localStorage.getItem(
        LocalStorageKeys.ARE_VALUES_VISIBLE,
      );

    return areValuesVisibleStoraged !== 'false';
  });

  const [
    isNewAccountModalOpen,
    setIsNewAccountModalOpen,
  ] = useState(false);

  const [
    isNewTransactionModalOpen,
    setIsNewTransactionModalOpen,
  ] = useState(false);

  const [
    newTransactionType,
    setNewTransactionType,
  ] = useState<TransactionType | null>(
    null,
  );

  const [
    isEditAccountModalOpen,
    setIsEditAccountModalOpen,
  ] = useState(false);

  const [
    accountBeingEdited,
    setAcccountBeingEdited,
  ] = useState<BankAccount | null>(
    null,
  );

  const toggleValueVisibility =
    useCallback(() => {
      setAreValuesVisible((prevState) => {
        localStorage.setItem(
          LocalStorageKeys.ARE_VALUES_VISIBLE,
          String(!prevState),
        );

        return !prevState;
      });
    }, []);

  const openNewAccountModal =
    useCallback(() => {
      setIsNewAccountModalOpen(true);
    }, []);

  const closeNewAccountModal =
    useCallback(() => {
      setIsNewAccountModalOpen(false);
    }, []);

  const openNewTransactionModal =
    useCallback(
      (type: TransactionType) => {
        setNewTransactionType(type);

        setIsNewTransactionModalOpen(
          true,
        );
      },
      [],
    );

  const closeNewTransactionModal =
    useCallback(() => {
      setNewTransactionType(null);

      setIsNewTransactionModalOpen(
        false,
      );
    }, []);

  const openEditAccountModal =
    useCallback(
      (bankAccount: BankAccount) => {
        setAcccountBeingEdited(
          bankAccount,
        );

        setIsEditAccountModalOpen(
          true,
        );
      },
      [],
    );

  const closeEditAccountModal =
    useCallback(() => {
      setIsEditAccountModalOpen(
        false,
      );

      setAcccountBeingEdited(null);
    }, []);

  const dashboardProviderValue =
    useMemo(
      () => ({
        areValuesVisible,

        toggleValueVisibility,

        isNewAccountModalOpen,

        openNewAccountModal,

        closeNewAccountModal,

        isNewTransactionModalOpen,

        openNewTransactionModal,

        closeNewTransactionModal,

        newTransactionType,

        isEditAccountModalOpen,

        openEditAccountModal,

        closeEditAccountModal,

        accountBeingEdited,
      }),
      [
        areValuesVisible,
        toggleValueVisibility,

        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,

        isNewTransactionModalOpen,
        openNewTransactionModal,
        closeNewTransactionModal,

        newTransactionType,

        isEditAccountModalOpen,
        openEditAccountModal,
        closeEditAccountModal,

        accountBeingEdited,
      ],
    );

  return (
    <DashboardContext.Provider
      value={dashboardProviderValue}
    >
      {children}
    </DashboardContext.Provider>
  );
}
