import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`from { opacity: 0; } to { opacity: 1; }`;
const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Global Styles
const GlobalStyle = createGlobalStyle`
  * { margin:0; padding:0; box-sizing:border-box }
  body, html, #root { height:100%; width:100%; }
  body { 
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
    color:#2d3748; 
    display:flex; 
    flex-direction:column; 
    background:#f7fafc;
  }
`;

const AnimatedBackground = styled.div`
  position: fixed; 
  inset:0; 
  z-index:-1;
  background: linear-gradient(-45deg, #f0fdfa, #ecfdf5, #f0f9ff, #eff6ff);
  background-size: 400% 400%;
  animation: ${gradientFlow} 15s ease infinite;
`;

const Container = styled.div`
  display:flex; 
  flex-direction:column; 
  min-height:100vh;
  background: rgba(255,255,255,0.85);
`;

const Header = styled.header`
  padding:1.5rem 2rem; 
  background:rgba(255,255,255,0.95); 
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display:flex; 
  justify-content:space-between; 
  align-items:center; 
  position:sticky; 
  top:0; 
  z-index:100; 
  @media (max-width:768px){
    flex-direction:column; 
    gap:1rem; 
    padding:1rem;
  }
`;

const Logo = styled.h1`
  color:#0f766e; 
  font-size:1.8rem; 
  font-weight:700; 
  animation:${fadeIn} 0.8s ease-out;
  span {
    color:#0891b2;
  }
`;

const Nav = styled.nav`
  display:flex; 
  gap:1.5rem; 
  @media(max-width:768px){
    gap:1rem; 
    flex-wrap:wrap; 
    justify-content:center;
  }
`;

const NavLink = styled.button`
  background:none; 
  border:none; 
  color:${props=>props.active?'#0d9488':'#4a5568'};
  font-weight:600; 
  font-size:0.95rem; 
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
    width:${props=>props.active?'100%':'0'};
    height:2px; 
    background:#0d9488; 
    transition:width 0.3s;
  }
  &:hover { 
    color:#0d9488; 
  }
  &:hover::after { 
    width:100%; 
  }
`;

const Main = styled.main`
  flex:1; 
  display:flex; 
  flex-direction:column; 
  padding:2rem;
`;

const Section = styled.section`
  max-width:1200px; 
  width:100%; 
  margin:0 auto; 
  padding:3rem 0; 
  animation:${fadeIn} 0.8s ease-out;
`;

const Title = styled.h2`
  font-size:2.5rem; 
  margin-bottom:2rem; 
  color:#0f766e;
  text-align:center;
  position: relative;
  display: inline-block;
  width: 100%;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: #0d9488;
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
`;

const Text = styled.p`
  font-size:1.1rem; 
  color:#4a5568; 
  margin-bottom:1.5rem; 
  line-height:1.7;
`;

const Button = styled.button`
  background:#0d9488; 
  color:#fff;
  border:none; 
  padding:0.8rem 2rem; 
  border-radius:8px;
  font-weight:600; 
  font-size:1rem; 
  cursor:pointer;
  transition:all 0.3s; 
  margin-top:1rem; 
  align-self:center;
  &:hover { 
    background:#0f766e; 
    box-shadow:0 4px 6px rgba(6, 95, 70, 0.2); 
    transform: translateY(-2px);
  }
`;

const Card = styled.div`
  background:#fff; 
  border-radius:12px; 
  padding:1.5rem;
  margin-bottom:1.5rem; 
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition:all 0.3s;
  &:hover { 
    transform:translateY(-5px); 
    box-shadow: 0 10px 15px rgba(0,0,0,0.1);
  }
`;

const ProjectCard = styled(Card)`
  h3 { 
    color:#0d9488; 
    margin-bottom:0.8rem; 
    font-size:1.3rem; 
  }
`;

const InfoCard = styled(Card)``;

const EducationItem = styled.div`
  margin-bottom:1.5rem; 
  h4{
    color:#0891b2;
    margin-bottom:0.5rem;
    font-size: 1.1rem;
  } 
  p{
    margin:0.3rem 0;
    color:#4a5568;
    font-size: 0.95rem;
  }
`;

const ExperienceItem = styled(EducationItem)`
  p{
    font-style:italic;
    color: #718096;
  }
`;

const LanguageItem = styled.div`
  display:flex; 
  justify-content:space-between; 
  align-items:center; 
  margin-bottom:0.8rem;
  span:first-child{
    font-weight:600;
    color:#0891b2;
  } 
  span:last-child{
    background:rgba(13, 148, 136, 0.1);
    padding:0.3rem 0.8rem;
    border-radius:20px;
    font-size:0.9rem;
    color: #0d9488;
  }
`;

const SkillsGrid = styled.div`
  display:grid; 
  grid-template-columns:repeat(auto-fill,minmax(120px,1fr)); 
  gap:1.5rem;
`;

const SkillItem = styled.div`
  display:flex; 
  flex-direction:column; 
  align-items:center; 
  padding:1rem;
  background:rgba(13, 148, 136, 0.05); 
  border-radius:8px; 
  transition:all 0.3s;
  border: 1px solid rgba(13, 148, 136, 0.1);
  &:hover{
    transform:translateY(-5px); 
    background:rgba(13, 148, 136, 0.1);
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  span{
    font-size:0.95rem;
    color: #2d3748;
    font-weight: 500;
  }
`;

const ContactInfo = styled.div`
  display:flex; 
  flex-direction:column; 
  gap:1.5rem; 
  align-items:center; 
  margin-top:2rem;
`;

const ContactItem = styled.div`
  display:flex; 
  align-items:center; 
  gap:1rem; 
  font-size:1.1rem;
  color: #2d3748;
  svg {
    color: #0d9488;
  }
`;

export default function App() {
  const [active, setActive] = useState('home');
  const form = useRef();

  const sendEmail = e => {
    e.preventDefault();
    emailjs.sendForm('service_gsnnxfa','template_kuszp9i',form.current,'OeQ2G0vylhEYgX4zS')
      .then(_=>{alert('Message envoyé !'); form.current.reset();}, err=>{alert('Erreur...'); console.error(err);});
  };

  return (
    <>
      <GlobalStyle />
      <AnimatedBackground />
      <Container>
        <Header>
          <Logo>EMNA <span>DAOUD</span></Logo>
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
            <Section style={{textAlign:'center'}}>
              <Title>Hello, I'm Emna Daoud</Title>
              <Text style={{maxWidth:'700px', margin:'0 auto', fontSize: '1.2rem'}}>
                Full Stack Developer passionate about creating innovative web and mobile applications with clean, efficient code and intuitive user experiences.
              </Text>
              <Button onClick={()=>setActive('projects')}>View My Projects</Button>
            </Section>
          )}
          {active==='about' && (
            <Section>
              <Title>About Me</Title>
              <Text style={{textAlign:'center',maxWidth:'800px',margin:'0 auto 2rem'}}>
                Technology enthusiast with a strong foundation in computer science and hands-on experience in full-stack development.
              </Text>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:'2rem'}}>
                <InfoCard><h3 style={{color:'#0d9488'}}>Education</h3>
                  <EducationItem><h4>Computer Science Degree</h4><p>ISG Sfax</p><p>2022–2025</p></EducationItem>
                  <EducationItem><h4>High School Diploma</h4><p>Lycée Megdiche, Sfax</p><p>2017–2022</p></EducationItem>
                </InfoCard>
                <InfoCard><h3 style={{color:'#0d9488'}}>Experience</h3>
                  <ExperienceItem><h4>Web Internship (STEG)</h4><p>2024, Sfax</p><p>Internal applications development</p></ExperienceItem>
                  <ExperienceItem><h4>Network Internship (TT)</h4><p>2020, Sfax</p><p>Infrastructure maintenance</p></ExperienceItem>
                </InfoCard>
                <InfoCard><h3 style={{color:'#0d9488'}}>Languages</h3>
                  <LanguageItem><span>French</span><span>B1</span></LanguageItem>
                  <LanguageItem><span>English</span><span>B1</span></LanguageItem>
                  <LanguageItem><span>Spanish</span><span>A1</span></LanguageItem>
                </InfoCard>
                <InfoCard><h3 style={{color:'#0d9488'}}>Skills</h3>
                  <SkillsGrid>
                    {['Python','Java','C#','C','PHP','JavaScript','HTML5','CSS','Dart','Symfony','Flutter','React','Node.js'].map(s=>(
                      <SkillItem key={s}><span>{s}</span></SkillItem>
                    ))}
                  </SkillsGrid>
                </InfoCard>
              </div>
            </Section>
          )}
          {active==='projects' && (
            <Section>
              <Title>My Projects</Title>
              {[
                {t:'Budget App',d:'Web application with data visualization and AI predictions (Django, Chart.js)'},
                {t:'Repair Management',d:'Complete management system with admin panel (Symfony)'},
                {t:'Desktop Billing',d:'JavaFX application with PDF generation'},
                {t:'Health App',d:'Mobile health tracker (Flutter, Firebase)'},
                {t:'School Management',d:'Web system for school administration (PHP, MySQL)'},
                {t:'E‑commerce Platform',d:'Full-featured online store (React, Node.js, Stripe)'}
              ].map(p=>(
                <ProjectCard key={p.t}><h3>{p.t}</h3><Text>{p.d}</Text></ProjectCard>
              ))}
            </Section>
          )}
          {active==='contact' && (
            <Section style={{textAlign:'center'}}>
              <Title>Let's Work Together</Title>
              <Text>Have a project in mind? Get in touch!</Text>
              <ContactInfo>
                <ContactItem>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  daoud.emna.it@gmail.com
                </ContactItem>
                <ContactItem>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  +216 54 460 458
                </ContactItem>
                <ContactItem>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  Sfax, Tunisia
                </ContactItem>
              </ContactInfo>
              <form ref={form} onSubmit={sendEmail} style={{
                display:'flex', 
                flexDirection:'column', 
                gap:'1.2rem',
                maxWidth:'500px', 
                margin:'2rem auto', 
                padding:'2rem',
                borderRadius:'12px', 
                background:'#fff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <input 
                  name="user_name" 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  style={inputStyle} 
                />
                <input 
                  name="user_email" 
                  type="email" 
                  placeholder="Your Email" 
                  required 
                  style={inputStyle} 
                />
                <textarea 
                  name="message" 
                  placeholder="Your Message" 
                  rows="5" 
                  required 
                  style={{...inputStyle, minHeight: '150px'}} 
                />
                <Button type="submit">Send Message</Button>
              </form>
            </Section>
          )}
        </Main>
      </Container>
    </>
  );
}

const inputStyle = {
  padding:'0.8rem 1rem', 
  borderRadius:'8px', 
  border:'1px solid #e2e8f0',
  background:'#fff', 
  color:'#2d3748',
  fontSize: '1rem',
  transition: 'all 0.3s',
  ':focus': {
    outline: 'none',
    borderColor: '#0d9488',
    boxShadow: '0 0 0 3px rgba(13, 148, 136, 0.1)'
  }
};