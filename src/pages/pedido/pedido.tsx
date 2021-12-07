import React, { useState, useEffect } from 'react';
import Header from '../drawer_pages/default_components/header'
import { ScrollView, StyleSheet, Dimensions, Modal, View } from 'react-native';
import { Appbar, DataTable, ActivityIndicator, Button, Card, TextInput } from 'react-native-paper';
import { getAllPedidos } from '../../service/pedidoService';

import { Pedido } from '../../entity/Pedido';

export default function PedidoController({ navigation }) {
    const [pedidos, setPedidos] = useState(null);
    const [carregado, setCarregado] = useState(false);
    const [nome, setNome] = useState("");

    useEffect(() => {
        pesquisarPedidos()

        setCarregado(true)
    }, []);

    const pesquisarPedidos = async () => {
        let pedTemp = await getAllPedidos()
        await setPedidos(pedTemp)
        await console.log(pedTemp)
    }

    const [modalVisible, setModalVisible] = useState(false);
    const theme = {
        colors: {
            placeholder: 'black', text: 'black', primary: 'black',
            outlineColor: 'white', background: 'white'
        }
    }

    const criarNovoPedido = () => {
        setModalVisible(false)
        setNome("")
    }

    const editarPedido = async (pedido) => {
        setNome(pedido.numero)

        setModalVisible(true)
    }

    const salvarPedido = async () => {
        let pedido = {}
        console.log("nome ->>>>>>>>>" + nome)

        pedido["nome"] = nome

        await savePedido(pedido)
        await pesquisarPedidos()
        await criarNovoPedido()
        setModalVisible(!modalVisible);
    }



    return (
        <View style={styles.container}>
            <Header navigation={navigation} />

            <Card>
                <Card.Title title="Pedido" subtitle="Pedidos" />
                <Card.Content>

                    <View style={{ marginRight: 200 }}>
                        <Button
                            icon="plus"
                            color="green"
                            mode="outlined"
                            onPress={() => navigation.navigate("PedidoCadastro")}>
                            Novo Pedido
                        </Button>
                    </View>

                    {pedidos !== null && typeof pedidos !== undefined ?
                        <DataTable style={{ height: Dimensions.get("screen").height - 250 }}>
                            <DataTable.Header >
                                <DataTable.Title >Número</DataTable.Title>
                                <DataTable.Title >Cliente</DataTable.Title>
                                <DataTable.Title >Vendedor</DataTable.Title>
                            </DataTable.Header>
                            <ScrollView>
                                {pedidos.map((pedido) => {
                                    return (
                                        <DataTable.Row onPress={() => editarPedido(pedido)}>
                                            <DataTable.Cell>{pedido.id}</DataTable.Cell>
                                            <DataTable.Cell>{pedido.cliente ? pedido.cliente.nome : ""}</DataTable.Cell>
                                            <DataTable.Cell>{pedido.vendedor ? pedido.vendedor.nome : ""}</DataTable.Cell>
                                        </DataTable.Row>
                                    )
                                })
                                }

                            </ScrollView>
                        </DataTable>
                        :
                        <ActivityIndicator></ActivityIndicator>
                    }

                </Card.Content>
            </Card>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    criarNovoPedido();
                }}
            >
                <Card>

                    <View style={styles.modalView}>

                        <Card.Title title="Cadastro de Pedido" subtitle="Cadastrar nova Pedido" />

                        <ScrollView
                            style={{
                                width: Dimensions.get('screen').width - 80,
                            }}>

                            <TextInput
                                style={{ marginVertical: 5, height: 50 }}
                                label="Nome"
                                value={nome}
                                onChangeText={(text) => setNome(text)}
                                theme={theme}
                            />

                        </ScrollView>
                        <View style={{ flexDirection: 'row' }}>
                            <Button
                                style={{ margin: 5, width: 150 }}
                                icon="plus"
                                color="green"
                                mode="outlined"
                                onPress={() => salvarPedido()}>
                                Salvar
                            </Button>
                            <Button
                                style={{ margin: 5, width: 150 }}
                                icon="plus"
                                color="red"
                                mode="outlined"
                                onPress={() => criarNovoPedido()}>
                                Cancelar
                            </Button>
                        </View>
                    </View>
                </Card>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalView: {
        margin: 0,
        height: Dimensions.get('screen').height - 80,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
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