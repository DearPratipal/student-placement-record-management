import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import { Drive } from '../types';
/*
useEffect(() => {
  apiService.getDrives().then(setDrives);
}, []);
*/

import {
  Calendar,
  MapPin,
  DollarSign,
  Briefcase,
  Plus,
  Users
} from 'lucide-react';

export const Drives: React.FC = () => {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getDrives().then(data => {
      setDrives(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Placement Drives</h1>
          <p className="text-gray-500">Upcoming and ongoing recruitment events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-mmdu-red text-white rounded-lg hover:bg-mmdu-dark shadow-sm transition-all">
          <Plus size={18} />
          <span className="hidden sm:inline">Create Drive</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-xl"></div>)
        ) : (
          drives.map(drive => (
            <div key={drive.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xl font-bold text-gray-700">
                    {drive.companyName.charAt(0)}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${drive.status === 'UPCOMING' ? 'bg-blue-50 text-blue-700' :
                      drive.status === 'ONGOING' ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                    {drive.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1">{drive.role}</h3>
                <p className="text-gray-500 font-medium mb-4">{drive.companyName}</p>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <DollarSign size={16} className="text-gray-400" />
                    <span className="font-semibold text-gray-800">{drive.packageLPA} LPA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{new Date(drive.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase size={16} className="text-gray-400" />
                    <span>Min CGPA: {drive.eligibilityCgpa}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {drive.eligibleBranches.map(branch => (
                    <span key={branch} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {branch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users size={16} />
                  <span>Eligible: 120</span>
                </div>
                <button className="text-mmdu-red font-medium text-sm hover:underline">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};