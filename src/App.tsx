import { useState, useEffect } from 'react';
import { 
  Settings, 
  Cpu, 
  User, 
  FolderOpen, 
  Layers, 
  Sliders, 
  History, 
  Plus, 
  Activity, 
  Terminal as TerminalIcon,
  Search,
  ChevronRight,
  CheckCircle2,
  Download,
  FolderArchive,
  Rocket,
  ArrowRight,
  Zap,
  FileText,
  Code,
  Box,
  Clock,
  Maximize2,
  Minimize2,
  Crosshair
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { View, Project, PROJECTS } from './types';

// --- Components ---

const TopNavBar = ({ currentView, setView }: { currentView: View, setView: (v: View) => void }) => (
  <nav className="fixed top-0 w-full z-50 bg-[#121413] flex justify-between items-center h-14 px-6 border-b border-outline-variant/10">
    <div className="flex items-center gap-8">
      <div className="text-xl font-headline font-bold tracking-tighter text-primary uppercase cursor-pointer" onClick={() => setView('dashboard')}>
        LASER_OS
      </div>
      <div className="hidden md:flex gap-8 items-center h-full">
        {(['dashboard', 'processor', 'export'] as View[]).map((view) => (
          <button
            key={view}
            onClick={() => setView(view)}
            className={cn(
              "font-headline tracking-tighter uppercase text-xs transition-colors duration-150 pb-1",
              currentView === view 
                ? "text-primary border-b-2 border-primary" 
                : "text-outline hover:text-primary"
            )}
          >
            {view}
          </button>
        ))}
        <button className="font-headline tracking-tighter uppercase text-xs text-outline hover:text-primary transition-colors duration-150">
          Docs
        </button>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="relative hidden lg:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-3.5 h-3.5" />
        <input 
          className="bg-surface-container-highest border-b border-outline-variant/20 text-[10px] font-mono px-10 py-2 w-64 focus:outline-none focus:border-primary transition-colors uppercase" 
          placeholder="SEARCH_SYSTEM..." 
        />
      </div>
      <div className="flex items-center gap-4 text-outline">
        <Settings className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
        <Cpu className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
        <User className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
      </div>
    </div>
  </nav>
);

const SideNavBar = ({ currentView }: { currentView: View }) => (
  <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-[#121413] flex flex-col py-4 border-r border-outline-variant/10 hidden md:flex">
    <div className="px-6 mb-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 bg-surface-container-highest flex items-center justify-center border border-outline-variant/10">
          <Box className="text-primary w-4 h-4" />
        </div>
        <div>
          <div className="font-headline font-bold text-primary text-sm uppercase leading-none">PROJECT_ALPHA</div>
          <div className="text-[10px] text-outline font-mono uppercase mt-1">v1.0.4-STABLE</div>
        </div>
      </div>
    </div>
    <nav className="flex-1 flex flex-col gap-1">
      <button className="flex items-center gap-3 px-6 py-3 text-outline hover:bg-[#1a1c1b] hover:text-primary transition-all font-body text-[13px] font-medium">
        <FolderOpen className="w-4 h-4" />
        Active Projects
      </button>
      <button className={cn(
        "flex items-center gap-3 px-6 py-3 transition-all font-body text-[13px] font-medium",
        currentView === 'processor' ? "bg-[#242625] text-primary border-l-2 border-secondary" : "text-outline hover:bg-[#1a1c1b] hover:text-primary"
      )}>
        <Layers className="w-4 h-4" />
        Layer Stack
      </button>
      <button className="flex items-center gap-3 px-6 py-3 text-outline hover:bg-[#1a1c1b] hover:text-primary transition-all font-body text-[13px] font-medium">
        <Sliders className="w-4 h-4" />
        Parameter Sets
      </button>
      <button className={cn(
        "flex items-center gap-3 px-6 py-3 transition-all font-body text-[13px] font-medium",
        currentView === 'export' ? "bg-[#242625] text-primary border-l-2 border-secondary" : "text-outline hover:bg-[#1a1c1b] hover:text-primary"
      )}>
        <History className="w-4 h-4" />
        Job History
      </button>
    </nav>
    <div className="px-6 my-4">
      <button className="w-full bg-primary text-on-primary py-2 px-4 font-headline text-xs font-bold tracking-widest hover:bg-primary-fixed transition-colors uppercase">
        NEW_CIRCUIT
      </button>
    </div>
    <div className="mt-auto border-t border-outline-variant/10 pt-4 flex flex-col gap-1">
      <button className="flex items-center gap-3 px-6 py-2 text-outline hover:text-primary transition-all text-[12px] uppercase tracking-widest">
        <Activity className="w-4 h-4" />
        System Health
      </button>
      <button className="flex items-center gap-3 px-6 py-2 text-outline hover:text-primary transition-all text-[12px] uppercase tracking-widest">
        <TerminalIcon className="w-4 h-4" />
        Terminal
      </button>
    </div>
  </aside>
);

const Footer = () => (
  <footer className="fixed bottom-0 left-0 w-full z-50 bg-[#0d0f0e] flex justify-between items-center px-6 py-3 border-t border-outline-variant/5">
    <div className="font-mono text-[10px] uppercase tracking-widest text-[#474847]">
      ©2024 PRECISION_FAB_SYSTEMS // CORE_VER_2.1
    </div>
    <div className="flex gap-6">
      {['Privacy', 'Terms', 'API_Status', 'Support'].map((item) => (
        <a key={item} href="#" className="font-mono text-[10px] uppercase tracking-widest text-[#474847] hover:text-secondary transition-colors">
          {item}
        </a>
      ))}
    </div>
  </footer>
);

// --- Views ---

const DashboardView = () => (
  <div className="space-y-10">
    <section className="relative h-[600px] flex items-center overflow-hidden bg-surface -mx-8 -mt-8">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-40 mix-blend-luminosity" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt5t1G8qLItAKdwOWr-HIn2DIQA23XQSd_wdUvpcWMgB2dMpumDTVyoRr4QOEXrfvZkZn1K2hyBLs7gVQPOiq3uBiv1dGaVTZDswwWIJNSnqTydy23yv6YWGTqOK1SgxSkAwhTR85bnUPE-f_H1PJWKH-jKo814VMXgpn80sbjMwBmEoM9cERWE6zLTLkkqHQTcFXH4cI_2qUk1TiKa4iplKhd1ZseMuBThLqq4O3_P3SnrUn3yxX-1M_wig5Bnr2XzIxF9jm3tmg" 
          alt="Laser Fabrication"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <span className="w-2 h-2 bg-primary"></span>
            <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">System_Status: Operational</span>
          </div>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-6 uppercase">
            ULTRA_PRECISION<br />
            <span className="text-primary">FIBER_FABRICATION</span>
          </h1>
          <p className="text-on-surface-variant max-w-md mb-10 leading-relaxed">
            Deploying next-generation fiber laser systems for PCB milling and micro-vias. 15µm trace precision with zero thermal deformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-primary text-on-primary font-headline font-bold px-8 py-4 uppercase tracking-tighter hover:bg-primary-fixed transition-all active:scale-95">
              NEW_CIRCUIT
            </button>
            <button className="border border-outline-variant/30 text-primary font-headline font-bold px-8 py-4 uppercase tracking-tighter hover:bg-surface-container-high transition-all">
              VIEW_CAPABILITIES
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="glass-panel border-l-4 border-secondary p-8 space-y-6">
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Laser_Wavelength', value: '1064nm' },
                { label: 'Positioning_Acc', value: '±0.002mm' },
                { label: 'Trace_Width_Min', value: '15µm' },
                { label: 'Cycle_Time_Redux', value: '64%', color: 'text-secondary' }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-[10px] text-outline font-mono mb-1 uppercase">{stat.label}</div>
                  <div className={cn("text-2xl font-mono text-on-surface", stat.color)}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: 'Queue_Load', value: '84%', progress: 84, color: 'border-primary' },
        { label: 'Active_Emitters', value: '12/16', indicators: [1, 1, 1, 0, -1], color: 'border-secondary' },
        { label: 'Total_Throughput', value: '4.2k', sub: 'cm²/h', color: 'border-tertiary' },
        { label: 'Uptime_Pulse', value: '99.98%', color: 'border-outline' }
      ].map((metric) => (
        <div key={metric.label} className={cn("bg-surface-container-low p-5 border-l-2", metric.color)}>
          <div className="text-[10px] text-outline font-mono uppercase mb-1">{metric.label}</div>
          <div className="text-3xl font-headline font-bold text-on-surface">
            {metric.value} {metric.sub && <span className="text-sm font-normal text-outline">{metric.sub}</span>}
          </div>
          {metric.progress !== undefined && (
            <div className="w-full bg-surface-container-highest h-1 mt-3">
              <div className="bg-primary h-full" style={{ width: `${metric.progress}%` }}></div>
            </div>
          )}
          {metric.indicators && (
            <div className="flex gap-1 mt-3">
              {metric.indicators.map((v, i) => (
                <div key={i} className={cn(
                  "w-2 h-2",
                  v === 1 ? "bg-primary" : v === 0 ? "bg-secondary" : "bg-surface-container-highest"
                )}></div>
              ))}
            </div>
          )}
        </div>
      ))}
    </section>

    <section className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-8 bg-surface-container-low p-1 group">
        <div className="bg-surface p-6 flex flex-col md:flex-row gap-6">
          <div className="w-48 h-32 bg-surface-container-highest relative overflow-hidden">
            <img 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-100 transition-opacity" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRP6nzcjw_cYI0YSKKhB6yt2Za5IHxUOr5pSeABGQPcW2-0QoxXz9QhFiOEaug2nr9QQkrytG7nUy6IsGRg4OGnffQCorY9c44b6mJxQmncBF2BftDaSCYmKJ_E7B_y4rs7dtsGJHlQTT1vn0Lg_76xfKJoVfx096wWG5bVH4I1SNoYSf5-JWzAbzTAmI6P7J0sMgSU-k_aTeenY4CZQGUTcuZDfXvtmC5quQyRKCDbN8_h8uXnkCSEUeCqbYTHS6x2gKmP8gRlig" 
              alt="PCB"
            />
            <div className="absolute inset-0 bg-primary/10 pointer-events-none"></div>
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-surface-container-lowest border border-primary/40 text-[9px] font-mono text-primary">SCAN_ACTIVE</div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-headline text-lg font-bold uppercase tracking-tight text-on-surface">Project_X_Vortex_Core</h3>
                <p className="text-xs font-mono text-outline">ID: 4492-AXQ // TRACE_WIDTH: 0.12MM</p>
              </div>
              <span className="px-3 py-1 bg-primary/10 text-primary font-headline font-bold text-[10px] uppercase border border-primary/20 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span>
                Processing
              </span>
            </div>
            <div className="mt-4 flex items-center gap-8">
              <div>
                <div className="text-[9px] text-outline font-mono uppercase">Completion</div>
                <div className="font-mono text-sm">62.4%</div>
              </div>
              <div>
                <div className="text-[9px] text-outline font-mono uppercase">Est. Finish</div>
                <div className="font-mono text-sm">14:22:05</div>
              </div>
              <div className="flex-1">
                <div className="w-full bg-surface-container-highest h-2 mt-1">
                  <div className="bg-primary h-full w-[62%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4 bg-surface-container-highest p-6 border border-outline-variant/10 flex flex-col justify-between">
        <div>
          <h4 className="font-headline font-bold text-on-surface uppercase mb-4">Export_Ready_Assets</h4>
          <ul className="space-y-3">
            {[
              'DRV_339_CONTROL.GBR',
              'PWR_GRID_LAYER_01.GBR'
            ].map((file) => (
              <li key={file} className="flex items-center justify-between text-xs font-mono">
                <span className="text-on-surface-variant flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  {file}
                </span>
                <span className="text-primary hover:underline cursor-pointer">EXPORT</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="w-full mt-6 py-2 border border-outline-variant/30 text-xs font-headline font-bold uppercase hover:bg-surface-container-high transition-colors text-outline-variant">
          VIEW_ALL_EXPORTS
        </button>
      </div>
    </section>
  </div>
);

const ProcessorView = () => {
  const [power, setPower] = useState(85);
  const [speed, setSpeed] = useState(1200);
  const [frequency, setFrequency] = useState(35.5);

  return (
    <div className="flex h-[calc(100vh-7rem)] -mx-8 -mt-8">
      <section className="flex-1 relative bg-surface-container-lowest overflow-hidden flex flex-col">
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-4">
          <div className="bg-surface-container-high/80 backdrop-blur-md p-1 border border-outline-variant/20 flex flex-col">
            <button className="p-2 hover:bg-surface-bright text-on-surface-variant hover:text-primary transition-colors"><Maximize2 className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-surface-bright text-on-surface-variant hover:text-primary transition-colors"><Minimize2 className="w-4 h-4" /></button>
            <button className="p-2 hover:bg-surface-bright text-on-surface-variant hover:text-primary transition-colors"><Crosshair className="w-4 h-4" /></button>
          </div>
          <div className="bg-surface-container-high/80 backdrop-blur-md p-2 border border-outline-variant/20 flex flex-col gap-2 w-28">
            <p className="text-[9px] font-bold text-outline uppercase px-1 mb-1">Layers</p>
            <div className="flex flex-col gap-1">
              {[
                { id: 'top', label: 'TOP', color: 'bg-primary' },
                { id: 'bottom', label: 'BOTTOM', color: 'bg-secondary' },
                { id: 'silk', label: 'SILK', color: 'bg-on-surface' },
                { id: 'mask', label: 'MASK', color: 'bg-tertiary' }
              ].map((layer) => (
                <div key={layer.id} className="relative">
                  <input defaultChecked className="hidden peer" id={`layer-${layer.id}`} type="checkbox" />
                  <label 
                    className="flex items-center justify-between px-2 py-1 text-[9px] font-mono border border-outline-variant/30 text-outline cursor-pointer hover:border-primary/50 transition-all peer-checked:text-primary peer-checked:border-primary peer-checked:bg-primary/10" 
                    htmlFor={`layer-${layer.id}`}
                  >
                    <span>{layer.label}</span>
                    <span className={cn("w-1.5 h-1.5 rounded-full", layer.color)}></span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 laser-grid relative flex items-center justify-center p-12">
          <div className="w-full h-full max-w-4xl max-h-[600px] bg-[#1a1c1b] border border-outline-variant/30 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-60">
              <img 
                className="absolute inset-0 w-full h-full object-contain mix-blend-screen" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClHYziosHb9BKmUeD8YoiMberaGCzyINLID6aZ5mEtwKEzw39M9pR5_Ut3IFlYkDRuZOQubZ1K7LQEo4GVoJo7EurWfm-gyrxu_3eYDxy0a_E5x3nK-NqlKxrIbi5gcl8sohQcXFEp8k5O15WlYfPtqSwI0ZyTpTje40qxDHXyE0Vioibg4u4oDB6MxSNc-n0-vDNWhfD8rc4WknVvauOuDX2g5WId-o8QG_DdcN8E0sQaukcsndJ1vmQYe3O-1J_ScHGxh_7eWX0" 
                alt="PCB Layer"
              />
            </div>
            <div className="absolute inset-0 w-full h-[2px] bg-primary/20 shadow-[0_0_15px_#9cff93] animate-[scanline_4s_linear_infinite] z-10"></div>
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="w-full h-full" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(156, 255, 147, 0.1) 20px, rgba(156, 255, 147, 0.1) 21px)' }}></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
              <div className="w-px h-16 bg-gradient-to-t from-primary to-transparent"></div>
              <div className="w-6 h-6 border border-primary/50 rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-primary shadow-[0_0_10px_#9cff93]"></div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 bg-surface-container-lowest/80 backdrop-blur-xl p-4 border border-outline-variant/20 font-mono text-[10px] space-y-1 min-w-[180px] z-20">
            <div className="flex justify-between text-on-surface-variant"><span>X_COORD</span><span className="text-primary font-bold">+142.084 mm</span></div>
            <div className="flex justify-between text-on-surface-variant"><span>Y_COORD</span><span className="text-primary font-bold">-034.912 mm</span></div>
            <div className="flex justify-between text-on-surface-variant"><span>Z_FOCUS</span><span className="text-secondary font-bold">002.500 mm</span></div>
            <div className="pt-2 border-t border-outline-variant/20 mt-2">
              <div className="flex justify-between text-on-surface-variant"><span>STATUS</span><span className="text-primary animate-pulse">SYSTEM_ACTIVE</span></div>
            </div>
          </div>
        </div>

        <div className="h-40 bg-black/90 border-t border-outline-variant/30 flex flex-col z-30">
          <div className="px-4 py-2 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-high/40">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface-variant">System_Console</span>
            </div>
            <div className="flex gap-4">
              <span className="text-[9px] font-mono text-outline uppercase">Baud: 115200</span>
              <span className="text-[9px] font-mono text-primary uppercase">Connected</span>
            </div>
          </div>
          <div className="flex-1 p-4 font-mono text-[10px] overflow-y-auto custom-scrollbar space-y-1">
            <p className="text-outline-variant">[09:42:01] LASER_OS Kernel v2.1 initialized.</p>
            <p className="text-outline-variant">[09:42:02] Loading Gweike_G2_Pro device profiles...</p>
            <p className="text-primary">[09:42:03] Device handshake successful. READY.</p>
            <p className="text-outline-variant">[09:44:15] Parsing Gerber_Top.gbr...</p>
            <p className="text-outline-variant">[09:44:16] Found 14,282 vector entities.</p>
            <p className="text-secondary">[09:44:17] WARNING: Scan speed exceeds 1200mm/s. Check jitter tolerance.</p>
            <p className="text-primary font-bold">[09:45:00] Simulation stream active.</p>
          </div>
        </div>
      </section>

      <aside className="w-96 bg-surface-container-low border-l border-outline-variant/10 flex flex-col h-full">
        <div className="p-6 border-b border-outline-variant/10">
          <h3 className="font-headline font-bold text-sm tracking-widest uppercase text-on-surface">Configuration_Matrix</h3>
          <p className="text-[10px] text-on-surface-variant mt-1">FIBER_LASER_PULSE_GEN_v2</p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[11px] font-headline font-bold uppercase tracking-wider text-on-surface-variant">Laser Power</label>
              <span className="font-mono text-primary text-lg">{power.toFixed(1)}<span className="text-xs opacity-50 ml-1">%</span></span>
            </div>
            <input 
              className="w-full accent-primary h-0.5 bg-surface-container-highest appearance-none cursor-pointer" 
              type="range" 
              min="0" 
              max="100" 
              value={power} 
              onChange={(e) => setPower(Number(e.target.value))} 
            />
            <div className="flex justify-between text-[9px] font-mono text-outline uppercase">
              <span>Min_10w</span>
              <span>Max_50w</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[11px] font-headline font-bold uppercase tracking-wider text-on-surface-variant">Marking Speed</label>
              <span className="font-mono text-primary text-lg">{speed}<span className="text-xs opacity-50 ml-1">mm/s</span></span>
            </div>
            <input 
              className="w-full accent-primary h-0.5 bg-surface-container-highest appearance-none cursor-pointer" 
              type="range" 
              min="100" 
              max="5000" 
              value={speed} 
              onChange={(e) => setSpeed(Number(e.target.value))} 
            />
            <div className="flex justify-between text-[9px] font-mono text-outline uppercase">
              <span>Precision</span>
              <span>Rapid</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-[11px] font-headline font-bold uppercase tracking-wider text-on-surface-variant">Pulse Frequency</label>
              <span className="font-mono text-primary text-lg">{frequency.toFixed(1)}<span className="text-xs opacity-50 ml-1">kHz</span></span>
            </div>
            <input 
              className="w-full accent-primary h-0.5 bg-surface-container-highest appearance-none cursor-pointer" 
              type="range" 
              min="20" 
              max="80" 
              step="0.1"
              value={frequency} 
              onChange={(e) => setFrequency(Number(e.target.value))} 
            />
          </div>

          <div className="bg-surface-container-highest p-4 border border-outline-variant/20 space-y-3">
            <h4 className="text-[10px] font-headline font-bold text-secondary uppercase tracking-tighter">Engine_Forecast</h4>
            <div className="space-y-2">
              {[
                { label: 'Est. Job Time', value: '12m 15s' },
                { label: 'Heat Density', value: 'Critical', color: 'text-error' },
                { label: 'Total Toolpaths', value: '14,282' }
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-[11px] text-on-surface-variant">{item.label}</span>
                  <span className={cn("font-mono font-bold", item.color || "text-on-surface")}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 bg-surface-container border-t border-outline-variant/10 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 border border-outline-variant py-3 text-[10px] font-headline font-bold tracking-widest uppercase hover:bg-surface-container-highest transition-all">
              <Download className="w-3.5 h-3.5" /> SVG
            </button>
            <button className="flex items-center justify-center gap-2 border border-outline-variant py-3 text-[10px] font-headline font-bold tracking-widest uppercase hover:bg-surface-container-highest transition-all">
              <Code className="w-3.5 h-3.5" /> GCODE
            </button>
          </div>
          <button className="w-full bg-primary text-on-primary py-4 text-[11px] font-headline font-bold tracking-widest uppercase hover:bg-primary-fixed shadow-[0_0_20px_rgba(156,255,147,0.15)] transition-all">
            Start Laser Job
          </button>
        </div>
      </aside>
    </div>
  );
};

const ExportView = () => (
  <div className="max-w-6xl mx-auto space-y-10">
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <span className="text-secondary font-headline text-[10px] tracking-[0.3em] uppercase">Stage 04 // Deployment</span>
        <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mt-2 uppercase">EXPORT_SUMMARY</h1>
      </div>
      <div className="flex gap-4 items-stretch">
        <div className="bg-surface-container-high px-4 py-2 border-l-2 border-outline-variant/30">
          <p className="text-[10px] text-outline uppercase tracking-widest mb-1">Target Profile</p>
          <div className="flex items-center gap-2">
            <Cpu className="text-primary w-3.5 h-3.5" />
            <span className="text-on-surface font-headline text-xs font-bold uppercase tracking-wider">Gweike G2 Pro 30W</span>
          </div>
        </div>
        <div className="bg-surface-container-high px-4 py-2 border-l-2 border-primary">
          <p className="text-[10px] text-outline uppercase tracking-widest mb-1">Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary animate-pulse"></div>
            <span className="text-primary font-headline text-xs font-bold uppercase tracking-wider">Ready for Fabrication</span>
          </div>
        </div>
      </div>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <section className="lg:col-span-8 bg-surface-container-low p-1 relative min-h-[400px]">
        <div className="absolute top-4 left-4 z-10 bg-surface/80 backdrop-blur-md px-3 py-1 border border-outline-variant/20">
          <span className="text-[10px] text-on-surface-variant font-headline uppercase tracking-widest">Preview: Layer_Stack_Composite</span>
        </div>
        <div className="w-full h-full bg-surface-container-lowest flex items-center justify-center relative overflow-hidden">
          <img 
            className="w-full h-full object-cover opacity-40 mix-blend-screen" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFCt31qe57cCL9z2iuELFGM-Rj7bQ8cSS2OaDTXGoHB6XgMgRySrkDmMav7NZm39COkKZGVgg0cmZyI3c52mhQRUIFzq3ey-VrErpZcPZchPuENcMN-GlDoWxBtXx1kYGqsxyS0mOfS34dvzTf-Vm6eB9fU4OzIVYGvDjLMnqltwctWY9hl7vnUhgAIpnNB4EnWnpkT7YnIIq5V-OmgKusqnPVYWQvP2C-yCx3fbYCTwT8xKwP0yfp-UezCP1WU8b4zZmiYJpZKQ0" 
            alt="PCB Preview"
          />
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(#9cff93 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1">
            <div className="bg-surface-container-highest/90 border border-outline-variant/20 p-3 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                {[
                  { label: 'X_Coordinate', value: '144.022 mm' },
                  { label: 'Y_Coordinate', value: '89.410 mm' },
                  { label: 'Trace_Width', value: '0.125 mm' }
                ].map((item) => (
                  <div key={item.label} className="contents">
                    <span className="text-[9px] text-outline uppercase">{item.label}</span>
                    <span className="text-[9px] text-primary font-mono text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:col-span-4 flex flex-col gap-6">
        {[
          { label: 'Est_Cycle_Time', value: '04:12:45', sub: '+12s Calibration Overhead', icon: Clock },
          { label: 'Processing_Layers', value: '06', sub: 'FR4 / Double Sided / Mask', icon: Layers },
          { label: 'Total_Laser_Path', value: '248.62', unit: 'Meters', sub: 'Vector Optimization: 98.4%', icon: Activity, color: 'text-secondary' }
        ].map((metric) => (
          <div key={metric.label} className="bg-surface-container-high p-6 flex flex-col justify-between min-h-[140px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-outline uppercase tracking-[0.2em]">{metric.label}</span>
              <metric.icon className="text-outline w-4 h-4" />
            </div>
            <div>
              <span className={cn("text-4xl font-headline font-medium font-mono tracking-tighter", metric.color)}>
                {metric.value}
              </span>
              {metric.unit && <span className={cn("text-xs ml-1", metric.color)}>{metric.unit}</span>}
              <p className="text-[10px] text-on-surface-variant mt-1 uppercase tracking-wider">{metric.sub}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="bg-surface-container-low p-6">
          <h3 className="text-xs font-headline font-bold uppercase tracking-widest mb-6 border-b border-outline-variant/10 pb-2">Export_Format</h3>
          <div className="space-y-3">
            {[
              { id: 'ezcad', label: 'EZCAD .lmt', checked: true },
              { id: 'gcode', label: 'Standard G-Code' },
              { id: 'dxf', label: 'AutoCAD DXF/PLT' }
            ].map((format) => (
              <label key={format.id} className="flex items-center justify-between p-3 bg-surface-container-highest cursor-pointer group">
                <span className="text-xs font-headline uppercase">{format.label}</span>
                <input defaultChecked={format.checked} className="text-primary focus:ring-0 bg-transparent border-outline" name="format" type="radio" />
              </label>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low p-6">
          <h3 className="text-xs font-headline font-bold uppercase tracking-widest mb-6 border-b border-outline-variant/10 pb-2">Generated_Files</h3>
          <div className="space-y-3">
            {[
              { name: 'circuit_trace_l1.lmt', size: '4.2 MB' },
              { name: 'drill_holes_v2.lmt', size: '1.8 MB' },
              { name: 'job_report.pdf', size: '0.4 MB' }
            ].map((file) => (
              <div key={file.name} className="flex items-center gap-3 p-2 group">
                <FileText className="w-4 h-4 text-outline group-hover:text-primary" />
                <div className="flex-1">
                  <p className="text-[11px] font-medium font-mono">{file.name}</p>
                  <p className="text-[9px] text-outline uppercase">{file.size} // Success</p>
                </div>
                <Download className="w-3.5 h-3.5 text-outline cursor-pointer hover:text-white" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-low p-6 flex flex-col justify-end gap-4">
          <button className="w-full bg-primary text-on-primary font-headline font-bold py-4 text-sm tracking-[0.2em] uppercase hover:bg-primary-fixed hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3">
            <FolderArchive className="w-5 h-5" />
            Download All Files
          </button>
          <button className="w-full bg-transparent border border-outline-variant text-on-surface-variant font-headline font-bold py-3 text-xs tracking-widest uppercase hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
            <Rocket className="w-4 h-4" />
            Send to Controller
          </button>
        </div>
      </section>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('dashboard');

  return (
    <div className="min-h-screen bg-surface selection:bg-primary selection:text-on-primary">
      <TopNavBar currentView={view} setView={setView} />
      <SideNavBar currentView={view} />
      
      <main className="md:ml-64 pt-14 min-h-[calc(100vh-3.5rem)] pb-20">
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {view === 'dashboard' && <DashboardView />}
              {view === 'processor' && <ProcessorView />}
              {view === 'export' && <ExportView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <Footer />

      {/* Global Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] mix-blend-overlay">
        <img 
          className="w-full h-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxutMbZu7kmEdJqKVVywQlUdboE-pHYSBgxZqJJ8HCi241dOxiLrcshgj3pxeVeGHQ5ZDagGtU56hY0ycwz_E97K38Iusotg2am_73wGh055NeWDXOFqJLnR-l7QyFNwDqyaAU9MuImcdrjkbVFbU3Md5Jq9n5jDSC8MdsKxFf0594HX-tIrCA3Jzbixv8GX43BKMWvQzYxjsnGV5SAM60DMgE87TJn6HFkGOWUAmdIw_9BZp2L6kGLTDvf5xhp6Lqc314sWgpryM" 
          alt="Texture"
        />
      </div>
    </div>
  );
}
