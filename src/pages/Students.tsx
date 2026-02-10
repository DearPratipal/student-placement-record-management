import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Upload,
  Filter,
  MoreHorizontal,
  Mail,
  FileSpreadsheet
} from 'lucide-react';

import { Student } from '../types';
import { apiService } from '../services/apiService'

/*
useEffect(() => {
  apiService.getStudents().then(setStudents);
}, []);
*/

export const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'ALL' | 'PLACED' | 'AT_RISK'>('ALL');
  const [uploading, setUploading] = useState(false);
  const [sheetUrl, setSheetUrl] = useState('');
  const [showSheetModal, setShowSheetModal] = useState(false);


  const handleExcelUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);

      const result = await apiService.uploadStudentsExcel(file);
      alert(`✅ ${result.count} students imported successfully`);

      // refresh list
      const data = await apiService.getStudents();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error: any) {
      alert(`❌ ${error.message}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleGoogleSheetImport = async () => {
    if (!sheetUrl.trim()) {
      alert('Please enter Google Sheet URL');
      return;
    }

    try {
      setUploading(true);

      const result = await apiService.importFromGoogleSheet(sheetUrl);
      alert(`✅ ${result.count} students imported from Google Sheet`);

      const data = await apiService.getStudents();
      setStudents(data);
      setFilteredStudents(data);

      setSheetUrl('');
      setShowSheetModal(false);
    } catch (error: any) {
      alert(`❌ ${error.message}`);
    } finally {
      setUploading(false);
    }
  };


  useEffect(() => {
    apiService.getStudents().then(data => {
      setStudents(data);
      setFilteredStudents(data);
    });
  }, []);

  useEffect(() => {
    let result = students;

    // Filter by Tab
    if (activeTab === 'PLACED') {
      result = result.filter(s => s.placed);
    } else if (activeTab === 'AT_RISK') {
      result = result.filter(s => s.missedDrives >= 3 && !s.placed);
    }

    // Filter by Search
    if (searchTerm) {
      result = result.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.rollNo.includes(searchTerm) ||
        s.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredStudents(result);
  }, [searchTerm, students, activeTab]);

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Student Records</h1>
          <p className="text-gray-500 text-sm">Manage student eligibility and tracking</p>
        </div>
        <div className="flex gap-3">
          {/* Placeholder for Excel Import - can be replaced with actual file input */}
          {/*
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
            onClick={() => alert("Simulating Excel Import...")}
          >
            <FileSpreadsheet size={18} className="text-green-600" />
            <span className="hidden sm:inline">Import Excel</span>
          </button>
          */}

          <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 cursor-pointer">
            <FileSpreadsheet size={18} className="text-green-600" />
            <span className="hidden sm:inline">
              {uploading ? 'Uploading...' : 'Import Excel'}
            </span>

            <input
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleExcelUpload}
              disabled={uploading}
            />
          </label>

          {/* Google Sheet Import */}
          <button
            onClick={() => setShowSheetModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
          >
            <Upload size={18} className="text-blue-600" />
            <span className="hidden sm:inline">Import Google Sheet</span>
          </button>

          {/* Add Student Manual */}
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-mmdu-red text-white rounded-lg hover:bg-mmdu-dark shadow-sm transition-all"
          >
            <Plus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'ALL' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All Students
          </button>
          <button
            onClick={() => setActiveTab('PLACED')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'PLACED' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Placed
          </button>
          <button
            onClick={() => setActiveTab('AT_RISK')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === 'AT_RISK' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Inactive / At Risk
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search roll no, name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Roll No</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Branch</th>
                <th className="px-6 py-4">CGPA</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Missed Drives</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">{student.rollNo}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-50 text-mmdu-red flex items-center justify-center font-bold text-xs">
                          {student.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{student.department}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{student.cgpa}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${student.placed
                          ? 'bg-green-100 text-green-800'
                          : student.missedDrives >= 3
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'}`}>
                        {student.placed ? 'Placed' : student.missedDrives >= 3 ? 'Inactive' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {student.missedDrives > 0 && (
                        <span className={`${student.missedDrives >= 3 ? 'text-red-600 font-bold' : 'text-gray-500'}`}>
                          {student.missedDrives}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-mmdu-red transition-colors p-1">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No students found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Add New Student</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roll No</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="1120..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="student@mmdu.org" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg outline-none bg-white">
                    <option>CSE</option>
                    <option>ECE</option>
                    <option>Civil</option>
                    <option>Mech</option>
                    <option>Biotech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
                  <input type="number" step="0.01" className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="0.00" />
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Student created (Simulated)");
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-mmdu-red text-white rounded-lg hover:bg-mmdu-dark shadow-sm"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Sheet Modal */}
      {showSheetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">
                Import from Google Sheet
              </h3>
              <button
                onClick={() => setShowSheetModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Google Sheet CSV URL
              </label>
              <input
                type="text"
                value={sheetUrl}
                onChange={(e) => setSheetUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
              <p className="text-xs text-gray-500">
                Sheet must be public (Anyone with link → Viewer)
              </p>
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowSheetModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleGoogleSheetImport}
                disabled={uploading}
                className="px-4 py-2 bg-mmdu-red text-white rounded-lg hover:bg-mmdu-dark"
              >
                {uploading ? 'Importing...' : 'Import'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};