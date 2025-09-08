import nodemailer from "nodemailer";

// Създаваме транспорта за Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // твоят Gmail
    pass: process.env.EMAIL_PASS, // App Password
  },
});

// Проверка на SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP трансферът не е валиден:", error);
  } else {
    console.log("✅ SMTP трансферът е готов за изпращане на имейли");
  }
});

// Функция за изпращане на имейл
export const sendOrderEmail = async (orderData) => {
  const { name, email, phone, products, total } = orderData;

  if (!products || !Array.isArray(products) || products.length === 0) {
    console.warn("⚠️ products не е валиден масив, имейлът няма да се изпрати правилно.");
    return;
  }

  const productList = products
    .map((p) => `${p.name || "Неизвестен продукт"} x${p.quantity || 0}`)
    .join("\n");

  const mailOptions = {
    from: `"Bisante" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: "🛒 Нова поръчка в сайта",
    text: `
Нова поръчка:

Име: ${name || "Неизвестно"}
Телефон: ${phone || "Неизвестен"}
Имейл: ${email || "Неизвестен"}

Продукти:
${productList}

Общо: ${total || 0} лв.
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Имейл изпратен успешно:", info.response);
  } catch (err) {
    console.error("❌ Грешка при изпращане на имейл:", err);
  }
};


