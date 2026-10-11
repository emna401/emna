import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// ===== ANIMATIONS =====
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// ===== GLOBAL STYLES =====
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  
  body, html, #root {
    min-height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    color: #e4e4e7;
    background: #09090b;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }
  
  ::selection {
    background: rgba(59, 130, 246, 0.3);
    color: #fff;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: #09090b;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #27272a;
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #3b82f6;
  }
`;

// ===== LAYOUT =====
const Container = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: #09090b;
`;

const Header = styled.header`
  padding: 1.2rem 6vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(9, 9, 11, 0.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  
  @media (max-width: 768px) {
    padding: 1rem 4vw;
  }
`;

const Logo = styled.a`
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: -0.5px;
  cursor: pointer;
  text-decoration: none;
  
  span {
    color: #3b82f6;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.2rem;
  }
  
  @media (max-width: 500px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #a1a1aa;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
  position: relative;
  
  &:hover {
    color: #3b82f6;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 1px;
    background: #3b82f6;
    transition: width 0.3s;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenu = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 500px) {
    display: block;
  }
`;

// ===== HERO SECTION =====
const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 6vw;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
    filter: blur(60px);
    z-index: 0;
    animation: ${float} 8s ease-in-out infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
    filter: blur(60px);
    z-index: 0;
    animation: ${float} 10s ease-in-out infinite reverse;
  }
  
  @media (max-width: 768px) {
    padding: 0 4vw;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  position: relative;
  z-index: 1;
  animation: ${fadeIn} 1s ease-out;
`;

const Greeting = styled.p`
  color: #3b82f6;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -2px;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #fff 0%, #a1a1aa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  
  span {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  font-weight: 400;
  color: #a1a1aa;
  margin-bottom: 2rem;
  line-height: 1.4;
`;

const HeroText = styled.p`
  font-size: 1.05rem;
  color: #71717a;
  max-width: 600px;
  margin-bottom: 2.5rem;
  line-height: 1.8;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  background: #3b82f6;
  color: #fff;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
  }
`;

const SecondaryButton = styled.a`
  background: transparent;
  color: #e4e4e7;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid #27272a;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    border-color: #3b82f6;
    color: #3b82f6;
    transform: translateY(-2px);
  }
`;

const CVHeroButton = styled.a`
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(34, 197, 94, 0.3);
  }
`;

// ===== SECTIONS =====
const Section = styled.section`
  padding: 7rem 6vw;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 5rem 4vw;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -1px;
  margin-bottom: 0.5rem;
  color: #fff;
`;

const SectionSubtitle = styled.p`
  font-size: 1rem;
  color: #71717a;
  margin-bottom: 3.5rem;
  max-width: 600px;
`;

const AccentLine = styled.div`
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 3px;
  margin-bottom: 1.5rem;
`;

// ===== ABOUT SECTION =====
const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AboutText = styled.div`
  p {
    color: #a1a1aa;
    margin-bottom: 1.5rem;
    line-height: 1.8;
    font-size: 1.02rem;
  }
  
  strong {
    color: #fff;
    font-weight: 600;
  }
  
  .highlight {
    color: #3b82f6;
    font-weight: 500;
  }
`;

const InfoCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 1.8rem;
  transition: all 0.3s;
  
  &:hover {
    border-color: #3b82f6;
    transform: translateX(5px);
  }
  
  h3 {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  
  h3 .icon {
    color: #3b82f6;
  }
`;

const TimelineItem = styled.div`
  padding-left: 1.5rem;
  border-left: 2px solid #27272a;
  position: relative;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 5px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #3b82f6;
    border: 2px solid #18181b;
  }
  
  h4 {
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  
  .date {
    color: #3b82f6;
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #a1a1aa;
    font-size: 0.92rem;
    line-height: 1.6;
  }
  
  .honors {
    color: #22c55e;
    font-size: 0.85rem;
    font-weight: 500;
    margin-top: 0.3rem;
  }
`;

// ===== SKILLS SECTION =====
const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const SkillCategory = styled.div`
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 1.8rem;
  transition: all 0.3s;
  
  &:hover {
    border-color: #3b82f6;
    transform: translateY(-5px);
  }
  
  h3 {
    color: #fff;
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 1.2rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  
  h3 .icon {
    color: #3b82f6;
    font-size: 1.2rem;
  }
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const SkillTag = styled.span`
  background: #27272a;
  color: #d4d4d8;
  padding: 0.4rem 0.9rem;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: default;
  
  &:hover {
    background: #3b82f6;
    color: #fff;
    transform: translateY(-2px);
  }
`;

// ===== PROJECTS SECTION =====
const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s;
  }
  
  &:hover {
    border-color: #3b82f6;
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProjectIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-size: 1.2rem;
`;

const ProjectCategory = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
`;

const ProjectTitle = styled.h3`
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const ProjectDescription = styled.p`
  color: #a1a1aa;
  font-size: 0.92rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
  flex: 1;
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: #27272a;
  color: #a1a1aa;
  padding: 0.25rem 0.7rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ProjectLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: gap 0.2s;
  
  &:hover {
    gap: 0.7rem;
  }
`;

// ===== CONTACT SECTION =====
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ContactInfo = styled.div`
  h3 {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  
  p {
    color: #a1a1aa;
    margin-bottom: 2rem;
    line-height: 1.7;
  }
`;

const ContactMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactMethod = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s;
  
  &:hover {
    border-color: #3b82f6;
    transform: translateX(5px);
  }
  
  .icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(59, 130, 246, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3b82f6;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  
  .info {
    h4 {
      color: #fff;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 0.2rem;
    }
    
    p {
      color: #a1a1aa;
      font-size: 0.85rem;
      margin: 0;
    }
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  
  label {
    color: #a1a1aa;
    font-size: 0.85rem;
    font-weight: 500;
  }
  
  input, textarea {
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 8px;
    padding: 0.9rem 1rem;
    color: #fff;
    font-size: 0.95rem;
    font-family: inherit;
    transition: all 0.3s;
    
    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &::placeholder {
      color: #52525b;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

// ===== FOOTER =====
const Footer = styled.footer`
  padding: 3rem 6vw;
  border-top: 1px solid #27272a;
  text-align: center;
  
  p {
    color: #71717a;
    font-size: 0.9rem;
  }
  
  a {
    color: #3b82f6;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// ===== APP COMPONENT =====
export default function App() {
  const form = useRef();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_gsnnxfa',
        'template_kuszp9i',
        form.current,
        'OeQ2G0vylhEYgX4zS'
      )
      .then(
        () => {
          alert('Message envoyé avec succès !');
          form.current.reset();
        },
        (err) => {
          alert("Erreur lors de l'envoi du message");
          console.error(err);
        }
      );
  };

  // ===== PROJETS COMPLETS (21 projets) =====
  const projects = [
    // ===== DÉVELOPPEMENT =====
    {
      id: 1,
      title: "Assistant Diagnostic Cancer du Sein",
      category: "IA",
      icon: "🧠",
      technologies: ["Python", "Streamlit", "Machine Learning", "scikit-learn"],
      description:
        "Application IA sophistiquée pour l'analyse et la prédiction de tumeurs mammaires, intégrant machine learning et visualisation interactive de données médicales.",
      githubUrl: "https://github.com/emna401/Breast-Cancer-AI-Assistant",
    },
    {
      id: 2,
      title: "AgriCycle - Application Web Full-Stack",
      category: "Web",
      icon: "🌱",
      technologies: ["React.js", "Django", "MySQL", "JWT", "bcrypt"],
      description:
        "Application web responsive avec authentification sécurisée, géolocalisation, export Excel/PDF et interface multilingue (Français/Derja).",
      githubUrl: "https://github.com/emna401/AgriCycle",
    },
    {
      id: 3,
      title: "Gestion Budgétaire STEG",
      category: "Web",
      icon: "💰",
      technologies: ["Symfony", "Python", "Chart.js", "IA"],
      description:
        "Plateforme de gestion budgétaire avec recommandations via IA, tableaux de bord interactifs et prévisions analytiques.",
      githubUrl: "https://github.com/emna401/gestion-budget",
    },
    {
      id: 4,
      title: "Gestion Scolaire Web",
      category: "Web",
      icon: "🎓",
      technologies: ["PHP", "MySQL", "PDO"],
      description:
        "Application web complète pour gérer élèves, notes et absences. Multi-rôles (admin, directeur, enseignant, parent), génération de rapports PDF.",
      githubUrl: "https://github.com/emna401/Gestion_Scolaire",
    },
    {
      id: 5,
      title: "Site E-commerce InfoShop",
      category: "Web",
      icon: "🛒",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      description:
        "Plateforme de vente de matériel informatique avec catalogue, panier et système de commande. Design responsive avec animations CSS.",
      githubUrl: "https://github.com/emna401/InfoShop-Site-E-Commerce_d-Informatique",
    },
    {
      id: 6,
      title: "Application Santé Mobile",
      category: "Mobile",
      icon: "💚",
      technologies: ["Flutter", "Firebase", "fl_chart"],
      description:
        "Application mobile avec calcul d'IMC, suivi de poids et graphiques interactifs. Authentification (email/Google), stockage Firestore.",
      githubUrl: "https://github.com/emna401/Application-Sante-Mobile",
    },
    {
      id: 7,
      title: "Gestion de Matériel Informatique",
      category: "Desktop",
      icon: "🖥️",
      technologies: ["C#", "SQL Server", "Windows Forms"],
      description:
        "Application desktop pour gérer le parc matériel (PC, imprimantes, scanners). Fonctionnalités CRUD complètes avec interface moderne.",
      githubUrl: "https://github.com/emna401/Gestion_de_materiel_informatique",
    },
    {
      id: 8,
      title: "Gestion Commerciale Java",
      category: "Desktop",
      icon: "📊",
      technologies: ["Java", "Swing", "MySQL"],
      description:
        "Application desktop de gestion des clients et factures. Fonctionnalités CRUD complètes, calcul automatique des montants.",
      githubUrl: "https://github.com/emna401/Gestion_commercial",
    },

    // ===== CYBERSÉCURITÉ =====
    {
      id: 9,
      title: "Scanner SMB Intelligent",
      category: "Cybersécurité",
      icon: "🔍",
      technologies: ["Python", "SMB", "PyQt5", "Regex"],
      description:
        "Outil de pentesting qui scanne les partages SMB pour détecter mots de passe et clés API exposés. Multi-threading, détection PII, rapports HTML/JSON.",
      githubUrl: "https://github.com/emna401/smb-scanner",
    },
    {
      id: 10,
      title: "Plateforme d'orchestration de pentest",
      category: "Cybersécurité",
      icon: "⚔️",
      technologies: ["Python", "Kali Linux", "API REST", "Jinja2"],
      description:
        "Orchestration de Nmap, Nikto, SQLmap et Metasploit avec génération de rapports CVSS et analyse comparative avec la base NIST.",
      githubUrl: "https://github.com/emna401/pentest-platform",
    },
    {
      id: 11,
      title: "AWS Security Group Auditor",
      category: "Cybersécurité",
      icon: "☁️",
      technologies: ["Python", "Boto3", "AWS", "IAM"],
      description:
        "Audit automatisé des Security Groups AWS avec détection des règles trop permissives (0.0.0.0/0) et classification des ports dangereux.",
      githubUrl: "https://github.com/emna401/aws-security-auditor",
    },
    {
      id: 12,
      title: "C2 Server",
      category: "Cybersécurité",
      icon: "🖥️",
      technologies: ["Python", "Flask", "SQLite", "SocketIO"],
      description:
        "Serveur Command & Control avec interface web, gestion multi-agents, keylogger, screenshot, persistance et API REST.",
      githubUrl: "https://github.com/emna401/c2-server",
    },
    {
      id: 13,
      title: "Lab SNMP - Supervision Réseau",
      category: "Cybersécurité",
      icon: "📡",
      technologies: ["SNMP", "InfluxDB", "Grafana", "Bash"],
      description:
        "Solution complète de supervision réseau avec collecte de métriques, stockage InfluxDB, dashboard Grafana et alertes automatiques.",
      githubUrl: "https://github.com/emna401/snmp-lab",
    },
    {
      id: 14,
      title: "Lab Intégrateur d'Infrastructure",
      category: "Cybersécurité",
      icon: "🏗️",
      technologies: ["Ubuntu", "Kali", "LDAP", "Kerberos", "Samba", "OpenVPN"],
      description:
        "Infrastructure complète pour PME : DNS, DHCP, LDAP, Kerberos, Samba, RAID 5, NFS, Nginx, Apache, Squid, Keycloak, OpenVPN, Fail2ban, Nagios, Ansible.",
      githubUrl: "https://github.com/emna401/lab-integrator",
    },

    // ===== IA & SÉCURITÉ =====
    {
      id: 15,
      title: "Système de Reconnaissance d'Empreintes Digitales",
      category: "IA & Sécurité",
      icon: "🔐",
      technologies: ["Python", "OpenCV", "FastAPI", "PostgreSQL", "Docker", "Kubernetes"],
      description:
        "Système biométrique complet : acquisition, traitement d'image (CLAHE, Gabor), extraction de minuties (Crossing Number), matching, chiffrement AES-256, JWT, TOTP, blockchain et analytics.",
      githubUrl: "https://github.com/emna401/fingerprint-recognition",
    },
    {
      id: 16,
      title: "Person Recognition Pro",
      category: "IA & Sécurité",
      icon: "👁️",
      technologies: ["Python", "InsightFace", "ArcFace", "Flask", "Cryptography"],
      description:
        "Système de reconnaissance biométrique par IA : détection faciale, reconnaissance ArcFace 512D, anti-spoofing (EAR), tracking, détection d'accessoires et dashboard web.",
      githubUrl: "https://github.com/emna401/person-recognition",
    },
    {
      id: 17,
      title: "Gesture Synth Pro",
      category: "IA & Vision",
      icon: "🎵",
      technologies: ["Python", "MediaPipe", "OpenCV", "NumPy", "SoundDevice", "MIDI"],
      description:
        "Instrument de musique virtuel par vision par ordinateur : détection des mains, classification de gestes, synthèse audio temps réel et sortie MIDI professionnelle.",
      githubUrl: "https://github.com/emna401/gesture-synth",
    },
    {
      id: 18,
      title: "Audit Technique - Lab Personnel",
      category: "Cybersécurité",
      icon: "🔍",
      technologies: ["Nmap", "Metasploit", "Lynis", "enum4linux"],
      description:
        "Audit de sécurité complet sur un lab personnel : reconnaissance, scan, exploitation, post-exploitation et rédaction du rapport final.",
      githubUrl: "https://github.com/emna401/audit-technique",
    },
    {
      id: 19,
      title: "Lab CCNA1 - Routeur et VLANs",
      category: "Réseaux",
      icon: "🌐",
      technologies: ["Cisco", "Packet Tracer", "VLANs", "OSPF", "DHCP"],
      description:
        "Lab complet avec routeur et VLANs : Router-on-a-Stick, DHCP, OSPF, configuration des switchs et tests de connectivité.",
      githubUrl: "https://github.com/emna401/lab-ccna1",
    },
    {
      id: 20,
      title: "Lab CCNA2 - Réseaux d'Entreprise",
      category: "Réseaux",
      icon: "🏢",
      technologies: ["Cisco", "Packet Tracer", "OSPF", "ACLs", "NAT", "SSH"],
      description:
        "Réseaux d'entreprise sur 2 sites : VLANs, OSPF, ACLs, SSH, NAT Overload (PAT), Port-Security et DHCP sur routeur.",
      githubUrl: "https://github.com/emna401/lab-ccna2",
    },
    {
      id: 21,
      title: "Mini Opérateur Télécom",
      category: "Réseaux",
      icon: "📡",
      technologies: ["Cisco", "BGP", "OSPF", "Packet Tracer"],
      description:
        "Simulation de 2 opérateurs télécom interconnectés par BGP avec cœur redondant OSPF, LAN interne avec serveurs DHCP et DNS.",
      githubUrl: "https://github.com/emna401/mini-operateur-telecom",
    },
  ];

  return (
    <>
      <GlobalStyle />
      <Container>
        {/* ===== HEADER ===== */}
        <Header>
          <Logo onClick={() => scrollTo('home')}>
            Emna<span>Daoud</span>
          </Logo>
          <Nav>
            <NavLink onClick={() => scrollTo('home')}>Accueil</NavLink>
            <NavLink onClick={() => scrollTo('about')}>À propos</NavLink>
            <NavLink onClick={() => scrollTo('skills')}>Compétences</NavLink>
            <NavLink onClick={() => scrollTo('projects')}>Projets</NavLink>
            <NavLink onClick={() => scrollTo('contact')}>Contact</NavLink>
          </Nav>
          <MobileMenu onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </MobileMenu>
        </Header>

        {/* ===== HERO ===== */}
        <div id="home">
          <HeroSection>
            <HeroContent>
              <Greeting>Bonjour, je suis</Greeting>
              <HeroTitle>
                Emna <span>Daoud</span>
              </HeroTitle>
              <HeroSubtitle>
                Développeuse Full-Stack & Cybersécurité
              </HeroSubtitle>
              <HeroText>
                Je crée des applications web et mobiles performantes et je sécurise
                les systèmes d'information. Passionnée par le développement et la
                cybersécurité, je cherche à apprendre davantage au sein d'une équipe
                dynamique.
              </HeroText>
              <HeroButtons>
                <PrimaryButton onClick={() => scrollTo('projects')}>
                  Voir mes projets →
                </PrimaryButton>
                <SecondaryButton onClick={() => scrollTo('contact')}>
                  Me contacter
                </SecondaryButton>
                <CVHeroButton 
                  href="/cv/Emna_Daoud_CV.pdf" 
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 Télécharger mon CV
                </CVHeroButton>
              </HeroButtons>
            </HeroContent>
          </HeroSection>
        </div>

        {/* ===== ABOUT ===== */}
        <div id="about">
          <Section>
            <AccentLine />
            <SectionTitle>À propos de moi</SectionTitle>
            <SectionSubtitle>
              Mon parcours, ma formation et mes expériences
            </SectionSubtitle>

            <AboutGrid>
              <AboutText>
                <p>
                  Développeuse <strong>Full-Stack</strong> passionnée par{' '}
                  <span className="highlight">l'Intelligence Artificielle</span> et
                  la <span className="highlight">Cybersécurité</span>, actuellement
                  en <strong>Mastère Professionnel en Audit et Sécurité Informatique</strong>{' '}
                  à la FSEGS (Faculté des Sciences Économiques et de Gestion de Sfax).
                </p>
                <p>
                  Titulaire d'une <strong>Licence en Informatique de Gestion (mention Bien)</strong>,
                  j'ai réalisé de nombreux projets couvrant le développement web, mobile
                  et desktop, l'IA, ainsi que la cybersécurité offensive et défensive.
                </p>
                <p>
                  Mes projets de sécurité — <span className="highlight">plateforme
                  d'orchestration de pentest</span>, <span className="highlight">scanner
                  SMB intelligent</span>, <span className="highlight">AWS Security Group
                  Auditor</span>, <span className="highlight">C2 Server</span> et{' '}
                  <span className="highlight">lab SNMP</span> — démontrent une maîtrise
                  avancée des concepts de sécurité, de la supervision réseau et de
                  l'automatisation.
                </p>
              </AboutText>

              <InfoCards>
                {/* FORMATION */}
                <InfoCard>
                  <h3>
                    <span className="icon">🎓</span> Formation
                  </h3>
                  <TimelineItem>
                    <h4>Mastère Professionnel en Audit et Sécurité Informatique</h4>
                    <p className="date">2025 – en cours</p>
                    <p>Faculté des Sciences Économiques et de Gestion de Sfax (FSEGS)</p>
                  </TimelineItem>
                  <TimelineItem>
                    <h4>Licence en Informatique de Gestion</h4>
                    <p className="date">2022 – 2025</p>
                    <p>Institut Supérieur d'Administration des Affaires de Sfax</p>
                    <p className="honors">Mention Bien</p>
                  </TimelineItem>
                  <TimelineItem>
                    <h4>Baccalauréat Économie & Gestion</h4>
                    <p className="date">2021 – 2022</p>
                    <p>Lycée Mahmoud Megdiche, Sfax</p>
                    <p className="honors">Mention Assez Bien</p>
                  </TimelineItem>
                </InfoCard>

                {/* EXPÉRIENCES */}
                <InfoCard>
                  <h3>
                    <span className="icon">💼</span> Expériences Professionnelles
                  </h3>
                  <TimelineItem>
                    <h4>Stage de Développement d'application Web</h4>
                    <p className="date">STEG · 2025 · Sfax</p>
                    <p>
                      Création d'une plateforme de gestion budgétaire avec
                      recommandations via IA, tableaux de bord et prévisions analytiques.
                    </p>
                  </TimelineItem>
                  <TimelineItem>
                    <h4>Stage de Maintenance Réseau</h4>
                    <p className="date">Tunisie Télécom · 2024 · Sfax</p>
                    <p>
                      Maintenance informatique : formatage des postes, installation
                      des systèmes d'exploitation et configuration réseau.
                    </p>
                  </TimelineItem>
                </InfoCard>

                {/* CERTIFICATIONS */}
                <InfoCard>
                  <h3>
                    <span className="icon">🏅</span> Certifications
                  </h3>
                  <TimelineItem>
                    <h4>Introduction to Responsible AI</h4>
                    <p className="date">Google · 2025</p>
                  </TimelineItem>
                  <TimelineItem>
                    <h4>Introduction to Image Generation</h4>
                    <p className="date">Google · 2025</p>
                  </TimelineItem>
                  <TimelineItem>
                    <h4>Introduction à la Cybersécurité</h4>
                    <p className="date">Cisco Networking Academy · 2025</p>
                  </TimelineItem>
                  <TimelineItem>
                    <h4>Cybersécurité appliquée à la finance</h4>
                    <p className="date">Udemy · 2026</p>
                  </TimelineItem>
                </InfoCard>

                {/* LANGUES */}
                <InfoCard>
                  <h3>
                    <span className="icon">🌍</span> Langues
                  </h3>
                  <TimelineItem>
                    <h4>Arabe</h4>
                    <p className="date">Langue maternelle</p>
                  </TimelineItem>
                  <TimelineItem>
                    <h4>Français</h4>
                    <p className="date">B1</p>
                  </TimelineItem>
                  <TimelineItem>
                    <h4>Anglais</h4>
                    <p className="date">B2</p>
                  </TimelineItem>
                  <TimelineItem>
                    <h4>Espagnol</h4>
                    <p className="date">A1</p>
                  </TimelineItem>
                </InfoCard>
              </InfoCards>
            </AboutGrid>
          </Section>
        </div>

        {/* ===== SKILLS ===== */}
        <div id="skills">
          <Section>
            <AccentLine />
            <SectionTitle>Mes Compétences</SectionTitle>
            <SectionSubtitle>
              Technologies que j'utilise pour créer des solutions performantes et sécurisées
            </SectionSubtitle>

            <SkillsGrid>
              <SkillCategory>
                <h3>
                  <span className="icon">💻</span> Langages de programmation
                </h3>
                <SkillTags>
                  {['Python', 'Java', 'C#', 'PHP', 'JavaScript', 'Dart', 'C', 'HTML5', 'CSS3'].map(s => (
                    <SkillTag key={s}>{s}</SkillTag>
                  ))}
                </SkillTags>
              </SkillCategory>

              <SkillCategory>
                <h3>
                  <span className="icon">⚛️</span> Frameworks & Bibliothèques
                </h3>
                <SkillTags>
                  {['React', 'Vue.js', 'Next.js', 'Node.js', 'Express.js', 'Symfony', 'Flutter', 'Chart.js'].map(s => (
                    <SkillTag key={s}>{s}</SkillTag>
                  ))}
                </SkillTags>
              </SkillCategory>

              <SkillCategory>
                <h3>
                  <span className="icon">🗄️</span> Bases de données
                </h3>
                <SkillTags>
                  {['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite', 'Firebase', 'Supabase', 'SQL Server', 'InfluxDB'].map(s => (
                    <SkillTag key={s}>{s}</SkillTag>
                  ))}
                </SkillTags>
              </SkillCategory>

              <SkillCategory>
                <h3>
                  <span className="icon">🔐</span> Cybersécurité
                </h3>
                <SkillTags>
                  {['Kali Linux', 'Nmap', 'Metasploit', 'Wireshark', 'Burp Suite', 'Snort', 'Fail2ban', 'Lynis'].map(s => (
                    <SkillTag key={s}>{s}</SkillTag>
                  ))}
                </SkillTags>
              </SkillCategory>

              <SkillCategory>
                <h3>
                  <span className="icon">☁️</span> DevOps & Cloud
                </h3>
                <SkillTags>
                  {['Git', 'Docker', 'Kubernetes', 'Grafana', 'Nginx', 'Apache', 'AWS'].map(s => (
                    <SkillTag key={s}>{s}</SkillTag>
                  ))}
                </SkillTags>
              </SkillCategory>

              <SkillCategory>
                <h3>
                  <span className="icon">🧠</span> IA & Data
                </h3>
                <SkillTags>
                  {['scikit-learn', 'Matplotlib', 'Streamlit', 'Machine Learning', 'Data Mining'].map(s => (
                    <SkillTag key={s}>{s}</SkillTag>
                  ))}
                </SkillTags>
              </SkillCategory>
            </SkillsGrid>
          </Section>
        </div>

        {/* ===== PROJECTS ===== */}
        <div id="projects">
          <Section>
            <AccentLine />
            <SectionTitle>Mes Projets</SectionTitle>
            <SectionSubtitle>
              Découvrez mon portfolio de solutions innovantes et d'implémentations créatives
            </SectionSubtitle>

            <ProjectsGrid>
              {projects.map((project) => (
                <ProjectCard key={project.id}>
                  <ProjectHeader>
                    <ProjectIcon>{project.icon}</ProjectIcon>
                    <ProjectCategory>{project.category}</ProjectCategory>
                  </ProjectHeader>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectTech>
                    {project.technologies.map((tech) => (
                      <TechTag key={tech}>{tech}</TechTag>
                    ))}
                  </ProjectTech>
                  <ProjectLink
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir le projet →
                  </ProjectLink>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </Section>
        </div>

        {/* ===== CONTACT ===== */}
        <div id="contact">
          <Section>
            <AccentLine />
            <SectionTitle>Me Contacter</SectionTitle>
            <SectionSubtitle>
              Prêt à démarrer votre projet ? Parlons de la façon dont je peux vous aider.
            </SectionSubtitle>

            <ContactGrid>
              <ContactInfo>
                <h3>Discutons ensemble</h3>
                <p>
                  Vous avez un projet ou souhaitez discuter d'opportunités ? Je suis
                  disponible pour des missions freelance et des postes permanents.
                </p>

                <ContactMethods>
                  <ContactMethod href="mailto:daoud.emna.it@gmail.com">
                    <div className="icon">✉️</div>
                    <div className="info">
                      <h4>Email</h4>
                      <p>daoud.emna.it@gmail.com</p>
                    </div>
                  </ContactMethod>

                  <ContactMethod href="tel:+21654460458">
                    <div className="icon">📞</div>
                    <div className="info">
                      <h4>Téléphone</h4>
                      <p>+216 54 460 458</p>
                    </div>
                  </ContactMethod>

                  <ContactMethod
                    href="https://www.linkedin.com/in/daoud-emna/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="icon">💼</div>
                    <div className="info">
                      <h4>LinkedIn</h4>
                      <p>linkedin.com/in/daoud-emna</p>
                    </div>
                  </ContactMethod>

                  <ContactMethod
                    href="https://github.com/emna401"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="icon">🐙</div>
                    <div className="info">
                      <h4>GitHub</h4>
                      <p>github.com/emna401</p>
                    </div>
                  </ContactMethod>
                </ContactMethods>
              </ContactInfo>

              <ContactForm ref={form} onSubmit={sendEmail}>
                <FormGroup>
                  <label htmlFor="name">Votre nom</label>
                  <input
                    id="name"
                    name="user_name"
                    type="text"
                    required
                    placeholder="Jean Dupont"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="email">Votre email</label>
                  <input
                    id="email"
                    name="user_email"
                    type="email"
                    required
                    placeholder="jean@exemple.com"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="subject">Sujet</label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Proposition de collaboration"
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Votre message ici..."
                  />
                </FormGroup>

                <PrimaryButton type="submit" style={{ width: '100%', justifyContent: 'center' }}>
                  Envoyer le message →
                </PrimaryButton>
              </ContactForm>
            </ContactGrid>
          </Section>
        </div>

        {/* ===== FOOTER ===== */}
        <Footer>
          <p>
            © {new Date().getFullYear()} Emna Daoud · Développé avec ❤️ en React ·
            <a href="https://github.com/emna401" target="_blank" rel="noopener noreferrer"> GitHub</a>
          </p>
        </Footer>
      </Container>
    </>
  );
}