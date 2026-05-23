import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';

import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  return (
    <DayPicker
      locale={ptBR}
      selected={value}
      mode="single"
      onSelect={(date) => onChange(date ?? new Date())}
      classNames={{
        month_caption: 'flex items-center justify-between',
        nav: 'flex gap-1',

        button_previous: 'text-teal-800 flex items-center justify-center !bg-transparent',
        button_next: 'text-teal-800 flex items-center justify-center !bg-transparent',

        weekday: 'uppercase text-xs text-gray-500 font-medium pt-1 pb-2',

        day: 'text-gray-700 cursor-pointer w-10 h-10 hover:bg-teal-100 rounded-full',

        today: 'bg-gray-100 font-bold text-gray-900',

        selected: '!bg-teal-900 text-white font-medium',
      }}
      formatters={{
        formatCaption: (date, options) => (
          capitalizeFirstLetter(
            format(date, 'LLLL yyyy', options),
          )
        ),
      }}
    />
  );
}
