import { useState } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';

import { cn } from '@app/utils/cn';
import { formatDate } from '@app/utils/formatDate';

import { PopoverRoot, PopoverContent, PopoverTrigger } from './Popover';
import { DatePicker } from './DatePicker';

interface DatePickerInputProps {
  value?: Date;
  error?: string;
  className?: string;
  onChange?: (date: Date) => void;
}

export function DatePickerInput({
  value, error, className, onChange,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(value ?? new Date());

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    onChange?.(date);
  }

  return (
    <div>
      <PopoverRoot>
        <PopoverTrigger>
          <button
            type="button"
            className={cn(
              'w-full bg-white rounded-lg border border-gray-500 px-3 pt-4 h-[52px] text-gray-800 focus:border-gray-800 outline-none transition-all text-left relative',
              error && '!border-red-900',
              className,
            )}
          >
            <span
              className={cn(
                'absolute text-xs left-[13px] top-1.5 pointer-events-none text-gray-700 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs transition-all select-none',
                error && 'text-red-900 opacity-80',
              )}
            >
              Data
            </span>

            <span>
              {formatDate(selectedDate)}
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent className="z-20 p-4">
          <DatePicker
            value={selectedDate}
            onChange={handleChangeDate}
          />
        </PopoverContent>
      </PopoverRoot>

      {error && (
        <div className="flex gap-1.5 items-center mt-1.5 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}

DatePickerInput.defaultProps = {
  value: null,
  error: '',
  className: '',
  onChange: null,
};
