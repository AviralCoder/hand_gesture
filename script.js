okay_percent = 0;
cool_percent = 0;
amazing_percent = 0;

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("picture").innerHTML =
            '<img id="captured_image" src="' +
            data_uri +
            '" width=350 height=300/>';
    });
}

console.log("ml5 version:", ml5.version);
classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/yZSidpUFZ/model.json ",
    modelLoaded
);

function modelLoaded() {
    console.log("model is loaded");
}

function speak(speak_data) {
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
        alert("There was en error - " + error);
    } else {
        console.log(results);
        okay_percent = results.find((e) => e.label == "okay").confidence * 100;
        amazing_percent =
            results.find((e) => e.label == "amazing").confidence * 100;
        cool_percent = results.find((e) => e.label == "cool").confidence * 100;
        updateBars();
        speak(
            `Your hand gesture is ${results[0].label} with ${(
                results[0].confidence * 100
            ).toFixed(1)} percent`
        );
    }
}

function updateBars() {
    document.getElementById("okay").style.width = okay_percent + "%";
    document.getElementById("amazing").style.width = amazing_percent + "%";
    document.getElementById("cool").style.width = cool_percent + "%";

    document.getElementById("okay").innerHTML = `👍🏻 ${
        okay_percent.toFixed(2) + "%"
    }`;
    document.getElementById("amazing").innerHTML = `👌🏻 ${
        amazing_percent.toFixed(2) + "%"
    }`;
    document.getElementById("cool").innerHTML = `🤘🏻 ${
        cool_percent.toFixed(2) + "%"
    }`;
}
