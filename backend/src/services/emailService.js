const nodemailer = require('nodemailer');
const logger = require('../utils/logger');

/**
 * Create email transport for sending emails
 */
const createTransport = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

/**
 * Send email
 * @param {Object} options - Email options
 * @returns {Promise} - Resolves with info about the sent email
 */
const sendEmail = async (options) => {
  try {
    const transporter = createTransport();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"NeoGold" <noreply@neogold.com>',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html
    };
    
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

/**
 * Send welcome email to new users
 * @param {String} email - User email
 * @param {Object} data - Data for email template
 */
const sendWelcomeEmail = async (email, data) => {
  const subject = 'Welcome to NeoGold - Your Digital Gold Platform';
  
  const text = `
    Welcome to NeoGold, ${data.firstName}!
    
    Thank you for registering with NeoGold, your trusted platform for digital gold investments.
    
    With NeoGold, you can:
    - Buy gold at competitive prices
    - Sell your gold when you need to
    - Redeem your digital gold for physical gold products
    
    Get started by completing your KYC and adding your bank details.
    
    If you have any questions, please contact our support team at support@neogold.com.
    
    Best regards,
    The NeoGold Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Welcome to NeoGold, ${data.firstName}!</h2>
      
      <p>Thank you for registering with NeoGold, your trusted platform for digital gold investments.</p>
      
      <p>With NeoGold, you can:</p>
      <ul>
        <li>Buy gold at competitive prices</li>
        <li>Sell your gold when you need to</li>
        <li>Redeem your digital gold for physical gold products</li>
      </ul>
      
      <p>Get started by completing your KYC and adding your bank details.</p>
      
      <p>If you have any questions, please contact our support team at <a href="mailto:support@neogold.com">support@neogold.com</a>.</p>
      
      <p>Best regards,<br>The NeoGold Team</p>
    </div>
  `;
  
  await sendEmail({
    to: email,
    subject,
    text,
    html
  });
};

/**
 * Send password reset email
 * @param {String} email - User email
 * @param {Object} data - Data for email template
 */
const sendPasswordResetEmail = async (email, data) => {
  const subject = 'NeoGold - Password Reset';
  
  const text = `
    You are receiving this email because you (or someone else) has requested to reset your password.
    
    Please click the link below to reset your password:
    ${data.resetUrl}
    
    This link will expire in 10 minutes.
    
    If you did not request this, please ignore this email and your password will remain unchanged.
    
    Best regards,
    The NeoGold Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Password Reset</h2>
      
      <p>You are receiving this email because you (or someone else) has requested to reset your password.</p>
      
      <p>Please click the button below to reset your password:</p>
      
      <p>
        <a href="${data.resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #DAA520; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
      </p>
      
      <p>This link will expire in 10 minutes.</p>
      
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      
      <p>Best regards,<br>The NeoGold Team</p>
    </div>
  `;
  
  await sendEmail({
    to: email,
    subject,
    text,
    html
  });
};

/**
 * Send transaction confirmation email
 * @param {String} email - User email
 * @param {Object} data - Transaction data
 */
const sendTransactionConfirmationEmail = async (email, data) => {
  const subject = `NeoGold - ${data.type} Transaction ${data.status}`;
  
  const text = `
    Dear ${data.name},
    
    Your ${data.type} transaction has been ${data.status.toLowerCase()}.
    
    Transaction Details:
    - Transaction ID: ${data.transactionId}
    - Date: ${data.date}
    - Amount: ${data.amount}
    - Gold Weight: ${data.weight} grams
    
    ${data.additionalInfo || ''}
    
    Thank you for choosing NeoGold.
    
    Best regards,
    The NeoGold Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Transaction ${data.status}</h2>
      
      <p>Dear ${data.name},</p>
      
      <p>Your ${data.type} transaction has been ${data.status.toLowerCase()}.</p>
      
      <h3>Transaction Details:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Transaction ID:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.transactionId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Date:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.date}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Amount:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.amount}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Gold Weight:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.weight} grams</td>
        </tr>
      </table>
      
      ${data.additionalInfo ? `<p>${data.additionalInfo}</p>` : ''}
      
      <p>Thank you for choosing NeoGold.</p>
      
      <p>Best regards,<br>The NeoGold Team</p>
    </div>
  `;
  
  await sendEmail({
    to: email,
    subject,
    text,
    html
  });
};

/**
 * Send KYC status update email
 * @param {String} email - User email
 * @param {Object} data - KYC data
 */
const sendKycStatusEmail = async (email, data) => {
  const subject = `NeoGold - KYC Verification ${data.status}`;
  
  let statusMessage = '';
  if (data.status === 'VERIFIED') {
    statusMessage = 'Your KYC verification has been completed successfully. You can now use all features of NeoGold.';
  } else if (data.status === 'REJECTED') {
    statusMessage = `Your KYC verification has been rejected. Reason: ${data.reason}. Please update your KYC information and try again.`;
  }
  
  const text = `
    Dear ${data.name},
    
    ${statusMessage}
    
    If you have any questions, please contact our support team at support@neogold.com.
    
    Best regards,
    The NeoGold Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>KYC Verification ${data.status}</h2>
      
      <p>Dear ${data.name},</p>
      
      <p>${statusMessage}</p>
      
      <p>If you have any questions, please contact our support team at <a href="mailto:support@neogold.com">support@neogold.com</a>.</p>
      
      <p>Best regards,<br>The NeoGold Team</p>
    </div>
  `;
  
  await sendEmail({
    to: email,
    subject,
    text,
    html
  });
};

/**
 * Send redemption dispatch notification email
 * @param {String} email - User email
 * @param {Object} data - Redemption data
 */
const sendRedemptionDispatchEmail = async (email, data) => {
  const subject = 'NeoGold - Your Gold Redemption has been Dispatched';
  
  const text = `
    Dear ${data.name},
    
    Your gold redemption order has been dispatched and is on its way to you!
    
    Redemption Details:
    - Redemption ID: ${data.redemptionId}
    - Product: ${data.product}
    - Quantity: ${data.quantity}
    - Weight: ${data.weight} grams
    
    Shipping Details:
    - Courier: ${data.courier}
    - Tracking Number: ${data.trackingNumber}
    - Estimated Delivery Date: ${data.estimatedDelivery}
    
    You can track your shipment using the tracking number above.
    
    If you have any questions, please contact our support team at support@neogold.com.
    
    Thank you for choosing NeoGold.
    
    Best regards,
    The NeoGold Team
  `;
  
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Your Gold Redemption has been Dispatched</h2>
      
      <p>Dear ${data.name},</p>
      
      <p>Your gold redemption order has been dispatched and is on its way to you!</p>
      
      <h3>Redemption Details:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Redemption ID:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.redemptionId}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Product:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.product}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Quantity:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.quantity}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Weight:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.weight} grams</td>
        </tr>
      </table>
      
      <h3>Shipping Details:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Courier:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.courier}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Tracking Number:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.trackingNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Estimated Delivery Date:</strong></td>
          <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.estimatedDelivery}</td>
        </tr>
      </table>
      
      <p>You can track your shipment using the tracking number above.</p>
      
      <p>If you have any questions, please contact our support team at <a href="mailto:support@neogold.com">support@neogold.com</a>.</p>
      
      <p>Thank you for choosing NeoGold.</p>
      
      <p>Best regards,<br>The NeoGold Team</p>
    </div>
  `;
  
  await sendEmail({
    to: email,
    subject,
    text,
    html
  });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendTransactionConfirmationEmail,
  sendKycStatusEmail,
  sendRedemptionDispatchEmail
}; 