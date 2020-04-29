function convertToFormatV1(jsonVal) {
    for (let i in jsonVal) {
        if (!(i in graphDataFromDB)) {
            graphDataFromDB[i] = []
        }
        graphDataFromDB[i][parseInt(jsonVal['day'])] = [parseInt(jsonVal['day']), parseFloat(jsonVal[i])]
    }
    console.log('graphData', graphDataFromDB)
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

const sliderDictionary = {
    "Number_of_Agents": "num_agents",
    "Agent_Density": "agent_density",
    "Hospital_bed_per_agent": "hospital_bed_per_agent",
    "ICU_bed_per_hospital_bed": "icu_bed_per_hospital_bed",
    "Infection_percent": "infection_percent",
    "Distribution_age_minimum": "distribution_age_min",
    "Distribution_age_maximum": "distribution_age_max",
    "Distribution_age_peak": "distribution_age_peak",
    "Distribution_Hygiene_mean": "distribution_hygiene_mean",
    "Distribution_Hygiene_Var": "distribution_hygiene_var",
    "Essential_Agent_percent": "essential_agent_percent",
    "Testing_Efficiency": "a_false_negative_percent",
    "Contact_Tracing_Capacity": "c_contact_trace",
    "Social_Distancing_Efficiency": "a_social_distancing_efficiency",
    "Recovered_Agent_percent": "recovery_percent"
}

const revSliderDictionary = {
    "num_agents": "Number_of_Agents",
    "agent_density": "Agent_Density",
    "hospital_bed_per_agent": "Hospital_bed_per_agent",
    "icu_bed_per_hospital_bed": "ICU_bed_per_hospital_bed",
    "infection_percent": "Infection_percent",
    "distribution_age_min": "Distribution_age_minimum",
    "distribution_age_max": "Distribution_age_maximum",
    "distribution_age_peak": "Distribution_age_peak",
    "distribution_hygiene_mean": "Distribution_Hygiene_mean",
    "distribution_hygiene_var": "Distribution_Hygiene_Var",
    "essential_agent_percent": "Essential_Agent_percent",
    "a_false_negative_percent": "Testing_Efficiency",
    "c_contact_trace": "Contact_Tracing_Capacity",
    "a_social_distancing_efficiency": "Social_Distancing_Efficiency",
    "recovery_percent": "Recovered_Agent_percent"
}

const sliderWithParamDictionary = {
    'Number_of_Agents': [0, "num_agents"],
    'Agent_Density': [1, "agent_density"],
    'Hospital_bed_per_agent': [2, "hospital_bed_per_agent"],
    'ICU_bed_per_hospital_bed': [3, "icu_bed_per_hospital_bed"],
    'Infection_percent': [4, "infection_percent"],
    'Distribution_age_minimum': [5, "distribution_age_min"],
    'Distribution_age_maximum': [6, "distribution_age_max"],
    'Distribution_age_peak': [7, "distribution_age_peak"],
    'Distribution_Hygiene_mean': [8, "distribution_hygiene_mean"],
    'Distribution_Hygiene_Var': [9, "distribution_hygiene_var"],
    'Essential_Agent_percent': [10, "essential_agent_percent"],
    'Testing_Efficiency': [11, "a_false_negative_percent"],
    'Contact_Tracing_Capacity': [12, "c_contact_trace"],
    'Social_Distancing_Efficiency': [13, "a_social_distancing_efficiency"],
    'Recovered_Agent_percent': [14, "recovery_percent"]
}

const revSliderWithParamDictionary = {
    "num_agents": [0, "Number_of_Agents"],
    "agent_density": [1, "Agent_Density"],
    "hospital_bed_per_agent": [2, "Hospital_bed_per_agent"],
    "icu_bed_per_hospital_bed": [3, "ICU_bed_per_hospital_bed"],
    "infection_percent": [4, "Infection_percent"],
    "distribution_age_min": [5, "Distribution_age_minimum"],
    "distribution_age_max": [6, "Distribution_age_maximum"],
    "distribution_age_peak": [7, "Distribution_age_peak"],
    "distribution_hygiene_mean": [8, "Distribution_Hygiene_mean"],
    "distribution_hygiene_var": [9, "Distribution_Hygiene_Var"],
    "essential_agent_percent": [10, "Essential_Agent_percent"],
    "a_false_negative_percent": [11, "Testing_Efficiency"],
    "c_contact_trace": [12, "Contact_Tracing_Capacity"],
    "a_social_distancing_efficiency": [13, "Social_Distancing_Efficiency"],
    "recovery_percent": [14, "Recovered_Agent_percent"]
}