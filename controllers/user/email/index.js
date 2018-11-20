import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {

    user: process.env.EMAIL,
    pass: process.env.E_PASSWORD,
  },
});

export default transporter;
