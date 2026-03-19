'use client';

import { Flexbox } from '@lobehub/ui';
import { createStaticStyles, cx, responsive } from 'antd-style';
import { memo } from 'react';

// Colors: Primary #C87941, White #FAF8F5 - NO gradients
const styles = createStaticStyles(({ css }) => ({
  banner: css`
    position: relative;
    width: 100%;
    padding-block: 24px;
    padding-inline: 32px;
    border-radius: 12px;
    background-color: #C87941;

    ${responsive.sm} {
      padding-block: 16px;
      padding-inline: 20px;
    }
  `,
  subtitle: css`
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: #FAF8F5;
    opacity: 0.9;

    ${responsive.sm} {
      font-size: 12px;
    }
  `,
  symbols: css`
    pointer-events: none;
    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;
    overflow: hidden;
    width: 50%;
    border-radius: 0 12px 12px 0;
    background: url('/icons/pictura-icon.svg') right center / auto 80% no-repeat;
    opacity: 0.15;

    ${responsive.sm} {
      display: none;
    }
  `,
  title: css`
    margin: 0;
    font-size: 22px;
    font-weight: 700;
    line-height: 1.3;
    color: #FAF8F5;

    ${responsive.sm} {
      font-size: 18px;
    }
  `,
}));

const CreatorRewardBanner = memo(() => {
  return (
    <Flexbox className={styles.banner} width={'100%'}>
      <Flexbox gap={8} style={{ position: 'relative', zIndex: 1 }}>
        <h2 className={styles.title}>Welcome to Pictura Agent Marketplace</h2>
        <p className={styles.subtitle}>
          Discover and explore powerful AI agents built by our community
        </p>
      </Flexbox>
      <div className={styles.symbols} />
    </Flexbox>
  );
});

export default CreatorRewardBanner;
