const nodemailer=require('nodemailer')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  })

async function sendOrderConfirmationEmail(toEmail, userName, orderDetails) {
  //transporter here,
  

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



async function sendEmail(to, resetToken) {
  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset Code',
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: auto; background: #fdf5ec; padding: 32px; border-radius: 12px;">
        <h2 style="color: #7a3f10;">Password Reset Request</h2>
        <p style="color: #7a5c38;">Use the code below to reset your password. It expires in <b>1 hour</b>.</p>
        
        <div style="background: #f0e0c8; border: 1px solid #c09060; border-radius: 8px; 
                    padding: 20px; text-align: center; margin: 24px 0;">
          <p style="margin: 0; font-size: 13px; color: #7a5c38; margin-bottom: 8px;">Your reset code</p>
          <h1 style="margin: 0; color: #7a3f10; font-size: 36px; letter-spacing: 6px;">${resetToken}</h1>
        </div>

        <p style="color: #7a5c38; font-size: 13px;">If you didn't request this, ignore this email.</p>
        <p style="color: #a0642a; font-weight: bold;">— Jay Jhulelal Bakery Team</p>
      </div>
    `,
  });
}

module.exports={
  sendOrderConfirmationEmail,sendEmail
}