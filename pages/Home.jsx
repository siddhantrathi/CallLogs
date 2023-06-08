import {View, StyleSheet, PermissionsAndroid, ScrollView} from 'react-native';
import {Button} from '@rneui/themed';
import DatePicker from 'react-native-date-picker';
import React, {useState, useEffect} from 'react';
import CallLogs from 'react-native-call-log';
import CallLog from './CallLog';
import Icon from 'react-native-vector-icons/FontAwesome';

let d = new Date();
d.setHours(0, 0, 0, 0);

export default function Home() {
  const [date, setDate] = useState(d);
  const [open, setOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState(true);
  const [logs, setLogs] = useState(false);

  useEffect(() => {
    (async () => {
      if (!dateSelected) {
        return;
      }
      let next_d = new Date(date.getTime());
      next_d.setHours(24, 0, 0, 0);
      const filter = {
        minTimestamp: date.getTime(),
        maxTimestamp: next_d.getTime(),
      };
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Example',
            message: 'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          CallLogs.load(-1, filter).then(c => setLogs(c));
        } else {
          console.log('Call Log permission denied');
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [date]);

  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <View style={styles.container}></View>
      <View>
        <Button
          title={dateSelected ? date.toDateString() : 'Select Date'}
          onPress={() => setOpen(true)}
          icon={
            <Icon
              name="calendar"
              color="white"
              style={{marginRight: 10}}
              size={19}
            />
          }
        />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={x => {
            x.setHours(0, 0, 0, 0);
            setLogs(false);
            setOpen(false);
            setDateSelected(true);
            setDate(x);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          mode="date"
        />
      </View>
      <ScrollView>
        {!logs ? (
          <></>
        ) : (
          logs.map((log, index) => (
            <CallLog
              dateTime={log['dateTime']}
              duration={log['duration']}
              name={log['name']}
              phoneNumber={log['phoneNumber']}
              type={log['type']}
              key={index}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
