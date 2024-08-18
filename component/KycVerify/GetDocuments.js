import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
  SafeAreaView
} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { androidCameraPermission } from './permission';

import ImagePicker from 'react-native-image-crop-picker';
const GetDocuments = () => {
  const navigation = useNavigation()
  const [update, setUpdate] = useState();
  const [getData, setGetData] = useState([]);
  const [user_email, setUser_email] = useState('');
  const [user_id, setUser_id] = useState('');
  const [showButton, setShowButton] = useState(true);
  const [user_document_slect, setuser_document_slect] = useState();
  const [error, setError] = useState('');
  const [user_documents_img, setuser_documents_img] = useState([]);

  useEffect(() => {
    axios
      .get('https://srv416214.hstgr.cloud/register')
      .then((res) => setGetData(res.data))
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await AsyncStorage.getItem('userdata');
        setUpdate(JSON.parse(res));
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    }
  
    fetchData();
  }, []);
  
  if (update && getData) {
    // Check if update and getData are defined
    // Filter getData based on the email from update
    const updatedValue = getData.find((curelem) => curelem.email === update.email);
  
    if (updatedValue) {
      // Check if updatedValue is defined before accessing its properties
      const { id, email } = updatedValue; // Destructure id and email
  
      console.log("Filtered Data - ID:", id);
      console.log("Filtered Data - Email:", email);
  
      function abc() {
        setUser_id(id);
        setUser_email(email);
      }
  
      setTimeout(abc, 4000);
    } else {
      console.log("No matching data found for the email:", update.email);
    }
  } else {
    console.log("update or getData is undefined. Please check your data sources.");
  }
  


  
  
  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission()
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert(
        'Profile Picture',
        'Choose an option',
        [
          { text: 'Camera', onPress: onCamera },
          { text: 'Gallery', onPress: onGallery },
          { text: 'Cancel', onPress: () => { } }
        ]
      )
    }
  }

  const onCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log("selected Image", image)
      imageUpload(image.path)
      selectedImage(image.path)
     
    });
  }

  const onGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log("selected Image", image)
      imageUpload(image.path)
      setSelectedImage(image.path);
    
    });
  }
  const api = "https://srv416214.hstgr.cloud/documentsimg";
  const imageUpload = (imagePath) => {
    const randomNumber = Math.floor(Math.random() * 1000000); // You can adjust the range as needed
  
  // Get the file extension from the original image path
  const fileExtension = imagePath.split('.').pop();

  // Create the new image name by combining the random number and file extension
  const newImageName = `${randomNumber}.${fileExtension}`;
   console.log(imagePath)
   setuser_documents_img(imagePath)
    const imageData = new FormData()
    imageData.append("file", {
      uri: imagePath,
      name: newImageName,
     
      type: 'image/png'
    })
    
    axios({
      method: 'post',
      url: api,
      data: imageData
    })
      .then(function (response) {
        console.log("image upload successfully", response.data)
      }).then((error) => {
        console.log("error riased", error)
      })

  }
  

  const data1 = [
    {key: '1', value: 'Select Option'},
    {key: '2', value: 'Driving Licence'},
    {key: '3', value: 'Passport'},
  ];
  const [selectedImage, setSelectedImage] = useState();
 
  const data = {
    user_documents_img,
    user_document_slect,
    user_email,
    user_id,
  };
 
  
 
  const AddProduct = async () => {
  
    if (!user_documents_img) {
      setError('Please add Your documents Image');
    } else if (user_document_slect === 'Select Option') {
      setError('Please select your document name');
    } else if (!user_document_slect || !user_documents_img) {
      setError('Please add your document image for verification');
    } else {
      setError("")
      axios
        .post('https://srv416214.hstgr.cloud/documents', data)
        .then(res=>  navigation.navigate("AllowLocation"))
       navigation.navigate("AllowLocation")
        .catch(err => Alert.alert('Server down unexpectedly'));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.mainhead}>Add Documents</Text>
        <Text style={styles.head1}>
          Please Submit documents (driving lisence, identity card etc.)
        </Text>
        <View>
       
  
        </View>
      </View>
      <View style={{marginVertical: 20}}>
        <SelectList
          setSelected={val => setuser_document_slect(val)}
          data={data1}
          save="value"
          dropdownTextStyles={{ color: '#FFF' }}
        />
      </View>
      <View>
        <Text style={styles.head2}>
          Real Time tracking of your on the app once you placed the order{' '}
        </Text>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => AddProduct()} style={styles.btn}>
          <Text style={styles.btn_head}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default GetDocuments;
const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 10,
    backgroundColor: '#021324',
    height: '100%'
  },
  mainhead:{
    fontSize: 26,
    fontFamily: "Poppins-Regular",
    color: "#fff",
    textAlign: "center"
  },
  head1: {
    fontSize: 16,
    textAlign: 'left',
    alignItems: 'center',
    marginVertical: 20,
    color :"#FFF",
    fontFamily: "Poppins-Regular"
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
    width: 'auto',
    resizeMode: 'cover',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
});