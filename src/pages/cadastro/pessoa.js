import React, { useState, useEffect } from 'react';
import Header from '../drawer_pages/default_components/header'
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, Modal, Alert } from 'react-native';
import { Appbar, DataTable, ActivityIndicator, Button, Card, TextInput, Divider } from 'react-native-paper';
import { getAllProdutos, saveProduto } from '../../service/produtoService';
import { getAllPessoas, savePessoa } from '../../service/pessoaService';

export default function Pessoa({ navigation }) {
  const [pessoas, setPessoas] = useState(null);

  const [carregado, setCarregado] = useState(false);

  const [nome, setNome] = useState("")
  const [nomeFantasia, setNomeFantasia] = useState("")
  const [cpfCnpj, setCpfCnpj] = useState("")
  const [telefone, setTelefone] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    pesquisarPessoas()

    setCarregado(true)
  }, []);

  const pesquisarPessoas = async () => {
    let pesTemp = await getAllPessoas()
    await setPessoas(pesTemp)
    await console.log(pesTemp)
  }

  const [modalVisible, setModalVisible] = useState(false);
  const theme = {
    colors: {
      placeholder: 'black', text: 'black', primary: 'black',
      outlineColor: 'white', background: 'white'
    }
  }

  const criarNovaPessoa = () => {
    setModalVisible(false)
    setNome("")
  }

  const editarPessoa = async (produto) => {
    setNome(produto.nome)

    setModalVisible(true)
  }

  const salvarPessoa = async () => {
    let pessoa = {}
    console.log("nome ->>>>>>>>>" + nome)

    pessoa["nome"]         = nome.toUpperCase()
    pessoa["nomeFantasia"] = nomeFantasia.toUpperCase()
    pessoa["cpfCnpj"]      = cpfCnpj
    pessoa["telefone"]     = telefone
    pessoa["email"]        = email.toUpperCase()

    await savePessoa(pessoa)
    await pesquisarPessoas()
    await criarNovaPessoa()
    setModalVisible(!modalVisible);
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <Card>
        <Card.Title title="Cadastro de Pessoa" subtitle="Pessoas" />
        <Card.Content>

          <View style={{ marginRight: 200 }}>
            <Button
              icon="plus"
              color="green"
              mode="outlined"
              onPress={() => setModalVisible(true)}>
              Nova Pessoa
            </Button>
          </View>

          {pessoas !== null && typeof pessoas !== undefined ?
            <DataTable style={{ height: Dimensions.get("screen").height - 250 }}>
              <DataTable.Header >
                <DataTable.Title >Número</DataTable.Title>
                <DataTable.Title >Nome</DataTable.Title>
              </DataTable.Header>
              <ScrollView>
                {pessoas.map((pessoa) => {
                  return (
                    <DataTable.Row onPress={() => editarPessoa(pessoa)}>
                      <DataTable.Cell>{pessoa.id}</DataTable.Cell>
                      <DataTable.Cell>{pessoa.nome}</DataTable.Cell>
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

            <Card.Title title="Cadastro de Pessoa" subtitle="Cadastrar nova Pessoa" />

            <ScrollView
              style={{
                width: Dimensions.get('screen').width - 80,
              }}>
              <Card.Title subtitle="Dados Pessoais" />
              <Divider style={{
                backgroundColor: "black",
                height: 1,
                marginBottom: 10
              }} />
              <TextInput
                style={{ marginVertical: 5, height: 50 }}
                label="Nome"
                value={nome}
                onChangeText={(text) => setNome(text)}
                theme={theme}
              />

              <TextInput
                style={{ marginVertical: 5, height: 50 }}
                label="Nome Fantasia"
                value={nomeFantasia}
                onChangeText={(text) => setNomeFantasia(text)}
                theme={theme}
              />

              <TextInput
                style={{ marginVertical: 5, height: 50 }}
                label="CPF / CNPJ"
                value={cpfCnpj}
                onChangeText={(text) => setCpfCnpj(text)}
                theme={theme}
              />
              <Card.Title subtitle="Dados de Contato" />
              <Divider style={{
                backgroundColor: "black",
                height: 1,
                marginBottom: 10
              }} />
              <TextInput
                style={{ marginVertical: 5, height: 50 }}
                label="Telefone"
                value={telefone}
                onChangeText={(text) => setTelefone(text)}
                theme={theme}
              />

              <TextInput
                style={{ marginVertical: 5, height: 50 }}
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                theme={theme}
              />

            </ScrollView>
            <View style={{ flexDirection: 'row' }}>
              <Button
                style={{ margin: 5, width: 150 }}
                icon="plus"
                color="green"
                mode="outlined"
                onPress={() => salvarPessoa()}>
                Salvar
              </Button>
              <Button
                style={{ margin: 5, width: 150 }}
                icon="plus"
                color="red"
                mode="outlined"
                onPress={() => criarNovaPessoa()}>
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