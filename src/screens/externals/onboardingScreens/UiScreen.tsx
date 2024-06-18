import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {persistStorage, STORAGE_KEYS} from '@core/services/storage';

import {navigate} from '@utils/navigationUtils';
import {CoreRoutes} from '@navigation/routes';
import Animated, {
  FadeInLeft,
  SlideInLeft,
  SlideOutRight,
} from 'react-native-reanimated';
import {updateUserOnboarded} from '@store/reducers/userSlice';

export const Onboarding = () => {
  const onboardingSteps = [
    {
      icon: require('../../../lib/assets/nozoom.png'),
      title: 'Hello, I am Farouq',
      description: 'A passionate mobile developer and React Native enthusiast.',
    },
    {
      icon: require('../../../lib/assets/halfzoomed.png'),
      title: 'Welcome to NewStory',
      description: 'This app is my submission for the Lendsqr assessment.',
    },
    {
      icon: require('../../../lib/assets/zoomed.png'),
      title: 'Let’s Get Started',
      description: 'You will not see this screen again. Enjoy your experience!',
    },
  ];

  const [step, setStep] = useState(0);
  const data = onboardingSteps[step];

  const onContinue = () => {
    const isLastScreen = step === onboardingSteps.length - 1;
    if (isLastScreen) {
      endOnboarding();
    } else {
      setStep(step + 1);
    }
  };

  const endOnboarding = async () => {
    updateUserOnboarded(true);
    await persistStorage.set(STORAGE_KEYS.ONBOARDED_USER, true);
    navigate(CoreRoutes.SIGNUP);
  };
  return (
    <View style={style.container}>
      <Text style={style.skipText}></Text>
      <View style={{alignItems: 'center', marginTop: '5%'}}>
        <Image source={require('../../../lib/assets/zoomed.png')} />

        <View style={style.stepContainer}>
          {onboardingSteps.map((dat, index) => (
            <View
              key={index}
              style={[
                style.stepIndicator,
                {backgroundColor: index === step ? '#0F6DDC' : 'grey'},
              ]}
            />
          ))}
        </View>

        <View style={style.Headers}>
          <Animated.Text
            entering={SlideInLeft}
            style={style.HeaderText}
            exiting={SlideOutRight}>
            {data.title}
          </Animated.Text>
          <View style={{marginHorizontal: '10%', marginTop: '5%'}}>
            <Animated.Text
              entering={FadeInLeft.delay(300)}
              style={style.subHeader}>
              {data.description}
            </Animated.Text>
          </View>
        </View>
      </View>

      <View style={style.buttons}>
        <Text
          onPress={endOnboarding}
          style={[style.buttonText, {color: '#0F6DDC'}]}>
          Skip
        </Text>
        <Pressable style={style.button} onPress={onContinue}>
          <Text style={style.buttonText}> Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Onboarding;

const style = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center',
    backgroundColor: 'white',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  skipText: {
    color: '#0F6DDC',
    fontSize: 17,
  },
  Headers: {
    marginTop: '10%',

    alignItems: 'center',
  },
  HeaderText: {
    fontSize: 32,
    color: '#495057',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeader: {
    textAlign: 'center',
    color: '#495057',
    fontSize: 16,
  },

  buttonText: {
    color: '#FDFDFD',
    fontFamily: 'InterSemi',
    fontSize: 16,
    padding: 15,
    paddingHorizontal: 25,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    position: 'absolute',
    bottom: '5%',
    left: '7%',
    right: '7%',
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'gray',

    borderRadius: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    gap: 8,
    width: '30%',
    marginTop: '10%',
  },
  button: {
    backgroundColor: '#0F6DDC',
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
});
