import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  fetchUsersRequest,
  selectUsers,
  selectLoading,
  selectError,
  toggleFavorite,
  removeFromFavorites,
} from '../../redux/slices/user.slice';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/EvilIcons';

const Tab1Screen = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleToggleFavorite = (userId: any) => {
    dispatch(toggleFavorite(userId));
  };

  const handleUnselectFavorite = (userId: any) => {
    console.log('Removing favorite for userId:', userId); // Add this line
    dispatch(removeFromFavorites(userId));
  };

  const handleRefresh = () => {
    dispatch(fetchUsersRequest());
  };

  const isFavorite = (userId: any) => {
    return (
      (users.find((user: any) => user.id === userId) as any)?.favorite ?? false
    );
  };

  // const isFavorite = (userId: any) => {
  //   return favorites.includes(userId);
  // };

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      // User has scrolled to the top
      handleRefresh();
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.row}>
          {loading ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Icon name="reload1" size={30} color={'black'} />
            </View>
          ) : error ? (
            <Text>Error: {error}</Text>
          ) : (
            users.map((item: any) => (
              <View style={styles.box} key={item.id}>
                <View style={styles.userInfo}>
                  <Image
                    source={{uri: item.picture.thumbnail}}
                    style={styles.image}
                  />
                  <View>
                    <Text>
                      {item.name.first} {item.name.last}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Icons name="location" size={20} />
                      <Text>
                        {item?.location.state.slice(0, 10)},{' '}
                        {item?.location.country}
                      </Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.starButton}
                  onPress={() => {
                    if (isFavorite(item.id)) {
                      handleUnselectFavorite(item.id);
                    } else {
                      handleToggleFavorite(item.id);
                    }
                  }}>
                  {isFavorite(item.id) ? (
                    <Icon name="star" size={30} color={'#FF3659'} />
                  ) : (
                    <Icon name="staro" size={30} color={'#FF3659'} />
                  )}
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ECECEC',
    paddingTop: 50,
  },
  row: {
    marginBottom: 20,
  },
  box: {
    height: 100,
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items horizontally
    marginVertical: 10,
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  starButton: {
    alignSelf: 'flex-end',
    marginBottom: 25,
    // Align item to the right
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default Tab1Screen;
