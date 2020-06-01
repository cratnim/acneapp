// Import Firebase configuration

import * as firebase from 'firebase';
import moment, { duration } from 'moment';



personIdString = ''
  
  // Function defined
  // Description: upload data
  // 1) Upload Data directly into Firebase database
async function checkID(id)
{
  
  if(id.length == 17)
  {
    // ทำ id ให้เป็นปกติให้ได้ ไม่เอา -

    id = id.replace(/[\W\D\s\._\-]+/g, '');

    if(personIdString.includes(id)) //เช็คว่าต้องได้ true
    {
      console.log('TRUE')
    }
    else
    {
      console.log("FALSE")
    }
    // if(personIdString.includes(id))

  }
}

  
async function getMyId() { /* Remove arrow function */

    const db = firebase.firestore();
    // db.settings({ timestampsInSnapshots: true});
    db.collection('data').get().then((snapshot) => {

      snapshot.docs.forEach(doc => {
          let items = doc.data();
          personIdString = personIdString+'#'+items.personId
          // this.setState({ personId : items.personId }) 
          /* Make data suitable for rendering */
          items = JSON.stringify(items);

          /* Update the components state with query result */
          
      });

    });

  
  async function uploadData(userObj, dataObj, imgArray) {

    // Defined path references in Firebase storage
    // let ref = firebase.database().ref(dataObj.first);
    const dbh = firebase.firestore();
    // dbh.collection("test").doc(this.props.values.first).set({
    //   name: this.props.values.first,
    //   sex: this.props.values.sex,
  
    // POST blob data into Firebase storage
    imageZero = imgArray[0].split('/')
    imageOne = imgArray[1].split('/')
    imageTwo = imgArray[2].split('/')

    var duration = dataObj.acne;
    console.log(duration.length)
    if(duration.length == 12)
    {
      
      durationYear = duration.substring(0,1);
      durationMonth = duration.substring(5,6);

    }
    else if(duration.length == 13)
    {
      durationYear = duration.substring(0,2);
      durationMonth = duration.substring(5,7);

    }
    else
    {
      durationYear = duration.substring(0,2);
      durationMonth = duration.substring(6,8);

    }
    // console.log('asddddddddddddddddddddddddddddddddddddddddddddddddddd')
    // console.log(duration)
    // console.log(durationYear)
    // console.log(durationMonth)
    // console.log(durationYear+'____________'+durationMonth);

    durationYear = parseInt(durationYear)
    durationYear = durationYear*12
    durationMonth = parseInt(durationMonth)
    durationAll = durationMonth+durationYear;
    // console.log(durationAll)
    
    dataObj.medic[dataObj.medic.length] = dataObj.medical
    dataObj.drug[dataObj.drug.length] = dataObj.drugs
    
    dbh.collection("data").doc(moment().format()).set({
      staff: userObj.Email,
      personId: dataObj.id,
      firstName: dataObj.first,
      lastName: dataObj.last,
      gender: dataObj.sex,
      birthdate: dataObj.birth,
      acneDurations: durationAll,
      pregnant: dataObj.pregnant,
      period: dataObj.period,
      allergicDisease: dataObj.medic,
      // allergicDiseaseOther: dataObj.medical,
      drugAllergic: dataObj.drug,
      // drugAllergicOther: dataObj.drugs,
      imgUri_straightFace: 'gs://acne-02.appspot.com/images/0_'+imageZero[imageZero.length-1],
      imgUri_leftFace: 'gs://acne-02.appspot.com/images/1_'+imageOne[imageOne.length-1],
      imgUri_rightFace: 'gs://acne-02.appspot.com/images/2_'+imageTwo[imageTwo.length-1],
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