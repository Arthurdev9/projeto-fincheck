import httpClient from '@app/services/httpClient';

type TransactionRemoveResponse = object;

export async function remove(transactionId: string) {
  const { data } = await httpClient.delete<TransactionRemoveResponse>(
    `/transactions/${transactionId}`,
  );

  return data;
}
