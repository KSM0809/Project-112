prediction= "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality: 90
});

camera= document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML= '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version: ', ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/PjHpqqS5P/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model loaded!');
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data= "The prediction is " + prediction;
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img= document.getElementById('captured_image')
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error("Error!");
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML= results[0].label;
        prediction= results[0].label;
        speak();

        if(results[0].label == "Five"){
            document.getElementById("update_gesture").innerHTML= "&#9995;"
        }
        
        if(results[0].label == "Two"){
            document.getElementById("update_gesture").innerHTML= "&#9996;"
        }

        if(results[0].label == "One"){
            document.getElementById("update_gesture").innerHTML= "&#9757;"
        }
    }
}