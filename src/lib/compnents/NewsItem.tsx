import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Calendar from '@lib/icons/calendarIcon/Calendar';
import {Skeleton} from '@rneui/base';
interface Props {
  imageUrl?: string;
  title?: string;
  date?: string;
  //   authorName?
}
export const NewsItem = ({imageUrl, title, date}: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
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

          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="pencil" size={24} />
            <Text style={{marginBottom: -2}}>{date}</Text>
          </View> */}
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
    // alignItems: 'center',
    gap: 5,
    // backgroundColor: 'red',
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
    // marginRight: '20%',
    color: '#000000',
  },
});
