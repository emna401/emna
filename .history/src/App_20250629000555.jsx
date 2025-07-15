import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #0b1225;
  color: white;
  min-height: 100vh;
  font-family: sans-serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #141d34;
  border-bottom: 1px solid #2d3748;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const Logo = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: #facc15;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

const NavButton = styled.button`
  background: ${({ active }) => (active ? '#1e293b' : 'transparent')};
  color: ${({ active }) => (active ? 'white' : '#cbd5e1')};
  border: ${({ active }) => (active ? '1px solid #facc15' : 'none')};
  padding: 0.4rem 1rem;
  border-radius: 0.4rem;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  transition: all 0.3s;

  &:hover {
    color: #facc15;
  }
`;

const Section = styled.section`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
`;

export default function App() {
  const [page, setPage] = useState('about');

  return (
    <Container>
      <Header>
        <Logo>EMNA DAOUD</Logo>
        <Nav>
          {['home', 'about', 'projects', 'contact'].map((item) => (
            <NavButton
              key={item}
              active={page === item}
              onClick={() => setPage(item)}
            >
              {item.toUpperCase()}
            </NavButton>
          ))}
        </Nav>
      </Header>

      {page === 'about' && (
        <Section>
          <Title>About Me</Title>
          <Paragraph><strong>Name:</strong> Emna Daoud</Paragraph>
          <Paragraph><strong>Age:</strong> 22</Paragraph>
          <Paragraph><strong>Email:</strong> emnad2400@gmail.com</Paragraph>
          <Paragraph><strong>Phone:</strong> 54460458</Paragraph>
        </Section>
      )}
    </Container>
  );
}
