import { Pessoa } from "./Pessoa";
import { Usuario } from "./Usuario";

export interface Pedido {
    id: Number;
    vendedor: Usuario;
    cliente: Pessoa;
}
