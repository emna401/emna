import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// 🌍 Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', sans-serif;
    background-color: #0f172a;
    color: white;
    min-height: 100vh;
  }

  * {
    box-sizing: border-box;
  }
`;

// 🧭 Header & Navigation
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #1e293b;
  border-bottom: 1px solid #334155;
  position: sticky;
  top: 0;
  z-index: 40;
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const Title = styled.h1`
  color: #facc15;
  font-size: 1.25rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavButton = styled.button`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${(props) => (props.active ? '#facc15' : '#94a3b8')};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.3s;

  &:hover {
    color: #fbbf24;
  }
`;

// 🧱 Main layout - full width and height
const Main = styled.main`
  width: 100%;
  min-height: calc(100vh - 73px);
  padding: 4rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

// 📝 Content Styles
const BigTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  color: #cbd5e1;
  font-size: 1.125rem;
  margin: 0.5rem 0;
  max-width: 800px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const StyledButton = styled.button`
  background-color: #facc15;
  color: black;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  border: none;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;

  &:hover {
    background-color: #fbbf24;
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.5rem;
  }
`;

export default function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      <GlobalStyle />
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
              Web & Mobile Developer creating efficient, modern, and adaptable
              interfaces that contribute to the success of digital products.
            </Paragraph>
            <StyledButton onClick={() => setPage('projects')}>
              View My Projects
            </StyledButton>
          </>
        )}

        {page === 'about' && (
          <>
            <BigTitle>About Me</BigTitle>
            <Paragraph><strong>Name:</strong> Emna Daoud</Paragraph>
            <Paragraph><strong>Age:</strong> 22</Paragraph>
            <Paragraph><strong>Email:</strong> emnad2400@gmail.com</Paragraph>
            <Paragraph><strong>Phone:</strong> 54460458</Paragraph>
          </>
        )}

        {page === 'projects' && (
          <>
            <BigTitle>My Projects</BigTitle>
            <Paragraph>📌 Student Management App (PHP, MySQL)</Paragraph>
            <Paragraph>🛍️ E-Commerce Website (HTML, JS, Stripe)</Paragraph>
            <Paragraph>📱 Health Tracker App (Flutter)</Paragraph>
          </>
        )}

        {page === 'contact' && (
          <>
            <BigTitle>Contact Me</BigTitle>
            <Paragraph>Email me at emnad2400@gmail.com</Paragraph>
            <Paragraph>Or call: 54460458</Paragraph>
          </>
        )}
      </Main>
    </>
  );
}