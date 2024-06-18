import {
  FlatList,
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {STORAGE_KEYS, persistStorage} from '@core/services/storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {resetUserStoreData} from '@store/reducers/userSlice';
import {RootState} from '@store/reducers';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TITLES, TestData} from '@core/constants/titleData';
import {LoadingNewsItem, NewsItem} from '@lib/compnents/NewsItem';

export const HomeScreen = () => {
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      resetUserStoreData();
      await persistStorage.remove(STORAGE_KEYS.SAVED_USER);
      await persistStorage.remove(STORAGE_KEYS.SAVED_USER_ID);
    } catch (e) {
      console.log(e);
    }
  };
  const {userData} = useSelector((state: RootState) => state.user);
  const [selectedTitle, setSelectedTitle] = useState('GENERAL');
  const [loading, setLoading] = useState(false);
  const formatDate = (date: {
    toLocaleDateString: (
      arg0: string,
      arg1: {day: string; month: string; year: string},
    ) => any;
  }) => {
    const options = {day: 'numeric', month: 'long', year: 'numeric'};
    return date.toLocaleDateString('en-US', options);
  };

  const date = new Date();
  const formattedDate = formatDate(date);

  const handleTabPress = (title: string) => {
    console.log('Tab pressed:', title);
    // Add your navigation or other logic here
  };

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headers}>
        <Icon name="newspaper" size={30} color={'#0F6DDC'} />
        <Text style={styles.headerText}>NewStory</Text>
      </View>
      {/* <Text onPress={signOut}>{userData?.displayName}</Text> */}
      <View style={styles.header}>
        <Image
          source={{
            uri: userData?.photoURL
              ? userData?.photoURL
              : 'https://placedog.net/300/300',
          }}
          style={styles.image}
        />
        <View style={{marginLeft: '3%'}}>
          <Text style={styles.welcomeText2}>{formattedDate} </Text>
        </View>
      </View>

      <View style={styles.breakingNewSection}>
        <Text style={styles.welcomeText}>Breaking News</Text>
        <View style={styles.breakingComponent}>
          <Image
            source={{
              uri: TestData[0].urlToImage,
            }}
            style={styles.breakingImage}
          />

          <View style={styles.breakingTitle}>
            <Text style={styles.textTitle}>{TestData[0].title}</Text>
            <View style={styles.breakingInfo}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.welcomeText2, {color: '#A3AAB0'}]}>
                  {TestData[0].author}{' '}
                </Text>
                <Text style={[styles.welcomeText2, {color: '#A3AAB0'}]}>
                  - {TestData[0].source.name}
                </Text>
              </View>
              <Text style={[styles.welcomeText2, {color: '#A3AAB0'}]}>
                {convertToReadableDate(TestData[0].publishedAt)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.otherNews}>
        <View style={{marginTop: '10%'}} />
        <FlatList
          data={TITLES}
          horizontal
          style={{paddingVertical: 5}}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 10, paddingHorizontal: 12}}
          keyExtractor={item => item}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor:
                  selectedTitle === item.trim() ? '#0F6DDC' : 'white', //handle selection
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#0F6DDC', //handle selection
              }}
              onPress={() => setSelectedTitle(item.trim())}>
              <Text
                style={{
                  color: selectedTitle === item.trim() ? 'white' : 'black', //handle selection
                }}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
        {/* <View style={{marginBottom: 10}} /> */}

        {!loading ? (
          <>
            {TestData.slice(1).map((item, index) => (
              <NewsItem
                key={index}
                title={item.title}
                imageUrl={item.urlToImage}
                date={convertToReadableDate(item.publishedAt)}
              />
            ))}
          </>
        ) : (
          <>
            {[1, 2, 3].map((item, index) => (
              <LoadingNewsItem key={index} />
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    // paddingVertical: '5%',
    paddingHorizontal: '5%',
  },
  headers: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '5%',
  },
  headerText: {
    color: '#0F6DDC',
    fontSize: 22,
    marginLeft: '2%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
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
  breakingNewSection: {
    // backgroundColor: 'red',
    marginTop: '10%',
    marginHorizontal: '2%',
  },
  breakingImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'cover',
    borderRadius: 32,
  },
  breakingComponent: {
    backgroundColor: 'white',
    borderRadius: 32,
    // overflow: 'hidden',
    padding: '2%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  },
  tab: {
    // backgroundColor: 'grey',
    marginVertical: '15%',
    paddingHorizontal: '5%',
  },
  flatListContentContainer: {
    // justifyContent: 'center',
    width: '100%', // Centers items vertically within the FlatList
  },
  otherNews: {},
});
