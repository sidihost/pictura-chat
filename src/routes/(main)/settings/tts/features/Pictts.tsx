'use client';

import { type FormGroupItemType } from '@lobehub/ui';
import { Form, Icon, Input, Select, Skeleton } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { Loader2Icon } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/const/layoutTokens';
import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';

import { picttsTTSOptions } from './const';

const Pictts = memo(() => {
  const { t } = useTranslation('setting');
  const [form] = Form.useForm();
  const { tts } = useUserStore(settingsSelectors.currentSettings, isEqual);
  const [setSettings, isUserStateInit] = useUserStore((s) => [s.setSettings, s.isUserStateInit]);
  const [loading, setLoading] = useState(false);
  const [showCustomVoice, setShowCustomVoice] = useState(tts?.elevenlabs?.voiceId === 'custom');

  // Voice options using translations
  const voiceOptions = useMemo(
    () => [
      { label: t('settingTTS.pictts.voice.sarah'), value: 'EXAVITQu4vr4xnSDxMaL' },
      { label: t('settingTTS.pictts.voice.charlie'), value: 'IKne3meq5aSn9XLyUdCD' },
      { label: t('settingTTS.pictts.voice.emily'), value: 'LcfcDJNUP1GQjkzn1xUU' },
      { label: t('settingTTS.pictts.voice.george'), value: 'JBFqnCBsd6RMkjVDRZzb' },
      { label: t('settingTTS.pictts.voice.aria'), value: '9BWtsMINqrJLrRacOk9x' },
      { label: t('settingTTS.pictts.voice.roger'), value: 'CwhRBWXzGAHq8TQ4Fs17' },
      { label: t('settingTTS.pictts.voice.custom'), value: 'custom' },
    ],
    [t],
  );

  if (!isUserStateInit) return <Skeleton active paragraph={{ rows: 5 }} title={false} />;

  const pictts: FormGroupItemType = {
    children: [
      {
        children: <Select options={picttsTTSOptions} />,
        desc: t('settingTTS.pictts.ttsModel.desc'),
        label: t('settingTTS.pictts.ttsModel'),
        name: ['elevenlabs', 'model'],
      },
      {
        children: (
          <Select
            options={voiceOptions}
            onChange={(value) => setShowCustomVoice(value === 'custom')}
          />
        ),
        desc: t('settingTTS.pictts.voice.desc'),
        label: t('settingTTS.pictts.voice'),
        name: ['elevenlabs', 'voiceId'],
      },
      ...(showCustomVoice
        ? [
            {
              children: <Input placeholder={t('settingTTS.pictts.customVoiceId.placeholder')} />,
              desc: t('settingTTS.pictts.customVoiceId.desc'),
              label: t('settingTTS.pictts.customVoiceId'),
              name: ['elevenlabs', 'customVoiceId'],
            },
          ]
        : []),
    ],
    extra: loading && <Icon spin icon={Loader2Icon} size={16} style={{ opacity: 0.5 }} />,
    title: t('settingTTS.pictts.title'),
  };

  return (
    <Form
      collapsible={false}
      form={form}
      initialValues={tts}
      items={[pictts]}
      itemsType={'group'}
      variant={'filled'}
      onValuesChange={async (values) => {
        setLoading(true);
        await setSettings({
          tts: values,
        });
        setLoading(false);
      }}
      {...FORM_STYLE}
    />
  );
});

export default Pictts;
