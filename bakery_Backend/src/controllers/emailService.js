const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOrderConfirmationEmail(toEmail, userName, orderDetails) {

const itemsHTML = orderDetails.items.map(item => `
  <tr>

    <td style="
      padding: 14px;
      border-bottom: 1px solid #f0e0c8;
      color: #5c3b1e;
    ">
      ${item.name}
    </td>

    <td style="
      padding: 14px;
      border-bottom: 1px solid #f0e0c8;
      text-align: center;
      color: #5c3b1e;
    ">
      ${item.quantity}
    </td>

    <td style="
      padding: 14px;
      border-bottom: 1px solid #f0e0c8;
      text-align: right;
      color: #5c3b1e;
      font-weight: bold;
    ">
      ₹${item.price * item.quantity}
    </td>

  </tr>
`).join('');

  try {

    const data = await resend.emails.send({
      from: 'Jay Jhulelal Bakery <jayjhulelalbakery@gmail.com>',
      to: toEmail,
      subject: '🎉 Order Confirmed - Jay Jhulelal Bakery',
      html: `
        <div style="
    font-family: Georgia, serif;
    max-width: 600px;
    margin: auto;
    background: #fdf5ec;
    padding: 32px;
    border-radius: 14px;
    border: 1px solid #ead7bd;
  ">
    <h1 style="
      color: #7a3f10;
      font-size: 30px;
      margin-bottom: 10px;
    ">
      Thank you, ${userName}! 🧁
    </h1>
    <p style="
      color: #7a5c38;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 24px;
    ">
      Your order has been confirmed successfully.
      We’re already preparing your delicious treats with love ❤️
    </p>
    <table style="
      width: 100%;
      border-collapse: collapse;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
    ">
      <thead>
        <tr style="
          background: #a0642a;
          color: white;
        ">
          <th style="
            padding: 14px;
            text-align: left;
          ">
            Item
          </th>
          <th style="
            padding: 14px;
            text-align: center;
          ">
            Qty
          </th>
          <th style="
            padding: 14px;
            text-align: right;
          ">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        ${itemsHTML}
      </tbody>
    </table>
    <div style="
      margin-top: 28px;
      text-align: right;
    ">
      <h2 style="
        color: #7a3f10;
        margin: 0;
      ">
        Total: ₹${orderDetails.total}
      </h2>
    </div>
    <div style="
      margin-top: 32px;
      background: #fff7ee;
      padding: 18px;
      border-radius: 10px;
      border: 1px solid #f0dcc0;
    ">
      <p style="
        margin: 0;
        color: #7a5c38;
        font-size: 15px;
      ">
        We'll notify you once your order is out for delivery 🚚
      </p>
    </div>
    <p style="
      margin-top: 36px;
      color: #a0642a;
      font-weight: bold;
      font-size: 16px;
    ">
      — Jay Jhulelal Bakery Team
    </p>
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