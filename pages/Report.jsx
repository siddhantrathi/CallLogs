import {View, PermissionsAndroid, Alert} from 'react-native';
import React, {useState} from 'react';
import {Text, Button} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import CallLogs from 'react-native-call-log';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

let d_start = new Date();
d_start.setHours(0, 0, 0, 0);
let d_end = new Date();
d_end.setHours(23, 59, 59, 59);

const Report = () => {
  const [dateStart, setDateStart] = useState(d_start);
  const [dateEnd, setDateEnd] = useState(d_end);
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const getPath = async () => {
    try {
      const value = await AsyncStorage.getItem('@pathToPost');
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

  const sendReport = async () => {
    setLoading(true);
    let logs = {};
    const filter = {
      minTimestamp: dateStart.getTime(),
      maxTimestamp: dateEnd.getTime(),
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        {
          title: 'Access your call logs',
          message: 'Access your call logs',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        CallLogs.load(-1, filter).then(c => {
          logs = c;
        });
      } else {
        console.log('Call Log permission denied');
      }
    } catch (e) {
      console.log(e);
    }
    const path = await getPath();
    const user = await getUser();
    if (path == '') {
      Alert.alert('Path Not Set', 'Please Set Path In Config Menu', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      setLoading(false);
      return;
    }
    if (user == '') {
      Alert.alert('User Not Set', 'Please Set User In Config Menu', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      setLoading(false);
      return;
    }
    const controller = new AbortController();

    // 5 second timeout:

    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        call_logs: logs,
        user: user,
        date_start: dateStart.toLocaleDateString(),
        date_end: dateEnd.toLocaleDateString(),
      }),
      signal: controller.signal,
    };

    fetch(path, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data['response'] == 'success') {
          Alert.alert('Success', 'Report Sent', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          setLoading(false);
        } else {
          Alert.alert('Error', 'Error While Sending Report', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          setLoading(false);
        }
      })
      .catch(err => {
        Alert.alert('Error', 'Error While Sending Report', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        setLoading(false);
      });
  };

  return (
    <View>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: 'white',
          }}>
          <Button
            disabled={loading}
            title={
              dateStart.toDateString().split(' ')[1] +
              ' ' +
              dateStart.toDateString().split(' ')[2]
            }
            onPress={() => setOpenStart(true)}
            buttonStyle={{margin: 10, borderRadius: 50, padding: 9}}
            titleStyle={{fontSize: 15, marginRight: 10}}
            icon={
              <Icon
                name="calendar"
                color="white"
                style={{marginHorizontal: 10}}
                size={15}
              />
            }
          />
          <Text h2 style={{margin: 10}}>
            -
          </Text>
          <Button
            disabled={loading}
            title={
              dateEnd.toDateString().split(' ')[1] +
              ' ' +
              dateEnd.toDateString().split(' ')[2]
            }
            onPress={() => setOpenEnd(true)}
            buttonStyle={{margin: 10, borderRadius: 50, padding: 9}}
            titleStyle={{fontSize: 15, marginRight: 10}}
            icon={
              <Icon
                name="calendar"
                color="white"
                style={{marginHorizontal: 10}}
                size={15}
              />
            }
          />
          <DatePicker
            modal
            open={openStart}
            date={dateStart}
            onConfirm={x => {
              x.setHours(0, 0, 0, 0);
              setOpenStart(false);
              setDateStart(x);
            }}
            onCancel={() => {
              setOpenStart(false);
            }}
            mode="date"
            title={'Select Date Start'}
          />
          <DatePicker
            modal
            open={openEnd}
            date={dateEnd}
            onConfirm={x => {
              x.setHours(23, 59, 59, 59);
              setOpenEnd(false);
              setDateEnd(x);
            }}
            onCancel={() => {
              setOpenEnd(false);
            }}
            mode="date"
            title={'Select Date End'}
          />
        </View>
        <Button
          title={'Send Report'}
          onPress={sendReport}
          disabled={loading}
          loading={loading}
          type="solid"
          buttonStyle={{borderRadius: 50, margin: 20}}
          icon={
            <Icon
              name="send"
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

export default Report;
