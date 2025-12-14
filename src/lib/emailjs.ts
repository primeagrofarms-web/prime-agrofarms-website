import emailjs from '@emailjs/browser';

export const EMAILJS_CONFIG = {
  serviceId: 'service_ynetdbe',
  templateId: 'template_py9thzs',
  publicKey: 'n2T0NPcbPQpLurWwH',
};

export const initEmailJS = () => {
  emailjs.init(EMAILJS_CONFIG.publicKey);
};

export const sendContactEmail = async (formData: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: 'primeagrofarmslimited@gmail.com',
      },
      EMAILJS_CONFIG.publicKey
    );
    
    return { success: true, response };
  } catch (error) {
    console.error('EmailJS error:', error);
    return { success: false, error };
  }
};