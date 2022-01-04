import React, { useState, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Divider, TextInput } from 'react-native-paper';
import { logar } from '../service/usuarioService';
import * as Crypto from 'expo-crypto';
import { BarCodeScanner } from 'expo-barcode-scanner';
import StoreContext from '../Store/Context';

export default function Login({ navigation: { navigate } }) {

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [scanned, setScanned] = useState(true);
    const [hasPermission, setHasPermission] = useState(null);
    const [displayQR, setDisplayQR] = useState('none');
    const [displayForm, setDisplayForm] = useState('flex');
    const [loginQrCode, setLoginQrCode] = useState(null)
    const [tipoLogin, setTipoLogin] = useState(true)
    const { setToken } = useContext(StoreContext);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    async function handleBarCodeScanned({ type, data }) {

        let dtmp
        dtmp = await JSON.parse(data)
        setLoginQrCode(dtmp)

        await exibirFormulario()

        Alert.alert(
            "Logar",
            "Deseja logar como " + dtmp.nome + "?",
            [
                {
                    text: "Logar",
                    onPress: () => formarLoginQrCode(dtmp),
                    style: "cancel"
                },
                { text: "Cancelar", onPress: () => { setLoginQrCode(null) } }
            ]
        );
    }

    async function formarLoginQrCode(dtmp) {
        setTipoLogin(false)
        if (dtmp) {
            setToken(dtmp)
            navigate('CreateDrawer')
            setLoginQrCode(null)
        } else {
            setMensagem(usr.error)
        }
    }

    async function formarLoginNormal() {
        const hashDigest = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.MD5,
            senha
        );

        let usuario = {
            id: 0,
            login: login,
            senha: hashDigest.toString()
        }

        let autenticado = await logar(usuario)

        let usr = await autenticar(autenticado)

        return usr
    }

    async function fazerLogin() {

        let usr = await formarLoginNormal()
        if (usr.token) {
            setToken(usr.token)
            navigate('CreateDrawer')
        } else {
            setMensagem(usr.error)
        }
    }

    async function exibirQrCode() {

        setDisplayQR('flex')
        setDisplayForm('none')
        setScanned(false)
    }

    async function exibirFormulario() {
        setScanned(true)
        setDisplayQR('none')
        setDisplayForm('flex')

    }
    async function autenticar(autenticado) {

        if (autenticado == null) {
            return { error: 'Usuário ou senha inválido' };
        }

        if (autenticado["isAutenticado"] == false) {
            return { error: autenticado["erro"] };
        }

        if (autenticado["isAutenticado"] == true) {
            return { token: autenticado }
        }

        return { error: "Erro de conexão, contate o suporte!" };
    }

    return (
        <View style={{
            display: 'flex',
            width: '100%',
            height: '100%',
        }}>
            <View style={{
                display: displayQR,
            }}>

                <BarCodeScanner
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: displayQR
                    }}
                    onBarCodeScanned={scanned ? undefined : value => handleBarCodeScanned(value)}
                >
                    <ImageBackground
                        style={{
                            width: 400,
                            height: 400,
                            marginTop: 150,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        source={require('../resource/images/guia_qr_code.png')} >
                    </ImageBackground>
                    <TouchableOpacity
                        style={{
                            marginTop: 100,
                            width: 100,
                            height: 45,
                            backgroundColor: 'red',
                            alignItems: 'center',
                            padding: 10,
                            borderRadius: 5,
                            elevation: 2
                        }}
                        onPress={() => exibirFormulario()}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: "bold"
                        }}>Cancelar</Text>
                    </TouchableOpacity>
                </BarCodeScanner>
            </View>
            <View style={{
                display: displayForm,
                width: '100%',
                height: '100%'
            }}>
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#149ffe', '#201d4e']}
                    style={styles.container}>
                    <ImageBackground
                        style={{
                            width: Dimensions.get('screen').width,
                            height: Dimensions.get('screen').height,
                        }}
                        source={require('../resource/images/homem.png')} >
                        <View
                            style={{
                                marginTop: 200,
                                marginBottom: 100,
                                borderRadius: 10,
                                marginHorizontal: 20,
                                flex: 1,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
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
                                value={login}
                                onChangeText={text => setLogin(text)}
                                label="Login" />
                            <TextInput
                                style={{
                                    margin: 30,
                                    marginBottom: 10,
                                    width: 250,
                                    height: 50
                                }}
                                value={senha}
                                onChangeText={text => setSenha(text)}
                                label="Senha" />
                            <Text style={{
                                color: 'white',
                                fontWeight: "bold",
                                marginBottom: 15,
                            }}>{mensagem}</Text>
                            <TouchableOpacity
                                style={{
                                    width: 150,
                                    height: 45,
                                    backgroundColor: '#68748d',
                                    alignItems: 'center',
                                    padding: 10,
                                    borderRadius: 5,
                                    elevation: 2
                                }}
                                title="Entrar"
                                onPress={() => fazerLogin()}>
                                <Text style={{
                                    color: 'white',
                                    fontWeight: "bold"
                                }}>Fazer Login</Text>
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
                                    margin: 20,
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
                                onPress={() => exibirQrCode()}
                            >
                                <Text style={{
                                    color: 'white',
                                    fontWeight: "bold"
                                }}>Logar Com QR code</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});