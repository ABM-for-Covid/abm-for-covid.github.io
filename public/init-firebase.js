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

function getExperimentConfig(uid) {
    console.log('getExperimentConfig -> getExperimentConfig', uid)
    firebase.database().ref(`experiments/${uid}/exp`).once('value', function (data) {
        console.log('getExperimentConfig -> val', data.key, data.val())
        const config = data.val()
        for (let key in config) {
            if (key in revSliderWithParamDictionary) {
                if (document.getElementById(revSliderWithParamDictionary[key][1])) {
                    document.getElementById(revSliderWithParamDictionary[key][1]).value = parseFloat(config[key])
                }
                if (document.getElementById('parameter' + revSliderWithParamDictionary[key][0] + 'Value')) {
                    document.getElementById('parameter' + revSliderWithParamDictionary[key][0] + 'Value').innerHTML = parseFloat(config[key])
                }
            }
        }
    })
}

let expId = findGetParameter('expId')
if (expId) {
    getExperimentConfig(expId)
    listenForData(expId)
}