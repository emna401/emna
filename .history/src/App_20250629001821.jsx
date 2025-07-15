import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// 🌌 Animations d'arrière-plan
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const pulseAnimation = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { opacity: 0.3; }
`;

// 🌍 Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: #0a0a0a;
    color: #f0f0f0;
    min-height: 100vh;
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
  }

  ::selection {
    background: #7c3aed;
    color: white;
  }
`;

// ✨ Composants d'arrière-plan animés
const BackgroundElements = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
`;

const FloatingShape = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(124, 58, 237, 0.1);
  animation: ${floatAnimation} ${props => props.duration || '15s'} infinite ease-in-out;
  
  &:nth-child(1) {
    width: 300px;
    height: 300px;
    top: 10%;
    left: 5%;
    animation-duration: 20s;
  }
  
  &:nth-child(2) {
    width: 200px;
    height: 200px;
    top: 60%;
    left: 80%;
    animation-duration: 25s;
  }
  
  &:nth-child(3) {
    width: 150px;
    height: 150px;
    top: 80%;
    left: 20%;
    animation-duration: 18s;
  }
`;

const PulsingDot = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #7c3aed;
  animation: ${pulseAnimation} 4s infinite ease-in-out;
  
  &:nth-child(4) {
    top: 30%;
    left: 90%;
  }
  
  &:nth-child(5) {
    top: 70%;
    left: 10%;
  }
`;

// 🧭 Header & Navigation
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background-color: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
  }
`;

const Title = styled.h1`
  color: #7c3aed;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavButton = styled.button`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 1px;
  color: ${props => props.active ? '#7c3aed' : '#a1a1aa'};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;

  &:hover {
    color: #7c3aed;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: #7c3aed;
    transition: width 0.3s;
  }

  &:hover::after {
    width: 100%;
  }
`;

// 🧱 Main layout
const Main = styled.main`
  width: 100%;
  min-height: calc(100vh - 80px);
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// 📝 Content Styles
const BigTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Paragraph = styled.p`
  color: #d4d4d8;
  font-size: 1.25rem;
  margin: 0.75rem 0;
  max-width: 800px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HighlightText = styled.span`
  color: #7c3aed;
  font-weight: 600;
`;

const StyledButton = styled.button`
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
  color: white;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  border: none;
  margin-top: 2rem;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #a78bfa, #7c3aed);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const AboutContainer = styled.div`
  text-align: left;
  max-width: 800px;
`;

const ProjectItem = styled.div`
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem 0;
  width: 100%;
  max-width: 700px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      <GlobalStyle />
      
      <BackgroundElements>
        <FloatingShape />
        <FloatingShape />
        <FloatingShape />
        <PulsingDot />
        <PulsingDot />
      </BackgroundElements>
      
      <Header>
        <Title>EMNA DAOUD</Title>
        <Nav>
          {['home', 'about', 'projects', 'contact'].map((item) => (
            <NavButton
              key={item}
              onClick={() => setPage(item)}
              active={page === item}
            >
              {item.toUpperCase()}
            </NavButton>
          ))}
        </Nav>
      </Header>

      <Main>
        {page === 'home' && (
          <>
            <BigTitle>HEY, I'M EMNA DAOUD</BigTitle>
            <Paragraph>
              <HighlightText>Web & Mobile Developer</HighlightText> creating efficient, modern, and adaptable
              interfaces that contribute to the success of digital products.
            </Paragraph>
            <StyledButton onClick={() => setPage('projects')}>
              View My Projects
            </StyledButton>
          </>
        )}

        {page === 'about' && (
          <AboutContainer>
            <BigTitle>About Me</BigTitle>
            <Paragraph><HighlightText>Name:</HighlightText> Emna Daoud</Paragraph>
            <Paragraph><HighlightText>Age:</HighlightText> 22</Paragraph>
            <Paragraph><HighlightText>Email:</HighlightText> emnad2400@gmail.com</Paragraph>
            <Paragraph><HighlightText>Phone:</HighlightText> 54460458</Paragraph>
          </AboutContainer>
        )}

        {page === 'projects' && (
          <>
            <BigTitle>My Projects</BigTitle>
            <ProjectItem>
              <Paragraph>📌 <HighlightText>Student Management App</HighlightText> (PHP, MySQL)</Paragraph>
            </ProjectItem>
            <ProjectItem>
              <Paragraph>🛍️ <HighlightText>E-Commerce Website</HighlightText> (HTML, JS, Stripe)</Paragraph>
            </ProjectItem>
            <ProjectItem>
              <Paragraph>📱 <HighlightText>Health Tracker App</HighlightText> (Flutter)</Paragraph>
            </ProjectItem>
          </>
        )}

        {page === 'contact' && (
          <>
            <BigTitle>Contact Me</BigTitle>
            <Paragraph>Email me at <HighlightText>emnad2400@gmail.com</HighlightText></Paragraph>
            <Paragraph>Or call: <HighlightText>54460458</HighlightText></Paragraph>
          </>
        )}
      </Main>
    </>
  );
}