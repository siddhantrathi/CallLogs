import {View, StyleSheet, Alert} from 'react-native';
import {Text, Input, Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const Config = () => {
  const createTwoButtonAlert = x =>
    Alert.alert('Success', `${x} Has Been Updated`, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  const storePath = async value => {
    try {
      await AsyncStorage.setItem('@pathToPost', value);
    } catch (e) {
      // saving error
    }
  };

  const storeUser = async value => {
    try {
      await AsyncStorage.setItem('@user', value);
    } catch (e) {
      // saving error
    }
  };

  const getPath = async () => {
    try {
      const value = await AsyncStorage.getItem('@pathToPost');
      console.log(value);
      if (value !== null) {
        // value previously stored
        return value;
      }
      return '';
    } catch (e) {
      // error reading value
      return '';
    }
  };

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('@user');
      console.log(value);
      if (value !== null) {
        // value previously stored
        return value;
      }
      return '';
    } catch (e) {
      // error reading value
      return '';
    }
  };
  const [path, setPath] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      setPath(await getPath());
      setUser(await getUser());
    })();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Text h3>Path To Submit Report</Text>
        <Input
          placeholder="Enter Path"
          value={path}
          onChangeText={newPath => setPath(newPath)}
        />
        <Button
          title="Save"
          onPress={() => {
            storePath(path);
            createTwoButtonAlert('Path');
          }}
          icon={
            <Icon
              name="save"
              color="white"
              style={{marginRight: 10}}
              size={20}
            />
          }
        />
      </View>
      <View style={styles.container}>
        <Text h3>Username</Text>
        <Input
          placeholder="Enter User"
          value={user}
          onChangeText={newUser => setUser(newUser)}
        />
        <Button
          title="Save"
          onPress={() => {
            storeUser(user);
            createTwoButtonAlert('User');
          }}
          icon={
            <Icon
              name="save"
              color="white"
              style={{marginRight: 10}}
              size={20}
            />
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#2196f3',
    margin: 15,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    padding: 10,
  },
});

export default Config;
