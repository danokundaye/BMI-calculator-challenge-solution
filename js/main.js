let radioMetric = document.getElementById("metric")
let radioImperial = document.getElementById("imperial")
let inputImperial = document.getElementById("inputImperial")
let inputMetric = document.getElementById("inputMetric")
let space = document.getElementById("space")

//metric values
let cm = document.getElementById("cm")
let kg = document.getElementById("kg")

//imperial values
let ft = document.getElementById("ft")
let inch = document.getElementById("in")
let st = document.getElementById("st")
let lbs = document.getElementById("lbs")

//results
let welcome = document.getElementById("welcome")
let calculatedAnswer = document.getElementById("result")
let bmiScore = document.getElementById("bmi-score")
let description = document.getElementById("bmi-desc")
let healthy = document.getElementById("healthy")
let range = document.getElementById("range")

radioImperial.addEventListener("change", () => {
    if (radioImperial.checked) {
        inputImperial.classList.remove("hide")
        inputMetric.classList.add("hide")
        space.classList.add("space-imp-wel")
    }

    if (welcome.classList.contains("hide")){
        welcome.classList.remove("hide")
        calculatedAnswer.classList.add("hide")
    }
})

radioMetric.addEventListener("change", () => {
    if (radioMetric.checked){
        inputImperial.classList.add("hide")
        inputMetric.classList.remove("hide")
        space.classList.remove("space-imp-wel")
    }

    if (welcome.classList.contains("hide")){
        welcome.classList.remove("hide")
        calculatedAnswer.classList.add("hide")
    }
})

//Calculate metric BMI and indicate weight class

function calculateMetricBMI (heightMeters, weightKg) {
    if(isNaN(weightKg) || isNaN (heightMeters)){
        bmiScore.innerHTML = "NaN"
        description.innerHTML = "Please provide numerical values"
    }

    heightMeters = cm.value/100
    let bmi = weightKg / (heightMeters * heightMeters)

    //weight class
    if (bmi > 24.9) {
        healthy.innerHTML = "overweight"
    }else if (bmi < 18.5){
        healthy.innerHTML = "underweight"
    }else{
        healthy.innerHTML = "at a healthy weight"
    }

    //weight range
    let weightLower = (18.5 * (heightMeters * heightMeters)).toFixed(1) + "kg"
    let weightHigher = (24.9 * (heightMeters * heightMeters)).toFixed(1) + "kg."

    range.innerHTML = weightLower + " - " + weightHigher
    return bmi
}

//calculate imperial BMI and indicate weight class

function calculateHeightConversion(heightFeet, heightInch) {
    let heightConvert = ((heightFeet * 30.48 + heightInch * 2.54)/100)
    heightConvert = (heightConvert * heightConvert)
    return heightConvert
}

function calculateWeightConversion(weightStone, weightPound) {
    let weightConvert = (weightStone * 6.35029 + weightPound * 0.45359237)
    return weightConvert
}

function weightClassRange() {
    let bmi2 = (calculateWeightConversion(st.value, lbs.value) / calculateHeightConversion(ft.value, inch.value)).toFixed(1)

    if (bmi2 > 24.9) {
        healthy.innerHTML = "overweight"
    }else if (bmi2 < 18.5){
        healthy.innerHTML = "underweight"
    }else{
        healthy.innerHTML = "at a healthy weight"
    }

    let lowerWeight = (18.5 * calculateHeightConversion(ft.value, inch.value)) * 2.205
    let lowerWeightSt= Math.floor(lowerWeight * 0.0714) + "st"
    let lowerWeightPound = Math.floor(lowerWeight % 14) + "lbs"

    let upperWeight = (24.9 * calculateHeightConversion(ft.value, inch.value)) * 2.205
    let UpperWeightSt= Math.floor(upperWeight * 0.0714) + "st"
    let upperWeightPound = Math.floor(upperWeight % 14) + "lbs"

    range.innerHTML = lowerWeightSt + " " + lowerWeightPound  + " - " + UpperWeightSt + " " + upperWeightPound

    return bmi2
}

//Display results
function displayMetricResults() {
    if(cm.value !== "" || kg.value !== ""){
        welcome.classList.add("hide")
        calculatedAnswer.classList.remove("hide")
        bmiScore.innerHTML = (calculateMetricBMI(cm.value, kg.value)).toFixed(1)
    }else if(cm.value === "" && kg.value === "") {
        bmiScore.innerHTML = 0
    }
}


function displayImperialResults() {
        welcome.classList.add("hide")
        calculatedAnswer.classList.remove("hide")
        space.classList.add("space-imp-sp")
        bmiScore.innerHTML = weightClassRange()

}
cm.addEventListener("input", displayMetricResults)
kg.addEventListener("input", displayMetricResults)
ft.addEventListener("input", displayImperialResults)
inch.addEventListener("input", displayImperialResults)
st.addEventListener("input", displayImperialResults)
lbs.addEventListener("input", displayImperialResults)