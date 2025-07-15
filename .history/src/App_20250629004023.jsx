import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html, #root {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: #0a0a0a;
    color: #f0f0f0;
    display: flex;
    flex-direction: column;
  }
`;

// Layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 1.5rem 2rem;
  background: rgba(10, 10, 10, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const Logo = styled.h1`
  color: #7c3aed;
  font-size: 1.5rem;
  font-weight: 700;
`;

const Nav = styled.nav`
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
  font-size: 0.9rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 0;
  position: relative;

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

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
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
  margin-bottom: 2rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-3px);
  }
`;

export default function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <Logo>EMNA DAOUD</Logo>
          <Nav>
            {['home', 'about', 'projects', 'contact'].map((page) => (
              <NavLink
                key={page}
                active={activePage === page}
                onClick={() => setActivePage(page)}
              >
                {page.toUpperCase()}
              </NavLink>
            ))}
          </Nav>
        </Header>

        <Main>
          {activePage === 'home' && (
            <>
              <HeroTitle>HEY, I'M EMNA DAOUD</HeroTitle>
              <HeroText>
                Web & Mobile Developer creating efficient, modern, and adaptable
                interfaces that contribute to the success of digital products.
              </HeroText>
              <Button onClick={() => setActivePage('projects')}>
                View My Projects
              </Button>
            </>
          )}

          {/* Ajoutez les autres pages ici */}
        </Main>
      </Container>
    </>
  );
}