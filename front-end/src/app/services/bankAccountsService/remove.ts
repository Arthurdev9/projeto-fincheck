import httpClient from '@app/services/httpClient';

type BankAccountRemoveResponse = void;

export async function remove(bankAccountId: string) {
  const { data } = await httpClient.delete<BankAccountRemoveResponse>(
    `/bank-accounts/${bankAccountId}`,
  );

  return data;
}
