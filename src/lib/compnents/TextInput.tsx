import {
  StyleSheet,
  View,
  TextInput,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import React from 'react';
interface Props {
  placeholder: string;
  onTextChange?: (val: string) => void;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  value: string;
  keyboard?: KeyboardTypeOptions;
}
const Input = ({placeholder, onTextChange, value, keyboard, onBlur}: Props) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={'grey'}
        placeholder={placeholder}
        style={styles.textInput}
        onChangeText={onTextChange}
        value={value}
        keyboardType={keyboard || 'default'}
        onBlur={onBlur}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderRadius: 4,
    borderColor: '#BFBFBF',
    borderWidth: 1.2,
    marginVertical: '3%',
    height: 40,
  },
  textInput: {
    // backgroundColor: 'red',
    height: '100%',
    width: '100%',
    paddingHorizontal: '5%',
  },
});
