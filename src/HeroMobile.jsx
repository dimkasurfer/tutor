import React, { useRef } from 'react';
import LaserFlow from './LaserFlow';

export default function HeroMobile() {
  const heroRef = useRef(null);

  // Логика фонарика внутри компонента
  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section className="hero mobile-hero" ref={heroRef} onMouseMove={handleMouseMove} id="about">
      <div className="reveal-bg" style={{ backgroundImage: 'url(/bg.jpg)' }}></div>
      
      <div className="laser-wrapper">
         <LaserFlow 
           color="#8b5cf6" 
           flowSpeed={0.5} 
           wispDensity={1.5}
           
           /* --- НАСТРОЙКИ ТОЛЬКО ДЛЯ ТЕЛЕФОНА --- */
           horizontalBeamOffset={0.3}   /* Сдвиг вправо */
           verticalBeamOffset={-0.2}    /* Высота */
           horizontalSizing={3.0}       /* Широкий луч */
           verticalSizing={4.0}         /* Длинный луч */
         />
      </div>
      
      <div className="hero-content" style={{ textAlign: 'center', width: '100%', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2rem' }}>Преподаватель из<br /> <span className="accent-text">Дипломатического Протокола</span></h1>
        <p style={{ fontSize: '1rem' }}>Английский и Арабский языки для бизнеса и дипломатии.</p>
        <a href="#contact" className="cta-btn">Записаться</a>
      </div>

      {/* Фото здесь специально не ставим, чтобы не занимать место */}
    </section>
  );
}