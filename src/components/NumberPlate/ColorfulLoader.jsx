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
    
  `;

  if (!isLoading) return null;

  return (
    <>
      <style>{loaderStyles}</style>
      <div className={`colorful-loader-overlay ${isTransitioning ? 'transitioning' : ''}`}>
        <div className="colorful-loader-content">
          <Grid
            size="150"
            speed="1.5"
            color="#a4161a" 
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