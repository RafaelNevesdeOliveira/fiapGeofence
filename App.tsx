import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";


const GEOFENCE_TASK_NAME = "GEOFENCE_TASK";

const GEOFENCE_LATITUDE = -23.55052;
const GEOFENCE_LONGITUDE = -46.633308;
const GEOFENCE_RADIUS = 500;

TaskManager.defineTask(GEOFENCE_TASK_NAME, ({ data, error }) => {
  console.log("Geofencing task executed");

  if (error) {
    console.error("Geofencing error:", error.message);
    return;
  }

  const { eventType } = data as {
    eventType: Location.GeofencingEventType;
  };

  console.log(`Event type: ${eventType}`);

  if (eventType === Location.GeofencingEventType.Enter) {
    console.log("Você entrou na geofence em São Paulo");
  } else if (eventType === Location.GeofencingEventType.Exit) {
    console.log("Você saiu da geofence em São Paulo");
  }
});

export default function App() {
  const [geofenceStatus, setGeofenceStatus] = useState<string>(
    "Esperando por evento de geofence..."
  );
  const [backgroundColor, setBackgroundColor] = useState<string>("#fff");

  useEffect(()=>{
    const setupGeofence = async () => {
      try{
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permissão necessária",
            "Precisamos de permissão para acessar sua localização."
          );
          return;
        }

        let { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();
      if (backgroundStatus !== "granted") {
        Alert.alert(
          "Permissão de segundo plano necessária",
          "Precisamos de permissão para acessar sua localização em segundo plano."
        );
        return;
      }
      console.log("Permissões concedidas");

      const geofence = {
        latitude: GEOFENCE_LATITUDE,
        longitude: GEOFENCE_LONGITUDE,
        radius: GEOFENCE_RADIUS,
        notifyOnEntry: true,
        notifyOnExit: true,
        identifier: "myGeofence",
      };

      await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, [geofence])
      .then(() => console.log("Geofencing started successfully"))
      .catch((error) => console.error("Error starting geofencing", error));

      }catch(error){
        console.error("Erro ao configurar a geofence:", error);
      }

    }
    setupGeofence();
  },[])


  const checkLocation = async() =>{
    try{
      const currentLocation = await Location.getCurrentPositionAsync({});
      const calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {
        // Função que converte graus em radianos
        const convertDegreesToRadians = (degrees) => degrees * (Math.PI / 180);
  
        // Constante que representa o raio da Terra em metros (aproximadamente 6.371 km)
        const earthRadiusInMeters = 6371e3;
  
        // Converte a latitude do primeiro ponto de graus para radianos
        const latitude1InRadians = convertDegreesToRadians(latitude1);
  
        // Converte a latitude do segundo ponto de graus para radianos
        const latitude2InRadians = convertDegreesToRadians(latitude2);
  
        // Calcula a diferença entre as latitudes dos dois pontos (em radianos)
        const latitudeDifferenceInRadians = convertDegreesToRadians(latitude2 - latitude1);
  
        // Calcula a diferença entre as longitudes dos dois pontos (em radianos)
        const longitudeDifferenceInRadians = convertDegreesToRadians(longitude2 - longitude1);
  
        // Variável intermediária 'a' usada na fórmula haversine para calcular a distância angular
        const haversineComponentA =
          Math.sin(latitudeDifferenceInRadians / 2) * Math.sin(latitudeDifferenceInRadians / 2) +
          Math.cos(latitude1InRadians) * Math.cos(latitude2InRadians) *
          Math.sin(longitudeDifferenceInRadians / 2) * Math.sin(longitudeDifferenceInRadians / 2);
  
        // Variável 'c' que é o arco do círculo, usado para calcular a distância
        const angularDistanceInRadians = 2 * Math.atan2(Math.sqrt(haversineComponentA), Math.sqrt(1 - haversineComponentA));
  
        // Calcula a distância em metros entre os dois pontos na superfície da Terra
        const distanceInMeters = earthRadiusInMeters * angularDistanceInRadians;
        return distanceInMeters;
      };

      const distanceFromGeofenceCenter = calculateDistance(
        GEOFENCE_LATITUDE,  // Latitude do centro da geofence
        GEOFENCE_LONGITUDE, // Longitude do centro da geofence
        currentLocation.coords.latitude,  // Latitude atual do dispositivo
        currentLocation.coords.longitude  // Longitude atual do dispositivo
      );

      console.log("Localização Atual:", currentLocation.coords);
      console.log("Distância até a Geofence:", distanceFromGeofenceCenter);

      if (distanceFromGeofenceCenter <= GEOFENCE_RADIUS) {
        setGeofenceStatus("Você está dentro da geofence.");
        setBackgroundColor("#d4edda"); // Verde claro
      }else{
        setGeofenceStatus("Você está fora da geofence.");
        setBackgroundColor("#f8d7da"); // Vermelho claro
      }

    }catch(error){
      console.error("Erro ao verificar a localização:", error);
    }
  }


  return (
    <View style={styles.container}>
     <Text style={styles.text}>{geofenceStatus}</Text>
     <Button title="Verificar Localização" onPress={checkLocation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    padding: 20,
  },
});