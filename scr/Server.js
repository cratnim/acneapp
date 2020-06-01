// Import Firebase configuration

import * as firebase from 'firebase';
import moment, { duration } from 'moment';

  // Function defined
  // Description: upload data
  // 1) Upload Data directly into Firebase database
  async function uploadData(userObj, dataObj, imgArray, timestamp) {

    // Defined path references in Firebase storage
    // let ref = firebase.database().ref(dataObj.first);
    const dbh = firebase.firestore();

  
    // POST blob data into Firebase storage
    imageZero = imgArray[0].split('/')
    imageOne = imgArray[1].split('/')
    imageTwo = imgArray[2].split('/')

    durationAll = (dataObj.acneYear * 12) + (dataObj.acneMonth * 1) ;

    function replaceOther (arr1, arr2) {
      var array1 = arr1.slice()
      var index = array1.indexOf("Others");
      if (index != -1) {
        array1[index] = arr2;
      }
      return array1;
    } 
    
    medic = dataObj.medic == 'ไม่มี' ? [] : replaceOther(dataObj.medic, dataObj.medical);
    drug = dataObj.drug == 'ไม่แพ้ยา' ? [] : replaceOther(dataObj.drug, dataObj.drugs);

    id = dataObj.id.replace(/[\W\D\s\._\-]+/g, '');

    sexs = ['MALE', 'FEMALE', 'OTHER']
    genders = ['ชาย', 'หญิง', 'ไม่ระบุ']
    sex = sexs[genders.indexOf(dataObj.sex)]

    birth = moment(dataObj.birth, 'DD-MM-YYYY').format('YYYY-MM-DD')

    values = ['YES', 'NO', 'N/A']
    pregnants = ['ตั้งครรภ์', 'ไม่ตั้งครรภ์', 'ไม่มี']
    pregnant = values[pregnants.indexOf(dataObj.pregnant)]

    periods = ['ปกติ', 'ไม่ปกติ', 'ไม่มี']
    period = values[periods.indexOf(dataObj.period)]

    // dataObj.medic[dataObj.medic.length] = dataObj.medical
    // dataObj.drug[dataObj.drug.length] = dataObj.drugs
    
    dbh.collection("data").doc(timestamp).set({
      staff: userObj.Email,
      personId: id,
      firstName: dataObj.first,
      lastName: dataObj.last,
      gender:sex,
      birthDate: birth,
      acneDurationMonths: durationAll,
      pregnant: pregnant,
      periods: period,
      allergicDisease: medic,
      drugAllergic: drug,
      // imgUri_straightFace: 'gs://acne-01-c2f46.appspot.com/images/0_'+imageZero[imageZero.length-1],
      // imgUri_leftFace: 'gs://acne-01-c2f46.appspot.com/images/1_'+imageOne[imageOne.length-1],
      // imgUri_rightFace: 'gs://acne-01-c2f46.appspot.com/images/2_'+imageTwo[imageTwo.length-1],
      imgUri_straightFace: 'gs://acne-01-c2f46.appspot.com/images/0_' + timestamp + '.jpg',
      imgUri_leftFace: 'gs://acne-01-c2f46.appspot.com/images/1_' + timestamp + '.jpg',
      imgUri_rightFace: 'gs://acne-01-c2f46.appspot.com/images/2_' + timestamp + '.jpg',
    });
  
  }

  async function uploadImage(uri, imageName) {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }
  

export { uploadData }
export { uploadImage }