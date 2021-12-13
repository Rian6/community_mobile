import React, { useState, useEffect } from 'react';

import { BottomNavigation } from 'react-native-paper';
import PedidoCadastroCliente from './pedidoCadastroCliente';
import PedidoCadastroProduto from './pedidoCadastroProduto';
import PedidoCadastroVenda from './pedidoCadastroVenda';

export default function PedidoCadastro({ route, navigation }) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'cliente', title: 'Cliente', icon: 'clipboard-account-outline', 'navigation':navigation},
        { key: 'produto', title: 'Produtos', icon: 'package-variant', 'navigation':navigation},
        { key: 'venda', title: 'Venda', icon: 'cart-outline', 'navigation':navigation},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        cliente: PedidoCadastroCliente,
        produto: PedidoCadastroProduto,
        venda: PedidoCadastroVenda,
    });

    return (
        <BottomNavigation
            barStyle={{ backgroundColor: "#585657" }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}
