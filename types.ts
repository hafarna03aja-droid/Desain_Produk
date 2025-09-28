export interface DesignParameters {
  material: string;
  maxCost: number;
  strength: 'Rendah' | 'Sedang' | 'Tinggi' | 'Sangat Tinggi';
  prompt: string;
}

export interface DesignOption {
  designName: string;
  materialUsed: string;
  estimatedCost: number;
  strengthLevel: string;
  materialEfficiencyScore: number;
  description: string;
}

export interface AppearanceSettings {
  primaryColor: string;
  lightingScheme: 'Studio' | 'Alami' | 'Dramatis';
  visualStyle: 'Fotorealistis' | 'Wireframe' | 'Cetak Biru';
}