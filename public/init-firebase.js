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
        connectTodbtData(graphDataFromDB)
    })
}
function setUpExpValues(jsonParameterFile) {
    for (graphVS in vslideGs) {
        for (var dayp in vslideGs[graphVS][2]) {
            vslideGs[graphVS][2][dayp] = vslideGs[graphVS][7]
        }
    }
    for (var parameterK in jsonParameterFile) {
        if (initPLinkRev[parameterK] != undefined) {
            document.getElementById('parameter' + initPLink[initPLinkRev[parameterK]][0] + 'Value').innerHTML = jsonParameterFile[parameterK];
            document.getElementById(initPLinkRev[parameterK]).value = jsonParameterFile[parameterK]
        }
        else {
            if (parameterK == 'strategy') {
                strategyData = jsonParameterFile[parameterK];
                console.log("strategy data", strategyData);
                for (var sPG in singleParameterGraphMap) {
                    sPGToUpdateData = {};
                    updateRangeV = [];
                    for (dayValue in strategyData) {
                        if (strategyData[dayValue][singleParameterGraphMap[sPG][8]] != undefined) {
                            if (strategyData[dayValue][singleParameterGraphMap[sPG][8]] == 1) {
                                updateRangeV.push(parseInt(dayValue))
                            }
                            else if (strategyData[dayValue][singleParameterGraphMap[sPG][8]] == 0) {
                                updateRangeV.push(parseInt(dayValue));
                                sPGToUpdateData[dayValue] = updateRangeV.slice();
                                updateRangeV = []
                            }
                        }
                    }
                    if (updateRangeV.length == 1) {
                        updateRangeV.push(timeMax);
                        sPGToUpdateData[timeMax] = updateRangeV.slice();
                        updateRangeV = []
                    }
                    for (pointsRanges in sPGToUpdateData) {
                        if (sPGToUpdateData[pointsRanges].length == 2) {
                            console.log("assigning value for ", sPGToUpdateData[pointsRanges], sPG)
                            addDynaPPointSpecific(sPGToUpdateData[pointsRanges], sPG)
                        }
                    }
                }

                for (graphVS in vslideGs) {
                    updateRangeVs = [];
                    for (dayValue in strategyData) {
                        if (strategyData[dayValue][vslideGs[graphVS][11]] != undefined) {

                            if (graphVS == 'ICUBedsGraph' || graphVS == 'HBedsGraph') {
                                vslideGs[graphVS][2][parseInt(dayValue)] = strategyData[dayValue][vslideGs[graphVS][11]]
                            }
                            else {
                                updateRangeVs.push([parseInt(dayValue), strategyData[dayValue][vslideGs[graphVS][11]]])
                            }
                        }
                    }

                    if (graphVS != 'ICUBedsGraph' && graphVS != 'HBedsGraph') {
                        for (updateV = 0; updateV < updateRangeVs.length; updateV++) {
                            for (dayp = updateRangeVs[updateV][0]; dayp <= timeMax; dayp++) {
                                vslideGs[graphVS][2][dayp] = updateRangeVs[updateV][1]
                            }
                        }
                        drawAllLinesAndPointsVS(graphVS)

                    }
                    else {
                        drawAllLinesAndPointsVS(graphVS)
                    }

                }

            }
        }
    }
}

function getExperimentConfig(uid) {
    console.log('getExperimentConfig -> getExperimentConfig', uid)
    firebase.database().ref(`experiments/${uid}/exp`).once('value', function (data) {
        console.log('getExperimentConfig -> val', data.key, data.val())
        const config = data.val()
        setUpExpValues(config)
        // for (let key in config) {
        //     if (key in revSliderWithParamDictionary) {
        //         if (document.getElementById(revSliderWithParamDictionary[key][1])) {
        //             document.getElementById(revSliderWithParamDictionary[key][1]).value = parseFloat(config[key])
        //         }
        //         if (document.getElementById('parameter' + revSliderWithParamDictionary[key][0] + 'Value')) {
        //             document.getElementById('parameter' + revSliderWithParamDictionary[key][0] + 'Value').innerHTML = parseFloat(config[key])
        //         }
        //     }
        // }
    })
}

let expId = findGetParameter('expId')
if (expId) {
    getExperimentConfig(expId)
    listenForData(expId)
}