import { Baby, Star, Syringe, MessageCircle } from "lucide-react";

export default function PediatricsLayout({ data }: { data: any }) {
  const vitals = data.parsedVitals || {};

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Warm Header */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl p-6 flex justify-between items-center shadow-lg text-orange-950">
        <div className="flex items-center gap-4">
          <div className="bg-white/30 p-3 rounded-full">
            <Baby size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{data.patient.name}'s Visit</h1>
            <p className="font-medium opacity-80">{data.status}</p>
          </div>
        </div>
        <div className="text-right flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl">
          <Star className="fill-orange-950" size={20} />
          <span className="font-bold text-lg">Bravery Level: High!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Growth & Timeline */}
        <div className="col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-orange-900/30 p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Baby className="text-orange-400" /> Growth Trackers
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-xs font-bold text-orange-400">75th Percentile</div>
                <p className="text-slate-400 text-sm font-medium mb-2">Weight</p>
                <p className="text-4xl font-bold text-white">{vitals.weight || 'N/A'}</p>
              </div>
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-xs font-bold text-orange-400">80th Percentile</div>
                <p className="text-slate-400 text-sm font-medium mb-2">Height</p>
                <p className="text-4xl font-bold text-white">88 cm</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-orange-900/30 p-6">
            <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Syringe className="text-orange-400" /> Immunization Schedule
            </h2>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white bg-orange-400 text-slate-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                  <svg className="fill-current w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12"><path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" /></svg>
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-2xl bg-slate-800 shadow border border-slate-700">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-white">DTaP, Polio</div>
                    <time className="text-xs font-medium text-teal-500">Completed</time>
                  </div>
                  <div className="text-sm text-slate-400">Administered at 6 months.</div>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-600 bg-slate-800 text-slate-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                </div>
                <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-2xl bg-slate-800 shadow border border-orange-500/50">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-white">{vitals.nextVaccine || 'MMR'}</div>
                    <time className="text-xs font-medium text-orange-400">Due Today</time>
                  </div>
                  <div className="text-sm text-slate-400">Scheduled for this visit.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Portal */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl border border-orange-900/30 p-6 text-center">
             <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)] mb-4">
               <Star className="text-white fill-white" size={40} />
             </div>
             <h3 className="text-lg font-bold text-white mb-2">Rewards Panel</h3>
             <p className="text-sm text-slate-400 mb-4">Baby Liam has earned 3 stickers today!</p>
             <button className="bg-orange-500 hover:bg-orange-600 text-white w-full py-2 rounded-xl font-medium transition-colors">
               Award New Sticker
             </button>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle size={18} className="text-blue-400" /> Parent Messages
            </h3>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 mb-3">
              <p className="text-xs text-slate-400 mb-1">Mom (Sarah Doe)</p>
              <p className="text-sm text-slate-200">Is it normal for him to be fuzzy after the drops?</p>
            </div>
            <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-xl text-sm font-medium transition-colors border border-slate-700">
              Reply to Parent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
