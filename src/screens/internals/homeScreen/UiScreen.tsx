import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {RootState} from '@store/reducers';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TITLES} from '@core/constants/titleData';
import {LoadingNewsItem, NewsItem} from '@lib/compnents/NewsItem';
import {navigate} from '@utils/navigationUtils';
import {CoreRoutes} from '@navigation/routes';
import {Skeleton} from '@rneui/base';
import EmptyRes from '@lib/icons/noResultIcon/emptyRes';

export const HomeScreen = () => {
  const {userData} = useSelector((state: RootState) => state.user);
  const {generalNews, loading, africaNews, warNews, techNologyNews} =
    useSelector((state: RootState) => state.news);

  const [selectedTitle, setSelectedTitle] = useState('GENERAL');

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
  const throwError = () => {
    throw new Error('This is a runtime error!');
  };

  console.log(generalNews, ' GEN');
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headers}>
        <Icon name="newspaper" size={30} color={'#0F6DDC'} />
        <Text style={styles.headerText}>NewStory</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
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

        <TouchableOpacity style={styles.errorButton} onPress={throwError}>
          <Text style={styles.errorButtonText}>Throw Error</Text>
        </TouchableOpacity>
      </View>

      <Pressable
        style={styles.breakingNewSection}
        onPress={() => navigate(CoreRoutes.DETAILED, {item: generalNews[0]})}>
        <Text style={styles.welcomeText}>Breaking News</Text>

        <View style={styles.breakingComponent}>
          {!(generalNews.length <= 0) ? (
            <>
              {!loading ? (
                <>
                  <Image
                    source={{
                      uri: generalNews[0]?.urlToImage,
                    }}
                    style={styles.breakingImage}
                  />

                  <View style={styles.breakingTitle}>
                    <Text style={styles.textTitle}>
                      {generalNews[0]?.title}
                    </Text>
                    <View style={styles.breakingInfo}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[styles.welcomeText2, {color: '#A3AAB0'}]}>
                          {generalNews[0]?.author}{' '}
                        </Text>
                        <Text style={[styles.welcomeText2, {color: '#A3AAB0'}]}>
                          - {generalNews[0]?.source?.name}
                        </Text>
                      </View>
                      <Text style={[styles.welcomeText2, {color: '#A3AAB0'}]}>
                        {generalNews[0]?.publishedAt}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <Skeleton
                    style={{width: '100%', height: 150}}
                    animation="pulse"
                  />
                  <View style={{marginVertical: '3%'}} />
                  <Skeleton
                    style={{width: '100%', height: 20}}
                    animation="pulse"
                  />
                </>
              )}
            </>
          ) : (
            <>
              <>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: '5%',
                    alignItems: 'center',
                    paddingVertical: '10%',
                  }}>
                  <Icon name="newspaper" size={50} color={'#0F6DDC'} />
                  <Text style={{marginTop: '5%', textAlign: 'center'}}>
                    No Breaking News Found, Please Try Again soon
                  </Text>
                </View>
              </>
            </>
          )}
        </View>
      </Pressable>

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

        {selectedTitle === 'GENERAL' && (
          <>
            {!loading ? (
              <View style={{marginHorizontal: '5%'}}>
                {generalNews.slice(1).map((item, index) => (
                  <NewsItem
                    key={index}
                    title={item?.title}
                    imageUrl={item?.urlToImage}
                    date={item?.publishedAt}
                    onPress={() =>
                      navigate(CoreRoutes.DETAILED, {
                        item: item,
                        selectedTitle: selectedTitle,
                      })
                    }
                  />
                ))}
              </View>
            ) : (
              <View style={{marginHorizontal: '5%'}}>
                {[1, 2, 3].map((item, index) => (
                  <LoadingNewsItem key={index} />
                ))}
              </View>
            )}
          </>
        )}

        {selectedTitle === 'SPORTS' && (
          <>
            {!loading ? (
              <View style={{marginHorizontal: '5%'}}>
                {warNews.map((item, index) => (
                  <NewsItem
                    key={index}
                    title={item?.title}
                    imageUrl={item?.urlToImage}
                    date={item?.publishedAt}
                    onPress={() =>
                      navigate(CoreRoutes.DETAILED, {
                        item: item,
                        selectedTitle: selectedTitle,
                      })
                    }
                  />
                ))}
              </View>
            ) : (
              <View style={{marginHorizontal: '5%'}}>
                {[1, 2, 3].map((item, index) => (
                  <LoadingNewsItem key={index} />
                ))}
              </View>
            )}
          </>
        )}

        {selectedTitle === 'POLITICS' && (
          <>
            {!loading ? (
              <View style={{marginHorizontal: '5%'}}>
                {africaNews.map((item, index) => (
                  <NewsItem
                    key={index}
                    title={item?.title}
                    imageUrl={item?.urlToImage}
                    date={convertToReadableDate(item?.publishedAt)}
                    onPress={() =>
                      navigate(CoreRoutes.DETAILED, {
                        item: item,
                        selectedTitle: selectedTitle,
                      })
                    }
                  />
                ))}
              </View>
            ) : (
              <View style={{marginHorizontal: '5%'}}>
                {[1, 2, 3].map((item, index) => (
                  <LoadingNewsItem key={index} />
                ))}
              </View>
            )}
          </>
        )}

        {selectedTitle === 'TECHNOLOGY' && (
          <>
            {!loading ? (
              <View style={{marginHorizontal: '5%'}}>
                {techNologyNews.map((item, index) => (
                  <NewsItem
                    key={index}
                    title={item.title}
                    imageUrl={item.urlToImage}
                    date={convertToReadableDate(item.publishedAt)}
                    onPress={() =>
                      navigate(CoreRoutes.DETAILED, {
                        item: item,
                        selectedTitle: selectedTitle,
                      })
                    }
                  />
                ))}
              </View>
            ) : (
              <View style={{marginHorizontal: '5%'}}>
                {[1, 2, 3].map((item, index) => (
                  <LoadingNewsItem key={index} />
                ))}
              </View>
            )}
          </>
        )}

        {selectedTitle === 'GENERAL' && generalNews.length <= 0 && (
          <>
            <View
              style={{
                flex: 1,
                paddingHorizontal: '5%',
                alignItems: 'center',
                paddingVertical: '10%',
              }}>
              <Icon name="newspaper" size={50} color={'#0F6DDC'} />
              <Text style={{marginTop: '5%'}}>
                No News Found, Please Try Again soon
              </Text>
            </View>
          </>
        )}

        {selectedTitle === 'POLITICS' && africaNews.length <= 0 && (
          <>
            <View
              style={{
                flex: 1,
                paddingHorizontal: '5%',
                alignItems: 'center',
                paddingVertical: '10%',
              }}>
              <Icon name="newspaper" size={50} color={'#0F6DDC'} />
              <Text style={{marginTop: '5%'}}>
                No News Found, Please Try Again soon
              </Text>
            </View>
          </>
        )}

        {selectedTitle === 'SPORTS' && warNews.length <= 0 && (
          <>
            <View
              style={{
                flex: 1,
                paddingHorizontal: '5%',
                alignItems: 'center',
                paddingVertical: '10%',
              }}>
              <Icon name="newspaper" size={50} color={'#0F6DDC'} />
              <Text style={{marginTop: '5%'}}>
                No News Found, Please Try Again soon
              </Text>
            </View>
          </>
        )}

        {selectedTitle === 'TECHNOLOGY' && techNologyNews.length <= 0 && (
          <>
            <View
              style={{
                flex: 1,
                paddingHorizontal: '5%',
                alignItems: 'center',
                paddingVertical: '10%',
              }}>
              <EmptyRes width={'80%'} height={'40%'} />
            </View>
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
    // paddingHorizontal: '5%',
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
    padding: '5%',
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
    marginTop: '5%',
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
  errorButtonText: {
    color: '#fff',
  },
  errorButton: {
    paddingVertical: '2%',
    backgroundColor: '#0F6DDC',
    paddingHorizontal: '5%',
    borderRadius: 14,
  },
});
