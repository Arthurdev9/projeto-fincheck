import type { Transaction, TransactionType } from '@app/entities/Transaction';
import httpClient from '@app/services/httpClient';

export interface TransactionFilters {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: TransactionType;
}

type TransactionGetAllParams = TransactionFilters;

type TransactionGetAllResponse = Transaction[];

export async function getAll(params: TransactionGetAllParams) {
  const { data } = await httpClient.get<TransactionGetAllResponse>(
    '/transactions',
    { params },
  );

  return data;
}
