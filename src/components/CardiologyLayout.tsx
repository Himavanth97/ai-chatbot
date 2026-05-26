import { HeartPulse, ActivitySquare, Stethoscope, AlertCircle } from "lucide-react";

export default function CardiologyLayout({ data }: { data: any }) {
  const vitals = data.parsedVitals || {};
  const hrHistory = vitals.heartRateHistory || [0,0,0,0];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Clinical Header */}
      <div className="bg-slate-900 border-l-4 border-l-blue-500 rounded-r-2xl p-6 flex justify-between items-center shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-3">
            <HeartPulse className="text-blue-500" />
            {data.status}
          </h1>
          <p className="text-slate-400 mt-1">Ejection Fraction Rate: <span className="text-blue-400 font-bold">{vitals.efRate || 'N/A'}</span></p>
        </div>
        <div className="flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Order EKG
          </button>
          <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            View Echo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vitals Feed & EKG */}
        <div className="col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 overflow-hidden relative">
            <h2 className="text-lg font-semibold text-slate-200 mb-6 flex items-center gap-2">
              <ActivitySquare className="text-blue-400" size={20} /> Continuous Telemetry
            </h2>
            
            {/* Fake EKG Waveform */}
            <div className="h-32 w-full flex items-center justify-between border-b border-blue-900/30 pb-6 relative">
              <div className="absolute inset-0 flex items-center">
                <svg className="w-full h-full text-blue-500/50" preserveAspectRatio="none" viewBox="0 0 1000 100">
                  <path 
                    d="M 0 50 L 100 50 L 120 20 L 140 90 L 160 50 L 300 50 L 320 20 L 340 90 L 360 50 L 500 50 L 520 20 L 540 90 L 560 50 L 700 50 L 720 20 L 740 90 L 760 50 L 900 50 L 920 20 L 940 90 L 960 50 L 1000 50" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    className="animate-[dash_2s_linear_infinite]"
                    strokeDasharray="1000"
                    strokeDashoffset="1000"
                  />
                  <style>{`@keyframes dash { to { stroke-dashoffset: 0; } }`}</style>
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6">
              {hrHistory.map((hr: number, idx: number) => (
                <div key={idx} className="bg-slate-950 rounded-lg p-3 text-center border border-slate-800">
                  <p className="text-xs text-slate-500 mb-1">HR -{15 * (4-idx)}m</p>
                  <p className="text-xl font-mono text-blue-300">{hr}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Tracking & Risk */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <Stethoscope size={18} className="text-blue-400" /> Device Tracking
            </h3>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/30">
                <p className="text-xs text-slate-400">Pacemaker Model</p>
                <p className="text-sm text-slate-200 font-medium">Medtronic Azure XT</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/30">
                <p className="text-xs text-slate-400">Battery Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                  </div>
                  <span className="text-xs text-green-400">82%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="font-semibold text-slate-200 mb-4 flex items-center gap-2">
              <AlertCircle size={18} className="text-orange-400" /> Risk Calculator
            </h3>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-slate-400">ASCVD 10-Year Risk</span>
              <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-xs font-bold border border-orange-500/30">Elevated (12%)</span>
            </div>
            <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-700">
              Recalculate Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
