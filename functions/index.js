
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const FormData = require("form-data");

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await admin.database().ref('/messages').push({original: original});
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.redirect(303, snapshot.ref.toString());
});

  
// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
.onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
  const original = snapshot.val();
  console.log('Uppercasing', context.params.pushId, original);
  const uppercase = original.toUpperCase();
  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to the Firebase Realtime Database.
  // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
  return snapshot.ref.parent.child('uppercase').set(uppercase);
});

// Listens for new collection added to /data 
// and send collection to api
exports.receivedData = functions.firestore.document('/data/{id}')
.onCreate((snapshot, context) => {
    // Grab the current value of what was written to the firestore.
  const original = snapshot.data().personId;
  const file =  snapshot.data().imgUri_straightFace;
  const file2 =  snapshot.data().imgUri_rightFace;
  const file3 =  snapshot.data().imgUri_leftFace;

  console.log('Value added', context.params.id, original, file, file2, file3);

  // send images uri to api
  var xhttp = new XMLHttpRequest();

  // var formData = new FormData();
  // formData.append('file', file.toString());
  // formData.append('file2', file2.toString());
  // formData.append('file3', file3.toString());

  xhttp.open("POST", "https://xyh4ml0s-test-5000.nautilus.cils.space/file-upload", true);
  xhttp.setRequestHeader( 'Content-Type', 'application/json');
  // xhttp.send(`file=${file}&file2=${file2}&file3=${file3}`);
  xhttp.send(JSON.stringify({
    file: file.toString(),
    file2: file2.toString(),
    file3: file3.toString(),
    name: context.params.id.toString()
  }));
  
  return xhttp.responseText;
});

