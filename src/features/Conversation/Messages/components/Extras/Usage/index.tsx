import { type ModelPerformance, type ModelUsage } from '@lobechat/types';
import { Center, Flexbox } from '@lobehub/ui';

import PicturaModelIcon from '@/components/PicturaModelIcon';
import { createStaticStyles } from 'antd-style';
import isEqual from 'fast-deep-equal';
import { memo } from 'react';

import TokenDetail from './UsageDetail';

export const styles = createStaticStyles(({ css, cssVar }) => ({
  container: css`
    font-size: 12px;
    color: ${cssVar.colorTextQuaternary};
  `,
}));

interface UsageProps {
  model: string;
  performance?: ModelPerformance;
  provider: string;
  usage?: ModelUsage;
}

const Usage = memo<UsageProps>(({ model, usage, performance, provider }) => {
  return (
    <Flexbox
      horizontal
      align={'center'}
      className={styles.container}
      gap={12}
      justify={'space-between'}
    >
      <Center horizontal gap={4} style={{ fontSize: 12 }}>
        <PicturaModelIcon model={model as string} />
        {model}
      </Center>

      {!!usage?.totalTokens && (
        <TokenDetail
          model={model as string}
          performance={performance}
          provider={provider}
          usage={usage}
        />
      )}
    </Flexbox>
  );
}, isEqual);

export default Usage;
