import { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useSwiper } from 'swiper/react';

interface SliderState {
  isBeginning: boolean;
  isEnd: boolean;
}

export function AccountsSliderNavigation() {
  const swiper = useSwiper();

  const [sliderState, setSliderState] = useState<SliderState>({
    isBeginning: swiper.isBeginning,
    isEnd: swiper.isEnd,
  });

  useEffect(() => {
    const handleSlideChange = () => {
      setSliderState({
        isBeginning: swiper.isBeginning,
        isEnd: swiper.isEnd,
      });
    };

    swiper.on('slideChange', handleSlideChange);
    return () => swiper.off('slideChange', handleSlideChange);
  }, [swiper]);

  return (
    <div>
      <button
        type="button"
        className="py-3 pl-2.5 pr-3 rounded-full mr-1 enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slidePrev()}
        disabled={sliderState.isBeginning}
      >
        <ChevronLeftIcon className="text-white w-6 h-6" />
      </button>

      <button
        type="button"
        className="py-3 pl-2.5 pr-3 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40"
        onClick={() => swiper.slideNext()}
        disabled={sliderState.isEnd}
      >
        <ChevronRightIcon className="text-white w-6 h-6" />
      </button>
    </div>
  );
}
