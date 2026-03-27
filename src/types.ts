export type View = 'dashboard' | 'processor' | 'export';

export interface Project {
  id: string;
  name: string;
  status: 'processing' | 'completed' | 'ready';
  traceWidth: string;
  completion?: number;
  finishTime?: string;
  millTime?: string;
  precision?: string;
  description?: string;
}

export const PROJECTS: Project[] = [
  {
    id: '4492-AXQ',
    name: 'Project_X_Vortex_Core',
    status: 'processing',
    traceWidth: '0.12MM',
    completion: 62.4,
    finishTime: '14:22:05'
  },
  {
    id: '991-K',
    name: 'Signal_Amplifier_Mk4',
    status: 'completed',
    traceWidth: '0.15MM',
    millTime: '02:44:12',
    precision: '±0.002mm'
  },
  {
    id: '882-P',
    name: 'Neuro_Link_V1_Final',
    status: 'ready',
    traceWidth: '0.10MM',
    description: 'All trace connectivity verified. Thermal paths within nominal range.'
  }
];
