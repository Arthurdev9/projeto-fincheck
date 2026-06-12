import { Outlet } from 'react-router-dom';

import { Logo } from '@view/components/Logo';
import illustrationSrc from '../../assets/illustration.png';

export function AuthLayout() {
  return (
    <div className="flex w-full h-screen bg-gray-0 overflow-hidden">
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
        <Logo className="text-gray-500 h-6 mt-10" />

        <div className="max-w-126 mt-16 w-full p-2">
          <Outlet />
        </div>
      </div>

      <div className="hidden w-1/2 h-full lg:flex justify-center items-center p-8 relative overflow-hidden">
        <img
          src={illustrationSrc}
          className="object-cover w-full h-full max-w-164 max-h-240 select-none rounded-4xl"
          alt="Demonstração do Fincheck"
        />

        <div className="max-w-2xl bg-white p-10 absolute inset-8 top-auto rounded-b-4xl">
          <Logo className="text-teal-900 h-8" />

          <p className="text-gray-700 font-medium text-xl mt-6">
            Gerencie suas finanças pessoais de uma forma simples com o fincheck, e o melhor,
            totalmente de graça!
          </p>
        </div>
      </div>
    </div>
  );
}
