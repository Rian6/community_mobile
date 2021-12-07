import React, { useState, useEffect } from 'react';

import { BottomNavigation } from 'react-native-paper';
import Header from '../drawer_pages/default_components/header'
import { ScrollView, TouchableOpacity, StyleSheet, Text, View, Image, Dimensions, Modal, Alert } from 'react-native';
import { gerarRelatorioPedido, getAllPedidos, salvarPedido } from '../../service/pedidoService';
import Autocomplete from 'react-native-autocomplete-input'
import { filtrarPorNome } from '../../service/pessoaService';
import PDFReader from 'rn-pdf-reader-js'
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
import { filtrarProdutoPorNome } from '../../service/produtoService';
import PdfReader from 'rn-pdf-reader-js';

export default function PedidoCadastro({ navigation }) {
    const [index, setIndex] = React.useState(0);
    const [novoNavigation, setNovoNavigation] = useState(navigation);
    const [routes] = React.useState([
        { key: 'cliente', title: 'Cliente', icon: 'clipboard-account-outline', 'navigation': novoNavigation },
        { key: 'produto', title: 'Produtos', icon: 'package-variant', 'navigation': novoNavigation },
        { key: 'venda', title: 'Venda', icon: 'cart-outline', 'navigation': novoNavigation },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        cliente: PedidoCadastroCliente,
        produto: PedidoCadastroProduto,
        venda: PedidoCadastroVenda,
    });

    const [cliente, setCliente] = useState(null);
    const [produtos, setProdutos] = useState([]);

    function PedidoCadastroProduto() {

        const [query, setQuery] = useState("");
        const [data, setData] = useState("");
        const [total, setTotal] = useState(0);

        useEffect(() => {
            recalcularTodosProdutos()
        }, []);

        const filtrarProdutos = async (text) => {
            let novaPalavra = ""
            novaPalavra = await text.toUpperCase()
            text = novaPalavra
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
                                onPress={() => navigation.goBack()}>
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
                                    style={{ height: 50, }}
                                    inputContainerStyle={{ borderRadius: 5, paddingLeft: 10 }}
                                    containerStyle={{ marginVertical: 5 }}
                                    placeholder="Pesquisar Produto"
                                    onChangeText={(text) => filtrarProdutos(text)}
                                    flatListProps={{
                                        keyExtractor: (_, idx) => idx,
                                        renderItem: ({ item }) =>
                                            <TouchableOpacity
                                                onPress={() => adicionarNovoItem(item)}
                                                style={{ marginVertical: 5, padding: 10 }}>
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
                                    value={total ? total.replace(".", ",") : '0,00'}
                                    label="Total Geral:" />
                                <List.Subheader>Produtos Adicionados</List.Subheader>
                                {produtos.map((produto) => {
                                    return (
                                        <Card style={{
                                            backgroundColor: "#e7eff3",
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
                                                    value={((produto.qtd * produto.preco) + "").replace(".", ",")}
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

    function PedidoCadastroCliente() {

        const [query, setQuery] = useState("");
        const [data, setData] = useState([]);

        const filtrarClientes = async (text) => {
            text = await text.toUpperCase()

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
                                onPress={() => navigation.goBack()}>
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

    function PedidoCadastroVenda() {

        const [rel, setRel] = useState(null);
        const [modalVisible, setModalVisible] = useState(false);

        const LeftContent = props => <Avatar.Icon {...props}
            color='black'
            size={60}
            style={{ backgroundColor: 'white' }}
            icon="cart-outline" />


        const savePedido = async () => {

            let pedido = {}
            pedido["cliente"] = cliente
            await salvarPedido(pedido, produtos)
            navigation.goBack()
        }

        const gerarRelatorio = async () => {
            let pedido = {}

            let relatorio = await gerarRelatorioPedido(pedido, produtos)
            console.log(relatorio)
            setRel(relatorio.bloob)
            setModalVisible(true)
        }

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
                                onPress={() => navigation.goBack()}>
                                Cancelar
                            </Button>
                            <Button
                                style={{ margin: 5, width: 150 }}
                                icon="file-pdf-box"
                                color="#fab321"
                                mode="outlined"
                                onPress={() => gerarRelatorio()}>
                                Relatório
                            </Button>

                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Button
                                style={{ margin: 5, width: 150 }}
                                icon="arrow-right"
                                color="green"
                                mode="outlined"
                                onPress={() => savePedido()}>
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

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => { }}
                >
                    <View style={{
                        backgroundColor:'#4d4d4d',
                        alignItems:'center'}}>
                        <Button
                            style={{ margin: 15, width: 150 }}
                            icon="arrow-left"
                            color="white"
                            mode="outlined"
                            onPress={() => setModalVisible(false)}>
                            Voltar
                        </Button>
                    </View>
                    <PdfReader
                    customStyle={{backgroundColor:'#4d4d4d'}}
                    webviewStyle={{backgroundColor:'#4d4d4d'}}
                        source={{
                            base64: rel + "",
                        }} />
                </Modal>
            </View>
        );
    }

    return (
        <BottomNavigation
            barStyle={{ backgroundColor: "#585657" }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
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
