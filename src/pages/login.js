import React from 'react';
import { Button, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider, TextInput } from 'react-native-paper';

export default function Login({ navigation: { navigate } }) {
    return (
        <LinearGradient
            // Button Linear Gradient
            colors={['#149ffe', '#201d4e']}
            style={styles.container}>
            <Image
                style={{
                    width: 250,
                    height: 50,
                }}
                source={require('../resource/images/logo.png')} />
            <TextInput
                style={{
                    marginTop: 30,
                    width: 250,
                    height: 50
                }}
                label="Login" />
            <TextInput
                style={{
                    margin: 30,
                    width: 250,
                    height: 50
                }}
                label="Senha" />
            <TouchableOpacity
                style={{

                    width: 100,
                    height: 45,
                    backgroundColor: '#149ffe',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 5,
                    elevation: 2
                }}
                title="Entrar"
                onPress={() => navigate('CreateDrawer')}
            >
                <Text style={{
                    color: 'white',
                    fontWeight: "bold"
                }}>Entrar</Text>
            </TouchableOpacity>
            <Divider style={{
                alignItems: 'center',
                width: 300,
                marginTop: 30,
                height: 1.2,
                backgroundColor: 'white'
            }} />
                        <Image
                style={{
                    margin:20,
                    width: 100,
                    height: 100,
                }}
                source={require('../resource/images/qrcode.png')} />
            <TouchableOpacity
                style={{
                    width: 200,
                    height: 45,
                    backgroundColor: 'orange',
                    alignItems: 'center',
                    padding: 10,
                    borderRadius: 5,
                    elevation: 2
                }}
                title="Entrar"
                onPress={() => navigate('CreateDrawer')}
            >
                <Text style={{
                    color: 'white',
                    fontWeight: "bold"
                }}>Logar Com QR code</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});