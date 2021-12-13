import React, { useEffect} from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { Appbar } from 'react-native-paper';
import Routes from '../../../routes';

export default function Header({ navigation }) {

  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.Action icon="dots-vertical" onPress={() => { navigation.openDrawer(); }} />
        <Image
          style={{
            width: 150,
            height: 20,
          }}
          source={require('../../../resource/images/logo.png')} />
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6e9dfc',
  },
});