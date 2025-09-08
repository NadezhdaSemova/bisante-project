import nodemailer from "nodemailer";

// Създаваме транспорта за Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // твоя Gmail адрес
    pass: process.env.EMAIL_PASS, // Gmail App Password
  },
});

// Функция за изпращане на имейл за нова поръчка
export const sendOrderEmail = async (orderData) => {
  const { name, email, phone, products, total } = orderData;

  if (!products || !Array.isArray(products)) {
    console.warn("⚠️ products не е масив, имейлът няма да се изпрати правилно.");
    return;
  }

  // Създаваме списък с продукти
  const productList = products
    .map((p) => `${p.name || "Неизвестен продукт"} x${p.quantity || 0}`)
    .join("\n");

  const mailOptions = {
    from: `"Bisante" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL, // твоя имейл за уведомяване
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
    // Можеш да добавиш логика за retry или алтернативен имейл
  }
};

