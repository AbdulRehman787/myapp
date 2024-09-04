import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
  ScrollView
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from './permission';

const GetDocuments = () => {
  const [update, setUpdate] = useState();
  const [getData, setGetData] = useState([]);
  const [user_email, setUser_email] = useState('');
  const [user_id, setUser_id] = useState('');
  const [user_name, setUser_name] = useState('');
  const [user_document_slect, setUser_document_slect] = useState('Select Option');
  const [error, setError] = useState('');
  const [frontImage, setFrontImage] = useState();
  const [backImage, setBackImage] = useState();

  useEffect(() => {
    axios
      .get('https://mint-legible-coyote.ngrok-free.app/signup')
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await AsyncStorage.getItem('UserData');
        setUpdate(JSON.parse(res));
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (update && getData) {
      const updatedValue = getData.find((curelem) => curelem.email === update.email);
      if (updatedValue) {
        const { user_id, email, name } = updatedValue;
        setUser_id(user_id);
        setUser_email(email);
        setUser_name(name);
      }
    }
  }, [update, getData]);

  const onSelectImage = async (side) => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS === 'ios') {
      Alert.alert(
        'Select Image',
        'Choose an option',
        [
          { text: 'Camera', onPress: () => openCamera(side) },
          { text: 'Gallery', onPress: () => openGallery(side) },
          { text: 'Cancel', onPress: () => {} }
        ]
      );
    }
  };

  const openCamera = (side) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (side === 'front') {
        setFrontImage(image.path);
      } else {
        setBackImage(image.path);
      }
    }).catch(err => console.log(err));
  };

  const openGallery = (side) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      if (side === 'front') {
        setFrontImage(image.path);
      } else {
        setBackImage(image.path);
      }
    }).catch(err => console.log(err));
  };

  const data1 = [
    { key: '1', value: 'Select Option' },
    { key: '2', value: 'Driving Licence' },
    { key: '3', value: 'Passport' },
    { key: '4', value: 'National Id Card' },
  ];

  const AddProduct = async () => {
    if (user_document_slect === 'Select Option') {
      setError('Please select your document name.');
    } else {
      setError('');

      const formData = new FormData();
      if (frontImage) {
        formData.append('front_image', {
          uri: frontImage,
          type: 'image/jpeg',
          name: 'frontImage.jpg',
        });
      }
      if (backImage) {
        formData.append('back_image', {
          uri: backImage,
          type: 'image/jpeg',
          name: 'backImage.jpg',
        });
      }
      formData.append('user_document_slect', user_document_slect);
      formData.append('user_email', user_email);
      formData.append('user_name', user_name);
      formData.append('user_id', user_id);

      axios
        .post('https://mint-legible-coyote.ngrok-free.app/documents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => {
          Alert.alert('Success', 'Documents uploaded successfully!');
        })
        .catch((err) => {
          console.error(err);
          Alert.alert('Server down unexpectedly');
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.mainhead}>Add Documents</Text>
        <Text style={styles.head1}>
          Please submit documents (driving license, identity card, etc.)
        </Text>
      </View>

      <View style={styles.dropdownContainer}>
        <SelectList
          setSelected={val => setUser_document_slect(val)}
          data={data1}
          save="value"
          dropdownTextStyles={styles.dropdownText}
          inputStyles={styles.dropdownInput}
        />
      </View>
      <ScrollView>
        <View>
          <Text style={styles.label}>Front Image:</Text>
          <TouchableOpacity onPress={() => onSelectImage('front')}>
            {frontImage ? (
              <Image source={{ uri: frontImage }} style={styles.img1} />
            ) : (
              <Image
                style={styles.img1}
                source={require('../../assets/images/verify.jpg')}
              />
            )}
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.label}>Back Image:</Text>
          <TouchableOpacity onPress={() => onSelectImage('back')}>
            {backImage ? (
              <Image source={{ uri: backImage }} style={styles.img1} />
            ) : (
              <Image
                style={styles.img1}
                source={require('../../assets/images/verify.jpg')}
              />
            )}
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={AddProduct}>
          <Text style={styles.btnText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  mainhead: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  head1: {
    fontSize: 16,
    marginVertical: 10,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownText: {
    color: '#000',
  },
  dropdownInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  img1: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#ffd700',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginVertical: 10,
  },
});

export default GetDocuments;
