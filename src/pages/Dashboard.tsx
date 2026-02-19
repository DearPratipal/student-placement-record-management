import React, { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

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
  Legend,
} from "recharts";

import { apiService } from "../services/apiService";
import { Student, Drive } from "../types";

export const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [drives, setDrives] = useState<Drive[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [departmentFilter, setDepartmentFilter] =
    useState<"ALL" | "BCA" | "MCA">("ALL");

  const isAdmin = localStorage.getItem("role") === "ADMIN";

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsData = await apiService.getStudents();
        const drivesData = await apiService.getDrives();

        setStudents(studentsData);
        setDrives(drivesData);

        if (isAdmin) {
          const queriesData = await apiService.getQueries();
          setQueries(queriesData);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-mmdu-red font-semibold">
        Loading Dashboard Analytics...
      </div>
    );
  }

  // ================= FILTER LOGIC =================
  const filteredStudents =
    departmentFilter === "ALL"
      ? students
      : students.filter((s) => s.department === departmentFilter);

  const totalStudents = filteredStudents.length;
  const placedStudents = filteredStudents.filter((s) => s.placed).length;
  const placementRate = totalStudents
    ? Math.round((placedStudents / totalStudents) * 100)
    : 0;

  const activeDrives = drives.filter(
    (d) => d.status !== "COMPLETED"
  ).length;

  const atRiskStudents = filteredStudents.filter(
    (s) => s.missedDrives >= 3 && !s.placed
  ).length;

  const deptData = ["BCA", "MCA", "B.Sc.", "M.Sc"].map((dept) => {
    const deptStudents = students.filter(
      (s) => s.department === dept
    );
    return {
      name: dept,
      placed: deptStudents.filter((s) => s.placed).length,
      total: deptStudents.length,
    };
  });

  const pieData = [
    { name: "Placed", value: placedStudents },
    { name: "Unplaced", value: totalStudents - placedStudents },
  ];

  const COLORS = ["#10B981", "#E5E7EB"];

  // ================= RENDER =================
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo-mmdu.svg"
            alt="MMDU Logo"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Placement Overview
            </h1>
            <p className="text-gray-500">
              Real-time insights for MM(DU) Placement Cell
            </p>
          </div>
        </div>

        <div className="flex gap-2 bg-gray-100 p-1 rounded-full shadow-inner">
          {["ALL", "BCA", "MCA"].map((dept) => (
            <button
              key={dept}
              onClick={() => setDepartmentFilter(dept as any)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-300
                ${departmentFilter === dept
                  ? "bg-mmdu-red text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
                }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
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
        {/* <StatCard
          title="Placed Students"
          value={placedStudents}
          icon={<AlertTriangle className="text-green-600" />}
          bg="bg-green-50"
          border="border-green-200"
        /> */}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Department Wise Placement
          </h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="placed" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Overall Status
          </h3>
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
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ADMIN QUERY SECTION */}
      {isAdmin && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Query Requests
          </h3>

          {queries.length === 0 ? (
            <p className="text-gray-500 text-sm">No requests found.</p>
          ) : (
            <div className="space-y-3">
              {queries.map((q: any) => (
                <div
                  key={q._id}
                  className="p-4 border rounded-lg bg-gray-50 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium">
                      {q.name} ({q.role})
                    </p>

                    <span
                      className={`text-xs px-2 py-1 rounded-full ${q.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                        }`}
                    >
                      {q.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">{q.email}</p>
                  <p className="text-sm mt-2">{q.message}</p>

                  <div className="flex gap-3 mt-3">
                    {q.status === "PENDING" && (
                      <button
                        onClick={async () => {
                          await apiService.updateQueryStatus(
                            q._id,
                            "RESOLVED"
                          );
                          setQueries((prev) =>
                            prev.map((item) =>
                              item._id === q._id
                                ? { ...item, status: "RESOLVED" }
                                : item
                            )
                          );
                        }}
                        className="bg-green-600 text-white px-3 py-1 text-xs rounded"
                      >
                        Mark Resolved
                      </button>
                    )}

                    <button
                      onClick={async () => {
                        await apiService.deleteQuery(q._id);
                        setQueries((prev) =>
                          prev.filter((item) => item._id !== q._id)
                        );
                      }}
                      className="bg-red-600 text-white px-3 py-1 text-xs rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ================= STAT CARD =================
const StatCard = ({ title, value, icon, bg, border }: any) => (
  <div
    className={`p-6 rounded-xl border ${border} ${bg} flex items-start justify-between`}
  >
    <div>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
    </div>
    <div className="p-2 bg-white rounded-lg shadow-sm">{icon}</div>
  </div>
);
