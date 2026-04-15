export type MasteryLevel = 'Novice' | 'Advanced' | 'Competent' | 'Proficient' | 'Expert';

export interface MasteryConfig {
  width: string;
  color: string;
}

export const MASTERY_MAP: Record<MasteryLevel, MasteryConfig> = {
  Novice: { width: '20%', color: 'var(--primary-color, #3f51b5)' },
  Advanced: { width: '40%', color: 'var(--secondary-color, #ff4081)' },
  Competent: { width: '60%', color: 'var(--info-color, #00bcd4)' },
  Proficient: { width: '80%', color: 'var(--success-color, #4caf50)' },
  Expert: { width: '100%', color: 'var(--warning-color, #ffc107)' }
};
