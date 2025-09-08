import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // или друг SMTP
  auth: {
    user: process.env.EMAIL_USER, // твоят имейл
    pass: process.env.EMAIL_PASS, // app password
  },
});

export const sendOrderEmail = async (orderData) => {
  const { name, email, phone, products, total } = orderData;

  const productList = products.map(p => `${p.name} x${p.quantity}`).join("\n");

  const mailOptions = {
    from: `"Bisante" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL, // твоя пощенска кутия
    subject: "🛒 Нова поръчка в сайта",
    text: `
Нова поръчка:

Име: ${name}
Телефон: ${phone}
Имейл: ${email}

Продукти:
${productList}

Общо: ${total} лв.
    `,
  };

  await transporter.sendMail(mailOptions);
};
