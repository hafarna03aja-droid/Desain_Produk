
import React from 'react';
import { DesignParameters } from '../types';
import { HeroIcon } from './HeroIcon';

interface InputFormProps {
  parameters: DesignParameters;
  setParameters: React.Dispatch<React.SetStateAction<DesignParameters>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ parameters, setParameters, onSubmit, isLoading }) => {
  const handleInputChange = <K extends keyof DesignParameters,>(
    key: K,
    value: DesignParameters[K]
  ) => {
    setParameters((prev) => ({ ...prev, [key]: value }));
  };

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-1">
          Deskripsi Produk
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <HeroIcon icon="fa-solid fa-lightbulb" />
          </span>
          <input
            type="text"
            id="prompt"
            value={parameters.prompt}
            onChange={(e) => handleInputChange('prompt', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Contoh: rangka sepeda gunung..."
            required
          />
        </div>
      </div>
      <div>
        <label htmlFor="material" className="block text-sm font-medium text-gray-300 mb-1">
          Material Utama
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <HeroIcon icon="fa-solid fa-layer-group" />
          </span>
          <input
            type="text"
            id="material"
            value={parameters.material}
            onChange={(e) => handleInputChange('material', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Contoh: Baja, Aluminium, dll."
            list="material-options"
            required
          />
          <datalist id="material-options">
            <option value="Baja" />
            <option value="Aluminium" />
            <option value="Plastik ABS" />
            <option value="Serat Karbon" />
            <option value="Titanium" />
          </datalist>
        </div>
      </div>

      <div>
        <label htmlFor="maxCost" className="block text-sm font-medium text-gray-300 mb-1">
          Batasan Biaya: <span className="font-bold text-blue-400">{formatRupiah(parameters.maxCost)}</span>
        </label>
        <input
          type="range"
          id="maxCost"
          min="100000"
          max="20000000"
          step="100000"
          value={parameters.maxCost}
          onChange={(e) => handleInputChange('maxCost', Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg"
        />
      </div>

      <div>
        <label htmlFor="strength" className="block text-sm font-medium text-gray-300 mb-1">
          Kekuatan yang Diinginkan
        </label>
        <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <HeroIcon icon="fa-solid fa-shield-halved" />
            </span>
            <select
              id="strength"
              value={parameters.strength}
              onChange={(e) => handleInputChange('strength', e.target.value as DesignParameters['strength'])}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none transition appearance-none"
            >
              <option>Rendah</option>
              <option>Sedang</option>
              <option>Tinggi</option>
              <option>Sangat Tinggi</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
               <HeroIcon icon="fa-solid fa-chevron-down" className="h-4 w-4"/>
            </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Memproses...</span>
          </>
        ) : (
          <>
            <HeroIcon icon="fa-solid fa-microchip" />
            <span>Hasilkan Desain</span>
          </>
        )}
      </button>
    </form>
  );
};

export default InputForm;