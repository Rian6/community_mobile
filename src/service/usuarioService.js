import { Alert } from "react-native"
import { GET, SET } from "./conection"

export const logar = async (usuario) => {
    let user = await SET("usuario/logar", usuario)

    return user
}