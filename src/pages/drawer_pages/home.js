import React from 'react';
import Header from './default_components/header'
import { ScrollView, StyleSheet, Text, View, Image, Dimensions } from 'react-native';

export default function Home({ navigation }) {

  const [post, setPost] = React.useState('');



  return (
    <View>
      <Header navigation={navigation} />

      <ScrollView>
        <View style={styles.container}>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('screen').height,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});