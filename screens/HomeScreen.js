import {
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
  SectionList,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Greeting from "../components/Greeting";

const HomeScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.102:8080/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => alert(error));
  }, []);

  const sections = [
    {
      title: "Most Popular Movies",
      data: movies,
    },
    {
      title: "Action",
      data: movies,
    },
    {
      title: "Drama",
      data: movies,
    },
    {
      title: "Comedy",
      data: movies,
    },
    {
      title: "Adventure",
      data: movies,
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#18171C" />
      <Greeting />


      <SectionList
        showsVerticalScrollIndicator = {false}
        sections={sections}
        renderItem={(item) => {
          return null;
        }}
        renderSectionHeader={({ section }) => (
          <>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <FlatList
              data={section.data}
              horizontal
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => navigation.navigate("Movie", { id: item.id })}
                >
                  <Image
                    style={styles.featuredMovie}
                    source={{
                      uri: item.cover,
                    }}
                  />
                </Pressable>
              )}
            />
          </>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#18171C",
  },
  header: {
    color: "#F7BB0D",
  },
  search: {
    backgroundColor: "#28262F",
    borderRadius: 8,
    paddingVertical: 7,
    width: "95%",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 14,
    color: "white",
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  featuredMovie: {
    height: 260,
    width: 197,
    borderRadius: 8,
    marginRight: 7,
  },
});
