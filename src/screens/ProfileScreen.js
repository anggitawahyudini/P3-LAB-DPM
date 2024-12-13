import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: 'anggita',
    email: 'gita@example.com',
    address: 'Jl. Raya No. 1',
    phone: '+62 123 456 789',
    imageUri: require('../assets/profile.jpg'), // Gambar lokal
  });

  useEffect(() => {
    // Simulasi pemuatan data profil
    const fetchProfileData = async () => {
      console.log('Fetching profile data...');
      const fetchedData = {
        name: 'anggita',
        email: 'gita@example.com',
        address: 'Jl. Baru No. 2',
        phone: '+62 987 654 321',
        imageUri: require('../assets/profile.jpg'), // Gambar lokal
      };
      setTimeout(() => setProfile(fetchedData), 2000); // Simulasi delay
    };

    fetchProfileData();

    return () => {
      console.log('Cleaning up effects...');
      // Tambahkan logika pembersihan jika diperlukan
    };
  }, []); // [] memastikan ini hanya dijalankan sekali saat komponen dimuat

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {/* Profile Image */}
          <Image
            source={profile.imageUri} // Cukup pakai imageUri untuk gambar lokal
            style={styles.profileImage}
          />

          {/* Button Edit Profil and Pengaturan */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => alert('Edit Profile')}>
              <Text style={styles.editButtonText}>Edit Profil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingsButton} onPress={() => alert('Settings')}>
              <Text style={styles.settingsButtonText}>Pengaturan</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Name */}
        <Text style={styles.profileName}>{profile.name}</Text>

        {/* Profile Information */}
        <View style={styles.infoContainer}>
          <Text style={styles.profileInfo}><Text style={styles.infoLabel}>Email: </Text>{profile.email}</Text>
          <Text style={styles.profileInfo}><Text style={styles.infoLabel}>Alamat: </Text>{profile.address}</Text>
          <Text style={styles.profileInfo}><Text style={styles.infoLabel}>Telepon: </Text>{profile.phone}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F4F6F8',
    paddingVertical: 20,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  buttonContainer: {
    flexDirection: 'row', // Menempatkan tombol di samping
    alignItems: 'center', // Agar tombol sejajar secara vertikal
    marginLeft: 20, // Memberikan sedikit jarak dari gambar
  },
  editButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10, // Memberikan jarak antar tombol
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  settingsButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  settingsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },
  profileInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProfileScreen;
