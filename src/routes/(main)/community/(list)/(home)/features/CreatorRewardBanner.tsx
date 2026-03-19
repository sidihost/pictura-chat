'use client';

import { Flexbox } from '@lobehub/ui';
import { createStaticStyles, cx, responsive } from 'antd-style';
import { memo } from 'react';

import { useIsDark } from '@/hooks/useIsDark';

const styles = createStaticStyles(({ css }) => ({
  banner: css`
    position: relative;

    width: 100%;
    padding-block: 24px;
    padding-inline: 32px;
    border-radius: 12px;

    ${responsive.sm} {
      padding-block: 16px;
      padding-inline: 20px;
    }
  `,
  banner_dark: css`
    background: linear-gradient(135deg, #8b5a2b 0%, #C87941 50%, #a0522d 100%);
  `,
  banner_light: css`
    background: linear-gradient(135deg, #d4a574 0%, #C87941 50%, #b8875a 100%);
  `,
  subtitle: css`
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;

    ${responsive.sm} {
      font-size: 12px;
    }
  `,
  subtitle_dark: css`
    color: rgb(255 255 255 / 75%);
  `,
  subtitle_light: css`
    color: #FAF8F5;
  `,
  symbols: css`
    pointer-events: none;

    position: absolute;
    inset-block: 0;
    inset-inline-end: 0;

    overflow: hidden;

    width: 50%;
    border-radius: 0 12px 12px 0;

    background: url('/icons/icon-512x512.png') right center / auto 80% no-repeat;
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

    ${responsive.sm} {
      font-size: 18px;
    }
  `,
  title_dark: css`
    color: rgb(255 255 255 / 95%);
  `,
  title_light: css`
    color: #FAF8F5;
  `,
}));

const CreatorRewardBanner = memo(() => {
  const isDark = useIsDark();

  return (
    <Flexbox
      className={cx(styles.banner, isDark ? styles.banner_dark : styles.banner_light)}
      width={'100%'}
    >
      <Flexbox gap={8} style={{ position: 'relative', zIndex: 1 }}>
        <h2 className={cx(styles.title, isDark ? styles.title_dark : styles.title_light)}>
          Welcome to Pictura Agent Marketplace
        </h2>
        <p className={cx(styles.subtitle, isDark ? styles.subtitle_dark : styles.subtitle_light)}>
          Discover and explore powerful AI agents built by our community
        </p>
      </Flexbox>
      <div className={styles.symbols} />
    </Flexbox>
  );
});

export default CreatorRewardBanner;
