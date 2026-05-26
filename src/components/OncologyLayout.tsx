import { Activity, Pill, Users, Calendar, ClipboardList } from "lucide-react";

export default function OncologyLayout({ data }: { data: any }) {
  const vitals = data.parsedVitals || {};

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Care Coordination Header */}
      <div className="bg-purple-950/40 border border-purple-900/50 rounded-2xl p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-purple-100 flex items-center gap-3">
            {data.status}
          </h1>
          <p className="text-purple-300 mt-1 flex items-center gap-2">
            <Calendar size={16} /> Day {vitals.day || 'N/A'}
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Users size={16} /> Tumor Board
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Treatment Grid */}
        <div className="col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Pill className="text-purple-400" /> Active Regimen
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-400">
                <thead className="text-xs text-slate-300 uppercase bg-slate-800/50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Medication</th>
                    <th className="px-4 py-3">Dosage</th>
                    <th className="px-4 py-3">Timing</th>
                    <th className="px-4 py-3 rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="px-4 py-4 font-medium text-white">{vitals.regimen || 'Cisplatin'}</td>
                    <td className="px-4 py-4">50mg IV</td>
                    <td className="px-4 py-4">Day 1, 8, 15</td>
                    <td className="px-4 py-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Administered</span>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="px-4 py-4 font-medium text-white">Ondansetron</td>
                    <td className="px-4 py-4">8mg PO</td>
                    <td className="px-4 py-4">PRN Nausea</td>
                    <td className="px-4 py-4">
                      <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded text-xs">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
             <h2 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Activity className="text-purple-400" /> Symptom & Side-Effect Log
            </h2>
            <div className="space-y-3">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-medium text-white">Mild Neuropathy</p>
                  <p className="text-xs text-slate-400">Reported 2 days ago</p>
                </div>
                <div className="text-yellow-500 font-bold text-sm bg-yellow-500/10 px-3 py-1 rounded-full">Grade 1</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                <div>
                  <p className="font-medium text-white">Fatigue</p>
                  <p className="text-xs text-slate-400">Reported today</p>
                </div>
                <div className="text-orange-500 font-bold text-sm bg-orange-500/10 px-3 py-1 rounded-full">Grade 2</div>
              </div>
            </div>
            <button className="mt-4 text-purple-400 text-sm font-medium hover:text-purple-300 transition-colors">
              + Log New Symptom
            </button>
          </div>
        </div>

        {/* Multidisciplinary Panel */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <ClipboardList size={18} className="text-purple-400" /> Care Team Notes
            </h3>
            <div className="space-y-4">
               <div className="border-l-2 border-purple-500 pl-3">
                 <p className="text-xs text-purple-400 font-bold mb-1">Oncologist</p>
                 <p className="text-sm text-slate-300">Tumor markers declining steadily. Continue current protocol.</p>
               </div>
               <div className="border-l-2 border-teal-500 pl-3">
                 <p className="text-xs text-teal-400 font-bold mb-1">Nutritionist</p>
                 <p className="text-sm text-slate-300">Patient reported appetite loss. Recommended high-protein supplements.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
