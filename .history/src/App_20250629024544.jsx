import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FaPython, FaJava, FaJs, FaHtml5, FaCss3Alt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCsharp, SiC, SiPhp, SiDart, SiSymfony, SiFlutter } from 'react-icons/si';
import { MdSchool, MdWork, MdLanguage, MdCode, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

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
    background-color: #121212;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #121212;
    color: #e0e0e0;
    display: flex;
    flex-direction: column;
    line-height: 1.6;
  }

  ::selection {
    background: #7c4dff;
    color: white;
  }
`;

// Layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
`;

const Header = styled.header`
  padding: 1.5rem 2rem;
  background: rgba(18, 18, 18, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

const Logo = styled.h1`
  color: #7c4dff;
  font-size: 1.5rem;
  font-weight: 700;
  animation: ${fadeIn} 0.8s ease-out;
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
  color: ${props => props.active ? '#7c4dff' : '#b0b0b0'};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background: #7c4dff;
    transition: width 0.3s;
  }

  &:hover {
    color: #7c4dff;
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
  background-color: #121212;
`;

// Common Styles
const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 0;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #7c4dff, #b388ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.2;
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #7c4dff;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Text = styled.p`
  font-size: 1.1rem;
  color: #e0e0e0;
  margin-bottom: 1.5rem;
  line-height: 1.8;
`;

const Highlight = styled.span`
  color: #7c4dff;
  font-weight: 600;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #7c4dff, #b388ff);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
  align-self: center;
  box-shadow: 0 4px 15px rgba(124, 77, 255, 0.3);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(124, 77, 255, 0.4);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

// Project Card
const ProjectCard = styled.div`
  background: rgba(30, 30, 30, 0.7);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
  animation: ${fadeIn} 0.8s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    border-color: rgba(124, 77, 255, 0.3);
  }

  h3 {
    color: #7c4dff;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.3rem;
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
  background: rgba(30, 30, 30, 0.7);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
  animation: ${fadeIn} 0.8s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  svg {
    font-size: 1.8rem;
    color: #7c4dff;
    animation: ${float} 4s ease-in-out infinite;
  }
  
  h3 {
    color: #7c4dff;
    margin: 0;
    font-size: 1.3rem;
  }
`;

const EducationItem = styled.div`
  margin-bottom: 1.5rem;
  
  h4 {
    color: #b388ff;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0.3rem 0;
    color: #e0e0e0;
  }
`;

const ExperienceItem = styled.div`
  margin-bottom: 1.5rem;
  
  h4 {
    color: #b388ff;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0.3rem 0;
    color: #e0e0e0;
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
    color: #b388ff;
  }
  
  span:last-child {
    background: rgba(124, 77, 255, 0.2);
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
  background: rgba(124, 77, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.8s ease-out;

  &:hover {
    transform: translateY(-5px);
    background: rgba(124, 77, 255, 0.2);
    box-shadow: 0 5px 15px rgba(124, 77, 255, 0.2);
  }

  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #b388ff;
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
  animation: ${pulse} 2s infinite;

  svg {
    color: #7c4dff;
    font-size: 1.5rem;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  a {
    color: #e0e0e0;
    font-size: 1.5rem;
    transition: color 0.3s;

    &:hover {
      color: #7c4dff;
      transform: translateY(-3px);
    }
  }
`;

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
                Développeuse Full Stack passionnée par la création d'applications web et mobiles innovantes. 
                Je combine créativité et expertise technique pour développer des solutions performantes et élégantes.
              </Text>
              <Button onClick={() => setActivePage('projects')}>
                Découvrir mes projets
              </Button>
            </Section>
          )}

          {activePage === 'about' && (
            <Section>
              <Title>À PROPOS DE MOI</Title>
              <Text style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
                Passionnée par les nouvelles technologies, je mets mes compétences au service de projets innovants.
                Rigoureuse et créative, j'aime relever des défis techniques et proposer des solutions optimales.
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
                    <h3>Expériences</h3>
                  </CardHeader>
                  <ExperienceItem>
                    <h4>Stage Développement Web</h4>
                    <p>STEG - 2024 | Sfax</p>
                    <p>Développement d'applications internes</p>
                  </ExperienceItem>
                  <ExperienceItem>
                    <h4>Stage Maintenance Réseau</h4>
                    <p>Tunisie Télécom - 2020 | Sfax</p>
                    <p>Maintenance infrastructure réseau</p>
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
                    <h3>Compétences</h3>
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
                    <SkillCard>
                      <SiSymfony />
                      <span>Symfony</span>
                    </SkillCard>
                    <SkillCard>
                      <SiFlutter />
                      <span>Flutter</span>
                    </SkillCard>
                  </SkillsGrid>
                </InfoCard>
              </AboutGrid>
            </Section>
          )}

          {activePage === 'projects' && (
            <Section>
              <Title>MES RÉALISATIONS</Title>
              
              <ProjectCard>
                <h3><span>📊</span> Application de Gestion Budgétaire</h3>
                <Text>
                  Plateforme web complète avec tableau de bord interactif, analyse des dépenses et recommandations intelligentes.
                  Technologies : Python, Django, Chart.js, IA de recommandation.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3><span>🔧</span> Gestion de Réparations (Symfony)</h3>
                <Text>
                  Application web pour ateliers de réparation avec suivi des demandes, gestion des pièces et interface admin.
                  Technologies : Symfony, MySQL, Bootstrap.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3><span>🧾</span> Facturation Desktop (Java)</h3>
                <Text>
                  Solution complète de gestion de factures pour PME avec génération de PDF et statistiques.
                  Technologies : JavaFX, Hibernate, JasperReports.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3><span>🏥</span> Application Santé (Flutter)</h3>
                <Text>
                  Application mobile de suivi santé avec calcul IMC, historique et graphiques interactifs.
                  Technologies : Flutter, Firebase, Charts Flutter.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3><span>🎓</span> Gestion Scolaire (PHP)</h3>
                <Text>
                  Système de gestion des élèves avec inscriptions, absences et rapports automatisés.
                  Technologies : PHP, MySQL, jQuery.
                </Text>
              </ProjectCard>

              <ProjectCard>
                <h3><span>🛒</span> Plateforme E-commerce</h3>
                <Text>
                  Boutique en ligne complète avec catalogue, panier et paiement sécurisé.
                  Technologies : React, Node.js, Stripe API.
                </Text>
              </ProjectCard>
            </Section>
          )}

          {activePage === 'contact' && (
            <Section style={{ textAlign: 'center' }}>
              <Title>TRABAILONS ENSEMBLE</Title>
              <Text>
                Vous avez un projet ou souhaitez discuter d'opportunités ? Contactez-moi !
              </Text>
              
              <ContactInfo>
                <ContactItem>
                  <MdEmail />
                  <span>daoud.emna.it@gmail.com</span>
                </ContactItem>
                <ContactItem>
                  <MdPhone />
                  <span>+216 54 460 458</span>
                </ContactItem>
                <ContactItem>
                  <MdLocationOn />
                  <span>Sfax, Tunisie</span>
                </ContactItem>
              </ContactInfo>

              <SocialLinks>
                <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              </SocialLinks>
            </Section>
          )}
        </Main>
      </Container>
    </>
  );
}