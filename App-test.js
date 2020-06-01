import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Keyboard, TouchableWithoutFeedback, TouchableOpacity , TouchableHighlight  } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment';

const DismissKeyboard = ({ children}) => (
  <TouchableWithoutFeedback onPress={() =>  Keyboard.dismiss()} >
    {children}
  </TouchableWithoutFeedback>
);

class App extends Component {

  state = {
    title: '',
    content: '',
    image: null
  };

  handleChange = (e) => {
    this.setState({
      title:e,
      content:e
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };


  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('image', '/media/post_images/images_vmlARAq.png', '555555');
    form_data.append('title', this.state.title);
    form_data.append('content', this.state.content);
    let url = 'http://localhost:8000/api/posts/';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err))
  };

  render() {
      return (
        <DismissKeyboard>
        <View style={styles.container}>
            <Text style={styles.header}>กรอกสิเว้ยยยยย</Text>
            <View style={styles.elementsContainer}>

               

                <Text style={styles.subheader}>ชื่อ</Text>
                <TextInput 
                          style={styles.textinput} 
                          placeholder='ชื่อ' 
                          returnKeyType="next" 
                          onChangeText={this.handleChange}
                          defaultValue={this.state.title}
                          autoCorrect={false}
                />

                 <Text style={styles.subheader}>vbvb</Text>
                <TextInput 
                          style={styles.textinput} 
                          placeholder='อะไรก้ได้' 
                          returnKeyType="next" 
                          onChangeText={this.handleChange}
                          defaultValue={this.state.content}
                          autoCorrect={false}
                />


            </View>
            <View style={styles.btntap}>
               
                <Button 
                  title="ถัดไป"
                  onPress={this.handleSubmit}
                  color="#2874A6"
                  buttonStyle={{width: 150}}
                  icon={
                    <Icon
                        name="arrow-right"
                        size={15}
                        color="white"
                    />
                  }
                  iconRight
                />
            </View>
        </View>
        </DismissKeyboard>
    );
  }

}
export default  App;

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#2699FB',
},
header: {
  marginTop: 48,
  fontSize: 24,
  textAlign: 'center',
  fontWeight: '100',
  marginBottom: 24,
  color: '#fff',
},
elementsContainer: {
  flex: 1, 
  backgroundColor: '#fff',
  flexDirection: 'column',
  marginLeft: 24,
  marginRight: 24,
  marginBottom: 20,
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10,
  borderRadius: 15,
},
subheader: {
  fontSize: 16,
  fontWeight: '100',
  marginBottom: 10,
  color: '#2874A6',
},
textinput: {
  fontSize: 16,
  fontWeight: '100',
  // marginBottom: 20,
  borderWidth: 1,
  borderColor: '#ecf5fd',
  paddingLeft: 5,
  borderRadius: 10,
  height: 40,
},
formpicker: {
  marginTop: -30,
  marginBottom: 10,
  width: 150,
},
btntap: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: 10,
  marginLeft: 24,
  marginRight: 24,
},
backBtn: {
  backgroundColor: '#ffffff',
  borderColor: '#2874A6',
},
error: {
  fontSize: 14,
  color: 'red',
  marginBottom: 10,
}
});

