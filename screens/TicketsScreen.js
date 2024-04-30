import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, FlatList, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import QRCode from 'react-native-qrcode-svg';

const DATA = [
  {
    id: '1',
    title: 'Dune: Part Two',
    cover: "https://moviecovers.com/DATA/zipcache/DUNE%20%20%20DEUXIEME%20PARTIE%20(2024).jpg",
    minAge: 13,
    rating: 8.8,
    time: "2h 57m",
    type: "VIP",
    movieDate:'10 Sep 2024',
    movieTime: '11:30',
    cost: '75 MAD'
  },
  {
    id: '2',
    title: 'Inception',
    cover: "https://moviecovers.com/DATA/zipcache/INCEPTION%20(2010).jpg",
    minAge: 13,
    rating: 8.8,
    time: "2h 57m",
    type: "Standard",
    movieDate:'10 Sep 2024',
    movieTime: '11:30',
    cost: '75 MAD'
  },
  {
    id: '4',
    title: 'Interstellar',
    cover: "https://moviecovers.com/DATA/zipcache/INTERSTELLAR%20(2014).jpg",
    minAge: 13,
    rating: 8.6,
    time: "2h 57m",
    type: "Orchestre",
    movieDate:'10 Sep 2024',
    movieTime: '11:30',
    cost: '75 MAD'

  },
  {
    id: '5',
    title: 'Blade Runner 2049',
    cover: "https://moviecovers.com/DATA/zipcache/BLADE%20RUNNER%202049%20(2017).jpg",
    minAge: 15,
    rating: 8.0,
    time: "2h 57m",
    type: "Orchestre",
    movieDate:'10 Sep 2024',
    movieTime: '11:30',
    cost: '75 MAD'
  },
];

const Item = ({ movie, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={() => onPress(movie)}>
    <Image source={{ uri: movie.cover }} style={styles.cover} />
    <View style={styles.info}>
      <View style={{flex: 1, justifyContent: 'space-evenly'}}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.timeAndAge}>
          <Text style={styles.details}>{movie.time}</Text>
          <Ionicons name="ellipse" size={5} color="#F7BB0D" style={{marginHorizontal: 10}}/>
          <Text style={styles.details}>PG-{movie.minAge}</Text>
        </View>
        <Text style={styles.details}><Ionicons name="star" size={13} color="#F7BB0D" style={{marginHorizontal: 10}}/> {movie.rating}/10</Text>
      </View>
      
    </View>
    <View style={styles.qrCodeIcon}>
      <Ionicons name="qr-code-outline" size={30} color="#F7BB0D" />
    </View>
  </TouchableOpacity>
);

const TicketsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [tickets, setTickets] = useState([]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  useEffect(() => {
    fetch("http://192.168.1.102:8080/user/reservations")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => alert(error));
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Tickets</Text>
      <FlatList
      showsVerticalScrollIndicator = {false}
        data={DATA}
        renderItem={({ item }) => <Item movie={item} onPress={openModal} />}
        keyExtractor={item => item.id}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedMovie && (
              <>
                <Image source={{ uri: selectedMovie.cover }} style={styles.modalCover} />
                <Text style={styles.modalTitle}>{selectedMovie.title}</Text>
                <View style={styles.modalTicketInfos}>
                  <View style={styles.modalDateAndCost}>
                    <Text style={styles.modalText}><Text style={styles.modalTextTitle}>Date:</Text> {selectedMovie.movieDate}</Text>
                    <Text style={styles.modalText}><Text style={styles.modalTextTitle}>Cost:</Text> {selectedMovie.cost}</Text>
                  </View>
                  <View style={styles.modalDateAndCost}>
                    <Text style={styles.modalText}><Text style={styles.modalTextTitle}>Time:</Text> {selectedMovie.movieTime}</Text>
                    <Text style={styles.modalText}><Text style={styles.modalTextTitle}>Type:</Text> {selectedMovie.type}</Text>
                  </View>
                </View>
                <QRCode value={JSON.stringify({
                      id: selectedMovie.id,
                      title: selectedMovie.title,
                      releaseDate: selectedMovie.releaseDate
                    })} 
                    size={125} 
                    style={styles.qrCode}
                    backgroundColor='transparent'
                    color='white'
                />
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={closeModal}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18171C'
  },
  headerText: {
    color: "#F7BB0D",
    fontWeight: 'bold',
    fontSize: 35,
    paddingTop: 30,
    paddingBottom: 10,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#28262F',

  },
  item: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#232226',

  },
  cover: {
    width: 120,
    height: 170,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: 10,
  },
  modalCover:{
    alignSelf: 'center',
    width: 120,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  timeAndAge:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    color: "white",
    fontSize: 14,
  },
  qrCodeIcon:{
    marginRight: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: "80%",
    alignItems: "center",
    margin: 10,
    backgroundColor: "#474f54",
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 15,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity:  4,
    shadowRadius: 5,
    elevation: 50
  },
  modalTitle: {
    color: 'white',
    alignSelf: 'center',
    marginBottom: 15,
    fontSize: 24,
    fontWeight: 'bold'
  },
  modalTicketInfos:{
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    width: "100%",
    flexDirection: 'row',
  },
  modalDateAndCost:{
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  modalText: {
    color: 'white',
    marginBottom: 15,  
    fontSize: 16,
  },
  modalTextTitle:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  qrCode:{
    borderRadius: 10,
    marginVertical: 20,
    
  },
  button: {
    borderRadius: 20,
    margin: 10,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#F7BB0D",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default TicketsScreen;
