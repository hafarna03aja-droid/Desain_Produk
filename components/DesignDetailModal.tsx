
import React from 'react';
import { DesignOption } from '../types';
import { HeroIcon } from './HeroIcon';

interface DesignDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  option: DesignOption;
}

const DesignDetailModal: React.FC<DesignDetailModalProps> = ({ isOpen, onClose, option }) => {
  if (!isOpen) {
    return null;
  }

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg m-4 border border-gray-700 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-blue-400">{option.designName}</h2>
            <p className="text-gray-400 mt-1">{option.description}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition ml-4">
             <HeroIcon icon="fa-solid fa-xmark" className="text-xl"/>
          </button>
        </div>

        <div className="border-t border-gray-700 my-4"></div>

        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 p-3 bg-gray-900/50 rounded-lg">
                <span className="font-semibold text-gray-400 flex items-center"><HeroIcon icon="fa-solid fa-layer-group" className="mr-2 w-5 text-center"/>Material Digunakan</span>
                <span className="text-gray-200">{option.materialUsed}</span>
            </div>
             <div className="grid grid-cols-2 gap-4 p-3 bg-gray-900/50 rounded-lg">
                <span className="font-semibold text-gray-400 flex items-center"><HeroIcon icon="fa-solid fa-shield-halved" className="mr-2 w-5 text-center"/>Tingkat Kekuatan</span>
                <span className="text-gray-200">{option.strengthLevel}</span>
            </div>
             <div className="grid grid-cols-2 gap-4 p-3 bg-gray-900/50 rounded-lg">
                <span className="font-semibold text-gray-400 flex items-center"><HeroIcon icon="fa-solid fa-rupiah-sign" className="mr-2 w-5 text-center"/>Perkiraan Biaya</span>
                <span className="text-gray-200 font-mono">{formatRupiah(option.estimatedCost)}</span>
            </div>
             <div className="grid grid-cols-2 gap-4 p-3 bg-gray-900/50 rounded-lg items-center">
                <span className="font-semibold text-gray-400 flex items-center"><HeroIcon icon="fa-solid fa-cogs" className="mr-2 w-5 text-center"/>Skor Efisiensi Material</span>
                <div>
                     <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-2.5 rounded-full" style={{ width: `${option.materialEfficiencyScore}%` }}></div>
                     </div>
                     <span className="text-right text-xs font-bold text-gray-300 mt-1 block">{option.materialEfficiencyScore}%</span>
                </div>
            </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignDetailModal;
