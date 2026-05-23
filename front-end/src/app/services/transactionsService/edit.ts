import type { TransactionType } from '@app/entities/Transaction';
import httpClient from '@app/services/httpClient';

export interface TransactionEditParams {
  id: string;
  name: string;
  value: number;
  bankAccountId: string;
  categoryId: string;
  date: string;
  type: TransactionType;
}

type TransactionEditResponse = object;

export async function edit({ id, ...params }: TransactionEditParams) {
  const { data } = await httpClient.put<TransactionEditResponse>(
    `/transactions/${id}`,
    params,
  );

  return data;
}
