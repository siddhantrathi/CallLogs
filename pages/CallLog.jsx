import {View, StyleSheet, Image} from 'react-native';
import {Text} from '@rneui/themed';
import React from 'react';

const CallLog = ({dateTime, duration, name, phoneNumber, type}) => {
  return (
    <View style={styles.container}>
      <Text>{}</Text>
      <View style={{margin: 7}}>
        {type == 'OUTGOING' ? (
          <Image
            source={require(`../images/outgoing.png`)}
            style={styles.image}
          />
        ) : type == 'INCOMING' ? (
          <Image
            source={require(`../images/incoming.png`)}
            style={styles.image}
          />
        ) : type == 'MISSED' ? (
          <Image
            source={require(`../images/missed.png`)}
            style={styles.image}
          />
        ) : (
          <Image
            source={require(`../images/rejected.png`)}
            style={styles.image}
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <View style={styles.top}>
          <Text style={{fontWeight: '700', fontSize: 13}}>
            {name == '' || typeof name != 'string' ? phoneNumber : name}
          </Text>
          <Text style={{fontWeight: '700', fontSize: 13}}>
            {dateTime.slice(11, -3).slice(0, -3)}{' '}
            {dateTime.slice(-2).toUpperCase()}
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={{color: '#606263'}}>
            {Math.floor(duration / 60)} mins {duration % 60} secs
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 4,
    marginTop: 7,
    marginBottom: 7,
    marginHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  image: {
    height: 30,
    width: 30,
    margin: 10,
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  bottom: {
    marginTop: 10,
    marginHorizontal: 8,
  },
});

export default CallLog;
