import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Replace with your actual API endpoint
      // const response = await axios.post('/api/contact', formData);
      
      // Simulate API call for demo
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Maps component
  const GoogleMapComponent = () => (
    <div className="w-full h-80 bg-blue-200 rounded-lg overflow-hidden">
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 text-white">
        <div className="text-center">
          <MapPin className="w-12 h-12 mx-auto mb-2" />
          <p className="text-lg font-medium">Google Maps Integration</p>
          <p className="text-sm opacity-90">Replace with actual Google Maps component</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow bg-gray-50">
         {/* Hero Section with Wavy Border */}
      <div className="relative">
        <div 
          className="relative h-64 bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1200')",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="text-center z-10 text-white">
            <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
            <nav className="text-lg">
             
            </nav>
          </div>
        </div>

        {/* Wavy Border */}
       {/*  <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div> */}
      </div>
        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch With Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Connect with us easily through our 'Contact Us' page. Reach out for 
              inquiries, collaborations, or any assistance you may need.
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#37b7ff20' }}
              >
                <MapPin className="w-8 h-8" style={{ color: '#37b7ff' }} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Address:</h3>
              <p className="text-gray-600">USA, Florida, 100 Old City House</p>
            </div>

            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#37b7ff20' }}
              >
                <Mail className="w-8 h-8" style={{ color: '#37b7ff' }} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email Address:</h3>
              <p className="text-gray-600">example@example.com</p>
            </div>

            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: '#37b7ff20' }}
              >
                <Phone className="w-8 h-8" style={{ color: '#37b7ff' }} />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Phone:</h3>
              <p className="text-gray-600">+1234 567 890</p>
            </div>
          </div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div 
                className="text-white p-4 rounded-t-lg"
                style={{ backgroundColor: '#37b7ff' }}
              >
                <h3 className="text-xl font-semibold">We are waiting to hear from you</h3>
              </div>
              <div className="bg-white p-8 rounded-b-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-colors"
                        style={{ 
                          borderColor: formData.fullName ? '#37b7ff' : '#d1d5db'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#37b7ff'}
                        onBlur={(e) => e.target.style.borderColor = formData.fullName ? '#37b7ff' : '#d1d5db'}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-colors"
                        style={{ 
                          borderColor: formData.email ? '#37b7ff' : '#d1d5db'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#37b7ff'}
                        onBlur={(e) => e.target.style.borderColor = formData.email ? '#37b7ff' : '#d1d5db'}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-colors"
                      style={{ 
                        borderColor: formData.subject ? '#37b7ff' : '#d1d5db'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#37b7ff'}
                      onBlur={(e) => e.target.style.borderColor = formData.subject ? '#37b7ff' : '#d1d5db'}
                      placeholder="Enter the subject"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none transition-colors resize-vertical"
                      style={{ 
                        borderColor: formData.message ? '#37b7ff' : '#d1d5db'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#37b7ff'}
                      onBlur={(e) => e.target.style.borderColor = formData.message ? '#37b7ff' : '#d1d5db'}
                      placeholder="Enter your message"
                      required
                    />
                  </div>

                  {submitMessage && (
                    <div 
                      className="p-4 rounded-lg"
                      style={
                        submitMessage.includes('error') 
                          ? { backgroundColor: '#fef2f2', color: '#dc2626' }
                          : { backgroundColor: '#37b7ff20', color: '#37b7ff' }
                      }
                    >
                      {submitMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                    style={{ 
                      backgroundColor: isSubmitting ? '#37b7ff80' : '#37b7ff',
                      opacity: isSubmitting ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting && e.target instanceof HTMLElement) {
                        e.target.style.backgroundColor = '#2da5e8';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting && e.target instanceof HTMLElement) {
                        e.target.style.backgroundColor = '#37b7ff';
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Map Section */}
            <div>
              <GoogleMapComponent />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage; 