import React, { useState, useEffect } from 'react';
import { DesignOption, AppearanceSettings } from '../types';
import DesignDetailModal from './DesignDetailModal';
import AppearanceModal from './AppearanceModal';
import { HeroIcon } from './HeroIcon';

interface DesignCardProps {
  option: DesignOption;
}

const DesignCard: React.FC<DesignCardProps> = ({ option }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAppearanceModalOpen, setIsAppearanceModalOpen] = useState(false);

  // Kunci unik untuk localStorage berdasarkan nama desain
  const storageKey = `appearance-settings-${option.designName.replace(/\s+/g, '-')}`;

  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>({
    primaryColor: '#4b5563', // default gray-600
    lightingScheme: 'Studio',
    visualStyle: 'Fotorealistis',
  });

  // Muat pengaturan dari localStorage saat komponen pertama kali dirender
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(storageKey);
      if (savedSettings) {
        setAppearanceSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Gagal memuat pengaturan dari localStorage", error);
    }
  }, [storageKey]);


  const handleSaveAppearance = (settings: AppearanceSettings) => {
    setAppearanceSettings(settings);
    setIsAppearanceModalOpen(false);
  };

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <div 
        className="bg-gray-800 border-2 rounded-lg p-5 flex flex-col justify-between hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-blue-500/20"
        style={{ borderColor: appearanceSettings.primaryColor }}
      >
        <div>
          <h3 className="text-xl font-bold text-blue-400 mb-2">{option.designName}</h3>
          <p className="text-gray-400 text-sm mb-4">{option.description}</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium flex items-center"><HeroIcon icon="fa-solid fa-layer-group" className="mr-2"/>Material</span>
              <span className="font-semibold text-gray-300">{option.materialUsed}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium flex items-center"><HeroIcon icon="fa-solid fa-shield-halved" className="mr-2"/>Kekuatan</span>
              <span className="font-semibold text-gray-300">{option.strengthLevel}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 font-medium flex items-center"><HeroIcon icon="fa-solid fa-rupiah-sign" className="mr-2"/>Biaya</span>
              <span className="font-semibold text-gray-300">{formatRupiah(option.estimatedCost)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 font-medium mb-1 flex items-center"><HeroIcon icon="fa-solid fa-cogs" className="mr-2"/>Efisiensi Material</span>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-2.5 rounded-full" style={{ width: `${option.materialEfficiencyScore}%` }}></div>
              </div>
               <span className="text-right text-xs font-bold text-gray-300 mt-1">{option.materialEfficiencyScore}%</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            onClick={() => setIsDetailModalOpen(true)}
            className="flex-1 text-center bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-md transition duration-300 text-sm"
          >
            Lihat Detail
          </button>
          <button
            onClick={() => setIsAppearanceModalOpen(true)}
            className="flex-1 text-center bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 text-sm"
          >
            Kustomisasi Tampilan
          </button>
        </div>
      </div>

      <DesignDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        option={option}
      />
      <AppearanceModal
        isOpen={isAppearanceModalOpen}
        onClose={() => setIsAppearanceModalOpen(false)}
        onSave={handleSaveAppearance}
        initialSettings={appearanceSettings}
        designName={option.designName}
      />
    </>
  );
};

export default DesignCard;