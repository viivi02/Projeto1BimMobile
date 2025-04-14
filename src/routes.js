import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./pages/main";
import Login from "./pages/login";
import User from "./pages/pokemons";
import CadastrarUsuario from "./pages/cadastro";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: "LOGIN",
          headerLeft: null,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#CC0000",
          },
          headerTitleStyle: {
            color: "#fff",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="CadastrarUsuario"
        component={CadastrarUsuario}
        options={{
          title: "CADASTRO DE USUÁRIOS",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#CC0000",
          },
          headerTitleStyle: {
            color: "#fff",
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={({ navigation }) => ({
          headerLeft: null,
          title: "Visualização de Pokémon",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#CC0000",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => (
            <Ionicons
              name="log-out-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 15 }}
              onPress={async () => {
                try {
                  await AsyncStorage.removeItem("userToken");
                  navigation.replace("Login");
                } catch (error) {
                  console.error("Erro ao realizar o logout:", error);
                }
              }}
            />
          ),
        })}
      />

      <Stack.Screen
        name="User"
        component={User}
        options={{
          title: "Dados do Pokémon",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#CC0000",
          },
          headerTitleStyle: {
            color: "#fff",
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
