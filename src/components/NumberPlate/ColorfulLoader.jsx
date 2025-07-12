// ColorfulLoader.jsx - Separate component file
import React from 'react';
import { Grid } from 'ldrs/react';
import 'ldrs/react/Grid.css';

const ColorfulLoader = ({ isLoading, isTransitioning, loadingText = "Loading Plate Builder...", welcomeText = "Welcome!" }) => {
  const loaderStyles = `
    @font-face {
      font-family: 'ColorTube';
      src: url('fonts/ColorTube.otf') format('opentype');
      font-weight: normal;
      font-style: normal;
    }

    .colorful-loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #dddddd 0%, #f8f9fa 50%, #dddddd 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .colorful-loader-overlay.transitioning {
      opacity: 0;
      transform: scale(1.05);
      backdrop-filter: blur(10px);
    }
    
    .colorful-loader-content {
      text-align: center;
      transform: translateY(0);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    
    .colorful-loader-overlay.transitioning .colorful-loader-content {
      transform: translateY(-30px);
      opacity: 0.3;
    }

    .colorful-text {
      font-family: 'ColorTube', Arial, sans-serif;
      font-size: 1.2rem;
      font-weight: bold;
      margin-top: 1rem;
      letter-spacing: 0.1em;
      position: relative;
      display: inline-block;
    }

    /* Create the ColorTube multi-gradient effect for each letter */
    .colorful-text .letter {
      display: inline-block;
      font-size: 1.2rem;
      font-weight: bold;
      margin: 0 1px;
      position: relative;
      animation: colorPulse 3s ease-in-out infinite;
      background: linear-gradient(45deg, transparent, transparent);
      -webkit-background-clip: text;
      background-clip: text;
    }

    /* Multi-color gradients matching the ColorTube style exactly */
    .colorful-text .letter:nth-child(1) { /* L */
      background: linear-gradient(135deg, #ff6b35 0%, #ff8c42 30%, #ffa726 60%, #ffb74d 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .colorful-text .letter:nth-child(2) { /* o */
      background: linear-gradient(135deg, #26c6da 0%, #4fc3f7 25%, #29b6f6 50%, #42a5f5 75%, #5c6bc0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .colorful-text .letter:nth-child(3) { /* a */
      background: linear-gradient(135deg, #66bb6a 0%, #81c784 25%, #a5d6a7 50%, #c8e6c9 75%, #81c784 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .colorful-text .letter:nth-child(4) { /* d */
      background: linear-gradient(135deg, #ab47bc 0%, #ba68c8 25%, #ce93d8 50%, #e1bee7 75%, #f3e5f5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .colorful-text .letter:nth-child(5) { /* i */
      background: linear-gradient(135deg, #ffca28 0%, #ffd54f 25%, #ffecb3 50%, #fff9c4 75%, #ffeb3b 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .colorful-text .letter:nth-child(6) { /* n */
      background: linear-gradient(135deg, #26a69a 0%, #4db6ac 25%, #80cbc4 50%, #b2dfdb 75%, #e0f2f1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .colorful-text .letter:nth-child(7) { /* g */
      background: linear-gradient(135deg, #ec407a 0%, #f06292 25%, #f48fb1 50%, #f8bbd9 75%, #fce4ec 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Continue pattern for remaining letters */
    .colorful-text .letter:nth-child(8) { /* P */
      background: linear-gradient(135deg, #ff7043 0%, #ff8a65 25%, #ffab91 50%, #ffccbc 75%, #fff3e0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .colorful-text .letter:nth-child(9) { /* l */
      background: linear-gradient(135deg, #42a5f5 0%, #64b5f6 25%, #90caf9 50%, #bbdefb 75%, #e3f2fd 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .colorful-text .letter:nth-child(10) { /* a */
      background: linear-gradient(135deg, #7e57c2 0%, #9575cd 25%, #b39ddb 50%, #d1c4e9 75%, #ede7f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .colorful-text .letter:nth-child(11) { /* t */
      background: linear-gradient(135deg, #66bb6a 0%, #81c784 25%, #a5d6a7 50%, #c8e6c9 75%, #e8f5e8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .colorful-text .letter:nth-child(12) { /* e */
      background: linear-gradient(135deg, #ffa726 0%, #ffb74d 25%, #ffcc80 50%, #ffe0b2 75%, #fff8e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Add more gradients for longer text */
    .colorful-text .letter:nth-child(n+13) {
      background: linear-gradient(135deg, #26c6da 0%, #4fc3f7 25%, #81d4fa 50%, #b3e5fc 75%, #e0f7fa 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* For spaces */
    .colorful-text .space {
      width: 0.3em;
      display: inline-block;
    }

    @keyframes fadeInScale {
      0% { 
        opacity: 0;
        transform: scale(0.8);
      }
      100% { 
        opacity: 1;
        transform: scale(1);
      }
    }

    /* Add subtle gradient overlay effect */
    .colorful-text::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, 
        rgba(255, 107, 53, 0.1) 0%,
        rgba(78, 205, 196, 0.1) 25%,
        rgba(69, 183, 209, 0.1) 50%,
        rgba(150, 206, 180, 0.1) 75%,
        rgba(255, 234, 167, 0.1) 100%
      );
      pointer-events: none;
      border-radius: 8px;
    }
  `;

  // Function to split text into individual letters - not needed anymore
  // const renderColorfulText = (text) => {
  //   return text.split('').map((char, index) => {
  //     if (char === ' ') {
  //       return <span key={index} className="space"></span>;
  //     }
  //     return (
  //       <span key={index} className="letter">
  //         {char}
  //       </span>
  //     );
  //   });
  // };

  if (!isLoading) return null;

  return (
    <>
      <style>{loaderStyles}</style>
      <div className={`colorful-loader-overlay ${isTransitioning ? 'transitioning' : ''}`}>
        <div className="colorful-loader-content">
          <Grid
            size="150"
            speed="1.5"
            color="#ffc107" 
          />
          <img 
            src="images/colortube.regular.webp" 
            alt={isTransitioning ? welcomeText : loadingText}
            style={{
              marginTop: '1rem',
              maxWidth: '500px',
              width: '100%',
              height: 'auto',
              animation: 'fadeInScale 0.6s ease-out'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ColorfulLoader;