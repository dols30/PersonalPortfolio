// EmailJS Configuration
// These values are from EmailJS dashboard (https://dashboard.emailjs.com)
// 1. Create a free account at https://www.emailjs.com/
// 2. Add an Email Service (Gmail, Outlook, etc.) from the "Email Services" tab
// 3. Create an Email Template with these parameters:
//    - {{from_name}} - Sender's name
//    - {{email}} - Sender's email
//    - {{subject}} - Message subject
//    - {{message}} - Message content
//    - {{to_email}} - Recipient's email (nishank.paudel1@gmail.com)
// 4. In the template HTML, make sure the "To Email" is set to use the {{to_email}} parameter
// 5. Get your User ID from Integration > API Keys section
export const emailjsConfig = {
  serviceId: "service_09d3wzq", // From the Email Services tab
  templateId: "template_bxkdwnn", // From the Email Templates tab
  publicKey: "SdK3PnLIaTZ_zBlwD", // From Account > API Keys
}; 