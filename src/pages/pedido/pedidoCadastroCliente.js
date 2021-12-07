
import React, { useState, useEffect } from 'react';

import Header from '../drawer_pages/default_components/header'
import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, Dimensions, Modal, Alert } from 'react-native';
import { Divider, Appbar, DataTable, ActivityIndicator, Button, Card, TextInput, Avatar } from 'react-native-paper';
import { getAllPedidos } from '../../service/pedidoService';
import Autocomplete from 'react-native-autocomplete-input'
import { filtrarPorNome } from '../../service/pessoaService';

export default function PedidoCadastroCliente({ routes }) {

    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    const [cliente, setCliente] = useState(null);

    const filtrarClientes = async (text) => {
        setQuery(text)
        if (text.length >= 3) {
            let resultado = await filtrarPorNome(text)
            setData(resultado)
            console.log(resultado)
        } else {
            setData([])
        }
    }
    const selecionarCliente = async (item) => {
        setCliente(item)
        filtrarClientes("")
    }

    const LeftContent = props => <Avatar.Icon {...props}
        color='black'
        size={60}
        style={{ backgroundColor: 'white' }}
        icon="clipboard-account-outline" />

    return (
        <View>
            <Card>

                <View style={styles.modalView}>

                    <Card.Title
                        left={LeftContent}
                        title="Cliente"
                        subtitle="Cadastro de pedido" />
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            style={{ margin: 5, width: 150 }}
                            icon="cancel"
                            color="red"
                            mode="outlined"
                            onPress={() => navigation.navigate("Pedido")}>
                            Cancelar
                        </Button>
                    </View>
                    <ScrollView
                        style={{
                            width: Dimensions.get('screen').width - 80,
                        }}>
                        <Card>

                            <Card.Title
                                style={{
                                    width: Dimensions.get('screen').width - 80,
                                }}
                                subtitle="Dados Gerais" />
                            <Divider style={{ backgroundColor: "black", height: 1, marginBottom: 10 }} />
                            <Autocomplete
                                data={data}
                                value={query}
                                style={{ height: 50, }}
                                inputContainerStyle={{ borderRadius: 5, paddingLeft: 10 }}
                                containerStyle={{ marginVertical: 5 }}
                                placeholder="Pesquisar Cliente"
                                onChangeText={(text) => filtrarClientes(text)}
                                flatListProps={{
                                    keyExtractor: (_, idx) => idx,
                                    renderItem: ({ item }) =>
                                        <TouchableOpacity
                                            onPress={() => selecionarCliente(item)}
                                            style={{ marginVertical: 5 }}>
                                            <Text>{item.nome}</Text>
                                        </TouchableOpacity>
                                    ,
                                }} />
                            {cliente ?
                                <View>
                                    <TextInput
                                        disabled
                                        style={{ marginVertical: 5, height: 50 }}
                                        label="Razão Social"
                                        value={cliente.nome}
                                    />
                                    <TextInput
                                        disabled
                                        style={{ marginVertical: 5, height: 50 }}
                                        label="Nome Fantasia"
                                        value={cliente.nomeFantasia}
                                    />
                                    <TextInput
                                        disabled
                                        style={{ marginVertical: 5, height: 50 }}
                                        label="CPF / CNPJ"
                                        value={cliente.cpfCnpj}
                                    />
                                    <Card.Title
                                        style={{
                                            width: Dimensions.get('screen').width - 80,
                                        }}
                                        subtitle="Dados de Contato" />
                                    <Divider style={{ backgroundColor: "black", height: 1, marginBottom: 10 }} />
                                    <TextInput
                                        disabled
                                        style={{ marginVertical: 5, height: 50 }}
                                        label="Telefone"
                                        value={cliente.telefone}
                                    />
                                    <TextInput
                                        disabled
                                        style={{ marginVertical: 5, height: 50 }}
                                        label="Email"
                                        value={cliente.email}
                                    />
                                    <Card.Title
                                        style={{
                                            width: Dimensions.get('screen').width - 80,
                                        }}
                                        subtitle="Endereço" />
                                    <Divider style={{ backgroundColor: "black", height: 1, marginBottom: 10 }} />

                                
                                </View>
                                : null}
                        </Card>
                    </ScrollView>
                </View>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    modalView: {
        margin: 0,
        height: Dimensions.get('screen').height - 80,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    header: {
        backgroundColor: '#222222',
    },

    container: {
        minHeight: Dimensions.get('screen').height,
        backgroundColor: 'white',
    },
});