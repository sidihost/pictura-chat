'use client';

import { VoiceList } from '@lobehub/tts';
import { type FormGroupItemType } from '@lobehub/ui';
import { Form, Select } from '@lobehub/ui';
import { Switch } from 'antd';
import isEqual from 'fast-deep-equal';
import { Mic } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FORM_STYLE } from '@/const/layoutTokens';
import { useGlobalStore } from '@/store/global';
import { globalGeneralSelectors } from '@/store/global/selectors';

import { selectors, useStore } from '../store';
import { ttsOptions } from './options';
import SelectWithTTSPreview from './SelectWithTTSPreview';

const TTS_SETTING_KEY = 'tts';
const { openaiVoiceOptions, localeOptions } = VoiceList;

// Pictts (ElevenLabs) voice options
const picttsVoiceOptions = [
  { label: 'Sarah (Female)', value: 'EXAVITQu4vr4xnSDxMaL' },
  { label: 'Rachel (Female)', value: '21m00Tcm4TlvDq8ikWAM' },
  { label: 'Bella (Female)', value: 'EXAVITQu4vr4xnSDxMaL' },
  { label: 'Antoni (Male)', value: 'ErXwobaYiN019PkySvjV' },
  { label: 'Josh (Male)', value: 'TxGEqnHWrfWFTfGW9XjX' },
  { label: 'Arnold (Male)', value: 'VR6AewLTigWG4xSOukaG' },
  { label: 'Adam (Male)', value: 'pNInz6obpgDQGcFmaJgB' },
  { label: 'Domi (Female)', value: 'AZnzlk1XvdvUeBnXmlld' },
  { label: 'Elli (Female)', value: 'MF3mGyEYCl7XYWbV9V6O' },
  { label: 'Sam (Male)', value: 'yoZ06aMxZJJ28mfd3POQ' },
];

const AgentTTS = memo(() => {
  const { t } = useTranslation('setting');
  const [form] = Form.useForm();
  const voiceList = useGlobalStore((s) => {
    const locale = globalGeneralSelectors.currentLanguage(s);
    return (all?: boolean) => new VoiceList(all ? undefined : locale);
  });
  const config = useStore(selectors.currentTtsConfig, isEqual);
  const updateConfig = useStore((s) => s.setAgentConfig);

  const { edgeVoiceOptions, microsoftVoiceOptions } = useMemo(
    () => voiceList(config.showAllLocaleVoice),
    [config.showAllLocaleVoice],
  );

  const tts: FormGroupItemType = {
    children: [
      {
        children: <Select options={ttsOptions} />,
        desc: t('settingTTS.ttsService.desc'),
        label: t('settingTTS.ttsService.title'),
        name: [TTS_SETTING_KEY, 'ttsService'],
      },
      {
        children: <Switch />,
        desc: t('settingTTS.showAllLocaleVoice.desc'),
        hidden: config.ttsService === 'openai',
        label: t('settingTTS.showAllLocaleVoice.title'),
        layout: 'horizontal',
        minWidth: undefined,
        name: [TTS_SETTING_KEY, 'showAllLocaleVoice'],
        valuePropName: 'checked',
      },
      {
        children: <SelectWithTTSPreview options={openaiVoiceOptions} server={'openai'} />,
        desc: t('settingTTS.voice.desc'),
        hidden: config.ttsService !== 'openai',
        label: t('settingTTS.voice.title'),
        name: [TTS_SETTING_KEY, 'voice', 'openai'],
      },
      {
        children: <Select options={picttsVoiceOptions} />,
        desc: 'Select a Pictts voice for text-to-speech',
        hidden: config.ttsService !== 'elevenlabs',
        label: 'Pictts Voice',
        name: [TTS_SETTING_KEY, 'voice', 'elevenlabs'],
      },
      {
        children: <SelectWithTTSPreview options={edgeVoiceOptions} server={'edge'} />,
        desc: t('settingTTS.voice.desc'),
        divider: false,
        hidden: config.ttsService !== 'edge',
        label: t('settingTTS.voice.title'),
        name: [TTS_SETTING_KEY, 'voice', 'edge'],
      },
      {
        children: <SelectWithTTSPreview options={microsoftVoiceOptions} server={'microsoft'} />,
        desc: t('settingTTS.voice.desc'),
        divider: false,
        hidden: config.ttsService !== 'microsoft',
        label: t('settingTTS.voice.title'),
        name: [TTS_SETTING_KEY, 'voice', 'microsoft'],
      },
      {
        children: (
          <Select
            options={[
              { label: t('settingCommon.lang.autoMode'), value: 'auto' },
              ...(localeOptions || []),
            ]}
          />
        ),
        desc: t('settingTTS.sttLocale.desc'),
        label: t('settingTTS.sttLocale.title'),
        name: [TTS_SETTING_KEY, 'sttLocale'],
      },
    ],
    icon: Mic,
    title: t('settingTTS.title'),
  };

  return (
    <Form
      footer={<Form.SubmitFooter />}
      form={form}
      items={[tts]}
      itemsType={'group'}
      variant={'borderless'}
      initialValues={{
        [TTS_SETTING_KEY]: config,
      }}
      onFinish={updateConfig}
      {...FORM_STYLE}
    />
  );
});

export default AgentTTS;
