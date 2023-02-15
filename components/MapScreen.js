import { Dimensions } from "react-native"
import MapView, { Marker } from "react-native-maps"

const MapScreen = ({ tasks, latitude, longitude }) => {
    return (
      <MapView
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
        }}
      >
        {tasks && tasks.map((task) => (
          <Marker
            key={task.id}
            coordinate={{ latitude: task.location.latitude, longitude: task.location.longitude }}
            title={task.name}
            description={task.description}
          />
        ))}
      </MapView>
    )
  }
  
  export default MapScreen
  