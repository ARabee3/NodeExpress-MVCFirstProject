// Utils/emailTemplate.js
export const emailTemplate = (token) => {
  const verificationLink = `http://localhost:3000/api/v1/users/verify/${token}`;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Verify Your Email</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
            Welcome to <strong>Note APP</strong>! We're excited to have you on board. 
            Please click the button below to verify your email address and complete your registration.
        </p>
        <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
               style="background-color: #007bff; color: white; padding: 15px 25px; text-decoration: none; font-size: 18px; border-radius: 5px; display: inline-block;">
               Verify My Account
            </a>
        </div>
        <p style="color: #888; font-size: 12px; text-align: center;">
            This link will expire in 1 hour. If you didn't create an account, you can safely ignore this email.
        </p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #aaa; font-size: 10px; text-align: center;">
            &copy; 2026 Note APP. Faisal, Giza, Egypt.
        </p>
    </div>
    `;
};
