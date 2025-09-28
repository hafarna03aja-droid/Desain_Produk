import React, { useState, useEffect } from 'react';
import { AppearanceSettings } from '../types';
import { HeroIcon } from './HeroIcon';

interface AppearanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: AppearanceSettings) => void;
  initialSettings: AppearanceSettings;
  designName: string;
}

const AppearanceModal: React.FC<AppearanceModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialSettings,
  designName,
}) => {
  const [settings, setSettings] = useState<AppearanceSettings>(initialSettings);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    // Kunci unik untuk localStorage berdasarkan nama desain
    const storageKey = `appearance-settings-${designName.replace(/\s+/g, '-')}`;
    try {
      // Simpan pengaturan ke localStorage
      localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch (error) {
      console.error("Gagal menyimpan pengaturan ke localStorage:", error);
    }
    onSave(settings);
  };

  const handleInputChange = <K extends keyof AppearanceSettings>(
    key: K,
    value: AppearanceSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md m-4 border border-gray-700 transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-200">Kustomisasi Tampilan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition">
            <HeroIcon icon="fa-solid fa-xmark" className="text-xl"/>
          </button>
        </div>
        <p className="text-gray-400 mb-6">Ubah preferensi visual untuk <span className="font-bold text-blue-400">{designName}</span>.</p>

        <div className="space-y-6">
          {/* Primary Color */}
          <div className="flex items-center justify-between">
            <label htmlFor="primaryColor" className="text-sm font-medium text-gray-300">
              Warna Utama
            </label>
            <div className="relative">
              <input
                type="color"
                id="primaryColor"
                value={settings.primaryColor}
                onChange={(e) => handleInputChange('primaryColor', e.target.value)}
                className="w-24 h-8 p-1 bg-gray-700 border border-gray-600 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Lighting Scheme */}
          <div>
            <label htmlFor="lightingScheme" className="block text-sm font-medium text-gray-300 mb-1">
              Skema Pencahayaan
            </label>
            <select
              id="lightingScheme"
              value={settings.lightingScheme}
              onChange={(e) => handleInputChange('lightingScheme', e.target.value as AppearanceSettings['lightingScheme'])}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition appearance-none"
            >
              <option>Studio</option>
              <option>Alami</option>
              <option>Dramatis</option>
            </select>
          </div>

          {/* Visual Style */}
          <div>
            <label htmlFor="visualStyle" className="block text-sm font-medium text-gray-300 mb-1">
              Gaya Visual
            </label>
            <select
              id="visualStyle"
              value={settings.visualStyle}
              onChange={(e) => handleInputChange('visualStyle', e.target.value as AppearanceSettings['visualStyle'])}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition appearance-none"
            >
              <option>Fotorealistis</option>
              <option>Wireframe</option>
              <option>Cetak Biru</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Simpan Preferensi
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceModal;