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

  /* Pictura AI: Force white text/icons on ALL primary/brand color buttons */
  .${token.prefixCls}-btn-primary,
  .${token.prefixCls}-btn-primary:hover,
  .${token.prefixCls}-btn-primary:active,
  .${token.prefixCls}-btn-primary:focus,
  .${token.prefixCls}-btn-primary:visited,
  button[class*="primary"],
  button[type="primary"],
  [class*="ActionIcon"][style*="background"],
  [class*="SendButton"],
  [class*="sendButton"],
  [class*="studio_send"] button,
  [class*="studio_send"] [role="button"] {
    color: #FFFFFF !important;
    
    &, span, svg, i, .${token.prefixCls}-btn-icon, [class*="icon"] {
      color: #FFFFFF !important;
      fill: #FFFFFF !important;
      stroke: #FFFFFF !important;
    }
  }

  /* Force send button and all submit buttons white icons */
  [class*="studio_send"] svg,
  [class*="SendButton"] svg,
  [class*="sendButton"] svg,
  button[type="submit"] svg,
  button[type="primary"] svg,
  .${token.prefixCls}-btn-primary svg {
    color: #FFFFFF !important;
    fill: #FFFFFF !important;
    stroke: #FFFFFF !important;
  }

  /* ActionIcon with primary background */
  [class*="ActionIcon"] {
    &[style*="rgb(200"], &[style*="rgb(201"], &[style*="#C8"], &[style*="#c8"] {
      svg, span {
        color: #FFFFFF !important;
        fill: #FFFFFF !important;
      }
    }
  }
`;

export default antdOverride;
