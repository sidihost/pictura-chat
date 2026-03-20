import { useTranslation } from 'react-i18next';

import SettingHeader from '@/routes/(main)/settings/features/SettingHeader';

import OpenAI from './features/OpenAI';
import Pictts from './features/Pictts';
import STT from './features/STT';

const Page = () => {
  const { t } = useTranslation('setting');
  return (
    <>
      <SettingHeader title={t('tab.tts')} />
      <STT />
      <Pictts />
      <OpenAI />
    </>
  );
};

export default Page;
