"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import emailjs from 'emailjs-com'; // Import EmailJS
import './styles.css'; // Import the CSS file
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SideComponent = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 260px;
    padding: 1rem;
    background: linear-gradient(to right, #ff7e5f, #feb47b);
    color: white;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }
`;

const FormContainer = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    padding: 3rem;
  }
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const TextareaStyled = styled(Textarea)`
  margin-top: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 500px;
  font-size: 1rem;
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  font-size: 1rem;
  color: #333;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

export default function ConnectPESChatbot() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    srn: '',
    idCard: null,
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
    <Container>
      <MainContent>
        <SideComponent>
          <Button variant="ghost" className="justify-start w-full gap-2 px-2 text-left">
            <div className="flex items-center justify-center rounded-full w-7 h-7 bg-gray-200">
              <BotIcon className="w-4 h-4 text-blue-600" />
            </div>
            <div className="overflow-hidden text-sm grow text-ellipsis whitespace-nowrap text-gray-700">ConnectPES</div>
          </Button>
          <div className="mt-4 text-gray-600">
            <p>Welcome to ConnectPES! This form helps you connect with PES Alumni for obtaining suitable information about the organization you are thinking of applying for. Please enter the following details:</p>
          </div>
        </SideComponent>
        <FormContainer>
          {step === 1 ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your Full Name:</label>
                <TextareaStyled name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your SRN:</label>
                <TextareaStyled name="srn" value={formData.srn} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">The organization you want to know more about. Please specify what kind of information do you want to know as well:</label>
                <TextareaStyled name="company" value={formData.company} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Your preferred contact method (if email then specify your email, if phone then specify your number of if you wish to be connected via another method then specify the same along with the details):</label>
                <TextareaStyled name="contactMethod" value={formData.contactMethod} onChange={handleChange} required />
              </div>
              <SubmitButton type="submit">Submit</SubmitButton>
            </form>
          ) : (
            <div className="text-center">
              <Message>{message}</Message>
            </div>
          )}
        </FormContainer>
      </MainContent>
    </Container>
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
