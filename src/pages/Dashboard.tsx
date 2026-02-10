import React, { useEffect, useState } from 'react';
import {
  Users,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { apiService } from '../services/apiService';
import { Student, Drive } from '../types';

export const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [drives, setDrives] = useState<Drive[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [studentsData, drivesData] = await Promise.all([
        apiService.getStudents(),
        apiService.getDrives()
      ]);
      setStudents(studentsData);
      setDrives(drivesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex h-96 items-center justify-center text-mmdu-red font-semibold">Loading Dashboard Analytics...</div>;

  // Stats Calculation
  const totalStudents = students.length;
  const placedStudents = students.filter(s => s.placed).length;
  const placementRate = Math.round((placedStudents / totalStudents) * 100) || 0;
  const activeDrives = drives.filter(d => d.status !== 'COMPLETED').length;
  const atRiskStudents = students.filter(s => s.missedDrives >= 3 && !s.placed).length;

  // Chart Data
  const deptData = [
    { name: 'BCA', placed: 120, total: 500 },
    { name: 'MCA', placed: 85, total: 100 },
    { name: 'B.Sc.', placed: 45, total: 300 },
    { name: 'M.Sc', placed: 30, total: 80 },
  ];

  const pieData = [
    { name: 'Placed', value: placedStudents },
    { name: 'Unplaced', value: totalStudents - placedStudents },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Placement Overview</h1>
        <p className="text-gray-500">Real-time insights for MM(DU) Placement Cell</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={<Users className="text-blue-600" />}
          bg="bg-blue-50"
          border="border-blue-200"
        />
        <StatCard
          title="Placement Rate"
          value={`${placementRate}%`}
          icon={<TrendingUp className="text-green-600" />}
          bg="bg-green-50"
          border="border-green-200"
        />
        <StatCard
          title="Active Drives"
          value={activeDrives}
          icon={<Briefcase className="text-purple-600" />}
          bg="bg-purple-50"
          border="border-purple-200"
        />
        <StatCard
          title="At Risk (Inactive)"
          value={atRiskStudents}
          icon={<AlertTriangle className="text-red-600" />}
          bg="bg-red-50"
          border="border-red-200"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Department Wise Placement</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Bar dataKey="placed" name="Placed Students" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" name="Total Students" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart & Recent Activity */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 w-full text-left">Overall Status</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Recent Drives</h3>
              <button className="text-sm text-mmdu-red font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {drives.slice(0, 3).map(drive => (
                <div key={drive.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold">
                      {drive.companyName.substring(0, 1)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{drive.companyName}</p>
                      <p className="text-xs text-gray-500">{drive.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs font-medium 
                         ${drive.status === 'UPCOMING' ? 'bg-blue-100 text-blue-700' :
                        drive.status === 'ONGOING' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                      {drive.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bg, border }: any) => (
  <div className={`p-6 rounded-xl border ${border} ${bg} flex items-start justify-between`}>
    <div>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
    </div>
    <div className="p-2 bg-white rounded-lg shadow-sm">
      {icon}
    </div>
  </div>
);