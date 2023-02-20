import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ tasks, latitude, longitude }) => {
  const [region, setRegion] = useState(null);

  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.04,
      });
    }
  }, [latitude, longitude]);

  return (
    <MapView
      region={region}
      style={{
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
      }}
    >
      {tasks &&
        tasks.map((task) => (
          <Marker
            key={task.id}
            coordinate={{
              latitude: task.location.latitude,
              longitude: task.location.longitude,
            }}
            title={task.name}
            description={task.description}
          />
        ))}
    </MapView>
  );
};

export default MapScreen;
