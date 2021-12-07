import { Alert } from "react-native"
import { GET, SET } from "./conection"

export const getAllPessoas = async () => {

    let pessoas = await GET("pessoas")
    if (pessoas !== null && pessoas !== 'undefined' && pessoas !== []) {
        return pessoas
    } else {

        return null
    }
}

export const savePessoa = async (pessoa) => {
    let pessoaTemp = await SET("pessoa/salvar", pessoa)

    return pessoaTemp
}

export const filtrarPorNome = async (nome) => {
    let pessoas = await SET("pessoa/filtrarPorNome", nome)
console.log(pessoas)
    return pessoas
}