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

import type { BankAccountCreateParams } from '@app/services/bankAccountsService/create';

import { bankAccountsService } from '@app/services/bankAccountsService';

import { currencyRealToNumber } from '@app/utils/currencyRealToNumber';

import { useDashboard } from '../../components/DashboardContext/useDashboard';

const schema = z.object({
  initialBalance: z
    .string()
    .nonempty('Saldo inicial é obrigatório'),

  name: z
    .string()
    .nonempty('Nome da Conta é obrigatório'),

  type: z.enum(
    ['CHECKING', 'INVESTMENT', 'CASH'],
    {
      message: 'Tipo da Conta é obrigatório',
    },
  ),

  color: z
    .string()
    .nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
  const {
    isNewAccountModalOpen,
    closeNewAccountModal,
  } = useDashboard() as {
    isNewAccountModalOpen: boolean;
    closeNewAccountModal: () => void;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),

    defaultValues: {
      initialBalance: '0,00',
    },
  });

  const queryClient = useQueryClient();

  const {
    isPending: isLoading,
    mutateAsync,
  } = useMutation({
    mutationFn: (
      data: BankAccountCreateParams,
    ) => bankAccountsService.create(data),
  });

  function handleCloseNewAccountModal() {
    closeNewAccountModal();

    reset();
  }

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await mutateAsync({
        ...data,

        initialBalance:
          currencyRealToNumber(
            data.initialBalance,
          ),
      });

      toast.success(
        'Conta cadastrada com sucesso!',
      );

      queryClient.invalidateQueries({
        queryKey: ['bankAccounts'],
      });

      handleCloseNewAccountModal();
    } catch {
      toast.error(
        'Erro ao cadastrar a conta.',
      );
    }
  };

  return {
    isNewAccountModalOpen,

    closeNewAccountModal:
      handleCloseNewAccountModal,

    register,

    control,

    handleSubmit:
      handleSubmit(onSubmit),

    errors,

    isLoading,
  };
}
