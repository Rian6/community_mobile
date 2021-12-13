
import React, { useState, useEffect } from 'react';

import Header from '../drawer_pages/default_components/header'
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, Modal, Alert } from 'react-native';
import { Appbar, Divider, DataTable, ActivityIndicator, Button, Card, TextInput, Avatar } from 'react-native-paper';
import { getAllPedidos } from '../../service/pedidoService';

export default function PedidoCadastroVenda({ route, navigation }) {

    const LeftContent = props => <Avatar.Icon {...props}
        color='black'
        size={60}
        style={{ backgroundColor: 'white' }}
        icon="cart-outline" />

    return (
        <View>
            <Card>

                <View style={styles.modalView}>

                    <Card.Title
                        left={LeftContent}
                        title="Venda"
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
                        <Button
                            style={{ margin: 5, width: 150 }}
                            icon="file-pdf-box"
                            color="#fab321"
                            mode="outlined"
                            onPress={() => navigation.navigate("Pedido")}>
                            Relatório
                        </Button>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                    <Button
                            style={{ margin: 5, width: 150 }}
                            icon="arrow-right"
                            color="green"
                            mode="outlined"
                            onPress={() => navigation.navigate("Pedido")}>
                            Finalizar
                        </Button>
                    </View>
                    <ScrollView>

                        <Card>

                            <Card.Title
                                style={{
                                    width: Dimensions.get('screen').width - 80,
                                }}
                                subtitle="Pagamento" />
                            <Divider style={{ backgroundColor: "black", height: 1, marginBottom: 10 }} />

                            <TextInput
                                style={{ marginVertical: 5, height: 50 }}
                                label="Tipo de Pagamento"
                            />
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