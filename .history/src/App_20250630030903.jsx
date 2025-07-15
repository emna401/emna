import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const fadeIn = keyframes\`from { opacity: 0; } to { opacity: 1; }\`;
const backgroundShift = keyframes\`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
\`;

const GlobalStyle = createGlobalStyle\`
  * { margin:0; padding:0; box-sizing:border-box }
  body, html, #root { height:100%; width:100%; }
  body { font-family:'Poppins', sans-serif; color:#e0e0e0; display:flex; flex-direction:column; background:#121212; }
\`;

const AnimatedBackground = styled.div\`
  position: fixed; inset:0; z-index:-1;
  background: radial-gradient(circle at 20% 20%, rgba(124,77,255,0.15), transparent),
              radial-gradient(circle at 80% 80%, rgba(179,136,255,0.15), transparent),
              linear-gradient(120deg,#121212,#1a1a1a);
  animation: \${backgroundShift} 20s infinite alternate;
\`;

const Container = styled.div\`display:flex; flex-direction:column; min-height:100vh;\`;
const Header = styled.header\`padding:1.5rem 2rem; background:rgba(18,18,18,0.9); border-bottom:1px solid rgba(255,255,255,0.1); display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:100; @media (max-width:768px){flex-direction:column; gap:1rem; padding:1rem;}\`;
const Logo = styled.h1\`color:#7c4dff; font-size:1.5rem; font-weight:700; animation:\${fadeIn} 0.8s ease-out;\`;
const Nav = styled.nav\`display:flex; gap:2rem; @media(max-width:768px){gap:1rem; flex-wrap:wrap; justify-content:center;}\`;
const NavLink = styled.button\`
  background:none; border:none; color:\${props=>props.active?'#7c4dff':'#b0b0b0'};
  font-weight:600; font-size:0.9rem; cursor:pointer; text-transform:uppercase; letter-spacing:1px;
  padding:0.5rem 0; position:relative; transition:color 0.3s;
  &::after {
    content:''; position:absolute; bottom:0; left:0; width:\${props=>props.active?'100%':'0'};
    height:2px; background:#7c4dff; transition:width 0.3s;
  }
  &:hover { color:#7c4dff; }
  &:hover::after { width:100%; }
\`;
const Main = styled.main\`flex:1; display:flex; flex-direction:column; padding:2rem;\`;
const Section = styled.section\`
  max-width:1200px; width:100%; margin:0 auto; padding:2rem 0; animation:\${fadeIn} 0.8s ease-out;
\`;
const Title = styled.h2\`
  font-size:2.5rem; margin-bottom:2rem; background:linear-gradient(90deg,#7c4dff,#b388ff);
  -webkit-background-clip:text; background-clip:text; color:transparent; text-align:center;
\`;
const Text = styled.p\`font-size:1.1rem; color:#e0e0e0; margin-bottom:1.5rem; line-height:1.8;\`;
const Button = styled.button\`
  background:linear-gradient(135deg,#7c4dff,#b388ff); color:#fff;
  border:none; padding:0.8rem 2rem; border-radius:30px;
  font-weight:600; font-size:1rem; cursor:pointer;
  transition:transform 0.3s; margin-top:1rem; align-self:center;
  &:hover { transform:translateY(-3px); box-shadow:0 6px 20px rgba(124,77,255,0.4); }
\`;
const ProjectCard = styled.div\`
  background:rgba(30,30,30,0.7); border-radius:12px; padding:1.5rem;
  margin-bottom:1.5rem; border:1px solid rgba(255,255,255,0.1); transition:all 0.3s;
  &:hover { transform:translateY(-5px); box-shadow:0 10px 25px rgba(0,0,0,0.3); }
  h3 { color:#7c4dff; margin-bottom:0.8rem; font-size:1.3rem; }
\`;
const ContactInfo = styled.div\`display:flex; flex-direction:column; gap:1.5rem; align-items:center; margin-top:2rem;\`;
const ContactItem = styled.div\`display:flex; align-items:center; gap:1rem; font-size:1.1rem;\`;

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_gsnnxfa', 'template_kuszp9i', form.current, 'OeQ2G0vylhEYgX4zS')
      .then(() => {
        alert('Message envoyé avec succès !');
        form.current.reset();
      }, (error) => {
        alert("Une erreur s'est produite.");
        console.error(error);
      });
  };

  return (
    <>
      <GlobalStyle />
      <AnimatedBackground />
      <Container>
        <Header>
          <Logo>EMNA DAOUD</Logo>
          <Nav>
            {['home','about','projects','contact'].map((page) => (
              <NavLink key={page} active={activePage === page} onClick={() => setActivePage(page)}>
                {page.toUpperCase()}
              </NavLink>
            ))}
          </Nav>
        </Header>
        <Main>
          {activePage === 'home' && (
            <Section style={{ textAlign: 'center' }}>
              <Title>HEY, I'M EMNA DAOUD</Title>
              <Text style={{ maxWidth: '700px', margin: '0 auto' }}>
                Développeuse Full Stack passionnée par la création d'applications web et mobiles innovantes...
              </Text>
              <Button onClick={() => setActivePage('projects')}>Découvrir mes projets</Button>
            </Section>
          )}
          {activePage === 'about' && (
            <Section>
              <Title>À PROPOS DE MOI</Title>
              <Text style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
                Passionnée par les nouvelles technologies, rigoureuse et créative.
              </Text>
            </Section>
          )}
          {activePage === 'projects' && (
            <Section>
              <Title>MES RÉALISATIONS</Title>
              {[
                { t: 'App Budget', d: 'Web, graphique, IA (Django, Chart.js)' },
                { t: 'Gestion Réparations', d: 'Symfony, Admin' },
                { t: 'Facturation Desktop', d: 'JavaFX, PDF' },
                { t: 'App Santé', d: 'Flutter, Firebase' },
                { t: 'Gestion Scolaire', d: 'PHP, MySQL' },
                { t: 'E‑commerce', d: 'React, Node.js, Stripe' }
              ].map(p => (
                <ProjectCard key={p.t}><h3>{p.t}</h3><Text>{p.d}</Text></ProjectCard>
              ))}
            </Section>
          )}
          {activePage === 'contact' && (
            <Section style={{ textAlign: 'center' }}>
              <Title>TRAVAILLONS ENSEMBLE</Title>
              <Text>Vous avez un projet ? Contactez-moi !</Text>
              <ContactInfo>
                <ContactItem>Email: daoud.emna.it@gmail.com</ContactItem>
                <ContactItem>Téléphone: +216 54 460 458</ContactItem>
                <ContactItem>Localisation: Sfax, Tunisie</ContactItem>
              </ContactInfo>
              <form ref={form} onSubmit={sendEmail} style={{
                display:'flex', flexDirection:'column', gap:'1rem',
                maxWidth:'500px', margin:'2rem auto', padding:'2rem',
                borderRadius:'12px', background:'rgba(255,255,255,0.05)'
              }}>
                <input name="user_name" type="text" placeholder="Votre nom" required style={inputStyle} />
                <input name="user_email" type="email" placeholder="Votre email" required style={inputStyle} />
                <textarea name="message" placeholder="Votre message" rows="5" required style={inputStyle} />
                <Button type="submit">Envoyer</Button>
              </form>
            </Section>
          )}
        </Main>
      </Container>
    </>
  );
}

const inputStyle = {
  padding:'0.8rem', borderRadius:'8px', border:'none',
  background:'#1e1e1e', color:'#fff'
};