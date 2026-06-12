import { useMemo } from 'react';

import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  type SubmitHandler,
  useForm,
} from 'react-hook-form';

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { toast } from 'react-hot-toast';

import { useBankAccounts } from '@app/hooks/useBankAccounts';

import { useCategories } from '@app/hooks/useCategories';

import { transactionsService } from '@app/services/transactionsService';

import type { TransactionCreateParams } from '@app/services/transactionsService/create';

import { currencyRealToNumber } from '@app/utils/currencyRealToNumber';

import { useDashboard } from '../../components/DashboardContext/useDashboard';

const schema = z.object({
  value: z
    .string()
    .nonempty('Informe o valor')
    .refine(
      (val) => {
        const number = currencyRealToNumber(val);

        return number > 0;
      },
      'Valor tem que ser maior que 0',
    ),

  name: z
    .string()
    .nonempty('Informe o nome'),

  categoryId: z
    .string()
    .nonempty('Informe a categoria'),

  bankAccountId: z
    .string()
    .nonempty('Informe a conta'),

  date: z.date(),
});

type FormData = z.infer<typeof schema>;

type UseDashboardContext = {
  isNewTransactionModalOpen: boolean;
  closeNewTransactionModal: () => void;
  newTransactionType: 'EXPENSE' | 'INCOME' | undefined;
};

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard() as UseDashboardContext;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),

    defaultValues: {
      value: '0,00',
      date: new Date(),
    },
  });

  const { accounts } = useBankAccounts();

  const { categories } = useCategories();

  const queryClient = useQueryClient();

  const {
    isPending: isLoadingCreate,
    mutateAsync: createTransaction,
  } = useMutation({
    mutationFn: (
      data: TransactionCreateParams,
    ) => transactionsService.create(data),
  });

  const filteredCategories = useMemo(() => (
    categories.filter(
      (category) => (
        category.type === newTransactionType
      ),
    )
  ), [categories, newTransactionType]);

  function handleCloseNewTransactionModal() {
    closeNewTransactionModal();

    reset();
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!newTransactionType) return;

    try {
      await createTransaction({
        ...data,

        date: data.date.toISOString(),

        type: newTransactionType,

        value: currencyRealToNumber(
          data.value,
        ),
      });

      toast.success(
        `${
          newTransactionType === 'EXPENSE'
            ? 'Despesa'
            : 'Receita'
        } cadastrada com sucesso!`,
      );

      queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });

      queryClient.invalidateQueries({
        queryKey: ['bankAccounts'],
      });

      handleCloseNewTransactionModal();
    } catch {
      toast.error(
        `Erro ao cadastrar a ${
          newTransactionType === 'EXPENSE'
            ? 'despesa'
            : 'receita'
        }.`,
      );
    }
  };

  return {
    isNewTransactionModalOpen,

    closeNewTransactionModal:
      handleCloseNewTransactionModal,

    newTransactionType,

    register,

    handleSubmit:
      handleSubmit(onSubmit),

    errors,

    control,

    accounts,

    categories: filteredCategories,

    isLoadingCreate,
  };
}
