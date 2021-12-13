
import React, { useState, useEffect } from 'react';

import Header from '../drawer_pages/default_components/header'
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, Modal, Alert, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input'
import {
    Divider,
    Appbar,
    DataTable,
    List,
    ActivityIndicator,
    Button,
    Card,
    Searchbar,
    TextInput, Avatar
} from 'react-native-paper';
import { getAllPedidos } from '../../service/pedidoService';
import { filtrarPorNome } from '../../service/produtoService';

export default function PedidoCadastroProduto() {

    const [query, setQuery] = useState("");
    const [data, setData] = useState("");
    const [total, setTotal] = useState(0);

    useEffect(() => {
        recalcularTodosProdutos()
    }, []);

    const filtrarProdutos = async (text) => {
        setQuery(text)
        if (text.length >= 3) {
            let resultado = await filtrarProdutoPorNome(text)
            setData(resultado)
        } else {
            setData([])
        }
    }

    const adicionarNovoItem = async (item) => {
        let prods = produtos
        item.qtd = 1
        prods.push(item)
        setProdutos(prods)
        recalcularTodosProdutos()
        filtrarProdutos("")
    }

    const removerItem = async (item) => {
        let prods = produtos
        prods.splice(prods.indexOf(item), 1);

        setProdutos(prods)
        recalcularTodosProdutos()
        filtrarProdutos("")
    }

    const mudarQuantidade = async (item, qtd) => {
        item.qtd = qtd
        item.total = await calcularTotalProduto(item)
        await recalcularTodosProdutos()
        filtrarProdutos("")
    }

    const mudarPreco = async (item, preco) => {
        item.preco = preco
        item.total = await calcularTotalProduto(item)
        await recalcularTodosProdutos()
        filtrarProdutos("")
    }

    const calcularTotalProduto = async (item) => {
        let tot = item.preco * item.qtd
        return tot
    }

    const recalcularTodosProdutos = async () => {
        let totalTemp = 0

        if (produtos.length > 0) {
            produtos.map(async (produto) => {
                let tot = await calcularTotalProduto(produto)

                totalTemp = tot + totalTemp
                setTotal(totalTemp + "")
            })
        } else {
            setTotal("0")
        }
    }

    const LeftContent = props => <Avatar.Icon {...props}
        color='black'
        size={60}
        style={{ backgroundColor: 'white' }}
        icon="package-variant" />

    const LeftContentProduto = props => <Avatar.Icon {...props}
        size={60}
        style={{ backgroundColor: '#e7eff3' }}
        icon="package-variant" />

    return (
        <View>
            <Card>

                <View style={styles.modalView}>

                    <Card.Title
                        left={LeftContent}
                        title="Produto"
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
                                subtitle="Produtos" />
                            <Divider style={{ backgroundColor: "black", height: 1, marginBottom: 10 }} />
                            <Autocomplete
                                data={data}
                                value={query}
                                placeholder="Pesquisar Produto"
                                onChangeText={(text) => filtrarProdutos(text)}
                                flatListProps={{
                                    keyExtractor: (_, idx) => idx,
                                    renderItem: ({ item }) =>
                                        <TouchableOpacity
                                            onPress={() => adicionarNovoItem(item)}
                                            style={{ marginVertical: 5, padding:10}}>
                                            <Text>{item.codigoBarra + " - " + item.nome}</Text>
                                        </TouchableOpacity>
                                    ,
                                }} />
                            <TextInput
                                style={{
                                    backgroundColor: "#e7eff3",
                                    marginRight: 150,
                                    marginVertical: 5,
                                    height: 50
                                }}
                                disabled
                                value={total ? total.replace(".",","): '0,00'}
                                label="Total Geral:" />
                            <List.Subheader>Produtos Adicionados</List.Subheader>
                            {produtos.map((produto) => {
                                return (
                                    <Card style={{
                                        backgroundColor:"#e7eff3",
                                        borderRadius: 10,
                                        marginBottom: 20
                                    }}>
                                        <Card.Title
                                            left={LeftContentProduto}
                                            title={produto.nome}
                                            subtitle={"Código: " + produto.codigoBarra} />
                                        <View
                                            style={{
                                                margin: 5,
                                                flexDirection: 'row'
                                            }}>
                                            <TextInput
                                                style={{
                                                    backgroundColor: 'rgba(52, 52, 52, 0)',
                                                    width: 100,
                                                    marginHorizontal: 5,
                                                    marginVertical: 5,
                                                    height: 50
                                                }}
                                                value={produto.preco + ""}
                                                onChangeText={(text) => mudarPreco(produto, text)}
                                                label="Preço" />
                                            <TextInput
                                                style={{
                                                    backgroundColor: 'rgba(52, 52, 52, 0)',
                                                    width: 100,
                                                    marginHorizontal: 5,
                                                    marginVertical: 5,
                                                    height: 50
                                                }}
                                                value={produto.qtd + ""}
                                                onChangeText={(text) => mudarQuantidade(produto, text)}
                                                label="Qtd." />
                                            <Text
                                                style={{
                                                    marginVertical: 25,
                                                }}> = </Text>
                                            <TextInput
                                                style={{
                                                    backgroundColor: 'rgba(52, 52, 52, 0)',
                                                    width: 100,
                                                    marginHorizontal: 5,
                                                    marginVertical: 5,
                                                    height: 50
                                                }}
                                                disabled
                                                value={((produto.qtd * produto.preco) + "").replace(".",",")}
                                                label="Total" />

                                        </View>
                                        <Card.Actions>
                                            <Button
                                                style={{ margin: 5, width: 50 }}
                                                icon="trash-can-outline"
                                                color="red"
                                                mode="outlined"
                                                onPress={() => removerItem(produto)}>
                                                
                                            </Button>
                                            <Button
                                                style={{ margin: 5, width: 50 }}
                                                icon="reply"
                                                color="blue"
                                                mode="outlined"
                                                onPress={() => adicionarNovoItem(produto)}>
                                            
                                            </Button>
                                        </Card.Actions>
                                    </Card>
                                )
                            })}
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