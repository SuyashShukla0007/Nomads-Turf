// selected 2
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import workspaceImg from '../assets/OfficeVirtual.jpg';
import gameImg from '../assets/empplayingGames.webp';
import boardImg from '../assets/boardImg.jpg';
import chatImg from '../assets/chatImg.jpg';
import './Home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Choose Your Workspace',
      description: 'Step into a virtual office where collaboration feels as natural as being in the same room.',
      img: workspaceImg,
    },
   
    {
      title: 'Collaborative Board',
      description: 'Brainstorm, ideate, and share ideas effortlessly on a dynamic, interactive whiteboard.',
      img: boardImg,
    },
    {
      title: 'Mini Chat Room',
      description: 'Stay connected with real-time chat – because every great idea starts with a conversation.',
      img: chatImg,
    },
    {
      title: 'Games',
      description: 'Take a break with fun virtual games designed for bonding and stress relief.',
      img: gameImg,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.reveal-card');
      cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
          card.classList.add('visible');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-y-auto relative">
      {/* Background Effects */}
      <div className="aurora-bg absolute inset-0 z-0"></div>
      <div className="floating-shapes absolute inset-0 z-0"></div>
      <div className="grid-overlay absolute inset-0 z-0"></div>

   {/* Header */}
<header className="p-6 flex justify-between items-center sticky top-0 backdrop-blur-lg z-50 bg-black/30 shadow-xl">
  <h1 className="text-6xl font-extrabold tracking-wide text-transparent bg-gradient-to-r from-[#ffffff] to-[#D7CCC8] bg-clip-text animate-slide-in-left">
    Nomad's Turf
  </h1>
  
  <button
    onClick={() => navigate('/auth')}
    className="px-8 py-3 rounded-full bg-transparent border-2 border-white/30 text-white text-lg font-medium shadow-glass backdrop-blur-md hover:bg-white/20 hover:scale-105 transition-all duration-300"
  >
    Get Started
  </button>
</header>


      {/* Hero Section */}
      <section className="text-center mt-32 px-4 relative z-10 animate-fade-in">
        <h2 className="text-7xl font-bold mb-8 text-white drop-shadow-2xl">
          Your Virtual Workspace Awaits
        </h2>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed font-light bg-black/40 p-4 rounded-lg shadow-lg">
          Experience a next-generation virtual office where you can work, play, and connect seamlessly. Welcome to a new way of collaborating.
        </p>
      </section>

      {/* Feature Cards */}
      <div className="mt-32 space-y-24 px-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`reveal-card flex items-center justify-between max-w-6xl mx-auto p-8 rounded-xl shadow-xl glass-card transform transition-transform duration-700 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Image Preview */}
            <div className="w-1/2 hover:scale-105 transition-transform duration-700">
              <img src={section.img} alt={section.title} className="rounded-lg shadow-lg" />
            </div>

            {/* Text Content */}
            <div className="w-1/2 px-8">
              <h3 className="text-5xl font-semibold mb-6 drop-shadow-lg">{section.title}</h3>
              <p className="text-lg leading-relaxed bg-black/50 p-4 rounded-lg shadow-lg">
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default HomePage;
