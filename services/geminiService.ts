import { GoogleGenAI, Type } from '@google/genai';
import { DesignParameters, DesignOption } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDesigns = async (params: DesignParameters): Promise<DesignOption[]> => {
  const prompt = `
    Anda adalah seorang ahli rekayasa desain generatif yang sangat canggih.
    Tugas Anda adalah menghasilkan 4 opsi desain produk yang inovatif dan optimal berdasarkan parameter yang diberikan.

    Parameter Desain:
    - Deskripsi Produk: ${params.prompt}
    - Material Pilihan Utama: ${params.material}
    - Batasan Biaya Maksimum: Rp ${params.maxCost.toLocaleString('id-ID')}
    - Tingkat Kekuatan yang Diinginkan: ${params.strength}

    Instruksi:
    1.  Hasilkan 4 opsi desain yang unik untuk "${params.prompt}".
    2.  Setiap desain harus memenuhi atau mendekati tingkat kekuatan yang diinginkan.
    3.  Perkiraan biaya setiap desain TIDAK BOLEH melebihi batasan biaya maksimum.
    4.  Anda boleh menyarankan material alternatif jika itu menghasilkan desain yang lebih baik (lebih efisien atau lebih kuat dalam batasan biaya).
    5.  Untuk setiap opsi, berikan:
        {/* FIX: Replaced nested backticks with single quotes to prevent potential parser errors. */}
        -   'designName': Nama yang kreatif dan deskriptif untuk desain tersebut.
        -   'materialUsed': Material yang digunakan.
        -   'estimatedCost': Perkiraan biaya produksi dalam Rupiah (IDR), harus berupa angka.
        -   'strengthLevel': Tingkat kekuatan (e.g., 'Sedang', 'Tinggi').
        -   'materialEfficiencyScore': Skor efisiensi material dari 1 hingga 100, di mana 100 adalah yang paling efisien (penggunaan material minimal untuk kekuatan maksimal). Harus berupa angka.
        -   'description': Deskripsi singkat (1-2 kalimat) yang menyoroti keunggulan desain tersebut.
    6.  Pastikan output Anda dalam format JSON yang valid sesuai dengan skema yang disediakan.
    `;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        designName: {
          type: Type.STRING,
          description: 'Nama yang kreatif dan deskriptif untuk desain.',
        },
        materialUsed: {
          type: Type.STRING,
          description: 'Material utama yang digunakan dalam desain ini.',
        },
        estimatedCost: {
          type: Type.NUMBER,
          description: 'Perkiraan biaya produksi dalam Rupiah (IDR).',
        },
        strengthLevel: {
          type: Type.STRING,
          description: 'Tingkat kekuatan yang dicapai oleh desain ini (e.g., Sedang, Tinggi).',
        },
        materialEfficiencyScore: {
          type: Type.NUMBER,
          description: 'Skor efisiensi penggunaan material (1-100).',
        },
        description: {
          type: Type.STRING,
          description: 'Deskripsi singkat tentang keunggulan desain.',
        },
      },
      required: [
        'designName',
        'materialUsed',
        'estimatedCost',
        'strengthLevel',
        'materialEfficiencyScore',
        'description',
      ],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const designs: DesignOption[] = JSON.parse(jsonText);
    return designs;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Gagal berkomunikasi dengan AI. Periksa konsol untuk detailnya.");
  }
};