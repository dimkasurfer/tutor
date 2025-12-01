import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LaserFlow from './LaserFlow';
import Dock from './Dock';
import { VscHome, VscAccount, VscBriefcase, VscCommentDiscussion } from "react-icons/vsc";
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const heroRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const items = [
    { icon: <VscHome size={24} color="#fff" />, label: 'Домой', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { icon: <VscAccount size={24} color="#fff" />, label: 'Обо мне', onClick: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <VscBriefcase size={24} color="#fff" />, label: 'Услуги', onClick: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: <VscCommentDiscussion size={24} color="#fff" />, label: 'Контакты', onClick: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(".hero-photo", 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "power3.out" }
      );
      gsap.utils.toArray(".section-title").forEach(title => {
        gsap.to(title, { scrollTrigger: { trigger: title, start: "top 80%" }, opacity: 1, x: 20, duration: 1 });
      });
      gsap.utils.toArray(".timeline-item").forEach((item, i) => {
        gsap.to(item, { scrollTrigger: { trigger: item, start: "top 85%" }, opacity: 1, x: 0, duration: 0.8, delay: i * 0.2 });
      });
      gsap.to(".experience-photo", {
        scrollTrigger: { trigger: "#experience", start: "top 70%" }, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)"
      });
      gsap.utils.toArray(".card").forEach((card, i) => {
        gsap.to(card, { scrollTrigger: { trigger: card, start: "top 90%" }, opacity: 1, y: 0, duration: 0.8, delay: i * 0.1 });
      });
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && (
        <div className="loader">
          <div className="loader-text">PREPARING PROTOCOL...</div>
          <div className="loader-bar"></div>
        </div>
      )}

      <div className={`app-container ${isLoading ? 'hidden' : 'visible'}`}>
        
        {/* ВЕРХНЕЕ МЕНЮ УБРАНО ПОЛНОСТЬЮ */}

        <section className="hero" ref={heroRef} onMouseMove={handleMouseMove} id="about">
          <div className="reveal-bg" style={{ backgroundImage: 'url(/bg.jpg)' }}></div>
          
          <div className="laser-wrapper">
             {!isLoading && (
               <LaserFlow 
                 color="#8b5cf6" 
                 flowSpeed={0.4} 
                 wispDensity={1.5}
                 
                 /* НАСТРОЙКИ ДЛЯ ТЕЛЕФОНА (isMobile) */
                 /* Если мобильный: сдвигаем лазер вправо (0.4) и делаем его вертикальным столбом */
                 horizontalBeamOffset={isMobile ? 0.4 : 0.2} 
                 verticalBeamOffset={isMobile ? -0.2 : -0.8}
                 horizontalSizing={isMobile ? 3.0 : 1.0} 
                 verticalSizing={isMobile ? 5.0 : 1.0}   
               />
             )}
          </div>
          
          <div className="hero-content">
            {/* ИЗМЕНИЛ ТЕКСТ */}
            <h1>Преподаватель из<br /> <span className="accent-text">Дипломатического Протокола</span></h1>
            <p>Английский и Арабский языки для бизнеса и дипломатии.</p>
            <a href="#contact" className="cta-btn">Записаться на консультацию</a>
          </div>

          {/* Фото грузится, но CSS скроет его на мобильном */}
          <img src="/hero-photo.png" className="hero-photo" alt="Дмитрий Оситковский" />
        </section>

        <section id="experience">
          <h2 className="section-title">Мой Путь</h2>
          <div className="experience-container">
              <div className="timeline">
                <div className="timeline-item"><span className="year">2018-2020</span><div className="role">Начало карьеры</div><p className="desc">Тренер по виндсерфингу и начало преподавания английского языка.</p></div>
                <div className="timeline-item"><span className="year">2022</span><div className="role">Востоковедение</div><p className="desc">Старт преподавания арабского языка. Глубокое погружение в культуру.</p></div>
                <div className="timeline-item"><span className="year">2023</span><div className="role">Атташе и Дипломатия</div><p className="desc">Атташе официальных лиц и делегаций.</p></div>
                <div className="timeline-item"><span className="year">2024-2025</span><div className="role">Международные Саммиты</div><p className="desc">Участие в саммитах БРИКС, спикер в ОАЭ.</p></div>
              </div>
              {/* ФОТО БУДЕТ ЗДЕСЬ НА МОБИЛЬНОМ */}
              <div className="experience-image-block">
                  <img src="/path-photo.png" className="experience-photo" alt="Мой путь" />
              </div>
          </div>
        </section>

        <section id="services">
          <h2 className="section-title">Стоимость обучения</h2>
          <div className="services-grid">
            <div className="card"><h3>Индивидуально</h3><p className="desc">Английский и Арабский</p><span className="price">от 2 900 ₽</span></div>
            <div className="card"><h3>В группе</h3><p className="desc">Мини-группы</p><span className="price">от 1 900 ₽</span></div>
            <div className="card active-border"><h3>Корпоративное</h3><p className="desc">B2B Обучение</p><span className="price">от 49 000 ₽ / мес</span></div>
          </div>
        </section>

        <section id="contact">
          <h2 className="section-title">Связаться со мной</h2>
          <div className="contact-container">
              <a href="tel:+79218695623" className="contact-item">📞 +7 (921)-869-56-23</a>
              <a href="mailto:ip@ositkovskij.ru" className="contact-item">✉️ ip@ositkovskij.ru</a>
          </div>
        </section>
        
        <footer>© 2025 Дмитрий Оситковский. Все права защищены.</footer>

        <Dock items={items} panelHeight={68} baseItemSize={50} magnification={70} />

      </div>
    </>
  );
}

export default App;