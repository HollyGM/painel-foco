import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export async function scheduleDailyReminder() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hora de ativar seu foco!',
      body: 'Já realizou as tarefas do seu roteiro de hoje?',
    },
    trigger: {
      hour: 8,
      minute: 0,
      repeats: true,
    },
  });
}
