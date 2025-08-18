import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
          <div className="rounded-lg overflow-hidden order-2 lg:order-1">
        <img
          src="https://images.pexels.com/photos/1250452/pexels-photo-1250452.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Child in need"
          className="w-full h-48 sm:h-64 md:h-auto object-cover rounded-lg transform transition-transform duration-500 hover:scale-105"
        />
          </div>
          
          <div className="order-1 lg:order-2">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-gray-800 leading-tight">Turning Hope into Action – One Cedi at a Time</h2>
        <div className="text-gray-600 space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <p className="font-medium text-base sm:text-lg">
            Welcome to MyEasyDonate – Ghana's Most Trusted Donation Platform.
          </p>
          
          <p className="leading-relaxed text-sm sm:text-base">
            Whether you're raising funds for a loved one's funeral, a Church building project, 
            your Alma mater's anniversary, a life-saving surgery, or a small business dream,
            MyEasyDonate is here to help you make it happen — securely, locally, and globally.
            With just a few taps, you can create your personalized donation campaign and receive 
            contributions from anywhere in the world. From Mobile Money and USSD short codes to 
            card payments and direct bank transfers, we've built a powerful fundraising system 
            made for Ghanaians, by Ghanaians.
          </p>
        </div>
        
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <div className="flex items-start">
            <CheckCircle className="text-primary-500 mr-2 sm:mr-3 mt-1 flex-shrink-0" size={18} />
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          <span className="font-semibold">Local. Global. Limitless.</span><br />
          Whether your supporters are in Kumasi, Kasoa, or Canada, they can easily donate using their preferred method — and you'll get notified instantly.
            </p>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="text-primary-500 mr-2 sm:mr-3 mt-1 flex-shrink-0" size={18} />
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          <span className="font-semibold">Full Transparency. Total Control.</span><br />
          Track every cedi. Download detailed reports. See who gave what, when, and how. Accountability has never been this easy.
            </p>
          </div>
          
          <div className="flex items-start">
            <CheckCircle className="text-primary-500 mr-2 sm:mr-3 mt-1 flex-shrink-0" size={18} />
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          <span className="font-semibold">Bulk SMS with a Human Touch</span><br />
          Send customized reminders and heartfelt "thank you" messages — automatically personalized with each donor's name. No stress, no sweat.
            </p>
          </div>
        </div>
        
        <Link 
          to="/public-campaigns" 
          className="inline-block w-full sm:w-auto text-center px-6 py-3 text-sm sm:text-base bg-[#01b350] hover:bg-[#019a44] text-white rounded-md transition-colors duration-300"
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