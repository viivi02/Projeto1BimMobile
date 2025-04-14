import React, { Component } from "react";
import { Keyboard, ActivityIndicator } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import typeColors from "../utils/typeColors";
import { View, Text } from "react-native";
import {
  GradientContainer,
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from "../styles";

export default class Main extends Component {
  state = {
    newUser: "",
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem("users");
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem("users", JSON.stringify(users));
    }
  }

  handleAddRandom = async () => {
    try {
      const randomId = Math.floor(Math.random() * 1010) + 1;
      this.setState({ loading: true });
  
      const response = await api.get(`/pokemon/${randomId}`);
  
      const { users } = this.state;
      const pokeName = response.data.name;
  
      if (users.find((poke) => poke.name === pokeName)) {
        alert("Pokémon já adicionado!");
        this.setState({ loading: false });
        return;
      }
  
      const types = response.data.types.map(t => t.type.name);
  
      const data = {
        id: response.data.id,
        name: pokeName,
        bio: `Tipo(s): ${types.join(", ")}`,
        types,
        avatar: response.data.sprites.front_default,
      };
  
      this.setState({
        users: [...users, data],
        loading: false,
      });
  
    } catch (error) {
      alert("Erro ao buscar Pokémon aleatório!");
      this.setState({ loading: false });
    }
  };  

  handleAddUser = async () => {
    try {
      const { users, newUser } = this.state;
      this.setState({ loading: true });

      const response = await api.get(`/pokemon/${newUser.toLowerCase()}`);

      if (users.find((poke) => poke.id === response.data.id)) {
        alert("Pokémon já adicionado!");
        this.setState({ loading: false });
        return;
      }

      const types = response.data.types.map(t => t.type.name);

      const data = {
        id: response.data.id,
        name: response.data.name,
        bio: `Tipo(s): ${types.join(", ")}`,
        avatar: response.data.sprites.front_default,
        types,
      };      

      this.setState({
        users: [...users, data],
        newUser: "",
        loading: false,
      });

      Keyboard.dismiss();
    } catch (error) {
      alert("Pokémon não encontrado!");
      this.setState({ loading: false });
    }
  };

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <GradientContainer>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Buscar Pokémon"
            value={newUser}
            onChangeText={(text) => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
          <SubmitButton
            onPress={this.handleAddRandom}
          >
            <Icon name="shuffle" size={25} color="#fff" />
          </SubmitButton>
        </Form>
        <List
          showsVerticalScrollIndicator={false}
          data={users}
          keyExtractor={(user) => String(user.id)}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>

              {item.types && (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    marginTop: 8,
                  }}
                >
                  {item.types.map((type) => (
                    <View
                      key={type}
                      style={{
                        backgroundColor: typeColors[type] || "#ccc",
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                        marginRight: 6,
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontWeight: "bold",
                          fontSize: 12,
                          textTransform: "capitalize",
                        }}
                      >
                        {type}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <ProfileButton
                onPress={() => {
                  this.props.navigation.navigate("User", { user: item });
                }}
              >
                <ProfileButtonText>Ver detalhes</ProfileButtonText>
              </ProfileButton>
              <ProfileButton
                onPress={() => {
                  this.setState({
                    users: this.state.users.filter(
                      (user) => user.id !== item.id
                    ),
                  });
                }}
                style={{ backgroundColor: "black" }}
              >
                <ProfileButtonText>Remover</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </GradientContainer>
    );
  }
}
