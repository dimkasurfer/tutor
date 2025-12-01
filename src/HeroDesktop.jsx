import React, { useRef } from 'react';
import LaserFlow from './LaserFlow';

export default function HeroMobile() {
  const heroRef = useRef(null);

  // Логика фонарика (работает от касания пальцем тоже)
  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      // Если это touch событие (телефон) или мышь
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <section 
      className="hero mobile-hero" 
      ref={heroRef} 
      onMouseMove={handleMouseMove} 
      onTouchMove={handleMouseMove} // Добавил реакцию на палец
      id="about"
    >
      <div className="reveal-bg" style={{ backgroundImage: 'url(/bg.jpg)' }}></div>
      
      <div className="laser-wrapper">
         <LaserFlow 
           color="#8b5cf6" 
           flowSpeed={0.5} 
           wispDensity={1.5}
           
           /* --- НАСТРОЙКИ ПОТОКА СПРАВА --- */
           horizontalBeamOffset={0.8}   /* 0.8 = Сдвинут сильно вправо (почти край) */
           verticalBeamOffset={-0.9}    /* -0.9 = В самом низу (на полу) */
           horizontalSizing={8.0}       /* Очень широкий, чтобы поток шел влево */
           verticalSizing={10.0}        /* Очень высокий, чтобы уходил вверх за экран */
         />
      </div>
      
      <div className="hero-content" style={{ textAlign: 'center', width: '100%', padding: '0 20px' }}>
        <h1 style={{ fontSize: '2rem' }}>Преподаватель из<br /> <span className="accent-text">Дипломатического Протокола</span></h1>
        <p style={{ fontSize: '1rem', marginTop: '10px' }}>Английский и Арабский языки для бизнеса и дипломатии.</p>
        <a href="#contact" className="cta-btn">Записаться</a>
      </div>
    </section>
  );
}