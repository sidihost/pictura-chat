import { MCP } from '@lobehub/icons';
import { Avatar } from '@lobehub/ui';
import { type CSSProperties } from 'react';
import { memo } from 'react';

import { PicturaIcon } from '@/components/PicturaModelIcon';

interface PluginAvatarProps {
  alt?: string;
  avatar?: string;
  size?: number;
  style?: CSSProperties;
}

const PluginAvatar = memo<PluginAvatarProps>(({ avatar, style, size = 40, alt }) => {
  if (avatar === 'MCP_AVATAR') {
    return (
      <MCP.Avatar
        className={'ant-avatar'}
        shape={'square'}
        size={size}
        style={{ flex: 'none', overflow: 'hidden', ...style }}
      />
    );
  }
  
  if (avatar === 'PICTURA_AVATAR' || avatar === 'pictura') {
    return (
      <div style={{ flex: 'none', overflow: 'hidden', borderRadius: size * 0.25, ...style }}>
        <PicturaIcon size={size} />
      </div>
    );
  }
  
  return (
    <Avatar
      alt={alt}
      avatar={avatar}
      shape={'square'}
      size={size}
      style={{ flex: 'none', overflow: 'hidden', ...style }}
    />
  );
});

export default PluginAvatar;
