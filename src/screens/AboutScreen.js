import React from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView } from 'react-native';

const AboutScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tentang Aplikasi</Text>

      <Image
        source={require('../assets/buah.jpg')}  // Ganti dengan path gambar yang sesuai
        style={styles.appImage}
      />

      <Text style={styles.description}>
        Aplikasi ini memungkinkan Anda untuk membeli sayur segar secara mudah dan cepat.
        Anda dapat memilih sayuran atau buah yang diinginkan, menambahkannya ke keranjang, dan melanjutkan ke proses pembayaran.
      </Text>

      <Text style={styles.subHeader}>Cara Kerja Aplikasi</Text>
      <Text style={styles.description}>
        1. Pilih produk yang Anda inginkan dari daftar sayuran atau buah.
      </Text>
      <Text style={styles.description}>
        2. Tambahkan produk ke keranjang belanja Anda.
      </Text>
      <Text style={styles.description}>
        3. Lanjutkan ke halaman checkout untuk memproses pembayaran dan pengiriman.
      </Text>

      <Text style={styles.subHeader}>Pengiriman</Text>
      <Text style={styles.description}>
        Setelah pembayaran selesai, produk yang Anda pilih akan segera diproses untuk pengiriman.
        Kami bekerja sama dengan berbagai jasa pengiriman untuk memastikan produk sampai dengan aman dan tepat waktu.
      </Text>

      <Button title="Kembali ke Home" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  appImage: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#333',
  },
});

export default AboutScreen;
