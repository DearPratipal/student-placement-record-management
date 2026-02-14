import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import {
    Mail,
    Phone,
    Github,
    Linkedin,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

export const About: React.FC = () => {
    const [showTerms, setShowTerms] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-12">

            {/* 🔹 Top Header Row */}
            <div className="flex items-start justify-between">

                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Student Placement Record Management System – MM(DU)
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Institutional Information & Legal Details
                    </p>
                </div>

                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-mmdu-red text-white px-4 py-2 rounded-lg shadow hover:bg-mmdu-dark transition-all duration-200 active:scale-95"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </button>

            </div>

            {/* ================= TERMS ================= */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                    onClick={() => setShowTerms(!showTerms)}
                    className="w-full flex justify-between items-center px-6 py-4 bg-mmdu-red text-white font-semibold"
                >
                    Terms & Conditions
                    {showTerms ? <ChevronUp /> : <ChevronDown />}
                </button>

                {showTerms && (
                    <div className="p-6 text-gray-700 text-sm leading-relaxed space-y-4">
                        <p>
                            By accessing and using the Student Placement Record Management
                            System – MM(DU), users agree to comply with the official usage
                            policies defined by the MM(DU) Placement Cell.
                        </p>

                        <p>
                            All user accounts are role-based and must be approved by the
                            Administrator. Users are responsible for maintaining login
                            confidentiality. Any unauthorized access or misuse is strictly
                            prohibited.
                        </p>

                        <p>
                            All student and placement data must be accurate. The Placement
                            Cell reserves the right to modify or remove incorrect data.
                        </p>

                        <p>
                            System activity may be logged for security and audit purposes.
                            Continued use implies acceptance of any updated terms.
                        </p>
                    </div>
                )}
            </div>

            {/* ================= ABOUT PROJECT ================= */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    About the Project
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm">
                    This system is a secure, role-based web application developed to
                    digitalize the placement process of MM(DU). It replaces manual
                    spreadsheets with a centralized real-time platform ensuring
                    transparency, accuracy, and structured workflow management.
                </p>
            </div>

            {/* ================= TEAM SECTION ================= */}
            <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Project Team
                </h2>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* 🔹 Developer Card */}
                    <ProfileCard
                        image="/developer.png"
                        name="Pratipal Kumar Singh"
                        education="BCA (Bachelor of Computer Applications)"
                        role="Developer – Full Stack Engineer – BCA"
                        description="Responsible for system architecture, UI/UX design, role-based structure, and full-stack implementation."
                        email="kumarpratipal123@gmail.com"
                        linkedIn="https://www.linkedin.com/in/dearpratipal/"
                        phone="+91-7324010867"
                    />

                    {/* 🔹 Supervisor Card */}
                    <ProfileCard
                        image="/supervisor.png"
                        name="Dr. Dalip Kamboj"
                        education="Ph.D. (IT), M.Tech. (IT) – Gold Medalist, MCA"
                        role="Project Supervisor – Associate Professor"
                        description="Provided academic guidance, technical supervision, and ensured adherence to software engineering standards."
                        email="dalip.kamboj@mmumullana.org"
                        linkedIn="https://www.linkedin.com/in/dr-dalip-kamboj-62581a173/"
                        phone="+91-9996000940"
                    />

                </div>
            </div>

            {/* ================= CONTRIBUTOR ================= */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Contributor
                </h2>
                <p className="text-gray-600 text-sm">
                    Sonu Kumar contributed to development tasks, documentation, and
                    implementation support.
                </p>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-400 pt-10 border-t">
                © 2026 MM(DU) Placement Cell | Developed for Academic & Institutional Purpose
            </div>

        </div>
    );
};

/* ================= PROFILE CARD COMPONENT ================= */

const ProfileCard = ({
    image,
    name,
    education,
    role,
    description,
    email,
    linkedIn,
    phone,
}: any) => {
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">

            <div className="flex items-center gap-4">
                <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-mmdu-red"
                />
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                    <p className="text-sm text-mmdu-blue font-medium">{education}</p>
                    <p className="text-sm text-mmdu-red font-medium">{role}</p>
                </div>
            </div>

            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
                {description}
            </p>

            <div className="flex gap-4 mt-5">
                {/* Email, LinkedIn, Phone */}
                <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition"
                >
                    <Mail size={16} />
                    Email
                </a>

                {/* LinkedIn Button */}
                {linkedIn && (
                    <a
                        href={linkedIn.startsWith("http") ? linkedIn : `https://${linkedIn}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-600 rounded-lg text-sm font-medium hover:bg-sky-100 transition-all duration-200 active:scale-95"
                    >
                        <linkedIn size={16} />
                        LinkedIn
                    </a>
                )}
                
                <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition"
                >
                    <Phone size={16} />
                    Call
                </a>

            </div>
        </div>
    );
};
