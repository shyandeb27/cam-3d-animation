export type SceneState = 'camera' | 'transitioning' | 'board';

export interface ScamReport {
  id: string;
  title: string;
  category: 'AI Deepfake' | 'Crypto Fraud' | 'Phishing' | 'Fake Job' | 'Smishing' | 'Investment' | 'Marketplace';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  reportedDate: string;
  lossAmount?: string;
  summary: string;
  indicators: string[];
  evidenceText: string;
  sourceTarget: string;
  verified: boolean;
  status: 'INVESTIGATING' | 'CONFIRMED' | 'NEUTRALIZED';
  takedownStatus?: string;
  reportedBy?: string;
}

export interface StickyNoteData {
  id: string;
  title: string;
  categoryTag?: string;
  color: 'yellow' | 'cyan' | 'red' | 'emerald' | 'charcoal';
  rotation: number;
  pinType: 'red-pin' | 'blue-pin' | 'tape-top' | 'tape-corners' | 'none';
  pinPosition?: { x: number; y: number };
  pinConnectId?: string;
}
