import React, { useState, useEffect } from 'react';
import Header from '../drawer_pages/default_components/header'
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, Modal, Alert } from 'react-native';
import { Appbar, DataTable, ActivityIndicator, Button, Card, TextInput } from 'react-native-paper';
import { getAllProdutos, saveProduto } from '../../service/produtoService';

export default function Produto({ navigation }) {
  const [produtos, setProdutos] = useState(null);

  const [carregado, setCarregado] = useState(false);

  const [nome, setNome] = useState("")
  const [codigoBarra, setCodigoBarra] = useState("")
  const [preco, setPreco] = useState("")
  const [descricao, setDescricao] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    pesquisarProdutos()

    setCarregado(true)
  }, []);

  const pesquisarProdutos = async () => {
    console.log("teste")
    let prodTemp = await getAllProdutos()
    console.log("psssou!")
    await setProdutos(prodTemp)
    await console.log(prodTemp)
  }

  const [modalVisible, setModalVisible] = useState(false);
  const theme = {
    colors: {
      placeholder: 'black', text: 'black', primary: 'black',
      outlineColor: 'white', background: 'white'
    }
  }

  const criarNovoProduto = () => {
    setNome("")
    setCodigoBarra("")
    setPreco("")
    setDescricao("")
    setStatus("")
    setModalVisible(false)
  }

  const editarProduto = async (produto) => {
    setNome(produto.nome)
    setCodigoBarra(produto.codigoBarra)
    setPreco(produto.preco+"")
    setDescricao(produto.descricao)
    setStatus(produto.status)
    
    setModalVisible(true)
  }

  const salvarProduto = async () => {
    let produto = {}
    console.log("nome ->>>>>>>>>" + nome)

    produto["nome"] = nome.toUpperCase()
    produto["codigoBarra"] = codigoBarra.toUpperCase()
    produto["preco"] = preco
    produto["descricao"] = descricao.toUpperCase()

    await saveProduto(produto)
    await pesquisarProdutos()
    await criarNovoProduto()
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <Card>
        <Card.Title title="Cadastro de Produto" subtitle="Produtos" />
        <Card.Content>

          <View style={{ marginRight: 200 }}>
            <Button
              icon="plus"
              color="green"
              mode="outlined"
              onPress={() => setModalVisible(true)}>
              Novo Produto
            </Button>
          </View>

          {produtos !== null && typeof produtos !== undefined ?
            <DataTable style={{ height: Dimensions.get("screen").height - 250 }}>
              <DataTable.Header >
                <DataTable.Title >Codigo</DataTable.Title>
                <DataTable.Title  >Nome</DataTable.Title>
                <DataTable.Title >Descrição</DataTable.Title>
                <DataTable.Title numeric>Preço</DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {produtos.map((produto) => {
                  return (
                    <DataTable.Row  onPress={() => editarProduto(produto)}>
                      <DataTable.Cell>{produto.codigoBarra}</DataTable.Cell>
                      <DataTable.Cell>{produto.nome}</DataTable.Cell>
                      <DataTable.Cell>{produto.descricao}</DataTable.Cell>
                      <DataTable.Cell
                        style={{
                          padding: 10,
                          flexDirection: 'column',
                          alignItems: 'flex-end'
                        }}>
                        {produto.preco}
                      </DataTable.Cell>
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
          criarNovoProduto();
        }}
      >
        <Card>

          <View style={styles.modalView}>

            <Card.Title title="Cadastro de Produto" subtitle="Cadastrar novo Produto" />

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

              <TextInput
                style={{ marginVertical: 5, height: 50 }}
                label="Codigo"
                value={codigoBarra}
                onChangeText={(text) => setCodigoBarra(text)}
                theme={theme}
              />
              <TextInput
                style={{ marginVertical: 5, height: 50 }}
                label="Preço"
                value={preco}
                onChangeText={(text) => setPreco(text)}
                theme={theme}
              />
            </ScrollView>
            <View style={{ flexDirection: 'row' }}>
              <Button
                style={{ margin: 5, width: 150 }}
                icon="plus"
                color="green"
                mode="outlined"
                onPress={() => salvarProduto()}>
                Salvar
              </Button>
              <Button
                style={{ margin: 5, width: 150 }}
                icon="plus"
                color="red"
                mode="outlined"
                onPress={() => criarNovoProduto()}>
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