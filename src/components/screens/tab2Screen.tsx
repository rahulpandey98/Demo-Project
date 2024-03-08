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
  // Filter users based on favorites list
  const favoriteUsers = users.filter((user: any) =>
    favorites.includes(user.id),
  );
  const isFavorite = (userId: any) => {
    return users.find((user: any) => user.id === userId)?.favorite ?? false;
  };
  const handleUnselectFavorite = (userId: any) => {
    dispatch(removeFromFavorites(userId));
    console.log(userId, '>>>>');
  };

  const handleRefresh = () => {
    selectFavorites;
  };
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
        {favoriteUsers.map((item: any) => (
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
                handleUnselectFavorite(item.id); // Call handleUnselectFavorite
              }}>
              <Icon
                name="star"
                size={30}
                color={isFavorite(item.id) ? '#FF3659' : '#FF3659'}
              />
            </TouchableOpacity>
          </View>
        ))}
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
    marginRight: 20,
  },
  starButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    // Align item to the right
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});

export default Tab2Screen;
