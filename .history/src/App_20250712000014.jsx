import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;
const twinkle = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
`;
const move = keyframes`
  0% { transform: translateY(0) translateX(0); }
  100% { transform: translateY(-100vh) translateX(-20vw); }
`;
const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const cometMove = keyframes`
  0% { 
    transform: translateX(-100px) translateY(-100px) rotate(-45deg); 
    opacity: 0;
  }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { 
    transform: translateX(100vw) translateY(100vh) rotate(-45deg); 
    opacity: 0;
  }
`;

// Global Styles
const GlobalStyle = createGlobalStyle`
  * { 
    margin:0; 
    padding:0; 
    box-sizing:border-box;
  }
  body, html, #root { 
    height:100%; 
    width:100%; 
    overflow-x: hidden;
  }
  body { 
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif; 
    color:#e0e3e7; 
    background:#0a0a0a;
    line-height: 1.6;
  }
  ::selection {
    background: rgba(110, 123, 251, 0.4);
  }
`;

// Background Elements
const Star = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: ${twinkle} ${props => props.duration || '5s'} infinite ease-in-out;
  animation-delay: ${props => props.delay || '0s'};
`;

const Galaxy = styled.div`
  position: absolute;
  width: 60vw;
  height: 60vw;
  max-width: 800px;
  max-height: 800px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(110, 123, 251, 0.03) 0%, transparent 70%);
  filter: blur(40px);
  z-index: -2;
  animation: ${rotate} 120s linear infinite;
  opacity: 0.6;
`;

const Particle = styled.div`
  position: absolute;
  border-radius: 50%;
  background: rgba(110, 123, 251, 0.1);
  filter: blur(2px);
  animation: ${move} ${props => props.speed || '20s'} linear infinite;
`;

const Comet = styled.div`
  position: absolute;
  width: 150px;
  height: 2px;
  background: linear-gradient(90deg, rgba(110, 123, 251, 0), rgba(110, 123, 251, 0.8));
  border-radius: 50%;
  filter: blur(1px);
  animation: ${cometMove} 15s linear infinite;
  animation-delay: ${props => props.delay || '0s'};
`;

const AnimatedBackground = () => {
  const stars = Array.from({ length: 100 }).map((_, i) => {
    const size = Math.random() * 3;
    return (
      <Star
        key={`star-${i}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          opacity: Math.random() * 0.8 + 0.2
        }}
        duration={`${Math.random() * 5 + 3}s`}
        delay={`${Math.random() * 5}s`}
      />
    );
  });

  const particles = Array.from({ length: 30 }).map((_, i) => {
    const size = Math.random() * 5 + 1;
    return (
      <Particle
        key={`particle-${i}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          background: `rgba(${Math.floor(Math.random() * 100 + 156)}, ${Math.floor(Math.random() * 100 + 156)}, 251, ${Math.random() * 0.2 + 0.05})`
        }}
        speed={`${Math.random() * 50 + 30}s`}
      />
    );
  });

  const comets = Array.from({ length: 3 }).map((_, i) => (
    <Comet 
      key={`comet-${i}`}
      style={{
        left: `${Math.random() * 100}px`,
        top: `${Math.random() * 100}px`,
      }}
      delay={`${i * 10}s`}
    />
  ));

  return (
    <>
      <Galaxy style={{
        left: '-20%',
        top: '-20%',
        background: 'radial-gradient(circle, rgba(110, 123, 251, 0.05) 0%, transparent 70%)'
      }} />
      <Galaxy style={{
        right: '-15%',
        bottom: '-15%',
        background: 'radial-gradient(circle, rgba(174, 110, 251, 0.05) 0%, transparent 70%)',
        animationDirection: 'reverse'
      }} />
      {stars}
      {particles}
      {comets}
    </>
  );
};

const Container = styled.div`
  display:flex; 
  flex-direction:column; 
  min-height:100vh;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at 20% 30%, rgba(30, 30, 40, 0.8) 0%, rgba(10, 10, 15, 1) 50%);
`;

const Header = styled.header`
  padding: 1.5rem 5vw;
  display:flex; 
  justify-content:space-between; 
  align-items:center; 
  position:sticky; 
  top:0; 
  z-index:100;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  
  @media (max-width:768px){
    flex-direction:column; 
    gap:1rem; 
    padding:1.5rem;
  }
`;

const Logo = styled.h1`
  color:#6e7bfb; 
  font-size:1.8rem; 
  font-weight:700; 
  animation:${fadeIn} 0.8s ease-out;
  span {
    color:#a1a8f2;
    font-weight: 300;
  }
`;

const Nav = styled.nav`
  display:flex; 
  gap:2rem; 
  @media(max-width:768px){
    gap:1.5rem; 
    flex-wrap:wrap; 
    justify-content:center;
  }
`;

const NavLink = styled.button`
  background:none; 
  border:none; 
  color:${props => props.active ? '#6e7bfb' : '#b0b5c0'};
  font-weight:500; 
  font-size:1rem; 
  cursor:pointer; 
  letter-spacing:0.5px;
  padding:0.5rem 0; 
  position:relative; 
  transition:all 0.3s;
  
  &::after {
    content:''; 
    position:absolute; 
    bottom:0; 
    left:0; 
    width:${props => props.active ? '100%' : '0'};
    height:2px; 
    background:linear-gradient(90deg, #6e7bfb, #a1a8f2); 
    transition:width 0.3s;
  }
  
  &:hover { 
    color:#6e7bfb; 
  }
`;

const Main = styled.main`
  flex:1; 
  display:flex; 
  flex-direction:column; 
  padding:0 5vw;
  position: relative;
  z-index: 1;
`;

const HeroSection = styled.section`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
  position: relative;
`;

const Section = styled.section`
  max-width:1200px; 
  width:100%; 
  margin:0 auto; 
  padding:5rem 0; 
  animation:${fadeIn} 0.8s ease-out;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 2.5rem;
  background: linear-gradient(90deg, #6e7bfb, #a1a8f2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #6e7bfb, #a1a8f2);
    border-radius: 3px;
  }
`;

const Subtitle = styled.h3`
  font-size: 1.4rem;
  color: #b0b5c0;
  margin-bottom: 1.5rem;
  font-weight: 400;
`;

const Text = styled.p`
  font-size:1.1rem; 
  color:#c0c5d0; 
  margin-bottom:1.5rem; 
  line-height:1.8;
`;

const HighlightText = styled.span`
  color: #6e7bfb;
  font-weight: 500;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6e7bfb, #a1a8f2);
  color: #0a0a0a;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #a1a8f2, #6e7bfb);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(110, 123, 251, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const Card = styled.div`
  background: rgba(20, 20, 30, 0.6);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255,255,255,0.05);
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.3);
    border-color: rgba(110, 123, 251, 0.2);
  }
`;
const ProjectCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  
  h3 {
    color: #6e7bfb;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  
  .project-footer {
    display: flex;
    justify-content: center;  // Changé de 'flex-end' à 'center'
    margin-top: auto;
    padding-top: 1.5rem;
  }
`;


const InfoCard = styled(Card)`
  h3 {
    color: #6e7bfb;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
  }
`;

const ExperienceItem = styled.div`
  margin-bottom: 2rem;
  
  h4 {
    color: #a1a8f2;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .date {
    color: #6e7bfb;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #b0b5c0;
    margin: 0.5rem 0;
  }
  
  ul {
    margin: 0.5rem 0 0 1.5rem;
    li {
      margin-bottom: 0.3rem;
      color: #b0b5c0;
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1.5rem;
`;

const SkillItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  background: rgba(110, 123, 251, 0.1);
  border-radius: 8px;
  transition: all 0.3s;
  border: 1px solid rgba(110, 123, 251, 0.05);
  
  &:hover {
    background: rgba(110, 123, 251, 0.2);
    transform: translateY(-3px);
  }
  
  span {
    font-size: 0.95rem;
    color: #e0e3e7;
  }
  
  img {
    width: 24px;
    height: 24px;
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(20, 20, 30, 0.6);
  border-radius: 12px;
  transition: all 0.3s;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,0.05);
  
  &:hover {
    background: rgba(110, 123, 251, 0.1);
    transform: translateY(-5px);
    border-color: rgba(110, 123, 251, 0.2);
  }
  
  div {
    h4 {
      color: #6e7bfb;
      margin-bottom: 0.3rem;
    }
    
    p {
      color: #b0b5c0;
      font-size: 0.9rem;
    }
  }
  
  svg {
    color: #6e7bfb;
    font-size: 1.8rem;
    min-width: 40px;
  }
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LanguageItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  
  span:first-child {
    color: #a1a8f2;
    font-weight: 500;
  }
  
  span:last-child {
    color: #6e7bfb;
    font-size: 0.9rem;
  }
`;

const SkillCategory = styled.h4`
  color: #a1a8f2;
  margin: 1.5rem 0 1rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  color: '#b0b5c0',
  fontSize: '0.9rem',
  fontWeight: '500'
};

const inputStyle = {
  width: '100%',
  padding:'0.8rem 1rem', 
  borderRadius:'8px', 
  border:'1px solid rgba(255,255,255,0.1)',
  background:'rgba(10, 10, 15, 0.5)', 
  color:'#e0e3e7',
  fontSize: '1rem',
  transition: 'all 0.3s',
  
  ':focus': {
    outline: 'none',
    borderColor: '#6e7bfb',
    boxShadow: '0 0 0 3px rgba(110, 123, 251, 0.1)',
    background: 'rgba(10, 10, 15, 0.7)'
  }
};

export default function App() {
  const [active, setActive] = useState('home');
  const form = useRef();
    const projects = [
    {
      id: 1,
      title: "Gestion Matériel Informatique",
      technologies: "C# · SQL Server · Windows Forms",
      description: "Application desktop pour gérer le parc matériel (PC, imprimantes, scanners). Fonctionnalités CRUD avec DataGridView, interface moderne avec animations.",
      githubUrl: "https://github.com/emna401/Gestion_de_materiel_informatique"
    },
    {
      id: 2,
      title: "Gestion Scolaire Web",
      technologies: "PHP · MySQL · PDO",
      description: "Application web complète pour gérer élèves, notes et absences. Multi-rôles (admin, directeur, enseignant, parent), génération de rapports PDF.",
      githubUrl: "https://github.com/emna401/Gestion_Scolaire"
    },
    {
      id: 3,
      title: "Site E-commerce InfoShop",
      technologies: "HTML5 · CSS3 · JavaScript",
      description: "Plateforme de vente de matériel informatique avec catalogue, panier et système de commande. Design responsive avec animations CSS, filtres avancés.",
      githubUrl: "https://github.com/emna401/InfoShop-Site-E-Commerce_d-Informatique"
    },
    {
      id: 4,
      title: "Application de Santé",
      technologies: "Flutter · Firebase · Graphiques",
      description: "Application mobile avec calcul d'IMC, suivi de poids et graphiques interactifs. Authentification (email/Google), stockage Firestore.",
      githubUrl: "https://github.com/emna401/Application-Sante-Mobile"
    },
    {
      id: 5,
      title: "Gestion Commerciale",
      technologies: "Java · Swing · MySQL",
      description: "Application desktop de gestion des clients et factures. Fonctionnalités CRUD complètes, calcul automatique des montants, interface intuitive.",
      githubUrl: "https://github.com/emna401/Gestion_commercial"
    },
    {
      id: 6,
      title: "Plateforme de Gestion Budgétaire STEG",
      technologies: "Symfony · Python · Chart.js",
      description: "Algorithme de scoring intelligent, Architecture MVC, visualisation des données avec Chart.js, Workflow complet de validation des besoins.",
      githubUrl: "https://github.com/emna401/gestion-budget"
    }
  ];
  const sendEmail = e => {
    e.preventDefault();
    emailjs.sendForm('service_gsnnxfa','template_kuszp9i',form.current,'OeQ2G0vylhEYgX4zS')
      .then(_=>{alert('Message sent successfully!'); form.current.reset();}, err=>{alert('Error sending message'); console.error(err);});
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <AnimatedBackground />
        
        <Header>
          <Logo>EMNA<span>DAOUD</span></Logo>
          <Nav>
            {['home','about','projects','contact'].map(p => (
              <NavLink key={p} active={active===p} onClick={()=>setActive(p)}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </NavLink>
            ))}
          </Nav>
        </Header>
        
        <Main>
          {active==='home' && (
            <HeroSection>
              <Subtitle>Développeuse Web & Mobile</Subtitle>
              <Title>Solutions Numériques Innovantes</Title>
              <Text style={{maxWidth:'700px'}}>
                Je crée des <HighlightText>applications web et mobiles performantes</HighlightText> avec des technologies modernes.
                Passionnée par le développement, je cherche à apprendre davantage au sein d'une équipe dynamique.
              </Text>
              <div style={{display: 'flex', gap: '1rem'}}>
                <Button onClick={()=>setActive('projects')}>Voir mes projets</Button>
                <Button onClick={()=>setActive('contact')} style={{background: 'transparent', border: '1px solid #6e7bfb', color: '#6e7bfb'}}>
                  Me contacter
                </Button>
              </div>
            </HeroSection>
          )}
          
          {active==='about' && (
            <Section>
              <Title>À propos de moi</Title>
              <Text style={{maxWidth:'800px', marginBottom: '3rem'}}>
                Développeuse Web & Mobile curieuse et motivée, avec une première expérience en projets concrets.
                Je combine mes compétences techniques avec une approche créative pour fournir des solutions efficaces.
              </Text>
              
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
                <InfoCard>
                  <h3>Formation</h3>
                  <ExperienceItem>
                    <h4>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                      </svg>
                      Licence en Informatique de Gestion
                    </h4>
                    <p className="date">2022 – 2025</p>
                    <p>Institut Supérieur d'Administration des Affaires de Sfax</p>
                    <p>Mention : Bien</p>
                  </ExperienceItem>
                  
                  <ExperienceItem>
                    <h4>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                      Baccalauréat Économie & Gestion
                    </h4>
                    <p className="date">2017 – 2022</p>
                    <p>Lycée Mahmoud Megdiche, Sfax</p>
                    <p>Mention : Assez Bien</p>
                  </ExperienceItem>
                </InfoCard>
                
                <InfoCard>
                  <h3>Expériences Professionnelles</h3>
                  <ExperienceItem>
                    <h4>Stage de Développement d'application Web</h4>
                    <p className="date">STEG · 2024 · Sfax</p>
                    <p>Gestion du budget du centre informatique du STEG</p>
                    <ul>
                      <li>Développement d'une application web de gestion budgétaire</li>
                      <li>Implémentation de tableaux de bord interactifs</li>
                      <li>Optimisation des processus de suivi des dépenses</li>
                    </ul>
                  </ExperienceItem>
                  
                  <ExperienceItem>
                    <h4>Stage de Maintenance Réseau</h4>
                    <p className="date">Tunisie Télécom · 2020 · Sfax</p>
                    <ul>
                      <li>Maintenance d'infrastructure réseau</li>
                      <li>Diagnostic et résolution de problèmes</li>
                      <li>Configuration de serveurs et équipements réseau</li>
                    </ul>
                  </ExperienceItem>
                </InfoCard>
                
                <InfoCard>
                  <h3>Compétences Techniques</h3>
                  
                  <SkillCategory>Langages de programmation</SkillCategory>
                  <SkillsGrid>
                    {[
                      {name: 'JavaScript', icon: '/icons/javascript.svg'},
                      {name: 'Python', icon: '/icons/python.svg'},
                      {name: 'Java', icon: '/icons/java.svg'},
                      {name: 'C#', icon: '/icons/csharp.svg'},
                      {name: 'PHP', icon: '/icons/php.svg'},
                      {name: 'Dart', icon: '/icons/dart.svg'},
                      {name: 'HTML5', icon: '/icons/html5.svg'},
                      {name: 'CSS3', icon: '/icons/css3.svg'},
                    ].map(skill => (
                      <SkillItem key={skill.name}>
                        <img src={skill.icon} alt={skill.name} style={{width: '24px', height: '24px'}} />
                        <span>{skill.name}</span>
                      </SkillItem>
                    ))}
                  </SkillsGrid>
                  
                  <SkillCategory>Frameworks & Bibliothèques</SkillCategory>
                  <SkillsGrid>
                    {[
                      {name: 'React', icon: '/icons/react.svg'},
                      {name: 'Symfony', icon: '/icons/symfony.svg'},
                      {name: 'Flutter', icon: '/icons/flutter.svg'},
                      {name: 'Vite', icon: '/icons/vite.svg'},
                      {name: 'Bootstrap', icon: '/icons/bootstrap.svg'},
                      {name: 'Chart.js', icon: '/icons/chartjs.svg'},
                    ].map(skill => (
                      <SkillItem key={skill.name}>
                        <img src={skill.icon} alt={skill.name} style={{width: '24px', height: '24px'}} />
                        <span>{skill.name}</span>
                      </SkillItem>
                    ))}
                  </SkillsGrid>
                  
                  <SkillCategory>Outils de développement</SkillCategory>
                  <SkillsGrid>
                    {[
                      {name: 'Git', icon: '/icons/git.svg'},
                      {name: 'Visual Studio ode', icon: '/icons/vscode.svg'},
                      {name: 'XAMPP', icon: '/icons/xampp.svg'},
                      {name: 'MySQL', icon: '/icons/mysql.svg'},
                    ].map(skill => (
                      <SkillItem key={skill.name}>
                        <img src={skill.icon} alt={skill.name} style={{width: '24px', height: '24px'}} />
                        <span>{skill.name}</span>
                      </SkillItem>
                    ))}
                  </SkillsGrid>
                </InfoCard>

                <InfoCard>
                  <h3>Langues</h3>
                  <div>
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
                  </div>
                </InfoCard>
              </div>
            </Section>
          )}
          
          {active==='projects' && (
            <Section>
              <Title>Mes Projets</Title>
              <Text style={{maxWidth:'800px', marginBottom: '3rem'}}>
                Sélection de mes projets les plus significatifs démontrant mes compétences dans diverses technologies.
              </Text>
              
              <ProjectGrid>
                {projects.map(project => (
                  <ProjectCard key={project.id}>
                    <h3>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                      {project.title}
                    </h3>
                    <p className="date">{project.technologies}</p>
                    <Text>{project.description}</Text>
                    <div className="project-footer">
                      <Button 
                        as="a" 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Voir le projet
                      </Button>
                    </div>
                  </ProjectCard>
                ))}
              </ProjectGrid>
            </Section>
          )}
          
          {active==='contact' && (
            <Section>
              <Title>Contact</Title>
              <Text style={{maxWidth:'700px', margin:'0 auto 3rem', textAlign:'center'}}>
                Vous avez un projet ou souhaitez discuter d'opportunités ? Je suis disponible pour des missions freelance et des postes permanents.
              </Text>
              
              <ContactInfo>
                <ContactItem href="mailto:daoud.emna.it@gmail.com">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <div>
                    <h4>Email</h4>
                    <p>daoud.emna.it@gmail.com</p>
                  </div>
                </ContactItem>
                
                <ContactItem href="tel:+21654460458">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div>
                    <h4>Téléphone</h4>
                    <p>+216 54 460 458</p>
                  </div>
                </ContactItem>
                
                <ContactItem href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  <div>
                    <h4>LinkedIn</h4>
                    <p>linkedin.com/in/emna-daoud</p>
                  </div>
                </ContactItem>
                
                <ContactItem href="https://github.com/" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <div>
                    <h4>GitHub</h4>
                    <p>github.com/emna-daoud</p>
                  </div>
                </ContactItem>
              </ContactInfo>
              
              <form ref={form} onSubmit={sendEmail} style={{
                maxWidth:'600px', 
                margin:'4rem auto 0',
                padding:'2.5rem',
                borderRadius:'12px',
                background: 'rgba(20, 20, 30, 0.6)',
                border: '1px solid rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem'}}>
                  <div>
                    <label htmlFor="name" style={labelStyle}>Votre Nom</label>
                    <input 
                      id="name"
                      name="user_name" 
                      type="text" 
                      required 
                      style={inputStyle} 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Votre Email</label>
                    <input 
                      id="email"
                      name="user_email" 
                      type="email" 
                      required 
                      style={inputStyle} 
                    />
                  </div>
                </div>
                
                <div style={{marginBottom: '1.5rem'}}>
                  <label htmlFor="subject" style={labelStyle}>Sujet</label>
                  <input 
                    id="subject"
                    name="subject" 
                    type="text" 
                    required 
                    style={inputStyle} 
                  />
                </div>
                
                <div style={{marginBottom: '1.5rem'}}>
                  <label htmlFor="message" style={labelStyle}>Message</label>
                  <textarea 
                    id="message"
                    name="message" 
                    placeholder="Votre message ici..." 
                    rows="6" 
                    required 
                    style={{...inputStyle, minHeight: '150px'}} 
                  />
                </div>
                
                <Button type="submit" style={{width: '100%'}}>Envoyer le message</Button>
              </form>
            </Section>
          )}
        </Main>
      </Container>
    </>
  );
}