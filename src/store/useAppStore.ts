import { create } from 'zustand';
import { SceneState, ScamReport } from '@/types';

interface AppState {
  scene: SceneState;
  openProgress: number; // 0 to 1
  isTransitioning: boolean;
  cursorNormalized: { x: number; y: number };
  isMuted: boolean;
  activeModal: ScamReport | null;
  scamReports: ScamReport[];
  scamCounter: number;
  threatScore: number;
  searchFilter: string;
  categoryFilter: string;

  // Actions
  setScene: (scene: SceneState) => void;
  setOpenProgress: (val: number | ((prev: number) => number)) => void;
  setCursorNormalized: (pos: { x: number; y: number }) => void;
  toggleMute: () => void;
  triggerFlyThrough: () => void;
  setActiveModal: (report: ScamReport | null) => void;
  addScamReport: (report: Omit<ScamReport, 'id' | 'reportedDate' | 'status' | 'verified'>) => void;
  setSearchFilter: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  resetToCamera: () => void;
}

export const INITIAL_SCAMS: ScamReport[] = [
  {
    id: 'CASE-9821',
    title: 'AI CEO Voice Clone Emergency Wire Scam',
    category: 'AI Deepfake',
    severity: 'CRITICAL',
    reportedDate: '2 hours ago',
    lossAmount: '$180,000 Prevented',
    summary: 'Attacker used an ultra-realistic 3-second audio sample of the CFO to call accounting demanding an urgent acquisition wire transfer.',
    indicators: ['Synthesized acoustic resonance', 'Zero background room tone', 'Urgent wire to offshore IBAN'],
    evidenceText: 'Voice synthesis algorithm: VALL-E clone derivative. Source number spoofed via VoIP gateway in Eastern Europe.',
    sourceTarget: '+1 (415) 892-XXXX',
    verified: true,
    status: 'NEUTRALIZED',
    takedownStatus: 'VoIP gateway blacklisted; telecom carrier notified.',
    reportedBy: 'CorpSec Watch'
  },
  {
    id: 'CASE-9818',
    title: 'Phantom Liquidity Pool Crypto Drainer',
    category: 'Crypto Fraud',
    severity: 'CRITICAL',
    reportedDate: '5 hours ago',
    lossAmount: '$1.4M Tracked',
    summary: 'Malicious smart contract offering 420% APY on fake DEX. Interacting with the "Claim Airdrop" function executes `permit2` batch wallet drain.',
    indicators: ['Decompiled contract backdoor', 'Hidden delegateCall() function', 'Obfuscated Uniswap v3 proxy'],
    evidenceText: 'Contract 0x71cA...89F2 drains all ERC-20 approvals instantly. Monitored 42 victim transactions.',
    sourceTarget: 'claim-hyperliquid-airdrop[.]vip',
    verified: true,
    status: 'CONFIRMED',
    takedownStatus: 'Domain seized by registrar; contract flagged on Etherscan.',
    reportedBy: 'ChainGuard Intel'
  },
  {
    id: 'CASE-9814',
    title: 'USPS/FedEx Smishing "Unpaid $2.30 Customs Fee"',
    category: 'Smishing',
    severity: 'HIGH',
    reportedDate: 'Today, 11:20 AM',
    lossAmount: '$45,000 Avg Pool',
    summary: 'Mass SMS blast targeting millions: "Your parcel is on hold due to missing address number. Pay $2.30 to re-route." Harvests full credit card + CVV.',
    indicators: ['Shortcode masking', 'Cloudflare worker reverse proxy', 'Live OTP interception panel'],
    evidenceText: 'SMS originated from SIM-box farm. Phishing kit uses real-time Telegram bot exfiltration for 2FA bypass.',
    sourceTarget: 'usps-track-parcel-verify[.]top',
    verified: true,
    status: 'INVESTIGATING',
    takedownStatus: '5 upstream phishing hosts suspended.',
    reportedBy: 'Citizen Sentinel'
  },
  {
    id: 'CASE-9809',
    title: 'Ghost Remote Tech Job & Check Overpayment',
    category: 'Fake Job',
    severity: 'MEDIUM',
    reportedDate: 'Yesterday',
    lossAmount: '$4,800 Avg / victim',
    summary: 'Victim offered $95/hr remote QA role via Telegram text interview. Sent a fraudulent cashier check for $4,800 to buy home office gear from "authorized vendor".',
    indicators: ['Telegram text-only interview', 'Cashier check routing mismatch', 'Vendor payment via Zelle/Wire'],
    evidenceText: 'Counterfeit check drawn on defunct credit union. Zelle recipient trace points to money mule network in Texas.',
    sourceTarget: 'hr-careers@nexus-technologies-global[.]com',
    verified: true,
    status: 'CONFIRMED',
    takedownStatus: 'Zelle accounts frozen by bank fraud division.',
    reportedBy: 'JobScam Alert Taskforce'
  },
  {
    id: 'CASE-9805',
    title: 'Grandparent Distress Emergency Deepfake Call',
    category: 'AI Deepfake',
    severity: 'CRITICAL',
    reportedDate: '2 days ago',
    lossAmount: '$9,500 Extorted',
    summary: 'Elderly couple received a frantic call from their "grandson" crying in jail after a car crash, followed by a fake public defender demanding bail cash.',
    indicators: ['Emotional distress coercion', 'Scraped TikTok/Instagram audio', 'Courier pickup demand for cash'],
    evidenceText: 'Voice pitch matched grandson Instagram reel. Courier intercepted by local police taskforce.',
    sourceTarget: '+1 (702) 551-XXXX',
    verified: true,
    status: 'NEUTRALIZED',
    takedownStatus: 'Physical courier apprehended; scam syndicate under federal indictment.',
    reportedBy: 'Elder Shield Alliance'
  },
  {
    id: 'CASE-9799',
    title: 'Deepfake Elon Musk YouTube Live Crypto Doubler',
    category: 'Crypto Fraud',
    severity: 'HIGH',
    reportedDate: '3 days ago',
    lossAmount: '$320,000 Stolen',
    summary: 'Hacked verified YouTube channel streaming looped AI deepfake of tech conference claiming to double any BTC/ETH sent to QR code.',
    indicators: ['Hijacked channel token', 'Lip-sync deepfake artifacts', 'Fake real-time transaction ticker'],
    evidenceText: 'Over 14,000 concurrent bot viewers to artificially push stream to YouTube homepage recommendation algorithms.',
    sourceTarget: 'youtube.com/@tech-updates-live-official',
    verified: true,
    status: 'NEUTRALIZED',
    takedownStatus: 'Channel terminated by YouTube trust & safety team within 40 minutes.',
    reportedBy: 'CyberRadar'
  }
];

export const useAppStore = create<AppState>((set, get) => ({
  scene: 'camera',
  openProgress: 0,
  isTransitioning: false,
  cursorNormalized: { x: 0, y: 0 },
  isMuted: false,
  activeModal: null,
  scamReports: INITIAL_SCAMS,
  scamCounter: 184920,
  threatScore: 89,
  searchFilter: '',
  categoryFilter: 'ALL',

  setScene: (scene) => set({ scene }),
  
  setOpenProgress: (val) => {
    if (typeof val === 'function') {
      set((state) => {
        const next = Math.max(0, Math.min(1, val(state.openProgress)));
        return { openProgress: next };
      });
    } else {
      set({ openProgress: Math.max(0, Math.min(1, val)) });
    }
  },

  setCursorNormalized: (pos) => set({ cursorNormalized: pos }),
  
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  triggerFlyThrough: () => {
    const { isTransitioning, scene } = get();
    if (isTransitioning || scene === 'board') return;
    
    set({ isTransitioning: true, openProgress: 1 });
    
    setTimeout(() => {
      set({ scene: 'transitioning' });
    }, 400);

    setTimeout(() => {
      set({ scene: 'board', isTransitioning: false });
    }, 1300);
  },

  setActiveModal: (report) => set({ activeModal: report }),

  addScamReport: (newReport) => {
    const id = `CASE-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullReport: ScamReport = {
      ...newReport,
      id,
      reportedDate: 'Just now',
      verified: true,
      status: 'INVESTIGATING',
    };
    set((state) => ({
      scamReports: [fullReport, ...state.scamReports],
      scamCounter: state.scamCounter + 1,
    }));
  },

  setSearchFilter: (searchFilter) => set({ searchFilter }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),

  resetToCamera: () => {
    set({
      scene: 'camera',
      openProgress: 0,
      isTransitioning: false,
    });
  }
}));
