import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Calendar from '@lib/icons/calendarIcon/Calendar';
import {Skeleton} from '@rneui/base';
interface Props {
  imageUrl?: string;
  title?: string;
  date?: string;
  onPress?: () => void;
}
export const NewsItem = ({imageUrl, title, date, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: imageUrl
            ? imageUrl
            : 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgKGPHxg2vWy_cisaKH6ry9hPwULEtZsaqTseBZKfXidmXOCmczY4FhHYhBB4f3SsDiS_W8EM8IQH2qg_toA94ez_WmAjh69UqBLReN2PKz6nh2y75l3YLZZ0VueHnz0YURpn5NaREe4v-8ol88tML1L1ob6Xk-d025Ja5ImTrpasCFXpq5eODfrRfA/w1200-h630-p-k-no-nu/Japanese%20and%20Africans.jpg',
        }}
        style={styles.image}
      />
      <View
        style={{
          //   backgroundColor: 'blue',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.title}>{title}</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
            <Calendar />
            <Text>{date}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const LoadingNewsItem = ({imageUrl, title, date}: Props) => {
  return (
    <>
      <Skeleton
        style={[styles.container, {paddingRight: 0}]}
        animation="pulse"
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: '5%',
    flexDirection: 'row',

    gap: 5,

    width: '100%',
    height: 70,
    paddingRight: '25%',
  },
  image: {
    width: 80,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  title: {
    color: '#000000',
  },
});
