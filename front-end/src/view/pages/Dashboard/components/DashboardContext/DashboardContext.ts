import { createContext } from 'react';

import type { BankAccount } from '@app/entities/BankAccount';

import type { TransactionType } from '@app/entities/Transaction';

export interface DashboardContextValue {
  areValuesVisible: boolean;

  isNewAccountModalOpen: boolean;

  isNewTransactionModalOpen: boolean;

  newTransactionType: TransactionType | null;

  isEditAccountModalOpen: boolean;

  accountBeingEdited: BankAccount | null;

  toggleValueVisibility: () => void;

  openNewAccountModal: () => void;

  closeNewAccountModal: () => void;

  openNewTransactionModal: (
    type: TransactionType
  ) => void;

  closeNewTransactionModal: () => void;

  openEditAccountModal: (
    bankAccount: BankAccount
  ) => void;

  closeEditAccountModal: () => void;
}

export const DashboardContext =
  createContext({} as DashboardContextValue);
