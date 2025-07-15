import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FaPython, FaJava, FaJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiCsharp, SiC, SiPhp, SiDart } from 'react-icons/si';
import { MdSchool, MdWork, MdLanguage, MdCode, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

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
    background-color: #0a0a0a;
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
  background-color: #0a0a0a;
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
  background-color: #0a0a0a;
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
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    color: #7c3aed;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
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
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 1.8rem;
    color: #7c3aed;
  }
  
  h3 {
    color: #7c3aed;
    margin: 0;
    font-size: 1.3rem;
  }
`;

const EducationItem = styled.div`
  margin-bottom: 1.5rem;
  
  h4 {
    color: #a78bfa;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0.3rem 0;
    color: #d4d4d8;
  }
`;

const ExperienceItem = styled.div`
  margin-bottom: 1.5rem;
  
  h4 {
    color: #a78bfa;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0.3rem 0;
    color: #d4d4d8;
    font-style: italic;
  }
`;

const LanguageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  
  span:first-child {
    font-weight: 600;
    color: #a78bfa;
  }
  
  span:last-child {
    background: rgba(124, 58, 237, 0.2);
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const SkillCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: rgba(124, 58, 237, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(124, 58, 237, 0.2);
  }

  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #a78bfa;
  }

  span {
    font-size: 0.9rem;
    text-align: center;
  }
`;

// Contact Section
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  margin-top: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;

  svg {
    color: #7c3aed;
    font-size: 1.5rem;
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
            <Section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <Title>HEY, I'M EMNA DAOUD</Title>
              <Text style={{ maxWidth: '700px' }}>
                Développeuse Web & Mobile passionnée par la création de solutions innovantes.
                Je combine créativité et expertise technique pour développer des applications performantes.
              </Text>
              <Button onClick={() => setActivePage('projects')}>
                Voir mes projets
              </Button>
            </Section>
          )}

          {activePage === 'about' && (
            <Section>
              <Title>À PROPOS DE MOI</Title>
              <Text style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
                Développeuse Web & Mobile curieuse et motivée, avec une première expérience en projets concrets.
                Je cherche à apprendre davantage au sein d'une équipe dynamique et bienveillante.
              </Text>
              
              <AboutGrid>
                <InfoCard>
                  <CardHeader>
                    <MdSchool />
                    <h3>Éducation</h3>
                  </CardHeader>
                  <EducationItem>
                    <h4>Licence en Informatique de Gestion</h4>
                    <p>Institut Supérieur d'Administration des Affaires de Sfax</p>
                    <p>2022 – 2025 | Mention Bien</p>
                  </EducationItem>
                  <EducationItem>
                    <h4>Baccalauréat Économie & Gestion</h4>
                    <p>Lycée Mahmoud Megdiche, Sfax</p>
                    <p>2017 – 2022 | Mention Assez Bien</p>
                  </EducationItem>
                </InfoCard>

                <InfoCard>
                  <CardHeader>
                    <MdWork />
                    <h3>Expériences Professionnelles</h3>
                  </CardHeader>
                  <ExperienceItem>
                    <h4>Stage de Développement d'application Web</h4>
                    <p>STEG - 2024 | Sfax</p>
                    <p>Développement d'une application de gestion interne</p>
                  </ExperienceItem>
                  <ExperienceItem>
                    <h4>Stage de Maintenance Réseau</h4>
                    <p>Tunisie Télécom - 2020 | Sfax</p>
                    <p>Maintenance et dépannage des équipements réseau</p>
                  </ExperienceItem>
                </InfoCard>

                <InfoCard>
                  <CardHeader>
                    <MdLanguage />
                    <h3>Langues</h3>
                  </CardHeader>
                  <LanguageItem>
                    <span>Français</span>
                    <span>B1</span>
                  </LanguageItem>
                  <LanguageItem>
                    <span>Anglais</span>
                    <span>B1</span>
                  </LanguageItem>
                  <LanguageItem>
                    <span>Espagnol</span>
                    <span>A1</span>
                  </LanguageItem>
                </InfoCard>

                <InfoCard>
                  <CardHeader>
                    <MdCode />
                    <h3>Compétences Techniques</h3>
                  </CardHeader>
                  <SkillsGrid>
                    <SkillCard>
                      <FaPython />
                      <span>Python</span>
                    </SkillCard>
                    <SkillCard>
                      <FaJava />
                      <span>Java</span>
                    </SkillCard>
                    <SkillCard>
                      <SiCsharp />
                      <span>C#</span>
                    </SkillCard>
                    <SkillCard>
                      <SiC />
                      <span>C</span>
                    </SkillCard>
                    <SkillCard>
                      <SiPhp />
                      <span>PHP</span>
                    </SkillCard>
                    <SkillCard>
                      <FaJs />
                      <span>JavaScript</span>
                    </SkillCard>
                    <SkillCard>
                      <FaHtml5 />
                      <span>HTML5</span>
                    </SkillCard>
                    <SkillCard>
                      <FaCss3Alt />
                      <span>CSS</span>
                    </SkillCard>
                    <SkillCard>
                      <SiDart />
                      <span>Dart</span>
                    </SkillCard>
                  </SkillsGrid>
                </InfoCard>
              </AboutGrid>
            </Section>
          )}

          {activePage === 'projects' && (
            <Section>
              <Title>MES PROJETS</Title>
              
              <ProjectCard>
                <h3>📊 Application de Gestion Budgétaire</h3>
                <Text>
                  Création d'une application web pour suivre les besoins budgétaires, recommander des devis via IA et générer des tableaux de bord avec prévisions.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3>🔧 Application Web de Gestion de Réparations (Symfony)</h3>
                <Text>
                  Application permettant de suivre les demandes de réparation et de gérer les pièces détachées.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3>🧾 Application Desktop de Facturation (Java)</h3>
                <Text>
                  Création d'un système de gestion des factures pour les PME.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3>🏥 Application Santé (Flutter)</h3>
                <Text>
                  Développement d'une application mobile permettant le calcul de l'IMC et le suivi du poids avec un graphique interactif.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3>🎓 Gestion des Élèves (PHP)</h3>
                <Text>
                  Application web permettant l'inscription des élèves, le suivi des absences et la génération de rapports.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3>🛒 Site E-commerce</h3>
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
                <ContactItem>
                  <MdEmail />
                  <span>daoud.emna.it@gmail.com</span>
                </ContactItem>
                <ContactItem>
                  <MdPhone />
                  <span>54 460 458</span>
                </ContactItem>
                <ContactItem>
                  <MdLocationOn />
                  <span>12 rue Aziza Othmana, Sfax</span>
                </ContactItem>
              </ContactInfo>
            </Section>
          )}
        </Main>
      </Container>
    </>
  );
}