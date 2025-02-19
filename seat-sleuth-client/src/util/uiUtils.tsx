import { notifications } from '@mantine/notifications';

export interface CustomNotificationRequirements {
  message: string;
  type: 'INFO' | 'SUCCESS' | 'ERROR';
  position?: 'top-center' | 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export const showMantineNotification = ({
  message,
  type,
  position = 'bottom-right',
}: CustomNotificationRequirements) => {
  const notificationConfig = {
    SUCCESS: { color: 'green', title: '🦥 Success 🦥' },
    ERROR: { color: 'red', title: '🦥 Error 🦥' },
    INFO: { color: undefined, title: '🦥 Info 🦥' },
  };

  const { color, title } = notificationConfig[type];

  notifications.show({ title, message, color, position });
};
