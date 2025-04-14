# Documentação do Projeto - Pokémon App

Este projeto é um aplicativo desenvolvido com **React Native** e **Expo**, utilizando funcionalidades como navegação, armazenamento local e integração com uma API de Pokémon. O app tem uma tela de login, uma tela de cadastro de usuário, e exibe uma lista de Pokémon com detalhes adicionais.

## Requisitos

#### Ter react-native e expo baixados

```bash
npm install react-native
```
```bash
npm install expo
```

## Funcionalidades

- **Tela de Login**: Permite ao usuário fazer login com um e-mail e senha armazenados no AsyncStorage.
- **Tela de Cadastro**: Permite ao usuário se cadastrar com informações como nome, e-mail, CPF, telefone e senha.
- **Exibição de Pokémon**: Exibe uma lista de Pokémon com informações como tipo, habilidades e status. A tela também inclui um botão para adicionar um Pokémon aleatório.

## Estrutura do Projeto

### 1. **`App.js`**

Este é o arquivo principal do aplicativo que configura a navegação e carrega o componente `Routes` responsável pelas rotas entre as telas. Também define a barra de status para exibir um estilo claro.

### 2. **`routes.js`**

Contém a configuração da navegação do aplicativo utilizando a biblioteca `@react-navigation/stack`. As telas configuradas são:
- **Login**: Tela inicial para o login do usuário.
- **CadastrarUsuario**: Tela para cadastrar novos usuários.
- **Main**: Tela para visualizar os detalhes de Pokémon.
- **User**: Tela para exibir dados detalhados de um Pokémon específico.

### 3. **`login.js`**

Este componente exibe a tela de login com os campos para e-mail e senha. O login é validado com dados armazenados no `AsyncStorage`. O design é estilizado com um gradiente de cores temáticas de Pokémon (amarelo, vermelho e preto).

### 4. **`pokemons.js` (ou equivalente)**

Exibe a lista de Pokémon recuperada da API Pokémon. Cada Pokémon é exibido com um card contendo informações como tipo, habilidades e status.

### 5. **`cadastro.js`**

Tela para cadastro de novos usuários, onde são coletados dados como nome, CPF, telefone, e-mail e senha. O cadastro é salvo no `AsyncStorage`.

## Dependências

O projeto utiliza as seguintes dependências:

- **React Navigation**: Para gerenciar a navegação entre as telas.
- **AsyncStorage**: Para armazenar dados localmente no dispositivo, como informações de login e cadastro.
- **Expo Linear Gradient**: Para aplicar um gradiente de fundo na tela de login.
- **Ionicons**: Para exibir ícones, como o ícone de logout na tela principal.

## Instalação e Execução

Para rodar o projeto localmente, siga as etapas abaixo:

### 1. **Clone o repositório**

Clone este repositório em sua máquina local:

```bash
git clone https://github.com/viivi02/Projeto1BimMobile.git
```

### 2. **Dependencias para se instalar no terminal**

```bash
npm install
```

```bash
npm install @react-navigation/native
```

```bash
npm install @react-navigation/stack
```

```bash
npm install react-native-gesture-handler
```

```bash
npm install react-native-reanimated
```

```bash
npm install react-native-screens
```

```bash
npx expo install axios
```

```bash
npm install expo-linear-gradient
```

```bash
npm install @react-native-async-storage/async-storage
```

```bash
npm install @expo/vector-icons
```

```bash
npx npx expo install react-native-safe-area-context
```

### 3. **Após finalizar as instalações, rode o comando abaixo:**

```bash
npx expo start
```
