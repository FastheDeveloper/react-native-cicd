import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {CoreRoutesParams} from '@navigation/types';
import {CoreRoutes} from '@navigation/routes';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {WebView} from 'react-native-webview';
import {goBack, navigate} from '@utils/navigationUtils';
import {TestData} from '@core/constants/titleData';
import {Primary} from '@lib/compnents/Button';

type DetailedNewsScreenRouteProp = RouteProp<
  CoreRoutesParams,
  CoreRoutes.DETAILED
>;

function convertToReadableDate(dateString: string) {
  // Parse the input date string to a Date object
  const date = new Date(dateString);

  // Get the day, month, and year from the Date object
  const day = date.getUTCDate();
  const month = date.toLocaleString('default', {month: 'long'});
  const year = date.getUTCFullYear();

  // Format the date into the desired string
  const readableDate = `${day}-${month}-${year}`;

  return readableDate;
}

const DetailedNewsScreen = () => {
  const route = useRoute<DetailedNewsScreenRouteProp>();
  const {item, selectedTitle} = route.params;
  const [showWeb, setShowWeb] = useState(false);
  return (
    <View style={styles.container}>
      {item?.url && showWeb ? (
        <>
          <WebView
            source={{uri: item?.url}}
            style={{flex: 1, backgroundColor: 'red'}}
            // renderLoading={() => <ActivityIndicator />}
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={['*']}
            showsVerticalScrollIndicator={false}
            startInLoadingState
          />
          <View style={{marginVertical: '5%'}} />
          <Primary title="Close" onPress={() => setShowWeb(false)} />
        </>
      ) : (
        <>
          <View style={styles.header}>
            <Icon name="left" size={20} color={'#0F6DDC'} onPress={goBack} />
            <View style={styles.headers}>
              <Icon2 name="newspaper" size={30} color={'#0F6DDC'} />
              <Text style={styles.headerText}>NewStory</Text>
            </View>
          </View>
          <View style={styles.screen}>
            <View>
              <View>
                <Image
                  source={{
                    uri: item?.urlToImage,
                  }}
                  style={styles.breakingImage}
                />

                <View style={styles.breakingTitle}>
                  <Text style={styles.textTitle}>{item?.title}</Text>
                  <View style={styles.breakingInfo}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {item?.author !== item?.source.name ? (
                        <>
                          <Text
                            style={[styles.welcomeText2, {color: '#A3AAB0'}]}>
                            {item?.author}{' '}
                          </Text>
                          <Text
                            style={[styles.welcomeText2, {color: '#A3AAB0'}]}>
                            - {item?.source.name}
                          </Text>
                        </>
                      ) : (
                        <Text style={[styles.welcomeText2, {color: '#A3AAB0'}]}>
                          {item?.author}{' '}
                        </Text>
                      )}
                    </View>
                    <Text style={[styles.welcomeText2, {color: '#A3AAB0'}]}>
                      {convertToReadableDate(item?.publishedAt as string)}
                    </Text>
                  </View>
                </View>

                <View style={styles.content}>
                  <Text style={styles.contextText}>{item?.content}</Text>
                </View>

                <Primary title="Read more" onPress={() => setShowWeb(true)} />
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default DetailedNewsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headers: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: '#0F6DDC',
    fontSize: 22,
    marginLeft: '2%',
  },
  screen: {
    marginVertical: '5%',
    marginHorizontal: '5%',
  },

  breakingImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
    borderRadius: 32,
  },

  breakingTitle: {
    // marginHorizontal: '10%',
    marginVertical: '5%',
  },
  textTitle: {
    fontSize: 20,
    color: '#212529',
  },
  breakingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  welcomeText: {
    fontSize: 23,
    color: '#19202D',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: '5%',
  },
  welcomeText2: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#9397A0',
  },
  content: {
    marginBottom: '15%',
  },
  contextText: {
    color: '#495057',
  },
});
