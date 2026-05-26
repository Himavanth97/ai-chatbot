import { AlertTriangle, Clock, Activity, Ambulance } from "lucide-react";

export default function EmergencyLayout({ data }: { data: any }) {
  const vitals = data.parsedVitals || {};

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* High Urgency Header */}
      <div className="bg-red-950/40 border border-red-900 rounded-2xl p-6 flex items-center justify-between shadow-[0_0_30px_rgba(220,38,38,0.1)]">
        <div className="flex items-center gap-4">
          <div className="bg-red-900/50 p-4 rounded-xl animate-pulse">
            <AlertTriangle className="text-red-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-red-50">{data.status}</h1>
            <p className="text-red-400">Immediate action required. Triage protocols active.</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-red-400 uppercase tracking-widest font-bold">ER Wait Time</p>
          <p className="text-4xl font-mono text-red-50 animate-pulse">14<span className="text-xl text-red-400">m</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Vitals Panel */}
        <div className="col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="text-red-500" /> Current Vitals
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p className="text-slate-500 text-sm mb-1">Blood Pressure</p>
              <p className="text-3xl font-bold text-slate-200">{vitals.bp || 'N/A'}</p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <p className="text-slate-500 text-sm mb-1">Pulse</p>
              <p className="text-3xl font-bold text-red-400">{vitals.pulse || 'N/A'}</p>
            </div>
          </div>

          <div className="mt-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Quick Medical Notes</h3>
            <textarea 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-300 focus:outline-none focus:border-red-500 transition-colors"
              rows={4}
              placeholder="Enter immediate observation notes here..."
            ></textarea>
            <div className="mt-3 flex justify-end">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Save Notes
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="bg-orange-950/30 border border-orange-900/50 rounded-2xl p-6">
            <h3 className="font-bold text-orange-200 mb-2 flex items-center gap-2">
              <Ambulance size={18} /> Incoming Triage
            </h3>
            <div className="space-y-3 mt-4">
              <div className="bg-slate-900/50 p-3 rounded-lg border border-orange-900/30">
                <p className="text-sm font-medium text-slate-300">ETA 4 mins</p>
                <p className="text-xs text-slate-500">MVA Trauma, Level 1</p>
              </div>
              <div className="bg-slate-900/50 p-3 rounded-lg border border-orange-900/30">
                <p className="text-sm font-medium text-slate-300">ETA 12 mins</p>
                <p className="text-xs text-slate-500">Cardiac Arrest Protocol</p>
              </div>
            </div>
            <button className="w-full mt-4 bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/50 text-orange-400 py-2 rounded-lg text-sm font-medium transition-colors">
              Dispatch Additional Unit
            </button>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
             <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Assigned Doctor</p>
             <p className="font-medium text-slate-200">{data.doctor.name}</p>
             <p className="text-sm text-slate-400 mt-1">{data.doctor.contactInfo}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
