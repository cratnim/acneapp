import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, Button, style, captureButton } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { Dimensions } from 'react-native'
import { Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ShowDetail from './ShowDetail.js'
import {
  Ionicons,
  MaterialIcons,
  Foundation,
  MaterialCommunityIcons,
  Octicons
} from '@expo/vector-icons';
import isIPhoneX from 'react-native-is-iphonex';
import firebase from 'firebase';


canSnap = false;
nartong = false;
right = false;
left = false;
facePic="tag-faces"
faceExamColor = false;
pictureCol = [];
picNum = 0
qrData = []
personIdString = ''
validID = true


export default class ScarqrCamera extends React.Component {
  state = {
    permissionsGranted: null,
    type: Camera.Constants.Type.back,
    next:false,
    path: null,
    barcodeScanning: true,
    User: this.props.User,
    
  };

    // toggle next state
  toggleNext = () => this.setState({ next: !this.state.next});

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
    this.getMyId();
  }

  async getMyId () { 
   
    const db = firebase.firestore();
    
    await db.collection('data').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
          let items =  doc.data();
          personIdString = personIdString+'#'+items.personId
          /* Make data suitable for rendering */
          items = JSON.stringify(items);
      });

    });
    
  }

  checkID = id => {

    id = id.replace(/[\W\D\s\._\-]+/g, '');

    if(id.length == 13) {
      
      if(personIdString.includes(id)) {
        validID = false;
      } else {
        validID = true;
      }
    }
  }


  renderTopBar = () => 
    <View style={styles.topBar}> 
      <TouchableOpacity style={styles.backBotton} onPress={this.props.onPress} >
          <MaterialIcons name="arrow-back" size={40} color = {this.state.next ? "white" : "black"} />
      </TouchableOpacity>
     
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
          barCodeScannerSettings={{
            barCodeTypes: [
              BarCodeScanner.Constants.BarCodeType.qr,
              BarCodeScanner.Constants.BarCodeType.pdf417,
            ],
          }}
          onBarCodeScanned={this.state.barcodeScanning ? this.onBarCodeScanned : undefined}
          ratio={'16:9'}
        >
          {this.renderTopBar()}
        </Camera>
      </View>
    );

  onBarCodeScanned = code => {
    this.setState( { barcodeScanning: !this.state.barcodeScanning });
    qrData = code.data;
    qrData = JSON.parse(qrData);
    periodAndpregnant = qrData.pp;
    birthdate = qrData.birth;
    idAndsex = qrData.ids;
    id = idAndsex.substring(0,17);
    qrData.id = id;
    name = qrData.name.split('#')
    firstname = name[0];
    lastname = name[1];
    qrData.first = firstname;
    qrData.last = lastname;
    qrData.medical;
    qrData.drugs;

    birthdate.replace("/", "-");
    realBirthdate = birthdate.substring(8, 10)+'-'+birthdate.substring(5, 7)+'-'+birthdate.substring(0, 4);
    qrData.birth = realBirthdate;

    acneTime = qrData.acne;
    acneTime = acneTime.split('#')
    acneRealTime = acneTime[0]+' ปี '+acneTime[1]+' เดือน';
    qrData.acneYear = acneTime[0];
    qrData.acneMonth = acneTime[1];
    qrData.acne = acneRealTime;

    medic = qrData.medic.split(',')
    console.log('medic '+qrData.medic)
    m = ['ไม่มี','Hepatic impairment','Renal impairment','Polycystic ovarian syndrome','Others']
    var i;
    for (i = 0; i < medic.length; i++) {
      medic[i] = m[medic[i]]
    }
    qrData.medic = medic

    drug = qrData.drug.split(',')
    console.log('drug '+qrData.drug)
    d = ['ไม่แพ้ยา','Penicillin','Doxycycline','Tetracycline',
         'Lymecycline','Bactrim','Cephalexin','Ciprofloxacin','Clindamycin',
         'Erythromycin','Azithromycin','Clarithromycin','Benzoyl peroxide',
         'Adapalene','Tretinoin','Azelaic','Spironolactone','Oral pills',
         'Isotretinoin','Others'
        ]
    var i;
    for (i = 0; i < drug.length; i++) {
      drug[i] = d[drug[i]]
    }
    qrData.drug = drug


    if(idAndsex[18] == 'm')
    {
      qrData.sex = 'ชาย'
    }
    else if(idAndsex[18] == 'f')
    {
      qrData.sex = 'หญิง'
    }
    else
    {
      qrData.sex = 'ไม่ระบุ'
    }


    if(periodAndpregnant[0] == 'y') 
    {
      qrData.period = 'ปกติ'
    }
    else if(periodAndpregnant[0] == 'n')
    {
      qrData.period = 'ไม่ปกติ'
    }
    else
    {
      qrData.period = 'ไม่มี'
    }

    if(periodAndpregnant[2] == 'y') 
    {
      qrData.pregnant = 'ตั้งครรภ์'
    }
    else if(periodAndpregnant[2] == 'n')
    {
      qrData.pregnant = 'ไม่ตั้งครรภ์'
    }
    else
    {
      qrData.pregnant = 'ไม่มี'
    }


    this.setState({next: !this.state.next}); 
    console.log(qrData)

  };

  renderNoPermissions = () =>
    <View style={styles.noPermissions}>
      <Text style={{ color: 'white' }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>

  showAlert = () => {
    Alert.alert(  
      'คำเตือน',  
      'หมายเลขบัตรประชาชนนี้ถูกใช้แล้ว',  
      [  
          {text: 'ย้อนกลับ', onPress: this.props.onPress},  
      ]  
    );  
  }

  render() {
    if(!this.state.next)
    {
      const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
      const content = cameraScreenContent;
      return <View style={styles.container}>{content}</View>;
    } 
    else  {
      this.checkID(qrData.id)
      
      if(!validID) {
        this.showAlert();
        return null;  
      } else {
        return <ShowDetail 
          onPress={this.toggleNext.bind(this)} 
          values={qrData} 
          User={this.state.User} 
          onPress1={this.props.onPress}
        ></ShowDetail>;
      }
    } 
  } /* end render */ 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    //cameraStyle={{ height: 200, marginTop: 20, width: 200, alignSelf: 'center', justifyContent: 'center' }},
    flex: 1,
    
  },
  topBar: {
    flex: 1.1, 
    backgroundColor: 'transparent',
    flexDirection: 'row',

  },
  secondBar: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems:'center', 


  },
  bottomBar: {
    paddingTop: isIPhoneX ? 500 : 350,
    //paddingBottom: isIPhoneX ? 10 : 5,
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    flex: 1,
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
    marginTop: 50,
    marginLeft: 120,
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
    right: 40,
    top: 60,
    backgroundColor: 'transparent',
    color: 'black',

    fontSize: 17,
  },
  ok: {

    position: 'absolute',

    left: 40,
    top: 60,
    backgroundColor: 'transparent',
    color: 'black',

    fontSize: 17,
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
});
