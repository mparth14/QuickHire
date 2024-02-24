import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 70%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  border-radius: 16px;
  min-height: 200px;
`;

const Title = styled.h2`
  margin-bottom: 16px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
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
  background-color: #3F51B5;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-top: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #303D85;
  }
`;

const ContactUs = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
    <Container>
      <Title>Contact Us</Title>
      <div style={{display:formVisible ? 'none' : 'block'}}>
      <Form onSubmit={handleSubmit}>
          <Input 
            type="text" 
            name="name" 
            value={formData.name} 
            placeholder='Your name'
            onChange={handleChange} 
            required 
          />
          <Input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder='Your Email address'
            required 
          />
          <Input 
            type="text" 
            name="subject" 
            value={formData.subject} 
            onChange={handleChange} 
            placeholder='Subject Matter'
            required 
          />
          <TextArea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder='Describe the issue you are facing...'
            rows={4}
            required 
          />
        <Button type="submit">Submit</Button>
      </Form>
      </div>
      <div style={{display:formVisible ? 'block' : 'none', textAlign:'center'}}>
        <label>Your issue has been received. We will get back to you!</label>
      </div>
    </Container>
  );
};

export default ContactUs;
