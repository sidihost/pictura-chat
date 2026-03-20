import { isDesktop } from '@lobechat/const';
import { type Theme } from 'antd-style';
import { css } from 'antd-style';
import { rgba } from 'polished';

const antdOverride = ({ token }: { prefixCls: string; token: Theme }) => css`
  .${token.prefixCls}-popover {
    z-index: 1100;
  }

  .${token.prefixCls}-menu-item-selected {
    .${token.prefixCls}-menu-title-content {
      color: ${token.colorText};
    }
  }

  .${token.prefixCls}-modal-mask, .${token.prefixCls}-drawer-mask {
    background: ${rgba(token.colorBgLayout, 0.5)} !important;
    backdrop-filter: blur(2px);
  }

  ${isDesktop &&
  css`
    .${token.prefixCls}-modal-mask.${token.prefixCls}-modal-mask-blur {
      background: ${rgba(token.colorBgLayout, 0.8)} !important;
      backdrop-filter: none !important;
    }
  `}

  /* Pictura AI: Force white text/icons on all primary buttons */
  .${token.prefixCls}-btn-primary,
  .${token.prefixCls}-btn-primary:hover,
  .${token.prefixCls}-btn-primary:active,
  .${token.prefixCls}-btn-primary:focus,
  button[class*="primary"],
  [class*="ActionIcon"][style*="background"],
  [class*="SendButton"],
  [class*="sendButton"] {
    color: white !important;
    
    span, svg, .${token.prefixCls}-btn-icon {
      color: white !important;
      fill: white !important;
    }
  }

  /* Force send button icon white */
  [class*="studio_send"],
  [class*="SendButton"] svg,
  button[type="submit"] svg {
    color: white !important;
    fill: white !important;
    stroke: white !important;
  }
`;

export default antdOverride;
