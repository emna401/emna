import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

// Global Styles
const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Inter', sans-serif;
    background-color: #0a0a0a;
    color: #f0f0f0;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

// Background Elements
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(124, 58, 237, 0.1);
    border-radius: 50%;
    top: 20%;
    left: 10%;
    animation: ${float} 15s infinite ease-in-out;
  }

  &::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(124, 58, 237, 0.1);
    border-radius: 50%;
    bottom: 15%;
    right: 10%;
    animation: ${float} 20s infinite ease-in-out;
  }
`;

// Layout Components
const Header = styled.header`
  padding: 1.5rem 3rem;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FullHeightSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Title = styled.h1`
  color: #7c3aed;
  font-size: 1.8rem;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? '#7c3aed' : '#a1a1aa'};
  font-weight: 600;
  cursor: pointer;
  padding: 0.5rem 0;
  position: relative;
  font-size: 1rem;

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

const HeroTitle = styled.h2`
  font-size: 3.5rem;
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

const HeroText = styled.p`
  font-size: 1.25rem;
  color: #d4d4d8;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-3px);
  }
`;

const AboutSection = styled.div`
  text-align: left;
  max-width: 800px;
  width: 100%;
`;

const InfoItem = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;

  strong {
    color: #7c3aed;
  }
`;

const ProjectsSection = styled.div`
  width: 100%;
  max-width: 800px;
`;

const ProjectCard = styled.div`
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export default function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <>
      <GlobalStyle />
      <Background />
      
      <Header>
        <Nav>
          <Title>EMMA DAOUD</Title>
          <NavLinks>
            {['home', 'about', 'projects', 'contact'].map((page) => (
              <NavLink 
                key={page}
                active={activePage === page}
                onClick={() => setActivePage(page)}
              >
                {page.toUpperCase()}
              </NavLink>
            ))}
          </NavLinks>
        </Nav>
      </Header>

      <MainContent>
        {activePage === 'home' && (
          <FullHeightSection>
            <HeroTitle>HEY, I'M EMMA DAOUD</HeroTitle>
            <HeroText>
              Web & Mobile Developer creating efficient, modern, and adaptable
              interfaces that contribute to the success of digital products.
            </HeroText>
            <PrimaryButton onClick={() => setActivePage('projects')}>
              View My Projects
            </PrimaryButton>
          </FullHeightSection>
        )}

        {activePage === 'about' && (
          <FullHeightSection>
            <AboutSection>
              <HeroTitle>About Me</HeroTitle>
              <InfoItem><strong>Name:</strong> Emma Daoud</InfoItem>
              <InfoItem><strong>Age:</strong> 22</InfoItem>
              <InfoItem><strong>Email:</strong> emnad2400@gmail.com</InfoItem>
              <InfoItem><strong>Phone:</strong> 54460458</InfoItem>
            </AboutSection>
          </FullHeightSection>
        )}

        {activePage === 'projects' && (
          <FullHeightSection>
            <ProjectsSection>
              <HeroTitle>My Projects</HeroTitle>
              <ProjectCard>
                <InfoItem>📌 <strong>Student Management App</strong> (PHP, MySQL)</InfoItem>
              </ProjectCard>
              <ProjectCard>
                <InfoItem>🛍️ <strong>E-Commerce Website</strong> (HTML, JS, Stripe)</InfoItem>
              </ProjectCard>
              <ProjectCard>
                <InfoItem>📱 <strong>Health Tracker App</strong> (Flutter)</InfoItem>
              </ProjectCard>
            </ProjectsSection>
          </FullHeightSection>
        )}

        {activePage === 'contact' && (
          <FullHeightSection>
            <HeroTitle>Contact Me</HeroTitle>
            <InfoItem>Email me at <strong>emnad2400@gmail.com</strong></InfoItem>
            <InfoItem>Or call: <strong>54460458</strong></InfoItem>
          </FullHeightSection>
        )}
      </MainContent>
    </>
  );
}