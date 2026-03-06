export const EnumNotificationType = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
} as const;

export type EnumNotificationType = typeof EnumNotificationType[keyof typeof EnumNotificationType];