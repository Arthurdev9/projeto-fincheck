import { ChevronDownIcon } from '@radix-ui/react-icons';

import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@view/components/DropdownMenu';

import { ExpensesIcon } from '@view/components/icons/ExpenseIcon';
import { IncomeIcon } from '@view/components/icons/IncomeIcon';
import { TransactionsIcon } from '@view/components/icons/TransactionIcon';

interface TransactionTypeDropdownProps {
  selectedType?: 'INCOME' | 'EXPENSE';
  onSelect?: (value?: 'INCOME' | 'EXPENSE') => void;
}

export function TransactionTypeDropdown({
  selectedType,
  onSelect = undefined,
}: TransactionTypeDropdownProps) {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <button
          type="button"
          className="flex items-center gap-2"
        >
          {selectedType === 'INCOME' && <IncomeIcon />}
          {selectedType === 'EXPENSE' && <ExpensesIcon />}
          {!selectedType && <TransactionsIcon />}

          <span className="text-sm text-gray-800 tracking-[-0.5px] font-medium">
            {selectedType === 'INCOME' && 'Receitas'}
            {selectedType === 'EXPENSE' && 'Despesas'}
            {!selectedType && 'Transações'}
          </span>

          <ChevronDownIcon className="text-gray-900" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="z-20">
        <DropdownMenuItem
          className="gap-2 px-8"
          onSelect={() => onSelect?.('INCOME')}
        >
          <IncomeIcon />
          Receitas
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-2 px-8"
          onSelect={() => onSelect?.('EXPENSE')}
        >
          <ExpensesIcon />
          Despesas
        </DropdownMenuItem>

        <DropdownMenuItem
          className="gap-2 px-8"
          onSelect={() => onSelect?.()}
        >
          <TransactionsIcon />
          Transações
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
