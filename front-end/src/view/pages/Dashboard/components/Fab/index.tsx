import { PlusIcon } from '@radix-ui/react-icons';

import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@view/components/DropdownMenu';
import { BankAccountIcon } from '@view/components/icons/BankAccountIcon';
import { CategoryIcon } from '@view/components/icons/categories/CategoryIcon';
import { useBankAccounts } from '@app/hooks/useBankAccounts';

import { useDashboard } from '../DashboardContext/useDashboard';

type DashboardActions = {
  openNewAccountModal: () => void;
  openNewTransactionModal: (type: 'EXPENSE' | 'INCOME') => void;
};

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard() as DashboardActions;
  const { accounts, isFetching } = useBankAccounts();

  return (
    <div className="fixed right-4 bottom-4 z-10">
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <button
            type="button"
            className="text-white bg-teal-900 rounded-full w-12 h-12 flex items-center justify-center hover:bg-teal-800 transition-colors"
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="mr-4" container={document.getElementById('radix-root')}>
          <DropdownMenuItem
            className="gap-2"
            onSelect={() => openNewTransactionModal('EXPENSE')}
            disabled={accounts.length === 0 || isFetching}
          >
            <CategoryIcon type="expense" />
            Nova Despesa
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2"
            onSelect={() => openNewTransactionModal('INCOME')}
            disabled={accounts.length === 0 || isFetching}
          >
            <CategoryIcon type="income" />
            Nova Receita
          </DropdownMenuItem>

          <DropdownMenuItem
            className="gap-2"
            onSelect={openNewAccountModal}
          >
            <BankAccountIcon />
            Nova Conta
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </div>
  );
}
