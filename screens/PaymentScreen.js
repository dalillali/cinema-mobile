import React, { useState, useEffect } from "react";
import {
  Button,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  View,
  ScrollView,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";

const PaymentScreen = ({route}) => {
  const { id, cover, date, time, seatType, ticketCount } = route.params;
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState("");

  const getCostPerTicket = (seatType) => {
    switch (seatType) {
      case 'Standard':
        return 5;
      case 'VIP':
        return 7.5;
      case 'Orchestre':
        return 10;
      default:
        return 5; // Default cost if none is matched
    }
  };

  const costPerTicket = getCostPerTicket(seatType);
  const totalCost = costPerTicket * ticketCount;


  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const fetchPaymentIntent = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.1.102:8080/api/payments/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalCost*100 }),
        }
      );
      const data = await response.json();
      if (data.clientSecret) {
        return data.clientSecret;
      } else {
        Alert.alert("Error", "Failed to fetch payment intent.");
        setLoading(false);
      }
    } catch (error) {
      Alert.alert("Network Error", "Unable to connect to the server.");
      setLoading(false);
    }
  };

  const initializePaymentSheet = async () => {
    const clientSecret = await fetchPaymentIntent();
    if (!clientSecret) {
      return;
    }

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Your Cinema Name",
    });

    if (error) {
      Alert.alert("Initialization Error", error.message);
      setLoading(false);
    } else {
      setPaymentIntent(clientSecret);
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!paymentIntent) {
      Alert.alert("Error", "Payment not initialized.");
      return;
    }

    setLoading(true);
    const { error } = await presentPaymentSheet({
      clientSecret: paymentIntent,
    });

    if (error) {
      Alert.alert(`${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your payment was successful!");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
    <ScrollView  contentContainerStyle={styles.contentContainer} >
      <Image
        style={styles.featuredMovie}
        source={{ uri: cover }}
      />
      <View style={styles.infoRow}>
          <Text style={{color: '#ccc', fontSize: 18, fontWeight: 'bold'}}>Date</Text>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{date} | {time}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={{color: '#ccc', fontSize: 18, fontWeight: 'bold'}}>Type</Text>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{seatType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={{color: '#ccc', fontSize: 18, fontWeight: 'bold'}}>Cost</Text>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{`$${costPerTicket} /Ticket`}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={{color: '#ccc', fontSize: 18, fontWeight: 'bold'}}>Tickets</Text>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{ticketCount}</Text>
        </View>
        <View style={styles.separator}></View>
        <View style={styles.infoRow}>
          <Text style={{color: '#ccc', fontSize: 18, fontWeight: 'bold'}}>Total</Text>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>{`$${totalCost}`}</Text>
        </View>
      
    </ScrollView>
    <Pressable style={styles.butTicketButton} onPress={handlePayment}>
        <Text style={{ color: "#18171C", fontSize: 18, fontWeight: "600" }}>
          Pay Now
        </Text>
      </Pressable>
    </View>
  );
};

export default PaymentScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#18171C",
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 80,
  },
  butTicketButton: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#F7BB0D",
    paddingHorizontal: 20,
    paddingVertical: 12.5,
    marginBottom: 10,
    width: "80%",
    borderRadius: 12,
  },
  featuredMovie: {
    marginTop: 20,
    height: 260,
    width: 197,
    borderRadius: 8,
    marginRight: 7,
  },
  infoRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "90%",
    marginTop: 20,
  },
  separator:{
    width: "90%",
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 20,
    marginBottom: 20
  }
};
