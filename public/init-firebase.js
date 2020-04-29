const firebaseConfig = {
    apiKey: "AIzaSyDPfIWfF_obi1n_ra71rmsVTKSvDYCR47M",
    authDomain: "abmforcovid.firebaseapp.com",
    databaseURL: "https://abmforcovid.firebaseio.com",
    projectId: "abmforcovid",
    storageBucket: "abmforcovid.appspot.com",
    messagingSenderId: "780541796143",
    appId: "1:780541796143:web:e3e47372335738159dcbda"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


let graphDataFromDB = {}
function listenForData(uid) {
    console.log('listenForData -> listenForData', uid)
    firebase.database().ref(`experiments/${uid}/res`).on('child_added', function (data) {
        // console.log('listenForData -> val', data.key, data.val())
        convertToFormatV1(data.val())
        connectToPlotData(graphDataFromDB)
    })
}

function convertToFormatV1(jsonVal) {
    for (let i in jsonVal) {
        if (!(i in graphDataFromDB)) {
            graphDataFromDB[i] = []
        }
        graphDataFromDB[i][parseInt(jsonVal['day'])] = [parseInt(jsonVal['day']), parseFloat(jsonVal[i])]
    }
    console.log('graphData', graphDataFromDB)
}

// listenForData('exp_4_1_a')