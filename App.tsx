
import React, { useState, useCallback } from 'react';
import { DesignParameters, DesignOption } from './types';
import { generateDesigns } from './services/geminiService';
import InputForm from './components/InputForm';
import DesignCard from './components/DesignCard';
import LoadingSpinner from './components/LoadingSpinner';
import { HeroIcon } from './components/HeroIcon';

const App: React.FC = () => {
  const [parameters, setParameters] = useState<DesignParameters>({
    material: 'Baja',
    maxCost: 5000000,
    strength: 'Sedang',
    prompt: 'sebuah rangka drone yang ringan namun kuat'
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [designOptions, setDesignOptions] = useState<DesignOption[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateDesigns = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setDesignOptions([]);
    try {
      const results = await generateDesigns(parameters);
      setDesignOptions(results);
    } catch (err) {
      setError('Gagal menghasilkan desain. Silakan coba lagi.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [parameters]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300 mb-2">
            Perangkat Lunak Desain Generatif
          </h1>
          <p className="text-lg text-gray-400">
            Masukkan parameter Anda, dan biarkan AI menciptakan solusi desain yang optimal.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <InputForm
              parameters={parameters}
              setParameters={setParameters}
              onSubmit={handleGenerateDesigns}
              isLoading={isLoading}
            />
          </div>

          <div className="lg:col-span-2 min-h-[60vh] bg-gray-800/50 p-6 rounded-xl shadow-lg border border-gray-700 flex flex-col">
            <h2 className="text-2xl font-semibold mb-4 text-gray-300 border-b border-gray-700 pb-2">Hasil Generasi Desain</h2>
            {isLoading ? (
              <div className="flex-grow flex flex-col items-center justify-center">
                <LoadingSpinner />
                <p className="mt-4 text-gray-400">AI sedang berpikir... Menghasilkan opsi desain...</p>
              </div>
            ) : error ? (
              <div className="flex-grow flex flex-col items-center justify-center text-red-400">
                <HeroIcon icon="fa-solid fa-triangle-exclamation" className="text-4xl mb-4" />
                <p>{error}</p>
              </div>
            ) : designOptions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
                {designOptions.map((option, index) => (
                  <DesignCard key={index} option={option} />
                ))}
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-gray-500">
                <HeroIcon icon="fa-solid fa-cubes" className="text-5xl mb-4" />
                <p className="text-center">Opsi desain yang dihasilkan akan muncul di sini.</p>
                <p className="text-sm text-center">Isi formulir dan klik "Hasilkan Desain" untuk memulai.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
