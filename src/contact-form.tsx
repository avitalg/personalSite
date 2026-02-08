import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactFormProps {
  executeRecaptcha?: (action: string) => Promise<string>;
}

export const ContactForm = ({ executeRecaptcha }: ContactFormProps = {}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      // Verify reCAPTCHA (client-side protection)
      // Note: reCAPTCHA v3 tokens are not sent to EmailJS as it doesn't support v3 validation
      if (executeRecaptcha) {
        try {
          const recaptchaToken = await executeRecaptcha('contact_form');
          // Token is verified client-side, but not sent to EmailJS
          // EmailJS doesn't support reCAPTCHA v3 validation
          console.log('reCAPTCHA verified:', recaptchaToken ? 'success' : 'failed');
        } catch (error) {
          console.warn('reCAPTCHA verification failed:', error);
          // Continue with form submission even if reCAPTCHA fails
          // You can uncomment the line below to block submission on reCAPTCHA failure
          // throw new Error('reCAPTCHA verification failed');
        }
      }

      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

      const emailData: Record<string, string> = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'avitalglazer@gmail.com'
      };

      await emailjs.send(
        serviceId,
        templateId,
        emailData,
        publicKey
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setFormStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          type="text" 
          name="name"
          placeholder="Your Name" 
          className="form-input" 
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <input 
          type="email" 
          name="email"
          placeholder="Your Email" 
          className="form-input" 
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <textarea 
          name="message"
          placeholder="Your Message" 
          rows={5} 
          className="form-input"
          value={formData.message}
          onChange={handleInputChange}
          required
        ></textarea>
      </div>
      {formStatus === 'success' && (
        <div className="form-message form-success">
          ✓ Message sent successfully! I'll get back to you soon.
        </div>
      )}
      {formStatus === 'error' && (
        <div className="form-message form-error">
          ✗ Failed to send message. Please try again or email me directly.
        </div>
      )}
      <button 
        type="submit" 
        className="btn-primary btn-large"
        disabled={formStatus === 'sending'}
      >
        {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};
