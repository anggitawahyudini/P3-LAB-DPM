import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CartScreen = ({ route, navigation }) => {
  const { cartItems } = route.params;

  // Function to calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Adding useEffect for logging when the screen is mounted
  useEffect(() => {
    console.log("CartScreen is mounted");
    
    // Optionally return a cleanup function if needed
    return () => {
      console.log("CartScreen is unmounted");
    };
  }, []); // Empty dependency array means it runs only once when the component is mounted

  return (
    <View style={styles.container}>
      <Text style={styles.cartTitle}>Keranjang Belanja</Text>
      
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>Rp {item.price} x {item.quantity}</Text>
              <Text style={styles.itemTotal}>Total: Rp {item.price * item.quantity}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalPrice}>Total Harga: Rp {getTotalPrice()}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F6F8',
    flex: 1,
  },
  cartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  itemImage: {
    width: 200,
    height: 180,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#777',
  },
  itemTotal: {
    fontSize: 16,
    color: '#007BFF',
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CartScreen;
