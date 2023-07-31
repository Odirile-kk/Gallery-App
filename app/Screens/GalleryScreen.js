import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  Text,

} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useNavigation } from "expo-router";
import { getAllDataFromDatabase, deleteDataFromDatabase  } from "../Services/DatabaseService";
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const GalleryScreen = () => {
  const nav = useNavigation();
  const [images, setImages] = useState([]);
  // const images = useSelector((state) => state.images);
  const [selectedImage, setSelectedImage] = useState(null);

  useFocusEffect(() => {
    // getAllDataFromDatabase((data) => setImages(data.map((item) => item.uri)));
    getAllDataFromDatabase((data) => setImages(data));
  });

  const handleImageTap = (item) => {
    setSelectedImage(item);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  
  const handleDelete = () => {
    if (selectedImage) {
      deleteDataFromDatabase(selectedImage.id, () => {
        // After deletion, fetch the updated data from the database
        getAllDataFromDatabase((data) => setImages(data));
        closeModal(); // Close the modal after deletion
      });
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => handleImageTap(item)}
        // onPress={() => nav.navigate("Info", { location: item.location, address: item.address })}
      >
        <Image source={{ uri: item.uri }} style={styles.thumbnail} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={3}
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
      {/*Image enlarge */}
      {selectedImage && (
        <Modal visible={true} transparent={true} onRequestClose={closeModal}>
          <TouchableOpacity style={styles.modalBackground} onPress={closeModal}>
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.enlargedImage}
            />
            <Text style={{ color: "white" }}>
              Taken at: 
               {selectedImage.address}
            </Text>
            <MaterialCommunityIcons name="delete" size={30} color="white" onPress={handleDelete}/>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#c9b09a",
  },
  imageContainer: {
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    // width: '40%',
    // height: '80%'
  },
  thumbnail: {
    width: 120,
    height: 140,
    marginLeft: 10,
    //  marginRight: 5,
    marginTop: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  enlargedImage: {
    width: "80%",
    height: "70%",
  },
});

export default GalleryScreen;
