import { Alert } from "react-native"
import { GET, SET } from "./conection"

export const getAllProdutos = async () => {

    let produtos = await GET("produtos")
    if (produtos !== null && produtos !== 'undefined' && produtos !== []) {
        return produtos
    } else {
        
        return null
    }
}

export const saveProduto = async (produto) => {
    let produtoTemp = await SET("produto/salvar", produto)

    return produtoTemp
}

export const filtrarProdutoPorNome = async (produto) => {
    let produtoTemp = await SET("produto/filtrarPorNome", produto)

    return produtoTemp
}
