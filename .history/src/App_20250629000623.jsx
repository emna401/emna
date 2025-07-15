import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', sans-serif;
    background-color: #0f172a;
    color: white;
  }
`;

// Styled components
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
`;

const Title = styled.h1`
  color: #facc15;
  font-size: 1.25rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavButton = styled.button`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 0.875rem;
  color: ${props => props.active ? '#facc15' : '#94a3b8'};
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: #fbbf24;
  }
`;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  text-align: center;
`;

const BigTitle = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  color: #cbd5e1;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const StyledButton = styled.button`
  background-color: #facc15;
  color: black;
  font-weight: 600;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #fbbf24;
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
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavButton>
          ))}
        </Nav>
      </Header>

      <Main>
        {page === 'home' && (
          <>
            <BigTitle>HEY, I'M EMNA DAOUD</BigTitle>
            <Paragraph>
              Web & Mobile Developer creating efficient, modern, and adaptable interfaces that contribute to the success of digital products.
            </Paragraph>
            <StyledButton onClick={() => setPage('projects')}>
              View My Projects
            </StyledButton>
          </>
        )}

        {page === 'about' && (
          <>
            <BigTitle>About Me</BigTitle>
            <Paragraph>Name: Emna Daoud</Paragraph>
            <Paragraph>Age: 22</Paragraph>
            <Paragraph>Email: emnad2400@gmail.com</Paragraph>
            <Paragraph>Phone: 54460458</Paragraph>
          </>
        )}

        {page === 'projects' && (
          <>
            <BigTitle>My Projects</BigTitle>
            <Paragraph>Project 1: Student Management App (PHP)</Paragraph>
            <Paragraph>Project 2: E-Commerce Website</Paragraph>
            <Paragraph>Project 3: Health Tracker App in Flutter</Paragraph>
          </>
        )}

        {page === 'contact' && (
          <>
            <BigTitle>Contact Me</BigTitle>
            <Paragraph>Email me at emnad2400@gmail.com</Paragraph>
          </>
        )}
      </Main>
    </>
  );
}
