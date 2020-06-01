import React, {Component } from 'react';
import { StyleSheet, Text, View, Picker, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import {TouchableOpacity, Image, style, captureButton } from 'react-native';
import { Dimensions } from 'react-native';
import Upload from './UploadConfirm.js';
import OurCancle from './CancleConfirm.js';
import { Ionicons } from '@expo/vector-icons';

export default class ConfirmPhoto extends Component {

  state={
    upConfirm: false,
    cancleConfirm: false,
    values: this.props.values,
    User: this.props.User,
    showImage: 3,
    pictureCol: this.props.pictureCol,
  }

  toggleUpConfirm = () => {
    this.setState({upConfirm: !this.state.upConfirm})
  }

  toggleCanclepConfirm = () => {
    this.setState({cancleConfirm: !this.state.cancleConfirm})
  }

  render() {
    console.log(this.state)
    if(this.state.upConfirm==false && this.state.cancleConfirm==false && this.state.showImage == 3){
      return (
        <View style={styles.container}>
          <Text style={styles.headerText}> ตรวจสอบความถูกต้อง </Text>
          <View style={styles.contentBox}>
            <View style={styles.previewBox}>
              <TouchableOpacity onPress={() => this.setState({showImage: 0})}>
                <Image
                  source={{ uri: this.props.pictureCol[0]}}
                  style={styles.preview}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({showImage: 1})}>
                <Image
                  source={{ uri: this.props.pictureCol[1]}}
                  style={styles.preview}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.previewBox}>
              <TouchableOpacity onPress={() => this.setState({showImage: 2})}>
                <Image
                  source={{ uri: this.props.pictureCol[2]}}
                  style={styles.preview}
                />
              </TouchableOpacity>
            </View>
          </View>
            
          <TouchableOpacity style={styles.cancleButton} onPress={this.toggleCanclepConfirm}>
            <Text style={styles.cancleText}> ถ่ายใหม่ทั้งหมด </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.upButton} onPress={this.toggleUpConfirm}>
            <Text style={styles.upText}> อัปโหลด </Text>
          </TouchableOpacity>
        </View>
      );
    }else{
      if(this.state.upConfirm==true){
        return <Upload values={this.state.values} User={this.state.User} onPress={this.props.onPress1} pictureCol={this.state.pictureCol}></Upload> ;
      }else if(this.state.cancleConfirm==true){
        return <OurCancle 
        onPress={this.toggleCanclepConfirm.bind(this)}
        onPress1={this.props.onPress} 
        values={this.state.values} 
        User={this.state.User}>
        </OurCancle> ;
      }else if(this.state.showImage != 3){
        num = this.state.showImage
        return(
          <View style={styles.containerShowImage}>
            <Image
              source={{ uri: this.props.pictureCol[num]}}
              style={styles.showImage}
            />
            <TouchableOpacity style={styles.buttonCloseShowImage} onPress={()=>this.setState({showImage: 3})}>
              <Ionicons name='ios-close' size={72} color="black" ></Ionicons>
            </TouchableOpacity>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: 32,
    },
    preview: {
      justifyContent: 'center',
      alignSelf: 'center',
      height: Dimensions.get('window').width/2-15,
      width: Dimensions.get('window').width/2-15,
      margin: 5,
    },
    upButton:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2699FB',
      borderRadius: 5,
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 144,
      height: 42,
    },
    cancleButton:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 5,
      position: 'absolute',
      bottom: 20,
      left: 20,
      width: 144,
      height: 42,
      borderWidth: 2,
      borderColor: 'gray',
    },
    upText:{
      color: 'white',
      fontWeight:'bold',
      fontSize: 16,
    },
    cancleText:{
      color: 'gray',
      fontWeight: 'bold',
      fontSize: 16,
    },
    loadingBox:{
      position: 'absolute',
      top: 0,
      left: 0,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      justifyContent: 'center',
    },
    headerText:{
      fontSize: 24,
      color: '#2699FB',
      alignSelf: 'center'
    },
    contentBox:{
      margin: 12,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 32,

    },
    previewBox:{
      flexDirection: 'row',
    },
    showImage:{
      position: 'absolute',
      top: 0,
      left: 0,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    },
    containerShowImage:{
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
    },
    buttonCloseShowImage:{
      position: 'absolute',
      top: 15,
      right: 10,
    }

});      