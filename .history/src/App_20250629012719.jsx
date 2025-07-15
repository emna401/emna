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
    line-height: 1.6;
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
    flex-wrap: wrap;
    justify-content: center;
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
  padding: 2rem;
`;

// Common Styles
const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 0;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #7c3aed, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.2;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Text = styled.p`
  font-size: 1.1rem;
  color: #d4d4d8;
  margin-bottom: 1.5rem;
`;

const Highlight = styled.span`
  color: #7c3aed;
  font-weight: 600;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #7c3aed, #a78bfa);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s;
  margin-top: 1rem;
  align-self: center;

  &:hover {
    transform: translateY(-3px);
  }
`;

// Project Card
const ProjectCard = styled.div`
  background: rgba(20, 20, 20, 0.7);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// About Section
const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const InfoCard = styled.div`
  background: rgba(20, 20, 20, 0.7);
  border-radius: 10px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SkillList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  list-style: none;
`;

const SkillItem = styled.li`
  background: rgba(124, 58, 237, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-align: center;
`;

// Contact Section
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
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
            <Section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <Title>HEY, I'M EMNA DAOUD</Title>
              <Text style={{ maxWidth: '700px' }}>
                Développeuse Web & Mobile créant des interfaces efficaces, modernes et adaptables qui contribuent au succès des produits numériques.
              </Text>
              <Button onClick={() => setActivePage('projects')}>
                Voir mes projets
              </Button>
            </Section>
          )}

          {activePage === 'about' && (
            <Section>
              <Title>À PROPOS DE MOI</Title>
              <Text>
                Développeuse Web & Mobile curieuse et motivée, avec une première expérience en projets concrets. Je cherche à apprendre davantage au sein d'une équipe dynamique et bienveillante.
              </Text>
              
              <AboutGrid>
                <InfoCard>
                  <h3 style={{ color: '#7c3aed', marginBottom: '1rem' }}>Éducation</h3>
                  <p><Highlight>Licence en Informatique de Gestion</Highlight></p>
                  <p>Institut Supérieur d'Administration des Affaires de Sfax</p>
                  <p>2022 – 2025 | Mention Bien</p>
                  <br/>
                  <p><Highlight>Baccalauréat Économie & Gestion</Highlight></p>
                  <p>Lycée Mahmoud Megdiche, Sfax</p>
                  <p>2017 – 2022 | Mention Assez Bien</p>
                </InfoCard>

                <InfoCard>
                  <h3 style={{ color: '#7c3aed', marginBottom: '1rem' }}>Expériences Professionnelles</h3>
                  <p><Highlight>Stage de Développement d'application Web</Highlight></p>
                  <p>STEG - 2024 | Sfax</p>
                  <br/>
                  <p><Highlight>Stage de Maintenance Réseau</Highlight></p>
                  <p>Tunisie Télécom - 2020 | Sfax</p>
                </InfoCard>

                <InfoCard>
                  <h3 style={{ color: '#7c3aed', marginBottom: '1rem' }}>Langues</h3>
                  <p><Highlight>Français</Highlight> - B1</p>
                  <p><Highlight>Anglais</Highlight> - B1</p>
                  <p><Highlight>Espagnol</Highlight> - A1</p>
                </InfoCard>

                <InfoCard>
                  <h3 style={{ color: '#7c3aed', marginBottom: '1rem' }}>Compétences Techniques</h3>
                  <SkillList>
                    <SkillItem>Python</SkillItem>
                    <SkillItem>Java</SkillItem>
                    <SkillItem>C#</SkillItem>
                    <SkillItem>C</SkillItem>
                    <SkillItem>PHP</SkillItem>
                    <SkillItem>JavaScript</SkillItem>
                    <SkillItem>HTML5</SkillItem>
                    <SkillItem>CSS</SkillItem>
                    <SkillItem>Dart</SkillItem>
                  </SkillList>
                </InfoCard>
              </AboutGrid>
            </Section>
          )}

          {activePage === 'projects' && (
            <Section>
              <Title>MES PROJETS</Title>
              
              <ProjectCard>
                <h3 style={{ color: '#7c3aed', marginBottom: '0.5rem' }}>Application de Gestion Budgétaire</h3>
                <Text>
                  Création d'une application web pour suivre les besoins budgétaires, recommander des devis via IA et générer des tableaux de bord avec prévisions.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3 style={{ color: '#7c3aed', marginBottom: '0.5rem' }}>Application Web de Gestion de Réparations (Symfony)</h3>
                <Text>
                  Application permettant de suivre les demandes de réparation et de gérer les pièces détachées.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3 style={{ color: '#7c3aed', marginBottom: '0.5rem' }}>Application Desktop de Facturation (Java)</h3>
                <Text>
                  Création d'un système de gestion des factures pour les PME.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3 style={{ color: '#7c3aed', marginBottom: '0.5rem' }}>Application Santé (Flutter)</h3>
                <Text>
                  Développement d'une application mobile permettant le calcul de l'IMC et le suivi du poids avec un graphique interactif.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3 style={{ color: '#7c3aed', marginBottom: '0.5rem' }}>Gestion des Élèves (PHP)</h3>
                <Text>
                  Application web permettant l'inscription des élèves, le suivi des absences et la génération de rapports.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3 style={{ color: '#7c3aed', marginBottom: '0.5rem' }}>Site E-commerce</h3>
                <Text>
                  Création d'un site de vente en ligne avec un catalogue de produits et une intégration de paiements sécurisés.
                </Text>
              </ProjectCard>
            </Section>
          )}

          {activePage === 'contact' && (
            <Section style={{ textAlign: 'center' }}>
              <Title>ME CONTACTER</Title>
              <Text>
                Vous pouvez me joindre par email ou téléphone pour discuter de projets ou opportunités.
              </Text>
              
              <ContactInfo>
                <p><Highlight>Email:</Highlight> daoud.emna.it@gmail.com</p>
                <p><Highlight>Téléphone:</Highlight> 54 460 458</p>
                <p><Highlight>Adresse:</Highlight> 12 rue Aziza Othmana, Sfax</p>
                <p><Highlight>Âge:</Highlight> 22 ans</p>
              </ContactInfo>
            </Section>
          )}
        </Main>
      </Container>
    </>
  );
}