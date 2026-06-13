import { cn } from '@app/utils/cn';
import { formatCurrency } from '@app/utils/formatCurrency';
import { CategoryIcon } from '@view/components/icons/categories/CategoryIcon';

interface TransactionCardProps {
  name: string;
  date: string;
  rawDate: string; // ← adiciona isso
  type: 'income' | 'expense';
  value: number;
  icon?: string;
  isValueVisible?: boolean;
  onClick?: () => void;
}

export function TransactionCard({
  name, date, rawDate, type, value, icon, isValueVisible = true, onClick,
}: TransactionCardProps) {
  const isFuture = new Date(rawDate) > new Date();

  return (
    <button
      type="button"
      className="w-full text-left bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
      onClick={onClick}
    >
      <div className="flex-1 flex items-center gap-3">
        <CategoryIcon type={type} category={icon} />

        <div>
          <strong className="font-bold tracking-[-0.5px] block">
            {name}
          </strong>
          <span className="text-sm text-gray-600">
            {date}
          </span>
          {isFuture && (
            <span className="text-xs text-yellow-600 font-medium block mt-0.5">
              {type === 'expense'
                ? 'O valor será debitado quando chegar a data'
                : 'O valor será creditado quando chegar a data'}
            </span>
          )}
        </div>
      </div>

      <span className={cn(
        'tracking-[-0.5px] font-medium',
        type === 'income' ? 'text-green-800' : 'text-red-800',
        !isValueVisible && 'blur-[8px] select-none',
        isFuture && 'opacity-50', // ← valor fica mais apagado se for futuro
      )}
      >
        {type === 'expense' && '- '}
        {type === 'income' && '+ '}
        {formatCurrency(value)}
      </span>
    </button>
  );
}

TransactionCard.defaultProps = {
  icon: null,
  isValueVisible: true,
  onClick: null,
};
