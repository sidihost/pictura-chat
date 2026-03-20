'use client';

import { type FormGroupItemType } from '@lobehub/ui';
import { Form, Icon, Input, Select, Skeleton } from '@lobehub/ui';
import isEqual from 'fast-deep-equal';
import { Loader2Icon } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/const/layoutTokens';
import { useUserStore } from '@/store/user';
import { settingsSelectors } from '@/store/user/selectors';

import { picttsTTSOptions } from './const';

// Voice options for ElevenLabs
const voiceOptions = [
  { label: 'Sarah (Female)', value: 'EXAVITQu4vr4xnSDxMaL' },
  { label: 'Charlie (Male)', value: 'IKne3meq5aSn9XLyUdCD' },
  { label: 'Emily (Female)', value: 'LcfcDJNUP1GQjkzn1xUU' },
  { label: 'George (Male)', value: 'JBFqnCBsd6RMkjVDRZzb' },
  { label: 'Aria (Female)', value: '9BWtsMINqrJLrRacOk9x' },
  { label: 'Roger (Male)', value: 'CwhRBWXzGAHq8TQ4Fs17' },
  { label: 'Custom Voice ID', value: 'custom' },
];

const Pictts = memo(() => {
  const { t } = useTranslation('setting');
  const [form] = Form.useForm();
  const { tts } = useUserStore(settingsSelectors.currentSettings, isEqual);
  const [setSettings, isUserStateInit] = useUserStore((s) => [s.setSettings, s.isUserStateInit]);
  const [loading, setLoading] = useState(false);
  const [showCustomVoice, setShowCustomVoice] = useState(false);

  if (!isUserStateInit) return <Skeleton active paragraph={{ rows: 5 }} title={false} />;

  const pictts: FormGroupItemType = {
    children: [
      {
        children: <Select options={picttsTTSOptions} />,
        desc: 'Select the ElevenLabs model for text-to-speech synthesis',
        label: 'Pictts TTS Model',
        name: ['elevenlabs', 'model'],
      },
      {
        children: (
          <Select
            options={voiceOptions}
            onChange={(value) => setShowCustomVoice(value === 'custom')}
          />
        ),
        desc: 'Choose a voice for text-to-speech output',
        label: 'Voice',
        name: ['elevenlabs', 'voiceId'],
      },
      ...(showCustomVoice
        ? [
            {
              children: <Input placeholder="Enter your ElevenLabs voice ID" />,
              desc: 'Enter a custom voice ID from your ElevenLabs account',
              label: 'Custom Voice ID',
              name: ['elevenlabs', 'customVoiceId'],
            },
          ]
        : []),
    ],
    extra: loading && <Icon spin icon={Loader2Icon} size={16} style={{ opacity: 0.5 }} />,
    title: 'Pictts (ElevenLabs)',
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
