import { Pessoa } from "./Pessoa";
import { Usuario } from "./Usuario";
import { Produto } from "./Produto";
import { Pedido } from "./Pedido";

export interface PedidoItem {
    id: Number;
    produto: Produto;
    pedido: Pedido;
}
