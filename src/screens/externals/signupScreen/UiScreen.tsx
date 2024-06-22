import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '@lib/compnents/TextInput';
import PhoneInput from 'react-native-phone-number-input';
import {Primary, Tetiary} from '@lib/compnents/Button';
import {navigate} from '@utils/navigationUtils';
import {CoreRoutes} from '@navigation/routes';
import LottieView from 'lottie-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const {height, width} = Dimensions.get('window');
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const SignUp = () => {
  const [valid, setValid] = useState(true);
  const [validHas, setValidHas] = useState(true);

  const [userData, setUserData] = useState({
    firstname: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [emailError, setEmailError] = useState(true);
  const [emailhasError, setEmailHasError] = useState(true);
  const [loading, setLoading] = useState(false);
  const phoneInput = useRef<PhoneInput>(null);
  const disabled =
    !emailError ||
    !valid ||
    !userData.firstname ||
    !userData.lastName ||
    !userData.email ||
    !userData.phoneNumber ||
    !emailhasError ||
    !validHas;

  const buttonPressed = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(CoreRoutes.GOOGLE);
    }, 500);
  };

  useEffect(() => {
    setEmailHasError(validateEmail(userData.email));
  }, [userData.email]);

  useEffect(() => {
    const checkValid = phoneInput.current?.isValidNumber(userData.phoneNumber);
    setValidHas(checkValid ? checkValid : false);
  }, [userData.phoneNumber]);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <>
        {loading && (
          <View style={styles.loadingOverlay}>
            <LottieView
              style={styles.loadingAnimation}
              source={require('../../../lib/assets/loading.json')}
              autoPlay
              loop
              speed={4}
            />
          </View>
        )}
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon name="newspaper" size={30} color={'#0F6DDC'} />
            <Text style={styles.headerText}>NewStory</Text>
          </View>

          <View style={styles.header}>
            <Text style={styles.titleText}>Sign Up</Text>
          </View>

          <View style={styles.inputView}>
            <Input
              placeholder={'First Name'}
              value={userData.firstname}
              onTextChange={text => setUserData({...userData, firstname: text})}
            />
            <Input
              placeholder={'Last Name'}
              value={userData.lastName}
              onTextChange={text => setUserData({...userData, lastName: text})}
            />
            {!valid && (
              <Text style={styles.errorMessage}>Invalid Phone number</Text>
            )}
            <PhoneInput
              ref={phoneInput}
              defaultValue={userData.phoneNumber}
              defaultCode="NG"
              layout="first"
              onChangeText={text => {
                setUserData({...userData, phoneNumber: text});
              }}
              placeholder="Phone Number"
              containerStyle={styles.phoneInput}
              textContainerStyle={styles.textContainer}
              textInputStyle={styles.textInput}
              codeTextStyle={styles.codeStyle}
              textInputProps={{
                onBlur: () => {
                  const checkValid = phoneInput.current?.isValidNumber(
                    userData.phoneNumber,
                  );
                  setValid(checkValid ? checkValid : false);
                },
                placeholderTextColor: 'grey',
              }}
            />
            {!emailError && (
              <Text style={styles.errorMessage}>Invalid Email Address</Text>
            )}
            <Input
              placeholder={'Email'}
              value={userData.email}
              onTextChange={text => setUserData({...userData, email: text})}
              onBlur={() => setEmailError(validateEmail(userData.email))}
            />
          </View>

          <View style={styles.buttonGroup}>
            <Primary
              title="Sign Up"
              onPress={buttonPressed}
              disabled={disabled}
            />
            <Tetiary
              title="Already have an account?"
              onPress={() => navigate(CoreRoutes.LOGIN)}
            />
          </View>
        </View>
      </>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
    height: height,
  },
  header: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#0F6DDC',
    fontSize: 22,
    marginLeft: '2%',
  },
  titleText: {
    color: '#0F6DDC',
    fontSize: 26,
    marginLeft: '2%',
    fontWeight: 'bold',
    marginTop: '10%',
  },
  inputView: {
    alignItems: 'center',
    marginTop: '10%',
  },
  phoneInput: {
    width: '90%',
    borderRadius: 4,
    borderColor: '#BFBFBF',
    borderWidth: 1.2,
    marginVertical: '3%',
    height: 40,
    overflow: 'hidden',
  },
  textInput: {
    height: 40,
  },
  codeStyle: {
    color: '#888888',
  },
  textContainer: {
    backgroundColor: '#fff',
    height: 60,
    marginVertical: -10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: '5%',
  },
  buttonGroup: {
    marginHorizontal: '5%',
    marginVertical: '15%',
  },
  loadingOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  loadingAnimation: {
    width: '50%',
    aspectRatio: 1,
  },
});
