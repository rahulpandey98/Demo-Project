// Tab2Screen.js

import React, {useRef} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeFromFavorites,
  selectFavorites,
  selectUsers,
} from '../../redux/slices/user.slice';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/EvilIcons';
import {ScrollView} from 'react-native-gesture-handler';

const Tab2Screen = () => {
  const favorites = useSelector(selectFavorites);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const favoriteUsers = users.filter((user: any) =>
    favorites.includes(user.id),
  );

  const handleUnselectFavorite = (userId: any) => {
    dispatch(removeFromFavorites(userId));
  };

  const handleRefresh = () => {
    selectFavorites;
  };
  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
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
        {favoriteUsers.length > 0 ? (
          favoriteUsers.map((item: any) => (
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
                  handleUnselectFavorite(item.id);
                }}>
                <Icon name="star" size={30} color={'#FF3659'} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20}}>No favorite items</Text>
          </View>
        )}
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
    height: 80,
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

    right: 20,
  },
  starButton: {
    alignSelf: 'flex-end',
    marginBottom: 15,
    // Align item to the right
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default Tab2Screen;
