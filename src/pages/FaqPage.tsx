"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItem {
  id: number
  question: string
  answer: string
}

const FaqPage: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<number | null>(1)

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What is crowdfunding?",
      answer:
        "Crowdfunding is a method of raising funds from a large number of people, typically via online platforms. It allows individuals, businesses, or organizations to present their projects, causes, or ventures to a wide audience, inviting contributions from interested individuals, known as backers or supporters.",
    },
    {
      id: 2,
      question: "How does crowdfunding work?",
      answer:
        "Crowdfunding works by allowing project creators to set up campaigns on online platforms where they describe their project, set funding goals, and offer rewards or incentives to backers. People can then contribute money to support projects they find interesting or valuable.",
    },
    {
      id: 3,
      question: "What types of crowdfunding are there?",
      answer:
        "There are several types of crowdfunding including reward-based crowdfunding, equity crowdfunding, donation-based crowdfunding, and debt crowdfunding. Each type serves different purposes and offers different benefits to both creators and backers.",
    },
    {
      id: 4,
      question: "What are the benefits of crowdfunding?",
      answer:
        "Crowdfunding offers benefits such as access to capital without traditional loans, market validation, building a community around your project, and retaining control over your business while gaining valuable feedback from potential customers.",
    },
    {
      id: 5,
      question: "Are there risks involved in crowdfunding?",
      answer:
        "Yes, crowdfunding involves risks such as not reaching funding goals, potential delays in project delivery, intellectual property concerns, and the challenge of managing backer expectations and communications throughout the campaign.",
    },
  ]

  const toggleExpanded = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
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
            <h1 className="text-5xl font-bold mb-4">FAQ</h1>
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
      <main className="flex-grow bg-gray-50 py-16">
        <div className="container-custom max-w-4xl mx-auto px-4">
          {/* FAQ Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Question</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find quick answers to commonly asked questions on our FAQ page. From inquiries about our services to
              details on how to get started.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <button
                  onClick={() => toggleExpanded(item.id)}
                  className={`w-full px-6 py-4 text-left flex items-center justify-between transition-colors duration-200 ${
                    expandedItem === item.id ? "text-white" : "bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                  style={{
                    backgroundColor: expandedItem === item.id ? "#005da7" : "white"
                  }}
                >
                  <span className="font-medium">{item.question}</span>
                  {expandedItem === item.id ? (
                    <ChevronUp className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 flex-shrink-0" />
                  )}
                </button>

                {expandedItem === item.id && (
                  <div className="px-6 py-4 bg-white border-t border-gray-100">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default FaqPage
