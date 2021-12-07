import React, { useState } from 'react';

import { View, StyleSheet, Dimensions } from 'react-native';

import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';

import {
    Divider,
    Avatar,
    Title,
    Caption,
    List,
    Provider as PaperProvider
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../home'
import Produto from '../../cadastro/Produto'
import Pessoa from '../../cadastro/pessoa'
import Pedido from '../../pedido/pedido'

const Drawer = createDrawerNavigator();

export default function CreateDrawer({ route, navigation }) {
    function CustomDrawerContent(props) {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.drawerContent}>
                    <View style={styles.upView}>
                        <Avatar.Image size={104}
                            source={require('../../../resource/images/profile.png')} />
                    </View>
                    <Divider style={{ backgroundColor: '#616161', }} />

                    <DrawerContentScrollView {...props}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home"
                                    color={'white'}
                                    size={size}
                                />
                            )}
                            labelStyle={{ color: 'white' }}
                            label="Home"
                            onPress={() => { props.navigation.navigate("Home") }} />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="cart-outline"
                                    color={'white'}
                                    size={size}
                                />
                            )}
                            labelStyle={{ color: 'white' }}
                            label="Pedido"
                            onPress={() => { props.navigation.navigate("Pedido") }} />
                        <List.Accordion title="Cadastro"
                            left={
                                props => <List.Icon {...props}
                                    color="white"
                                    icon="newspaper-variant-multiple-outline" />}
                            titleStyle={{ color: "white" }}
                            style={{ backgroundColor: '#3b3e47' }}>

                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="package-variant"
                                        color={'white'}
                                        size={size}
                                    />
                                )}
                                labelStyle={{ color: 'white' }}
                                label="Produto"
                                onPress={() => { props.navigation.navigate("Produto") }} />


                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="clipboard-account-outline"
                                        color={'white'}
                                        size={size}
                                    />
                                )}
                                labelStyle={{ color: 'white' }}
                                label="Pessoa"
                                onPress={() => { props.navigation.navigate("Pessoa") }} />

                        </List.Accordion>

                    </DrawerContentScrollView>
                </View>
            </View>
        );
    }
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Produto" component={Produto} />
            <Drawer.Screen name="Pessoa" component={Pessoa} />
            <Drawer.Screen name="Pedido" component={Pedido} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({

    upView: {
        alignItems: 'center',
        margin: 30,
        marginTop: 70
    },
    drawerContent: {
        marginTop: -40,
        flex: 1,
        backgroundColor: '#3b3e47',
        height: Dimensions.get('screen').height - 42
    },
}
);
