import * as Notification from 'expo-notifications';
import { Alert } from 'react-native';
import { News } from '../Redux/NewsSlice';

// Running notifications in foreground
Notification.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

// TODO: ask for notification permission
export const requestNotificationPermission = async () => {
    const { status } = await Notification.requestPermissionsAsync();

    if (status !== 'granted') {
        Alert.alert('Notification permission not granted')
        return;
    } else {
        return 'granted'
    }
}

// TODO: scehdule notification
const scehduleNotification = async (news: News[],hour:number, minutes: number) => {

    let notificationObject: Notification.NotificationContentInput = {
        title: 'Flash News ⚡️',
        sound: true,
        vibrate: [1,1,2,2,1,1]
        
    }

    // generate a random number within range of array index
    const generateNumber = () => {
        const randomNumber = Math.random();
        // scale the random number between array length 
        const scaleRandomNumber = randomNumber * news.length - 1 // - 1 to get actual array length
        const randomInteger = Math.round(scaleRandomNumber) // Round to the nearest number
        return randomInteger;
    }

    // if array length = 0 
    if (news.length === 0) {
        notificationObject.body = 'Be updated with latest news'
    } else {
        const index = generateNumber() // get random index
        const randomNews: News = news[index] // assign random news object
        notificationObject.body = randomNews.title;
    }

    const trigger = new Date();
    trigger.setHours(hour);
    trigger.setMinutes(minutes);
    trigger.setSeconds(0);
    
    const notificationId = await Notification.scheduleNotificationAsync({
        content: {
            title: notificationObject.title,
            body: notificationObject.body,
            sound: true,
            vibrate: [100,200,100],
        },
        trigger: {
            hour: hour,
            minute: minutes,
            repeats: true
        }
    })
}

// TODO: set notifications
export const setNotifications = async (news: News[]) => {    
    const status = await requestNotificationPermission();
    if (status === 'granted') {
        await scehduleNotification(news,9,30)
        await scehduleNotification(news,12,30)
        await scehduleNotification(news,17,30)
        await scehduleNotification(news,20,0)
        await scehduleNotification(news,23,15)
        return true
    } else {
        return false
    }
}

// TODO: cancel notifications
export const cancelNotification = async () => {
    await Notification.cancelAllScheduledNotificationsAsync()
}
