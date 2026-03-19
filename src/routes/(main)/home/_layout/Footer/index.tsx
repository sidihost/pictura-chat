'use client';

import { type MenuProps } from '@lobehub/ui';
import { ActionIcon, DropdownMenu, Flexbox, Icon } from '@lobehub/ui';
import {
  Book,
  CircleHelp,
  FlaskConical,
  Settings,
  Settings2,
} from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { DOCUMENTS_REFER_URL } from '@/const/url';
import ThemeButton from '@/features/User/UserPanel/ThemeButton';
import { useNavLayout } from '@/hooks/useNavLayout';
import { useUserStore } from '@/store/user';
import { userGeneralSettingsSelectors } from '@/store/user/slices/settings/selectors';

const Footer = memo(() => {
  const { t } = useTranslation('common');
  const { footer } = useNavLayout();
  const isDevMode = useUserStore((s) => userGeneralSettingsSelectors.config(s).isDevMode);
  const location = useLocation();
  const isSettingsPage = location.pathname.startsWith('/settings');

  const helpMenuItems: MenuProps['items'] = useMemo(
    () => [
      ...(footer.showSettingsEntry && !isDevMode
        ? [
            {
              icon: <Icon icon={Settings2} />,
              key: 'setting',
              label: <Link to="/settings">{t('userPanel.setting')}</Link>,
            },
            {
              type: 'divider' as const,
            },
          ]
        : []),
      ...(DOCUMENTS_REFER_URL
        ? [
            {
              icon: <Icon icon={Book} />,
              key: 'docs',
              label: (
                <a href={DOCUMENTS_REFER_URL} rel="noopener noreferrer" target="_blank">
                  {t('userPanel.docs')}
                </a>
              ),
            },
          ]
        : []),
      ...(footer.showEvalEntry && footer.layout === 'compact'
        ? [
            {
              icon: <Icon icon={FlaskConical} />,
              key: 'eval',
              label: <Link to="/eval">Evaluation Lab</Link>,
            },
          ]
        : []),
    ],
    [footer.showSettingsEntry, footer.layout, footer.showEvalEntry, isDevMode, t],
  );

  return (
    <>
      {footer.layout === 'expanded' ? (
        <Flexbox horizontal align={'center'} gap={2} justify={'space-between'} padding={8}>
          <Flexbox horizontal align={'center'} flex={1} gap={2}>
            <DropdownMenu items={helpMenuItems} placement="topLeft">
              <ActionIcon aria-label={t('userPanel.help')} icon={CircleHelp} size={16} />
            </DropdownMenu>
            <Link to="/eval">
              <ActionIcon icon={FlaskConical} size={16} title="Evaluation Lab" />
            </Link>
          </Flexbox>
          <ThemeButton placement={'topCenter'} size={16} />
        </Flexbox>
      ) : (
        <Flexbox horizontal align={'center'} gap={2} padding={8}>
          <DropdownMenu items={helpMenuItems} placement="topLeft">
            <ActionIcon aria-label={t('userPanel.help')} icon={CircleHelp} size={16} />
          </DropdownMenu>
          {isDevMode && !isSettingsPage && (
            <Link to="/settings">
              <ActionIcon aria-label={t('userPanel.setting')} icon={Settings} size={16} />
            </Link>
          )}
        </Flexbox>
      )}
    </>
  );
});

export default Footer;
