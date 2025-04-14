import React, { Component } from "react";
import { View, Text } from "react-native";
import api from "../services/api";
import typeColors from "../utils/typeColors";
import {
  GradientContainer,
  Header,
  Avatarperfil,
  Nameperfil,
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
    abilities: [],
  };

  async componentDidMount() {
    const { route } = this.props;
    const { user } = route.params;

    const response = await api.get(`/pokemon/${user.name}`);

    this.setState({
      stats: response.data.stats,
      types: response.data.types.map((t) => t.type.name),
      abilities: response.data.abilities.map((a) => a.ability.name),
    });
  }

  getBarColor = (value) => {
    if (value >= 100) return "#4CAF50"; // verde
    if (value >= 50) return "#FFEB3B"; // amarelo
    return "#F44336"; // vermelho
  };

  render() {
    const { route } = this.props;
    const { user } = route.params;
    const { stats, types, abilities } = this.state;

    return (
      <GradientContainer>
        <Header>
          <Avatarperfil source={{ uri: user.avatar }} />
          <Nameperfil>{user.name}</Nameperfil>
        </Header>

        {/* Tipos */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8, justifyContent: "center" }}>
          {types.map((type) => (
            <View
              key={type}
              style={{
                backgroundColor: typeColors[type] || "#fff",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                marginRight: 6,
                marginBottom: 4,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12, textTransform: "capitalize" }}>
                {type}
              </Text>
            </View>
          ))}
        </View>

          {/* Habilidades */}
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff", marginBottom: 8, alignSelf: "center" }}>
              Habilidades
            </Text>
            {abilities.map((ability) => (
              <Starred key={ability}>
                <Info>
                  <Title style={{ textTransform: "capitalize" }}>{ability}</Title>
                </Info>
              </Starred>
            ))}
          </View>
        {/* Stats */}
        <Stars
          data={stats}
          keyExtractor={(stat, index) => String(index)}
          renderItem={({ item }) => (
            <Starred>
              <Info>
                <Title>{item.stat.name}</Title>
                <Author>Base stat: {item.base_stat}</Author>
                <View
                  style={{
                    height: 8,
                    width: "100%",
                    backgroundColor: "#ddd",
                    borderRadius: 4,
                    marginTop: 5,
                  }}
                >
                  <View
                    style={{
                      height: 8,
                      width: `${Math.min(item.base_stat, 100)}%`,
                      backgroundColor: this.getBarColor(item.base_stat),
                      borderRadius: 4,
                    }}
                  />
                </View>
              </Info>
            </Starred>
          )}
        />
      </GradientContainer>
    );
  }
}
