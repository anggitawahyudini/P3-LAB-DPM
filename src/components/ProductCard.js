// src/components/ProductCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductCard = ({ product, onPressAddToCart }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>Rp {product.price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onPressAddToCart(product)}>
        <Text style={styles.buttonText}>Tambah ke Keranjang</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProductCard;
