import nodemailer from 'nodemailer'

export const sendOrderConfirmationEmail = async (toEmail, userName, orderDetails) => {
  //transporter here,
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  })

  const itemsHTML = orderDetails.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e0d0b0;">${item.name}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e0d0b0; text-align:center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e0d0b0; text-align:right;">₹${item.price * item.quantity}</td>
    </tr>
  `).join('')

  await transporter.sendMail({
    from: `"Jay Jhulelal Bakery" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: '🎉 Order Confirmed - Jay Jhulelal Bakery',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: auto; background: #fdf5ec; padding: 32px; border-radius: 12px;">
        <h1 style="color: #7a3f10; font-size: 26px;">Thank you, ${userName}! 🧁</h1>
        <p style="color: #7a5c38;">Your order has been confirmed. Here's your summary:</p>

        <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr style="background: #a0642a; color: white;">
              <th style="padding: 10px; text-align:left;">Item</th>
              <th style="padding: 10px; text-align:center;">Qty</th>
              <th style="padding: 10px; text-align:right;">Price</th>
            </tr>
          </thead>
          <tbody>${itemsHTML}</tbody>
        </table>

        <h3 style="color: #7a3f10; text-align: right;">Total: ₹${orderDetails.total}</h3>
        <p style="color: #7a5c38; font-size: 13px;">We'll notify you once your order is out for delivery.</p>
        <p style="color: #a0642a; font-weight: bold;">— Jay Jhulelal Bakery Team</p>
      </div>
    `
  })
}