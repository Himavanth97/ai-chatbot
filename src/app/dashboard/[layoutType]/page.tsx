"use client";

import { useSearchParams, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EmergencyLayout from '@/components/EmergencyLayout';
import CardiologyLayout from '@/components/CardiologyLayout';
import PediatricsLayout from '@/components/PediatricsLayout';
import OncologyLayout from '@/components/OncologyLayout';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LayoutTypePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const layoutType = params.layoutType as string;
  const aptId = searchParams.get('aptId');
  
  const [appointment, setAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!aptId) return;
    
    fetch('/api/appointments')
      .then(res => res.json())
      .then(data => {
        const apt = data.find((a: any) => a.id === aptId);
        if (apt) {
          // Parse the vitals log string into JSON
          if (typeof apt.vitalsLog === 'string') {
            try {
              apt.parsedVitals = JSON.parse(apt.vitalsLog);
            } catch (e) {
              apt.parsedVitals = {};
            }
          }
        }
        setAppointment(apt);
        setLoading(false);
      });
  }, [aptId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Record Not Found</h1>
        <Link href="/dashboard" className="text-teal-400 hover:underline">Return to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <nav className="p-4 border-b border-slate-800 flex items-center gap-4 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/dashboard" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-slate-300">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-wider">{appointment.department.name}</p>
          <h2 className="font-medium text-lg">{appointment.patient.name}</h2>
        </div>
      </nav>

      <main>
        {layoutType === 'emergency' && <EmergencyLayout data={appointment} />}
        {layoutType === 'cardiology' && <CardiologyLayout data={appointment} />}
        {layoutType === 'pediatrics' && <PediatricsLayout data={appointment} />}
        {layoutType === 'oncology' && <OncologyLayout data={appointment} />}
      </main>
    </div>
  );
}
