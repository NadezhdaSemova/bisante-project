import nodemailer from "nodemailer";
console.log("DEBUG EMAIL_PASS length:", process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : "EMPTY");

// Настройка на транспорта за ABV SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.abv.bg",
  port: 465, // SSL порт
  secure: true, // използваме SSL
  auth: {
    user: process.env.EMAIL_USER, // вашият ABV имейл
    pass: process.env.EMAIL_PASS // парола или app password
  },
  tls: {
    rejectUnauthorized: false  // ABV често има стар сертификат
  },
});

// Проверка на SMTP връзката
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP връзката към ABV не е валидна:", error);
  } else {
    console.log("✅ SMTP връзката към ABV е готова за изпращане на имейли");
  }
});

// Функция за изпращане на имейл
export const sendOrderEmail = async (orderDetail) => {
  const { name, email, phone, products, total } = orderDetail;

  if (!products || !Array.isArray(products) || products.length === 0) {
    console.warn("⚠️ products не е валиден масив, имейлът няма да се изпрати правилно.");
    return;
  }

  const ordersList = products
    .map((p) => `${p.name || "Неизвестен продукт"} x${p.quantity || 0}`)
    .join("\n");

  const mailOptions = {
    from: `"Bisante" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL, // имейл за уведомления (може да е същият ABV)
    subject: "🛒 Нова поръчка в сайта",
    text: `
Нова поръчка:

Име: ${name || "Неизвестно"}
Телефон: ${phone || "Неизвестен"}
Имейл: ${email || "Неизвестен"}

products:
${ordersList}

Общо: ${total || 0} лв.
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Имейлът е изпратен успешно:", info.response);
  } catch (err) {
    console.error("❌ Грешка при изпращане на имейл към ABV:", err);
  }
};


