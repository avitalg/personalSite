import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import ReCAPTCHA from 'react-google-recaptcha';

interface ContactFormProps {
  recaptchaKey?: string;
}

export const ContactForm = ({ recaptchaKey }: ContactFormProps = {}) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
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
    
    // Check if reCAPTCHA is required and validated
    if (recaptchaKey && recaptchaRef.current) {
      const recaptchaValue = recaptchaRef.current.getValue();
      if (!recaptchaValue) {
        setFormStatus('error');
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
        return;
      }
    }

    setFormStatus('sending');

    try {
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

      // Include reCAPTCHA v2 token for EmailJS validation
      if (recaptchaKey && recaptchaRef.current) {
        const recaptchaToken = recaptchaRef.current.getValue();
        if (recaptchaToken) {
          emailData['g-recaptcha-response'] = recaptchaToken;
        }
      }

      await emailjs.send(
        serviceId,
        templateId,
        emailData,
        publicKey
      );

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setFormStatus('error');
      
      // Reset reCAPTCHA on error
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      
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
      {recaptchaKey && (
        <div className="form-group recaptcha-wrapper">
          <div className="recaptcha-container">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptchaKey}
              size="normal"
            />
          </div>
        </div>
      )}
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
