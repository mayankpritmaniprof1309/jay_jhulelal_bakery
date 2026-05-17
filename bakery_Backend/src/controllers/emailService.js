const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOrderConfirmationEmail(toEmail, userName, orderDetails) {

  const itemsHTML = orderDetails.items.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>₹${item.price * item.quantity}</td>
    </tr>
  `).join('');

  try {

    const data = await resend.emails.send({

      from: 'Jay Jhulelal Bakery <onboarding@resend.dev>',

      to: toEmail,

      subject: '🎉 Order Confirmed - Jay Jhulelal Bakery',

      html: `
        <div>
          <h1>Thank you, ${userName}! 🧁</h1>

          <table>
            ${itemsHTML}
          </table>

          <h3>Total: ₹${orderDetails.total}</h3>
        </div>
      `,
    });

    console.log('✅ ORDER EMAIL SENT:', data);

  } catch (err) {

    console.error('❌ ORDER EMAIL ERROR:', err);

  }
}

async function sendEmail(to, resetToken) {

  try {

    const data = await resend.emails.send({

      from: 'Jay Jhulelal Bakery <onboarding@resend.dev>',

      to,

      subject: 'Password Reset Code',

      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: auto; background: #fdf5ec; padding: 32px; border-radius: 12px;">

          <h2 style="color: #7a3f10;">Password Reset Request</h2>

          <p style="color: #7a5c38;">
            Use the code below to reset your password.
            It expires in <b>1 hour</b>.
          </p>

          <div style="background: #f0e0c8; border: 1px solid #c09060; border-radius: 8px; padding: 20px; text-align: center; margin: 24px 0;">

            <p style="margin: 0; font-size: 13px; color: #7a5c38; margin-bottom: 8px;">
              Your reset code
            </p>

            <h1 style="margin: 0; color: #7a3f10; font-size: 36px; letter-spacing: 6px;">
              ${resetToken}
            </h1>

          </div>

          <p style="color: #7a5c38; font-size: 13px;">
            If you didn't request this, ignore this email.
          </p>

          <p style="color: #a0642a; font-weight: bold;">
            — Jay Jhulelal Bakery Team
          </p>

        </div>
      `,
    });

    console.log('✅ RESET EMAIL SENT:', data);

  } catch (err) {

    console.error('❌ RESET EMAIL ERROR:', err);

  }
}

module.exports = {
  sendOrderConfirmationEmail,
  sendEmail,
};