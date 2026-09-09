import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

const defaultProps = {
  size: 36,
  color: '#00e5ff',
  strokeWidth: 2,
  fill: 'none',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const SoftwareIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M10 8l-2 2 2 2" />
    <path d="M14 8l2 2-2 2" />
  </svg>
);

export const WebIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const AutomationIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <line x1="8" y1="16" x2="8" y2="16.01" />
    <line x1="16" y1="16" x2="16" y2="16.01" />
    <path d="M9 21v2" />
    <path d="M15 21v2" />
  </svg>
);

export const DataIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <path d="M4 14l4-4 4 2 8-8" />
  </svg>
);

export const MobileIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

export const AiIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    <path d="M12 4.5v15" />
    <circle cx="12" cy="12" r="1.5" fill={props.color || defaultProps.color} />
  </svg>
);

export const IntegrationIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <path d="M12 12v9" />
    <path d="M16 16l-4-4-4 4" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

export const ConsultingIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* Pain Point Specific Icons */

export const ExcelIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M8 13h8" />
    <path d="M8 17h8" />
    <path d="M12 11v8" />
  </svg>
);

export const ManualProcessIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <path d="M21.5 2v6h-6" />
    <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const WhatsAppIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

/* Differentiator / Value Proposition Icons */

export const RocketIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71.19-1.81-.47-2.47l-.06-.06c-.66-.66-1.76-1.18-2.47-.47z" />
    <path d="M12 15l-3-3 6.75-6.75a6.002 6.002 0 0 1 8.49 8.49L17.5 20.5l-3-3" />
    <path d="M15 9l-2 2" />
    <path d="M9 12l-2 2" />
  </svg>
);

export const TargetIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill={props.color || defaultProps.color} />
  </svg>
);

export const ShieldIcon: React.FC<IconProps> = (props) => (
  <svg width={props.size || defaultProps.size} height={props.size || defaultProps.size} viewBox="0 0 24 24" stroke={props.color || defaultProps.color} strokeWidth={props.strokeWidth || defaultProps.strokeWidth} fill={defaultProps.fill} strokeLinecap={defaultProps.strokeLinecap} strokeLinejoin={defaultProps.strokeLinejoin} {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const BrandIcons = {
  SoftwareIcon,
  WebIcon,
  AutomationIcon,
  DataIcon,
  MobileIcon,
  AiIcon,
  IntegrationIcon,
  ConsultingIcon,
  ExcelIcon,
  ManualProcessIcon,
  DownloadIcon,
  WhatsAppIcon,
  RocketIcon,
  TargetIcon,
  ShieldIcon,
};
