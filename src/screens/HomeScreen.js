import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import ProductCard from '../components/ProductCard';

// Menggunakan objek untuk gambar lokal
const images = {
  tomato: require('../assets/tomato.png'),
  carrot: require('../assets/carrot.png'),
  apple: require('../assets/apple.png'),
  spinach: require('../assets/bayam.png'),
  banana: require('../assets/pisang.png'),
  alpukat: require('../assets/alpukat.jpg'),
  nanas: require('../assets/nanas.jpg'),
  brokoli: require('../assets/brokoli.jpg')
};

const HomeScreen = ({ navigation }) => {
  const [vegetables, setVegetables] = useState([]);
  const [fruits, setFruits] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [productQuantities, setProductQuantities] = useState({});

  // useEffect pertama untuk data produk (sayuran & buah)
  useEffect(() => {
    setVegetables([
      { id: '1', name: 'Tomat', price: 5000, image: images.tomato },
      { id: '2', name: 'Wortel', price: 7000, image: images.carrot },
      { id: '3', name: 'Bayam', price: 4000, image: images.spinach },
      { id: '4', name: 'Brokoli', price: 9000, image: images.brokoli },
    ]);
    setFruits([
      { id: '4', name: 'Apel', price: 8000, image: images.apple },
      { id: '5', name: 'Pisang', price: 6000, image: images.banana },
      { id: '6', name: 'alpukat', price: 10000, image: images.alpukat },
      { id: '7', name: 'nanas', price: 4000, image: images.nanas },
    ]);
  }, []); // This will only run once when the component mounts

  // useEffect tambahan untuk menangani lifecycle logging
  useEffect(() => {
    console.log("HomeScreen component is mounted");
    
    return () => {
      console.log("HomeScreen component is unmounted");
    };
  }, []); // Run only once when component is mounted and cleanup on unmount

  const increaseQuantity = (productId) => {
    setProductQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const decreaseQuantity = (productId) => {
    setProductQuantities(prev => {
      const currentQuantity = prev[productId] || 0;
      return {
        ...prev,
        [productId]: currentQuantity > 1 ? currentQuantity - 1 : 0
      };
    });
  };

  const addToCart = (item) => {
    const quantity = productQuantities[item.id] || 1;
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Jika item sudah ada di keranjang, update jumlahnya
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        // Jika item belum ada di keranjang, tambahkan dengan jumlah yang dipilih
        return [...prevCart, { ...item, quantity }];
      }
    });

    // Reset kuantitas setelah ditambahkan ke keranjang
    setProductQuantities(prev => ({
      ...prev,
      [item.id]: 1
    }));
  };

  const filterProducts = (products) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Rp {item.price}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => decreaseQuantity(item.id)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>
          {productQuantities[item.id] || 1}
        </Text>
        <TouchableOpacity
          onPress={() => increaseQuantity(item.id)}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addToCartButtonText}>Tambah ke Keranjang</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Cari produk..."
        value={search}
        onChangeText={setSearch}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.categoryTitle}>Sayuran</Text>
        <FlatList
          data={filterProducts(vegetables)}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderProductItem}
          contentContainerStyle={styles.productList}
        />
        <Text style={styles.categoryTitle}>Buah</Text>
        <FlatList
          data={filterProducts(fruits)}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderProductItem}
          contentContainerStyle={styles.productList}
        />
      </ScrollView>
      <View style={styles.navButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('About')}
        >
          <Text style={styles.navButtonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('Cart', { cartItems: cart })}
        >
          <Text style={styles.navButtonText}>
            Keranjang ({cart.reduce((total, item) => total + item.quantity, 0)})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3E0',
    padding: 20,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 15,
    paddingLeft: 10,
  },
  productList: {
    paddingHorizontal: 10,
  },
  productContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    alignItems: 'center',
    width: 240,
    marginHorizontal: 10,
  },
  productImage: {
    width: 200,
    height: 180,
    borderRadius: 25,
    marginBottom: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  quantityButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FAF3E0',
    paddingVertical: 10,
  },
  navButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default HomeScreen;
