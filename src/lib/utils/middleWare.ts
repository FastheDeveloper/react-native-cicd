import analytics from '@react-native-firebase/analytics';

//@ts-ignore
const activityLogger = store => next => action => {
  // Log the action type and payload
  console.log('Action Type:', action.type);
  console.log('Payload:', action.payload);

  // Log the action as an event in Firebase Analytics
  analytics().logEvent(action.type, action.payload);

  // Call the next dispatch method in the middleware chain
  const result = next(action);

  return result;
};

export default activityLogger;
