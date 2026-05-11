import { EnumNotificationType } from '../../enums/EnumNotificationType';


export interface NotificationOptions {
  title?: string;
  message: string;
  type: EnumNotificationType;
  duration?: number;
}

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export interface INotificationService {
    show(options: NotificationOptions): Promise<void>;
    showSuccess(message: string, title?: string): Promise<void>;
    showError(message: string, title?: string): Promise<void>;
    showWarning(message: string, title?: string): Promise<void>;
    showInfo(message: string, title?: string): Promise<void>;
    confirm(options: ConfirmOptions): Promise<boolean>;
}