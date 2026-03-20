'use client';

import { X } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// Eid Mubarak greeting - expires March 21, 2026 at midnight UTC
const EID_EXPIRY_DATE = new Date('2026-03-21T23:59:59Z').getTime();
const STORAGE_KEY = 'pictura-eid-greeting-dismissed';

const EidGreeting = memo(() => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);
  const [isExpired, setIsExpired] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const now = Date.now();
    if (now > EID_EXPIRY_DATE) {
      setIsExpired(true);
      return;
    }

    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      setIsVisible(false);
      return;
    }

    setIsExpired(false);
    setIsVisible(true);
  }, []);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem(STORAGE_KEY, 'true');
    }, 400);
  };

  if (isExpired || !isVisible) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes eidFadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes eidFadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-10px); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes moonGlow {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(255,215,0,0.4)); }
          50% { filter: drop-shadow(0 0 16px rgba(255,215,0,0.7)); }
        }
        @keyframes lanternSway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        
        .eid-banner {
          animation: eidFadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          border-radius: 20px;
          margin: 16px auto;
          max-width: 680px;
          overflow: hidden;
          position: relative;
          width: calc(100% - 32px);
        }
        .eid-banner.closing {
          animation: eidFadeOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        
        /* Decorative elements */
        .eid-stars {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .eid-star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          animation: starTwinkle 2s ease-in-out infinite;
        }
        .eid-star:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
        .eid-star:nth-child(2) { top: 25%; left: 25%; animation-delay: 0.3s; width: 3px; height: 3px; }
        .eid-star:nth-child(3) { top: 10%; left: 40%; animation-delay: 0.6s; }
        .eid-star:nth-child(4) { top: 30%; left: 55%; animation-delay: 0.9s; width: 3px; height: 3px; }
        .eid-star:nth-child(5) { top: 12%; left: 70%; animation-delay: 1.2s; }
        .eid-star:nth-child(6) { top: 20%; left: 85%; animation-delay: 1.5s; width: 3px; height: 3px; }
        .eid-star:nth-child(7) { top: 35%; left: 15%; animation-delay: 0.4s; width: 2px; height: 2px; }
        .eid-star:nth-child(8) { top: 8%; left: 60%; animation-delay: 0.8s; width: 2px; height: 2px; }
        
        .eid-content {
          display: flex;
          align-items: center;
          padding: 28px 32px;
          position: relative;
          z-index: 2;
          gap: 24px;
        }
        
        .eid-moon-container {
          flex-shrink: 0;
          position: relative;
          width: 72px;
          height: 72px;
        }
        .eid-moon {
          animation: moonGlow 3s ease-in-out infinite;
          width: 100%;
          height: 100%;
        }
        
        .eid-text-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .eid-greeting-text {
          color: #ffd700;
          font-family: 'Georgia', serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 3px;
          margin: 0;
          text-transform: uppercase;
        }
        
        .eid-title {
          color: #ffffff;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 1px;
          line-height: 1.1;
          margin: 0;
        }
        
        .eid-message {
          color: rgba(255, 255, 255, 0.85);
          font-size: 15px;
          line-height: 1.6;
          margin: 4px 0 0 0;
        }
        
        .eid-signature {
          align-items: center;
          color: #C87941;
          display: flex;
          font-size: 13px;
          font-weight: 600;
          gap: 6px;
          margin-top: 4px;
        }
        .eid-signature-line {
          background: linear-gradient(90deg, #C87941, transparent);
          height: 1px;
          width: 24px;
        }
        
        .eid-dismiss {
          align-items: center;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          flex-shrink: 0;
          height: 36px;
          justify-content: center;
          transition: all 0.25s ease;
          width: 36px;
        }
        .eid-dismiss:hover {
          background: rgba(255,255,255,0.2);
          border-color: rgba(255,255,255,0.3);
          transform: scale(1.05);
        }
        .eid-dismiss:active {
          transform: scale(0.95);
        }
        
        /* Decorative lanterns */
        .eid-lantern {
          position: absolute;
          animation: lanternSway 3s ease-in-out infinite;
          font-size: 24px;
          opacity: 0.6;
        }
        .eid-lantern-left {
          left: 8%;
          top: 50%;
          transform-origin: top center;
          animation-delay: 0s;
        }
        .eid-lantern-right {
          right: 8%;
          top: 50%;
          transform-origin: top center;
          animation-delay: 1.5s;
        }
        
        /* Responsive - Tablet */
        @media (max-width: 768px) {
          .eid-banner {
            border-radius: 16px;
            margin: 12px auto;
          }
          .eid-content {
            padding: 24px;
            gap: 20px;
          }
          .eid-moon-container {
            width: 60px;
            height: 60px;
          }
          .eid-title {
            font-size: 26px;
          }
          .eid-message {
            font-size: 14px;
          }
          .eid-lantern {
            display: none;
          }
        }
        
        /* Responsive - Mobile */
        @media (max-width: 480px) {
          .eid-banner {
            border-radius: 14px;
            margin: 10px;
            width: calc(100% - 20px);
          }
          .eid-content {
            flex-direction: column;
            padding: 20px;
            text-align: center;
            gap: 16px;
          }
          .eid-moon-container {
            width: 56px;
            height: 56px;
          }
          .eid-text-content {
            align-items: center;
          }
          .eid-greeting-text {
            font-size: 11px;
            letter-spacing: 2px;
          }
          .eid-title {
            font-size: 24px;
          }
          .eid-message {
            font-size: 13px;
          }
          .eid-signature {
            justify-content: center;
          }
          .eid-dismiss {
            position: absolute;
            top: 12px;
            right: 12px;
            height: 32px;
            width: 32px;
          }
        }
      `}</style>
      
      <div className={`eid-banner ${isClosing ? 'closing' : ''}`}>
        {/* Twinkling stars */}
        <div className="eid-stars">
          <div className="eid-star" />
          <div className="eid-star" />
          <div className="eid-star" />
          <div className="eid-star" />
          <div className="eid-star" />
          <div className="eid-star" />
          <div className="eid-star" />
          <div className="eid-star" />
        </div>
        
        {/* Decorative lanterns */}
        <div className="eid-lantern eid-lantern-left">&#128511;</div>
        <div className="eid-lantern eid-lantern-right">&#128511;</div>
        
        <div className="eid-content">
          {/* Moon SVG */}
          <div className="eid-moon-container">
            <svg className="eid-moon" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffd700" />
                  <stop offset="100%" stopColor="#f4a460" />
                </linearGradient>
              </defs>
              <path d="M50 5C25.1 5 5 25.1 5 50s20.1 45 45 45c8.8 0 17-2.5 23.9-6.9-5.5 2.3-11.5 3.6-17.9 3.6-24.9 0-45-20.1-45-45 0-17.4 9.8-32.4 24.1-40C22 11.4 14.7 19.8 10.6 30 8.5 36 7.3 42.4 7.3 49c0 23.6 19.1 42.7 42.7 42.7 15.9 0 29.8-8.7 37.2-21.6C93.8 61.8 95 52.9 95 50 95 25.1 74.9 5 50 5z" fill="url(#moonGradient)"/>
              <circle cx="65" cy="25" r="3" fill="#ffefd5" opacity="0.7"/>
              <circle cx="75" cy="15" r="2" fill="#ffefd5" opacity="0.5"/>
              <circle cx="80" cy="30" r="1.5" fill="#ffefd5" opacity="0.4"/>
            </svg>
          </div>
          
          <div className="eid-text-content">
            <p className="eid-greeting-text">{t('eid.blessedCelebration')}</p>
            <h2 className="eid-title">{t('eid.mubarak')}</h2>
            <p className="eid-message">
              {t('eid.message')}
            </p>
            <div className="eid-signature">
              <span className="eid-signature-line" />
              <span>{t('eid.signature')}</span>
            </div>
          </div>
          
          <button
            className="eid-dismiss"
            onClick={handleDismiss}
            aria-label={t('eid.dismiss')}
          >
            <X color="rgba(255,255,255,0.8)" size={18} />
          </button>
        </div>
      </div>
    </>
  );
});

EidGreeting.displayName = 'EidGreeting';

export default EidGreeting;
