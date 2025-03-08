import {View, Text} from 'react-native';
import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

const Wv = () => {
  return (
    <WebView source={{uri: 'https://play.novelvista.com/'}} style={{flex: 1}} />
  );
};

export default Wv;
