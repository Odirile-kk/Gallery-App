import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { useDispatch, useSelector } from "react-redux";
import { saveImageToGallery } from "../Redux/imagesSlice";
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import * as Location from "expo-location";
import { getCurrentLocation } from "../Services/LocationService";
import { setupDatabase, saveDataToDatabase } from "../Services/DatabaseService";

export default function CaptureScreen({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const location = useSelector((state) => state.location.location);
  const address = useSelector((state) => state.location.address);
  const dispatch = useDispatch();

  useEffect(() => {
    getCurrentLocation(dispatch);
    setupDatabase();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      //camera permission
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, [dispatch]);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      const imageURI = `${photo.uri}`;

      dispatch(saveImageToGallery(imageURI, location, address));
      // navigation.navigate({ imageURI, location, address });
      saveDataToDatabase(imageURI, JSON.stringify(location), address);
      console.log(location, address);
    }
  };

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.camera}
          type={Camera.Constants.Type.back}
        />
        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
           <MaterialCommunityIcons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  captureButton: {
    position: "absolute",
    bottom: 20,
    left: "45%",
    
  },
  toggleCameraButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
    marginTop: 10,
  },
  toggleCameraButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewGalleryButton: {
    position: "absolute",
    bottom: 20,
    left: "65%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
  },
});
