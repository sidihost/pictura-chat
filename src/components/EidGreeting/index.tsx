'use client';

import { X } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

// Eid Mubarak greeting - expires March 21, 2026 at midnight UTC
const EID_EXPIRY_DATE = new Date('2026-03-21T23:59:59Z').getTime();
const STORAGE_KEY = 'pictura-eid-greeting-dismissed';

const EidGreeting = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpired, setIsExpired] = useState(true);

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
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  if (isExpired || !isVisible) {
    return null;
  }

  return (
    <div
      style={{
        alignItems: 'center',
        animation: 'fadeIn 0.5s ease-in-out',
        background: 'linear-gradient(135deg, #C87941 0%, #D4A574 50%, #C87941 100%)',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(200, 121, 65, 0.3)',
        color: 'white',
        display: 'flex',
        gap: '12px',
        justifyContent: 'space-between',
        margin: '12px auto',
        maxWidth: '500px',
        padding: '16px 20px',
        position: 'relative',
        width: 'calc(100% - 24px)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ alignItems: 'center', display: 'flex', gap: '8px' }}>
          <span style={{ fontSize: '24px' }}>&#127769;</span>
          <span style={{ fontWeight: 600, fontSize: '16px' }}>Eid Mubarak!</span>
          <span style={{ fontSize: '24px' }}>&#127769;</span>
        </div>
        <p style={{ fontSize: '13px', margin: 0, opacity: 0.95 }}>
          Wishing you and your loved ones a blessed Eid filled with joy, peace, and prosperity.
        </p>
        <p style={{ fontSize: '12px', fontStyle: 'italic', margin: 0, opacity: 0.85 }}>
          - From the Pictura AI Team
        </p>
      </div>
      <button
        onClick={handleDismiss}
        style={{
          alignItems: 'center',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          flexShrink: 0,
          height: '28px',
          justifyContent: 'center',
          transition: 'background 0.2s',
          width: '28px',
        }}
        title="Dismiss"
      >
        <X color="white" size={16} />
      </button>
    </div>
  );
});

EidGreeting.displayName = 'EidGreeting';

export default EidGreeting;
