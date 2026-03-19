/**
 * Password reset email template
 * Sent to users when they request a password reset
 * Colors: Primary #C87941, White #FAF8F5
 */
export const getResetPasswordEmailTemplate = (params: { url: string }) => {
  const { url } = params;

  return {
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5; color: #1a1a1a;">
  <!-- Container -->
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    
    <!-- Logo -->
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="display: inline-flex; align-items: center; justify-content: center; background-color: #ffffff; border-radius: 12px; padding: 8px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
          <path d="M22 46V18h10c3.5 0 6.3 1.2 8.4 3.5 2.1 2.3 3.1 5.2 3.1 8.5s-1 6.2-3.1 8.5C38.3 40.8 35.5 42 32 42h-4" stroke="#C87941" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <circle cx="44" cy="20" r="3" fill="#FFD700"/>
        </svg>
        <span style="font-size: 18px; font-weight: 700; color: #C87941; letter-spacing: -0.5px;">Pictura AI</span>
      </div>
    </div>

    <!-- Card -->
    <div style="background: #ffffff; border-radius: 20px; padding: 40px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.02);">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #111827; font-size: 24px; font-weight: 700; margin: 0 0 12px 0; letter-spacing: -0.5px;">
          Reset Your Password
        </h1>
        <p style="color: #6b7280; font-size: 16px; margin: 0; line-height: 1.5;">
          No worries, we'll help you get back on track.
        </p>
      </div>

      <!-- Content -->
      <div style="color: #374151; font-size: 16px; line-height: 1.6;">
        <p style="margin: 0 0 24px 0; text-align: center;">
          You recently requested to reset your password for your Pictura AI account. Click the button below to proceed.
        </p>

        <!-- Button -->
        <div style="text-align: center; margin: 32px 0;">
          <a href="${url}" target="_blank"
             style="display: inline-block; background-color: #C87941; color: #FAF8F5; text-decoration: none; padding: 16px 36px; border-radius: 14px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(200,121,65,0.3);">
            Reset Password
          </a>
        </div>

        <!-- Security Note -->
        <div style="background-color: #fdf8f4; border-radius: 12px; padding: 16px; margin-bottom: 24px; border: 1px solid #f3e8dc;">
          <p style="color: #6b7280; font-size: 13px; margin: 0; text-align: center; line-height: 1.5;">
            If you did not request a password reset, please ignore this email or contact support if you have concerns.
          </p>
        </div>
      </div>

      <!-- Divider -->
      <div style="border-top: 1px solid #e5e7eb; margin: 32px 0;"></div>

      <!-- Fallback Link -->
      <div style="text-align: center;">
        <p style="color: #9ca3af; font-size: 13px; margin: 0 0 8px 0;">
          Trouble clicking the button? Copy and paste the URL below:
        </p>
        <a href="${url}" style="color: #C87941; font-size: 13px; text-decoration: none; word-break: break-all; display: block; line-height: 1.4;">
          ${url}
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px;">
      <p style="color: #a1a1aa; font-size: 13px; margin: 0;">
        © ${new Date().getFullYear()} Imoogle Technology. All rights reserved.
      </p>
      <p style="color: #a1a1aa; font-size: 12px; margin: 8px 0 0 0;">
        Pictura AI - Where Agents Collaborate
      </p>
    </div>
  </div>
</body>
</html>
    `,
    subject: 'Reset Your Password - Pictura AI',
    text: `Reset your password by clicking this link: ${url}`,
  };
};
