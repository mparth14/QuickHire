import React, { useState } from 'react';
import styled from 'styled-components';
import { Parallax } from "react-parallax";
import ThumbsUp from './ContactUsAssets/thumbs-up.png';
import bgImg from "./ContactUsAssets/ContactUsWallpaper.png";
import './ContactUs.css'

const Container = styled.div`
  margin: 0 auto;
  padding-left: 20%;
  padding-right: 20%;
  padding-top: 1%;
  background-image: url('https://drive.google.com/file/d/1n6KvmOFwDX0yf_lG4x06FPxeFDuiD7ZE/view?usp=sharing');
  background-size: cover;
  background-position: center;
`;

const Title = styled.h1`
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: left;
  color: #FFF;
`;

const SubTitle = styled.h3`
  margin-top: 16px;
  text-align: left;
  margin 16px;
  color: #FFF;
`;

const FieldParent = styled.h2`
  margin-top: 20px;
  text-align: left;
  color: #FFF;
`;

const IssueReceivedText = styled.h3`
  margin-top: 20px;
  text-align: center;
  color: #3F51B5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const Image = styled.img`
  max-width: 30%;
  max-height: 30%;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 8px;
  font-size: 16px;
  border: 1px solid #3F51B5;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  padding: 8px;
  margin-top: 8px;
  font-size: 16px;
  border: 1px solid #3F51B5;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #FFF;
  color: #3F51B5;
  border: none;
  border-radius: 4px;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #F6F6F6;
  }
`;

const ContactUs = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    usage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUsageChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      usage: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setFormVisible(true);
  };

  return (
    <Parallax bgImage={bgImg} strength={800}>
      <Container>
      <Title style={{display:formVisible ? 'none' : 'block'}}>Get in touch..</Title>
      <SubTitle style={{display:formVisible ? 'none' : 'block'}}>At QuickHire, customer satisfaction stands as our paramount priority. We prioritize every interaction, service, and product with an unwavering commitment to exceed our customers' expectations.</SubTitle>
      <div></div>
      <SubTitle style={{display:formVisible ? 'none' : 'block'}}>Our dedication to excellence permeates every aspect of our operations, ensuring that each client receives personalized attention, swift resolution of concerns, and exceptional quality in every service or product they encounter.</SubTitle>
      <div style={{display:formVisible ? 'none' : 'block'}}>
      <Form onSubmit={handleSubmit}>
        <FieldParent>Your Name:</FieldParent>
        <SubTitle>Please privide your name so we can identify you as a customer going forward.</SubTitle>
          <Input 
            type="text" 
            name="name" 
            value={formData.name} 
            placeholder='Your name'
            onChange={handleChange} 
            required 
          />
        <FieldParent>Your Email:</FieldParent>
        <SubTitle>Please privide your email which would be exclusively used to contact you to solve your query.</SubTitle>
          <Input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder='Email address'
            required 
          />
          <FieldParent>How do you use QuickHire?</FieldParent>
          <SubTitle>Please select one.</SubTitle>
            <div className='radioBtns'>
              <div className='radioBtnLabelDiv'>
            <label className='radioBtnLabel'>
              <input
                type="radio"
                name="usage"
                value="consumer"
                checked={formData.usage === 'consumer'}
                onChange={handleUsageChange}
              /> As a consumer
            </label>
            </div>
            <div className='radioBtnLabelDiv'>
            <label className='radioBtnLabel'>
              <input
                className='radioBtnLabel'
                type="radio"
                name="usage"
                value="serviceProvider"
                checked={formData.usage === 'serviceProvider'}
                onChange={handleUsageChange}
              /> As a Service Provider
            </label>
            </div>
            </div>
        <FieldParent>Subject:</FieldParent>
        <SubTitle>Please enter the subject matter of you reaching out to us.</SubTitle>
          <Input 
            type="text" 
            name="subject" 
            value={formData.subject} 
            onChange={handleChange} 
            placeholder='Subject Matter'
            required 
          />
        <SubTitle>Please describe the issue you are having below.</SubTitle>
          <TextArea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder='Describe the issue you are facing'
            rows={4}
            required 
          />
        <Button type="submit">Submit</Button>
      </Form>
      </div>
      <div style={{display:formVisible ? 'block' : 'none', textAlign:'center'}}>
        <div>
      <Image src={ThumbsUp} alt="Thumbs up" />
        </div>
        <IssueReceivedText>Your issue has been received. We will get back to you!</IssueReceivedText>
      </div>
    </Container>
    </Parallax>
  );
};

export default ContactUs;
