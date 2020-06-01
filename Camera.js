import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Button, style, captureButton } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Dimensions } from 'react-native'
import { Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Confirmphoto from './Confirmphoto.js'
import { Ionicons, MaterialIcons, Foundation, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import isIPhoneX from 'react-native-is-iphonex';


const landmarkSize = 2;

export default class CameraExample extends React.Component {
  constructor(props){
    super(props);
    canSnap = false;
    order = 'straight',
    pictureCol = [];
    picNum = 0
    textMessage = 'กรุณาหันหน้าตรง';
  }

  state = {
    permissionsGranted: null,
    type: 'front',
    faces: [],
    path: null, // store uri of photo
    User: this.props.User,
    values: this.props.values,
    isComplete: false // whether finish in every photo
  };

  backFromResult = () => {
    canSnap = false;
    order = 'straight';
    pictureCol = [];
    picNum = 0;
    this.setState({
      path: null ,isComplete: false});
  }

  toggleFacing = () => this.setState({ type: this.state.type === 'back' ? 'front' : 'back' });

  onFacesDetected = ({ faces }) => this.setState({ faces });
  onFaceDetectionError = state => console.warn('Faces detection error:', state);

  back = e => {
    e.preventDefault();
    this.props.onPress();
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
    this.showAlert();
  }

  showAlert = () => {
    Alert.alert(  
      'คำเตือน',  
      'แฟลชจะเปิดอัตโนมัติเมื่อกดถ่ายรูป\nโปรดระวัง',  
      [  
          {text: 'ตกลง', onPress: () => console.log('OK Pressed')},  
      ]  
    );  
  }

  renderNoPermissions = () =>
    <View style={styles.noPermissions}>
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>


  renderCamera = () =>
    (
      <View style={{ flex: 1 }}>
        <Camera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.camera}
          type = {this.state.type}
          onMountError={this.handleMountError}
          onFacesDetected={this.onFacesDetected}
          onFaceDetectionError={this.onFaceDetectionError}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.accurate,
            detectLandmarks: FaceDetector.Constants.Landmarks.all,
            runClassifications: FaceDetector.Constants.Classifications.none,
            minDetectionInterval: 100,
            tracking: true,
          }}
          ratio={'16:9'}
          flashMode={Camera.Constants.FlashMode.on}
        >
          {this.renderTopBar()}
          {this.renderSecondTopBar()}
          {this.renderMarks()}
          {this.renderBottomBar()}
        </Camera>
        {this.renderFaces()}
        {this.renderLandmarks()}
      </View>
    );


  renderTopBar = () => 
  {    
    if (this.state.type === 'front' || this.state.type === 2){
      switch(order){
        case 'straight' : scr = require('./Images/head-1.png'); break;
        case 'left' : scr = require('./Images/head-3.png'); break;
        case 'right' : scr = require('./Images/head-2.png'); break;
      }
    } else if (this.state.type === 'back') {
      switch(order){
        case 'straight' : scr = require('./Images/head-1.png'); break;
        case 'left' : scr = require('./Images/head-2.png'); break;
        case 'right' : scr = require('./Images/head-3.png'); break;
      }
    }
    return (
      <View style={styles.topBar}> 
        <TouchableOpacity style={styles.backBotton} onPress={this.back} >
            <MaterialIcons name="arrow-back" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.smileFace} >     
          <Image source={scr} style={styles.icon}></Image>
          {/* {<MaterialIcons name = {facePic} size={60} color={canSnap ? "green" : "red"} />} */}
        </TouchableOpacity>
      </View>
    );
  }

  renderSecondTopBar = () => 
    <View style={styles.secondBar}>      
        <Text  style ={styles.textMessage}> 
          {textMessage}
          {/* {text} */}
        </Text> 
    </View>
  
  renderMarks = () => {
    if (this.state.type === 'front' || this.state.type === 2){
      switch(order){
        case 'straight' : path = require('./Images/facemask-1.png'); break;
        case 'left' : path = require('./Images/facemask-2.png'); break;
        case 'right' : path = require('./Images/facemask-3.png'); break;
      }
    } else if (this.state.type === 'back') {
      switch(order){
        case 'straight' : path = require('./Images/facemask-1.png'); break;
        case 'left' : path = require('./Images/facemask-3.png'); break;
        case 'right' : path = require('./Images/facemask-2.png'); break;
      }
    }

    return (
        <View style={styles.maskBar}>
          <Image source={path} resizeMode='contain' style={styles.mask} />
        </View>
    );
  }

  renderBottomBar = () =>
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.bottomButton} >
      </TouchableOpacity>
      <View style={{ flex: 0.4}}>
        <TouchableOpacity 
          style={{ alignSelf: 'center' }}
          disabled={!canSnap}
          onPress={this.snapPhoto.bind(this)}>
          <Ionicons name="ios-radio-button-on" size={70} color={canSnap ? "white" : "transparent"} />
        </TouchableOpacity>  
      </View>
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={this.toggleFacing}>
        <Ionicons name="ios-reverse-camera" size={50} color="white" />
      </TouchableOpacity>
    </View>


  renderFace({faceID, bounds, rollAngle, yawAngle }) 
  { 
    
    if( order == 'straight') {
      if (rollAngle >-5 && rollAngle <5 && yawAngle >-5 && yawAngle < 5) {
        textMessage = 'กรุณากดถ่าย'
        canSnap = true
      } else if(yawAngle >350 && yawAngle <= 360){ 
        if (rollAngle >350 && rollAngle <=360 || rollAngle >-5 && rollAngle <5){
          textMessage = 'กรุณากดถ่าย'
          canSnap = true
        } else {
          textMessage = 'กรุณาหันหน้าตรง'
          canSnap = false
        }
      } else if(yawAngle > -5 && yawAngle <= 5 && rollAngle >350 && rollAngle <=360 ){  
        textMessage = 'กรุณากดถ่าย'
        canSnap = true
      } else {
        textMessage = 'กรุณาหันหน้าตรง'
        canSnap = false
      }   
    } else if (order == 'left') {
      if (this.type === 'front' || this.type == 2) {
        if(rollAngle > -5 && rollAngle < 5 && yawAngle > -50 && yawAngle < -40) {
          textMessage = 'กรุณากดถ่าย'
          canSnap = true
        } else if (rollAngle > -5 && rollAngle < 5 && yawAngle >= 310 && yawAngle <= 325 ) {
          textMessage = 'กรุณากดถ่าย'
          canSnap = true
        } 
        else if(yawAngle < -50 || (yawAngle < 310 && yawAngle > 300)){
          textMessage = 'กรุณาหันขวาอีก'
          canSnap = false
        } 
        else if((yawAngle > -40 && yawAngle < 0) || (yawAngle > 325 && yawAngle > 300)) {
            textMessage = 'กรุณาหันซ้ายอีก'
            canSnap = false
        } 
        else if(rollAngle > 5 && rollAngle < 100) {
            textMessage = 'กรุณาก้มหน้าลง'
            canSnap = false
        } 
        else if(rollAngle < -5 ) {
            textMessage = 'กรุณาเงยหน้าขึ้น'
            canSnap = false
        } 
      } else if (this.type === 'back'){
        if(rollAngle > -5 && rollAngle < 5 && yawAngle > 40 && yawAngle < 50) {
          textMessage = 'กรุณากดถ่าย'
          canSnap = true
        } else if(rollAngle > 350 && rollAngle <= 360 && yawAngle > 40 && yawAngle < 50) {
          textMessage = 'กรุณากดถ่าย'
          canSnap = true
        }else if(yawAngle > 50){
          textMessage = 'กรุณาหันขวาอีก'
          canSnap = false
        } else if(yawAngle < 40) {
            textMessage = 'กรุณาหันซ้ายอีก'
            canSnap = false
        } else if(rollAngle > 5 && rollAngle < 300 ) {
            textMessage = 'กรุณาเงยหน้าขึ้น'
            canSnap = false
        } else if(rollAngle < -5 || (rollAngle > 330 && rollAngle < 350)) {
            textMessage = 'กรุณาก้มหน้าลง'
            canSnap = false
        }  
      }
    } else if (order == 'right')
    {
      if (this.type === 'front' || this.type == 2) {
        if(rollAngle >-5 && rollAngle <5 && yawAngle > 40 && yawAngle < 50) {
          textMessage = 'กรุณากดถ่าย'
          canSnap = true
        } else if(rollAngle >350 && rollAngle <= 360 && yawAngle > 40 && yawAngle < 50){
          textMessage = 'กรุณากดถ่าย'
          canSnap = true
        } else if((yawAngle > 50 && yawAngle < 100)) {
            textMessage = 'กรุณาหันซ้ายอีก'
            canSnap = false
        } else if(yawAngle < 40 || yawAngle > 300) {
            textMessage = 'กรุณาหันขวาอีก' 
            canSnap = false
        }  else if(rollAngle > 5 && rollAngle <100) {
            textMessage = 'กรุณาเงยหน้าขึ้น'
            canSnap = false
        } else if(rollAngle <-5 || rollAngle > 300) {
            textMessage = 'กรุณาก้มหน้าลง'
            canSnap = false
        }
      } else if (this.type === 'back'){
        if(yawAngle < -50) {
          textMessage = 'กรุณาหันซ้ายอีก'
          canSnap = false
        } else if(yawAngle > -40) {
            textMessage = 'กรุณาหันขวาอีก' 
            canSnap = false
        } else if(rollAngle >-5 && rollAngle <5 && yawAngle > -50 && yawAngle < -40) {
            textMessage = 'กรุณากดถ่าย'
            canSnap = true
        } else if(rollAngle > 5) {
            textMessage = 'กรุณาก้มหน้าลง'
            canSnap = false
        } else if(rollAngle <-5) {
            textMessage = 'กรุณาเงยหน้าขึ้น'
            canSnap = false
        }
      }
    } else {
      canSnap = false
    }
  
    return (
      // <View
      //   key={faceID}
      //   transform={[
      //     { perspective: 600 },
      //     { rotateZ: `${rollAngle.toFixed(0)}deg` },
      //     { rotateY: `${yawAngle.toFixed(0)}deg` },
      //   ]}
      //   style={[
      //     styles.face,
      //     {
      //       ...bounds.size,
      //       left: bounds.origin.x,
      //       top: bounds.origin.y,
      //     },
      //   ]}>
      //   <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
      //   <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
      // </View>
      <View key={faceID}></View>
    );
  }
    

  renderLandmarksOfFace(face) {
    const renderLandmark = position =>
      position && (
        <View
          style={[
            styles.landmark,
            {
              left: position.x - landmarkSize / 2,
              top: position.y - landmarkSize / 2,
            },
          ]}
        />
      );
      return (
        // <View key={`landmarks-${face.faceID}`}>
        //   {renderLandmark(face.leftEyePosition)}
        //   {renderLandmark(face.rightEyePosition)}
        //   {renderLandmark(face.leftEarPosition)}
        //   {renderLandmark(face.rightEarPosition)}
        //   {renderLandmark(face.leftCheekPosition)}
        //   {renderLandmark(face.rightCheekPosition)}
        //   {renderLandmark(face.leftMouthPosition)}
        //   {renderLandmark(face.mouthPosition)}
        //   {renderLandmark(face.rightMouthPosition)}
        //   {renderLandmark(face.noseBasePosition)}
        //   {renderLandmark(face.bottomMouthPosition)}
        // </View>
        <View key={`landmarks-${face.faceID}`}></View>
      );
  }

  renderFaces = () => {
    return (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace, {type: this.state.type})}
    </View>
    );
  }

  renderLandmarks = () =>
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderLandmarksOfFace)}
    </View>

  async snapPhoto() {
      // console.log(this.state.faces);

      if (this.camera) { 
        console.log('Taking photo');
        const data = await this.camera.takePictureAsync();
        this.setState({ path: data.uri });
      }
    
  }
  
  render() {
    // ถ้าถ่ายครบ 3 รูป
    if (this.state.isComplete) {
      return <Confirmphoto 
                pictureCol={pictureCol} 
                onPress={this.backFromResult} 
                values={this.state.values} 
                User={this.state.User} 
                onPress1={this.backFromResult&&this.props.onPress1}>  
              </Confirmphoto>
    }

    if (this.state.path == null) {
      const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
      const content = cameraScreenContent;

      return (
        <View style={styles.container}>
          {content}
        </View>
      );
    } 
    else {
      // show a photo when press takePhoto button
      return (
        <View style={styles.container}>
          <Image
            source={{ uri: this.state.path }}
            style={styles.preview}
          />
          <TouchableOpacity 
              style={styles.cancleButton} 
              onPress={() => { 
                { this.setState({ path: null }) };
              }}
          >
            <Text style={styles.cancleText}> ถ่ายใหม่ </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.upButton} 
            onPress={() => {
              { pictureCol[picNum] = this.state.path }
              { console.log('picNum: ' + picNum) } 
              { picNum = picNum + 1 }    
              { if (picNum == 3) {
                this.setState({ isComplete: true });
              }}
              {
                switch(order){
                  case 'straight' : order = 'left'; break;
                  case 'left' : order = 'right' ; break;
                  case 'right' : order = 'right' ; break;
                }
              }
              { this.setState({ path: null }) }
            }}
          >
            <Text style={styles.upText}> ต่อไป </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,    
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
  topBar: {
    flex: 1.1, 
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  secondBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems:'center', 
  },
  maskBar: {
    flex: 5.1,
    backgroundColor: 'transparent',
    alignItems:'center', 
  },
  mask: {
    height: isIPhoneX ? Dimensions.get('window').height -300 : Dimensions.get('window').height -210 , 
    width: Dimensions.get('window').width - 20,
    marginTop: isIPhoneX ? 50 : 20,
  },
  bottomBar: {
    //paddingTop: isIPhoneX ? 500 : 350,
    paddingBottom: isIPhoneX ? 10 : 5,
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    flex: 0.7,
    flexDirection: 'row',
  },
  noPermissions: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    padding: 10,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  smileFace: {
    marginTop: 40,
    marginLeft: 110,
  },
  backBotton: {
    marginTop: 50,
    marginLeft: 5,
  },
  textToggleButton: {
    paddingLeft: 25,
    flex: 0.25,
    height: 50,
    marginHorizontal: 2,
    marginBottom: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoFocusLabel: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  bottomButton: {
    height: 58, 
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
  
  newPhotosDot: {
    position: 'absolute',
    top: 0,
    right: -5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4630EB'
  },
  options: {
    position: 'absolute',
    bottom: 80,
    left: 30,
    width: 200,
    height: 160,
    backgroundColor: '#000000BA',
    borderRadius: 4,
    padding: 10,
  },
  detectors: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pictureQualityLabel: {
    fontSize: 10,
    marginVertical: 3, 
    color: 'white'
  },
  pictureSizeContainer: {
    flex: 0.5,
    alignItems: 'center',
    paddingTop: 10,
  },
  pictureSizeChooser: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  pictureSizeLabel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  face: {
    padding: 10,
    borderWidth: 2,
    borderRadius: 2,
    position: 'absolute',
    borderColor: '#FFD700',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  cancel: {
    position: 'absolute',
    left: 40,
    top: 60,
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 17,
  },
  ok: {
    position: 'absolute',
    right: 40,
    top: 60,
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 17,
  },
  landmark: {
    width: landmarkSize,
    height: landmarkSize,
    position: 'absolute',
    backgroundColor: 'red',
  },
  faceText: {
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'stretch',
  },
  textMessage: {
    alignSelf:"center", 
    fontSize: 17, 
    color: 'white', 
    fontWeight: 'bold',
    textShadowColor: '#585858',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:10,
  }

});
