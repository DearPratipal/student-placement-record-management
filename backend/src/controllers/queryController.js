import Query from "../models/Query.js";
import nodemailer from "nodemailer";

// Create Query
export const createQuery = async (req, res) => {
    try {
        const { name, email, role, message } = req.body;

        // 1️⃣ Save to DB FIRST
        const newQuery = await Query.create({
            name,
            email,
            role,
            message,
        });

        try {
            // 2️⃣ Try sending email (but don't crash API)
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: true, // true for 465

                service: "gmail",
                auth: {
                    user: process.env.ADMIN_EMAIL,
                    pass: process.env.ADMIN_EMAIL_PASSWORD,
                },
            });

            await transporter.verify();
            console.log("SMTP Ready");

            await transporter.sendMail({
                from: `"MM(DU) Placement Cell" <${process.env.ADMIN_EMAIL}>`,
                to: process.env.ADMIN_EMAIL,
                subject: "New Query Request",
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                    <meta charset="UTF-8" />
                    </head>
                    <body style="font-family: Arial, sans-serif; background:#f4f6f9; padding:20px;">

                    <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:12px; box-shadow:0 5px 15px rgba(0,0,0,0.08);">

                        <!-- Header -->
                        <div style="text-align:center; margin-bottom:20px;">
                        <img src="https://i.ibb.co/QjjBDYhs/mmdu-logo-black.png" width="20%" alt="Logo" />
                        <h2 style="margin-top:10px; color:#2c3e50;">
                            📩 New Query Received
                        </h2>
                        <p style="color:#7f8c8d; font-size:13px;">
                            Placement Record Management System
                        </p>
                        </div>

                        <!-- Student Info -->
                        <div style="background:#f9fafc; padding:18px; border-radius:8px; margin-top:10px; border:1px solid #eaecef;">
                        <p style="margin:5px 0;"><b>👤 Name:</b> ${name}</p>
                        <p style="margin:5px 0;"><b>🎓 Role:</b> ${role}</p>
                        <p style="margin:5px 0;"><b>📧 Email:</b> ${email}</p>
                        <p style="margin:5px 0;"><b>🕒 Submitted On:</b> ${new Date().toLocaleString()}</p>
                        <p style="margin:5px 0;">
                            <b>⌛ Status:</b> 
                            <span style="color:#e67e22; font-weight:bold;">PENDING</span>
                        </p>
                        </div>

                        <!-- Message Box -->
                        <div style="background:#eef3f8; padding:20px; border-radius:8px; margin-top:20px;">
                        <p style="margin:0; font-weight:bold;">📝 Query Message:</p>
                        <p style="margin-top:10px; color:#2c3e50; line-height:1.6;">
                            ${message}
                        </p>
                        </div>

                        <!-- Reply Button -->
                        <div style="text-align:center; margin-top:25px;">
                        <a href="mailto:${email}" 
                            style="background:#2980b9; color:#fff; padding:12px 25px; 
                            text-decoration:none; border-radius:6px; font-weight:bold;">
                            Reply to Student
                        </a>
                        </div>

                        <hr style="margin-top:30px;" />

                        <!-- Footer -->
                        <p style="font-size:12px; color:#95a5a6; text-align:center;">
                        © ${new Date().getFullYear()} MM(DU) Placement Cell <br/>
                        This is an automated notification email.
                        </p>

                    </div>

                    </body>
                    </html>
                    `,
            });

        } catch (emailError) {
            console.log("Email sending failed:", emailError.message);
        }

        // 3️⃣ Always return success if DB saved
        res.status(201).json({
            message: "Query submitted successfully",
            data: newQuery,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// /*
// Update Query Status (ADMIN)
export const updateQueryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const query = await Query.findById(id);

        if (!query) {
            return res.status(404).json({ message: "Query not found" });
        }

        query.status = status;
        await query.save();

        // ✅ If Resolved → Send Email to Student
        if (status === "RESOLVED") {

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: true, // true for 465

                service: "gmail",
                auth: {
                    user: process.env.ADMIN_EMAIL,
                    pass: process.env.ADMIN_EMAIL_PASSWORD,
                },
            });

            await transporter.verify();
            console.log("SMTP Ready");

            await transporter.sendMail({
                from: `"MM(DU) Placement Cell" <${process.env.ADMIN_EMAIL}>`,
                to: query.email,
                subject: "Your Query Has Been Resolved ✅",
                html: `
                <div style="font-family: Arial; padding:20px;">
                    <h2 style="color:#2c3e50;">Hello ${query.name},</h2>
                    <p>Your query has been successfully resolved by our Placement Team.</p>
                    
                    <div style="background:#f4f6f9; padding:15px; border-radius:8px; margin-top:15px;">
                        <p><strong>Your Message:</strong></p>
                        <p>${query.message}</p>
                    </div>

                    <p style="margin-top:20px;">
                        If you have any further concerns, feel free to contact us again.
                    </p>

                    <p style="margin-top:25px;">
                        Regards,<br/>
                        <b>MM(DU) Placement Cell</b>
                    </p>
                </div>
                `
            });
        }

        res.json({ message: "Query updated successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// */

/*
export const createQuery = async (req, res) => {
    try {
        const { name, email, role, message } = req.body;

        const newQuery = await Query.create({
            name,
            email,
            role,
            message,
        });

        // 🔹 Send Email to Admin
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"MM(DU) Portal" <${process.env.ADMIN_EMAIL}>`,
            to: process.env.ADMIN_EMAIL,
            subject: "New Query Request",
            html: `
        <h3>New Query Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
        });

        res.status(201).json({
            message: "Query submitted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
*/
// /*
export const deleteQuery = async (req, res) => {
    try {
        const { id } = req.params;

        await Query.findByIdAndDelete(id);

        res.json({ message: "Query deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// */

// Get All Queries (Admin Only)
export const getQueries = async (req, res) => {
    try {
        const queries = await Query.find().sort({ createdAt: -1 });
        res.json(queries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
