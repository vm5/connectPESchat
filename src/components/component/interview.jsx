"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import emailjs from 'emailjs-com'; // Import EmailJS
import './styles.css'; // Import the CSS file

export default function ConnectPESChatbot() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    srn: '',
    role: '',
    company: '',
    contactMethod: ''
  });
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for email
    const emailData = {
      name: formData.name,
      srn: formData.srn,
      role: formData.role,
      company: formData.company,
      contactMethod: formData.contactMethod,
    };

    // Log formData to check if it contains expected values
    console.log('Form Data:', formData);

    // Send data via EmailJS
    emailjs.send('service_skcxg47', 'template_9pyhzgb', emailData, 'bZNzwiq7H32zsXN_e')
      .then((response) => {
        console.log('Email sent successfully:', response);
        setStep(2);
        setMessage('Your information was submitted and someone will connect with you shortly.');
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        setMessage('Failed to send your information. Please try again.');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-4 px-2">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden md:flex flex-col w-full md:w-64 p-4 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 text-white">
          <Button variant="ghost" className="flex items-center gap-2 px-2 text-left">
            <div className="flex items-center justify-center rounded-full w-8 h-8 bg-gray-200">
              <BotIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-sm text-gray-700">ConnectPES</div>
          </Button>
          <div className="mt-4">
            <p className="text-gray-100">Welcome to ConnectPES! This form helps you connect with PES Alumni for obtaining suitable information about the organization you are thinking of applying for. Please enter the following details:</p>
          </div>
        </div>
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {step === 1 ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Full Name:</label>
                <Textarea name="name" value={formData.name} onChange={handleChange} required className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your SRN:</label>
                <Textarea name="srn" value={formData.srn} onChange={handleChange} required className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">The role you are interviewing for:</label>
                <Textarea name="role" value={formData.role} onChange={handleChange} required className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">The company you are applying for:</label>
                <Textarea name="company" value={formData.company} onChange={handleChange} required className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your preferred contact method:</label>
                <Textarea name="contactMethod" value={formData.contactMethod} onChange={handleChange} required className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 w-full" />
              </div>
              <Button type="submit" className="w-full mt-4 bg-blue-600 text-white hover:bg-blue-700">Submit</Button>
            </form>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-800">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BotIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  );
}
