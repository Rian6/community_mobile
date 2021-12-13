import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './pages/login';
import CreateDrawer from './pages/drawer_pages/drawer_routes';
import PedidoCadastro from './pages/pedido/pedidoCadastro';
import Pedido from './pages/pedido/pedido';
import PedidoCadastroCliente from './pages/pedido/pedidoCadastroCliente';
import PedidoCadastroProduto from './pages/pedido/pedidoCadastroProduto';
import PedidoCadastroVenda from './pages/pedido/pedidoCadastroVenda';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        >
        <Stack.Screen name="Login" component={Login}/>    
        <Stack.Screen name="CreateDrawer" component={CreateDrawer}/>
        <Stack.Screen name="PedidoCadastro" component={PedidoCadastro}/>
        <Stack.Screen name="Pedido" component={Pedido}/>
        <Stack.Screen name="PedidoCadastroCliente" component={PedidoCadastroCliente}/>
        <Stack.Screen name="PedidoCadastroProduto" component={PedidoCadastroProduto}/>
        <Stack.Screen name="PedidoCadastroVenda" component={PedidoCadastroVenda}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}