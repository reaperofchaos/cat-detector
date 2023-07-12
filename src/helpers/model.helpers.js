import {Webcam, load} from '@teachablemachine/image';

let model, webcam, labelContainer, maxPredictions;

const modelUrl = 'http://127.0.0.1:3000/model.json'
const metadataUrl = 'http://127.0.0.1:3000/metadata.json'


export async function init() {
    model = await load(modelUrl, metadataUrl);
    maxPredictions = model.getTotalClasses();
    const flip = true; // whether to flip the webcam
    webcam = new Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    if(webcam){
        await webcam.play();

    }
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict2();
    window.requestAnimationFrame(loop);
}

export async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
                    if(prediction[i].probability.toFixed(2) > 0.75){

            const classPrediction =
                prediction[i].className;
                
            labelContainer.childNodes[i].innerHTML = classPrediction;
                    }
        }
}

export async function predict2() {
    let value = "unknown"
    // predict can take in an image, video or canvas html element
    if(webcam.canvas){
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        if(prediction[i].probability.toFixed(2) > 0.75){
            // console.log("prediction", prediction[i].className, " : ", prediction[i].probability.toFixed(2)); 
                value = prediction[i].className 
        }
    }
    }

    return value;

}

