'use client';

import dynamic from 'next/dynamic';
import { type PropsWithChildren } from 'react';

import MobileContentLayout from '@/components/server/MobileNavLayout';

import { styles } from './MobileLayout/style';
import SessionHeader from './SessionHeader';
import SessionSearchBar from './SessionSearchBar';

// Dynamically import Eid greeting to avoid SSR issues
const EidGreeting = dynamic(() => import('@/components/EidGreeting'), { ssr: false });

const MobileLayout = ({ children }: PropsWithChildren) => {
  return (
    <MobileContentLayout withNav header={<SessionHeader />}>
      {/* Eid Mubarak greeting - auto-expires */}
      <EidGreeting />
      <div className={styles.searchBarContainer}>
        <SessionSearchBar mobile />
      </div>
      {children}
      {/* ↓ cloud slot ↓ */}

      {/* ↑ cloud slot ↑ */}
    </MobileContentLayout>
  );
};

export default MobileLayout;
