import {persistStorage} from '@core/services/storage';
import messaging from '@react-native-firebase/messaging';

export const notificationListner = () => {
  messaging().onNotificationOpenedApp(async remoteMesage => {
    console.log(
      'Notification open app from background state:',
      remoteMesage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification opened from quit state',
          remoteMessage.notification,
        );
      }
    });
};

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

export const getTokens = async () => {
  console.log(
    'registerAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );

  try {
    await messaging().registerDeviceForRemoteMessages();
    await messaging()
      .getToken()
      .then(async devT => {
        console.log('token', devT);
        await persistStorage.set('deviceToken', devT);
      })
      .catch(e => {
        console.log(e, 'error');
      });
  } catch (e) {
    console.log('Token error', e);
  }
};

export const getToken = async () => {
  let token = null;
  await requestUserPermission();
  await registerAppWithFCM();
  try {
    token = await messaging().getToken();

    console.log('getFcmToken-->', token);
  } catch (error) {
    console.log('getFcmToken Device Token error ', error);
  }
  return token;
};

export async function registerAppWithFCM() {
  console.log(
    'registerAppWithFCM status',
    messaging().isDeviceRegisteredForRemoteMessages,
  );
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then(status => {
        console.log('registerDeviceForRemoteMessages status', status);
      })
      .catch(error => {
        console.log('registerDeviceForRemoteMessages error ', error);
      });
  }
}
