import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '@lib/compnents/TextInput';
import PhoneInput from 'react-native-phone-number-input';
import {Primary, Tetiary} from '@lib/compnents/Button';

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const SignUp = () => {
  const [valid, setValid] = useState(true);
  const [userData, setUserData] = useState({
    firstname: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [emailError, setEmailError] = useState(true);

  const phoneInput = useRef<PhoneInput>(null);

  return (
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
          defaultCode="DM"
          layout="first"
          onChangeText={text => {
            setUserData({...userData, phoneNumber: text});
          }}
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
        <Primary title="Sign Up" onPress={() => console.log('Press')} />
        <Tetiary
          title="I already have an account"
          onPress={() => console.log('Press')}
        />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: '5%',
    paddingHorizontal: '5%',
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
    marginVertical: '5%',
  },
});
