import { createTransport } from "nodemailer";
import config from "../config/config.js";

const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: config.EMAIL,
    pass: config.PASSWORD,
  },
});

const createMsgRegister = (first_name) => {
  return `<h2>Hola ${first_name}, ahora puedes vernos!</h2>`;
};

const createMsgResetPass = (first_name) => {
  return `<p>${first_name}, click en el siguiente enlace <a href='http://localhost:8080/api/users/new-password'>ACÁ</a> para cambiar tu contraseña</p>`;
};

export const sendMail = async (user, service, token = null) => {
  try {
    const { first_name, email } = user;
    let message = "";
    let subj = "";

    switch (service) {
      case "register":
        message = createMsgRegister(first_name);
        subj = "Registro existoso";
        break;
      case "resetPassword":
        message = createMsgResetPass(first_name);
        subj = "Recuperar tu contraseña";
        break;
      default:
        message = "";
        break;
    }

    const gmailOptions = {
      from: config.EMAIL,
      to: email,
      subject: subj,
      html: message,
    };

    const response = await transporter.sendMail(gmailOptions);
    if (token !== null) {
      return token;
    } else {
      return console.log("Mail enviado", response);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
