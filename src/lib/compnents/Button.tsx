import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
interface Props {
  disabled?: boolean;
  title: string;
  onPress?: () => void;
}
export const Primary = ({disabled, title, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      onPress={onPress}>
      <Text style={{color: '#fff'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export const Tetiary = ({disabled, title, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={styles.containerT}
      disabled={disabled}
      onPress={onPress}>
      <Text style={{color: '#0F6DDC'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F6DDC',
    alignItems: 'center',
    paddingVertical: '4%',
    borderRadius: 8,
  },
  containerT: {
    alignItems: 'flex-end',
    paddingVertical: '4%',
  },
});
