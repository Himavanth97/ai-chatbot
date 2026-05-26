"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Activity, Clock, Heart, Users, ShieldAlert, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <header className="mb-12 flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 mb-2">
            Care Hospital Service
          </h1>
          <p className="text-slate-400">Centralized Patient Triage & Active Treatments Dashboard</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800 flex items-center gap-3">
            <Activity className="text-teal-400" size={20} />
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Active Patients</p>
              <p className="text-xl font-bold">{appointments.length}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {appointments.map((apt) => {
          const layout = apt.department.layoutType;
          let borderGlow = "border-slate-800";
          let Icon = Users;
          
          if (layout === 'emergency') {
            borderGlow = "border-red-900/50 hover:border-red-500/50 shadow-[0_0_15px_rgba(220,38,38,0.1)]";
            Icon = ShieldAlert;
          } else if (layout === 'cardiology') {
            borderGlow = "border-blue-900/50 hover:border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
            Icon = Heart;
          } else if (layout === 'pediatrics') {
            borderGlow = "border-orange-900/50 hover:border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)]";
          } else if (layout === 'oncology') {
            borderGlow = "border-purple-900/50 hover:border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]";
            Icon = Clock;
          }

          return (
            <Link 
              href={`/dashboard/${layout}?aptId=${apt.id}`} 
              key={apt.id}
            >
              <div className={`group bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border ${borderGlow} transition-all duration-300 hover:transform hover:-translate-y-1 hover:bg-slate-800/80 cursor-pointer`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800`}>
                      <Icon className="text-slate-300" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-teal-400 transition-colors">
                        {apt.patient.name}
                      </h3>
                      <p className="text-sm text-slate-400">{apt.department.name} • {apt.department.floorLocation}</p>
                    </div>
                  </div>
                  <div className="bg-slate-950 px-3 py-1 rounded-full border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                    {apt.status}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50">
                  <div>
                    <p className="text-xs text-slate-500 uppercase mb-1">Attending Physician</p>
                    <p className="text-sm font-medium text-slate-300">{apt.doctor.name}</p>
                  </div>
                  <div className="flex justify-end items-center">
                    <span className="text-sm text-teal-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Open Chart <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
