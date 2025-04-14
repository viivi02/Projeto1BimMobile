import React, { Component } from "react";
import api from "../services/api";
import typeColors from "../utils/typeColors";
import { View, Text } from "react-native";
import {
  GradientContainer,
  Container,
  Header,
  Avatarperfil,
  Nameperfil,
  BioPerfil,
  Stars,
  Starred,
  Info,
  Title,
  Author,
} from "../styles";

export default class User extends Component {
  state = {
    stats: [],
    types: [],
  };

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/pokemon/${user.name}`);
    this.setState({
      stats: response.data.stats,
      types: response.data.types.map((t) => t.type.name),
    });    
  }

  render() {
    const { route } = this.props;
    const { user } = route.params;
    const { stats, types } = this.state;

    return (
      <GradientContainer>
        <Header>
          <Avatarperfil source={{ uri: user.avatar }} />
          <Nameperfil>{user.name}</Nameperfil>
        </Header>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: 8,
            justifyContent: "center",
          }}
        >
          {types.map((type) => (
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

        <Stars
          showVerticalScrollIndicator={false}
          data={stats}
          keyExtractor={(stat, index) => String(index)}
          renderItem={({ item }) => (
            <Starred>
              <Info>
                <Title>{item.stat.name}</Title>
                <Author>Base stat: {item.base_stat}</Author>
              </Info>
            </Starred>
          )}
        />
      </GradientContainer>
    );
  }
}
