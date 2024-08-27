import axios from 'axios';
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
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { androidCameraPermission } from './permission';

const GetDocuments = () => {
  const navigation = useNavigation();
  const [update, setUpdate] = useState();
  const [getData, setGetData] = useState([]);
  const [user_email, setUser_email] = useState('');
  const [user_id, setUser_id] = useState('');
  const [user_name,setUser_name] =useState('')
  const [user_document_slect, setUser_document_slect] = useState('Select Option');
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [frontImage,setFrontImage] = useState()
  const [backImage,setBackImage] = useState()

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
        const { user_id, email,name} = updatedValue;
        
        setUser_id(user_id);
        setUser_email(email);
        setUser_name(name)
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
      console.log(`${side} image selected from camera:`, image);
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
      console.log(`${side} image selected from gallery:`, image);
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
  const data = {
    front_image: frontImage,
    back_image: backImage,
    user_document_slect,
    user_email,
    user_name,
    user_id,
  };
  console.log(data)

  const AddProduct = async () => {
    if (user_document_slect === 'Select Option') {
      setError('Please select your document name.');
    } else {
      setError('');
  
      // Create a FormData object
      const formData = new FormData();
      formData.append('front_image', {
        uri: frontImage,
        type: 'image/jpeg', // or the appropriate MIME type
        name: 'frontImage.jpg', // or the original filename
      });
      formData.append('back_image', {
        uri: backImage,
        type: 'image/jpeg', // or the appropriate MIME type
        name: 'backImage.jpg', // or the original filename
      });
      formData.append('user_document_slect', user_document_slect);
      formData.append('user_email', user_email);
      formData.append('user_name', user_name);
      formData.append('user_id', user_id);
  
      // Send the request
      axios
        .post('https://mint-legible-coyote.ngrok-free.app/documents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(() => console.log('Data will be added'))
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
    </ScrollView>
      <View>
        <Text style={styles.head2}>
          Real-time tracking of your order on the app once you place it.
        </Text>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={AddProduct} style={styles.btn}>
          <Text style={styles.btn_head}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: '#021324',
    height: '100%',
  },
  mainhead: {
    fontSize: 26,
    fontFamily: "Poppins-Regular",
    color: "#fff",
    textAlign: "center",
  },
  head1: {
    fontSize: 16,
    textAlign: 'left',
    alignItems: 'center',
    marginVertical: 10,
    color: "#FFF",
    fontFamily: "Poppins-Regular",
  },
  head2: {
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
    fontFamily: "Poppins-Regular",
    color: "#fff",
  },
  btn: {
    backgroundColor: '#FFD700',
    borderRadius: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
    marginVertical: 10,
  },
  btn_head: {
    textAlign: 'center',
    color: '#fff',
  },
  img1: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginVertical: 10,
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  dropdownContainer: {
    marginVertical: 20,
  },
  dropdownText: {
    color: "#fff",
  },
  dropdownInput: {
    color: "#fff",
  },
});

export default GetDocuments;
