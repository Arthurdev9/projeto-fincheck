import { useQuery } from '@tanstack/react-query';

import { transactionsService } from '@app/services/transactionsService';
import type { TransactionFilters } from '@app/services/transactionsService/getAll';

export function useTransactions(filters: TransactionFilters) {
  const {
    data = [],
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['transactions', filters],
    queryFn: async () => transactionsService.getAll(filters),
  });

  return {
    transactions: data,
    isInitialLoading: isLoading,
    isLoading: isFetching,
    refetchTransactions: refetch,
  };
}
