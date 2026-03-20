'use client';

import { X } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

// Eid Mubarak greeting - expires March 21, 2026 at midnight UTC
const EID_EXPIRY_DATE = new Date('2026-03-21T23:59:59Z').getTime();
const STORAGE_KEY = 'pictura-eid-greeting-dismissed';

const EidGreeting = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpired, setIsExpired] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if greeting has expired
    const now = Date.now();
    if (now > EID_EXPIRY_DATE) {
      setIsExpired(true);
      return;
    }

    // Check if user dismissed the greeting
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
    }, 300);
  };

  if (isExpired || !isVisible) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes eidSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes eidSlideOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
        }
        @keyframes eidPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes eidFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        @keyframes eidShimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .eid-greeting-container {
          animation: eidSlideIn 0.5s ease-out forwards;
          background: #C87941;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(200, 121, 65, 0.35);
          color: white;
          margin: 12px auto;
          max-width: 500px;
          overflow: hidden;
          padding: 20px 24px;
          position: relative;
          width: calc(100% - 24px);
        }
        .eid-greeting-container.closing {
          animation: eidSlideOut 0.3s ease-in forwards;
        }
        .eid-greeting-content {
          align-items: flex-start;
          display: flex;
          gap: 12px;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }
        .eid-greeting-text {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .eid-greeting-header {
          align-items: center;
          display: flex;
          gap: 10px;
        }
        .eid-greeting-moon {
          animation: eidFloat 2s ease-in-out infinite;
          font-size: 28px;
        }
        .eid-greeting-moon:last-child {
          animation-delay: 0.5s;
        }
        .eid-greeting-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .eid-greeting-message {
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
          opacity: 0.95;
        }
        .eid-greeting-signature {
          font-size: 12px;
          font-style: italic;
          margin: 0;
          opacity: 0.85;
        }
        .eid-greeting-dismiss {
          align-items: center;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          flex-shrink: 0;
          height: 32px;
          justify-content: center;
          transition: all 0.2s ease;
          width: 32px;
        }
        .eid-greeting-dismiss:hover {
          background: rgba(255,255,255,0.3);
          transform: scale(1.1);
        }
        .eid-greeting-dismiss:active {
          transform: scale(0.95);
        }
        /* Responsive styles */
        @media (max-width: 480px) {
          .eid-greeting-container {
            border-radius: 12px;
            margin: 8px;
            padding: 16px;
            width: calc(100% - 16px);
          }
          .eid-greeting-moon {
            font-size: 22px;
          }
          .eid-greeting-title {
            font-size: 17px;
          }
          .eid-greeting-message {
            font-size: 13px;
          }
          .eid-greeting-signature {
            font-size: 11px;
          }
          .eid-greeting-dismiss {
            height: 28px;
            width: 28px;
          }
        }
      `}</style>
      <div className={`eid-greeting-container ${isClosing ? 'closing' : ''}`}>
        <div className="eid-greeting-content">
          <div className="eid-greeting-text">
            <div className="eid-greeting-header">
              <span className="eid-greeting-moon">&#127769;</span>
              <span className="eid-greeting-title">Eid Mubarak!</span>
              <span className="eid-greeting-moon">&#127769;</span>
            </div>
            <p className="eid-greeting-message">
              Wishing you and your loved ones a blessed Eid filled with joy, peace, and prosperity.
            </p>
            <p className="eid-greeting-signature">
              - From the Pictura AI Team
            </p>
          </div>
          <button
            className="eid-greeting-dismiss"
            onClick={handleDismiss}
            title="Dismiss"
          >
            <X color="white" size={16} />
          </button>
        </div>
      </div>
    </>
  );
});

EidGreeting.displayName = 'EidGreeting';

export default EidGreeting;
