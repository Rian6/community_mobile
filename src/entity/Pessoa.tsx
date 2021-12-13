import {PessoaEndereco} from './PessoaEndereco';

export interface Pessoa {
    id: Number;
    nome: String;
    nomeFantasia: String;
    cpfCnpj: String;
    telefone: String;
    email: String;
    pessoaEndereco: PessoaEndereco;
}
