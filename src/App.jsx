import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Images
import pfp from './images/pfp1.gif';
import view from './images/viewW.svg';
import discord from './images/discord.png';
import telegram from './images/telegram.png';
import vk from './images/vk.png';
import animedia from './images/animedia.png';
import yandex from './images/yandex.png';

// Videos
import videoMobile from './videos/telefon.mp4';
import videoDesktop from './videos/comp.mp4';

function App() {
  const [viewCount, setViewCount] = useState(1488);
  const [showOverlay, setShowOverlay] = useState(true);
  const [entered, setEntered] = useState(false);

  // Typewriter config
  const BIO_TEXT = 'Модератор whiterise';
  const TYPE_SPEED = 120;
  const PAUSE_END = 2000;
  const [bioIndex, setBioIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [bio, setBio] = useState('');

  const videoRef = useRef(null);

  // Fetch views
  useEffect(() => {
    fetch('/increment-view')
      .then(response => response.json())
      .then(data => setViewCount(data.viewCount))
      .catch(error => console.error('Error:', error));
  }, []);

  // Typewriter loop
  useEffect(() => {
    let t;
    const safeIndex = Math.max(0, Math.min(BIO_TEXT.length, bioIndex));
    setBio(BIO_TEXT.slice(0, safeIndex));

    if (direction === 1 && safeIndex === BIO_TEXT.length) {
      t = setTimeout(() => setDirection(-1), PAUSE_END);
    } else if (direction === -1 && safeIndex === 0) {
      t = setTimeout(() => setDirection(1), 600);
    } else {
      t = setTimeout(() => setBioIndex(i => i + direction), TYPE_SPEED);
    }

    return () => clearTimeout(t);
  }, [bioIndex, direction]);

  const handleOverlayClick = () => {
    setShowOverlay(false);
    setEntered(true);
    const vid = videoRef.current;
    if (vid) {
      vid.muted = false;
      vid.play().catch(() => {});
    }
  };

  return (
    <div className='app-container'>
      {/* Видео: браузер загрузит только один <source>, подходящий по media */}
      <video ref={videoRef} loop muted playsInline className='video-background'>
        <source src={videoDesktop} media="(min-width: 768px)" type="video/mp4" />
        <source src={videoMobile} media="(max-width: 767px)" type="video/mp4" />
        Ваш браузер не поддерживает тег video.
      </video>

      {showOverlay && (
        <div className='overlay' onClick={handleOverlayClick}>
          <p className='click'>Continue?</p>
        </div>
      )}

      <div className={`main-container ${entered ? 'entered' : ''}`}>
        <div className='views'>
          <img src={view} className='view' alt='View Icon' />
          <span className='num'>{viewCount}</span>
        </div>

        <img src={pfp} className='pfp' alt='Profile Picture' />

        <div className='info'>
          <h1 className='name'>Jumarf</h1>
          <h2 className='bio'>{bio}</h2>
        </div>

        <div className='links'>
          <a href='https://t.me/Jumarfik' target='_blank' rel='noopener noreferrer'>
            <img src={telegram} alt='Telegram' />
          </a>
          <a href='https://vk.com/ijumarf' target='_blank' rel='noopener noreferrer'>
            <img src={vk} alt='VK' />
          </a>
          <a href='https://amedia.online' target='_blank' rel='noopener noreferrer'>
            <img src={animedia} alt='AniMedia' />
          </a>
          <a
            href='https://music.yandex.ru/playlists/lk.59b2c22d-e2a8-45c8-a743-549ed9329896?utm_source=web&utm_medium=copy_link'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src={yandex} alt='Yandex Music' />
          </a>
          <a href='https://discord.com/users/1394584725926187069' target='_blank' rel='noopener noreferrer'>
            <img src={discord} alt='Discord' />
          </a>
        </div>

        <div className='div1'></div>

        <a
          className='button2'
          href='https://amedia.online/2007-povelitel-tajn-kloun.html'
          target='_blank'
          rel='noopener noreferrer'
        >
          Лучшее Аниме
        </a>

        <a
          className='button1'
          href='https://amedia.online/1489-protivostojanie-svjatogo.html'
          target='_blank'
          rel='noopener noreferrer'
        >
          Лучшее Donghua
        </a>

        <div className='div2'></div>
      </div>
    </div>
  );
}

export default App;
