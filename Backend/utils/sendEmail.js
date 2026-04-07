// import nodemailer from "nodemailer";


// // ✅ transporter defined first
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS
//   }
  
// });

// // then the function
// export const sendEmail = async ({ to, subject, text }) => {
//   try {
//     const result = await transporter.sendMail({
//       from: process.env.EMAIL,
//       to,
//       subject,
//       text
//     });
//     console.log("Email sent:", result.response);
//   } catch (error) {
//     console.log("Nodemailer error:", error.message);
//     throw error;
//   }
// };

import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text }) => {
  // ✅ Create transporter INSIDE the function, not outside
  // This ensures env vars are always read at call time
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const result = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });
    console.log("Email sent:", result.response);
  } catch (error) {
    console.log("Nodemailer error:", error.message);
    throw error;
  }
};