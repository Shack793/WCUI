import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Child in need"
              className="w-full h-auto object-cover rounded-lg transform transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Turning Hope into Action – One Cedi at a Time</h2>
            <div className="text-gray-600 space-y-4 mb-6">
              <p className="font-medium text-lg">
                Welcome to WG Crowdfunding – Ghana's Most Trusted Donation Platform.
              </p>
              
              <p className="leading-relaxed">
                Whether you're raising funds for a loved one's funeral, a Church building project, 
                your Alma mater's anniversary, a life-saving surgery, or a small business dream,
                WG Crowdfunding is here to help you make it happen — securely, locally, and globally.
                With just a few taps, you can create your personalized donation campaign and receive 
                contributions from anywhere in the world. From Mobile Money and USSD short codes to 
                card payments and direct bank transfers, we've built a powerful fundraising system 
                made for Ghanaians, by Ghanaians.
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="text-primary-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700">
                  Local. Global. Limitless.
                  Whether your supporters are in Kumasi, Kasoa, or Canada, they can easily donate using their preferred method — and you’ll get notified instantly.

                </p>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="text-primary-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700">
                  Full Transparency. Total Control.
                  Track every cedi. Download detailed reports. See who gave what, when, and how. Accountability has never been this easy.

                </p>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="text-primary-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <p className="text-gray-700">
                  Bulk SMS with a Human Touch
                  Send customized reminders and heartfelt "thank you" messages — automatically personalized with each donor’s name. No stress, no sweat.

                </p>
              </div>
              
            </div>
            
            <Link 
              to="/public-campaigns" 
              className="btn btn-primary inline-block"
            >
              EXPLORE CAMPAIGNS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;