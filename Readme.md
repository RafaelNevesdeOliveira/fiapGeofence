# Geofence App

Este projeto é um exemplo de como configurar um aplicativo React Native com Expo, utilizando geofencing para criar áreas virtuais de interesse (geofences) e monitorar a entrada e saída dessas áreas, além de outras funcionalidades de localização.

## Pré-requisitos

Antes de iniciar, certifique-se de ter o Node.js instalado em sua máquina. Além disso, é recomendado ter o Expo CLI instalado globalmente.

## Passos para Configuração

1. **Criação do Projeto**

    Para criar um novo projeto Expo, execute o seguinte comando:
    ```bash
    npx create-expo-app Geofence --template
    ```

2. **Instalar Dependências**

    As dependências listadas no projeto incluem:
    ```json
    {
      "dependencies": {
        "expo": "~51.0.28",
        "expo-location": "^17.0.1",
        "expo-status-bar": "~1.12.1",
        "expo-task-manager": "^11.8.2",
        "react": "18.2.0",
        "react-native": "0.74.5"
      },
      "devDependencies": {
        "@babel/core": "^7.20.0",
        "@types/react": "~18.2.45",
        "typescript": "^5.1.3"
      }
    }
    ```
    Execute o seguinte comando para instalar todas as dependências:
    ```bash
    npm install
    ```

3. **Iniciar o Projeto**

    Para iniciar o servidor de desenvolvimento do Expo, use:
    ```bash
    npm start
    ```

4. **Executar o Projeto em Diferentes Plataformas**

    Para executar o projeto em um dispositivo Android, iOS ou na Web, utilize os seguintes comandos:

    - Android:
      ```bash
      npm run android
      ```

    - iOS:
      ```bash
      npm run ios
      ```

    - Web:
      ```bash
      npm run web
      ```

## Principais Funcionalidades

- **Geofencing**: O projeto utiliza as bibliotecas `expo-location` e `expo-task-manager` para configurar e gerenciar geofences, permitindo ao aplicativo monitorar quando o usuário entra ou sai de uma área geográfica específica.
- **Localização em Segundo Plano**: Com o `expo-task-manager`, o projeto pode executar tarefas de localização em segundo plano, permitindo monitoramento contínuo mesmo quando o aplicativo não está em primeiro plano.

## Estrutura do Projeto

- **`App.js`**: Arquivo principal onde a lógica da aplicação e a configuração de geofences e outras funcionalidades de localização são implementadas.
- **`package.json`**: Contém todas as dependências, scripts e configuração do projeto.
- **`node_modules/`**: Diretório que contém todas as bibliotecas instaladas.
- **`ios/` e `android/`**: Diretórios gerados após o prebuild, contendo os arquivos de configuração nativa para iOS e Android.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um `Pull Request` ou relatar um `Issue`.

## Licença

Este projeto está licenciado sob a MIT License. Consulte o arquivo `LICENSE` para obter mais informações.
