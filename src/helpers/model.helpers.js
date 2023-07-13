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
    // for (let i = 0; i < maxPredictions; i++) { // and class labels
    //     labelContainer.appendChild(document.createElement("div"));
    // }
}

async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
}

export async function predict() {
        // predict can take in an image, video or canvas html element
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const jacob = prediction[0];
            const bakeneko = prediction[1]
            let classPrediction = "Unknown"; 

            if(jacob.probability.toFixed(2) > 0.75){
                classPrediction = `Jacob - ${jacob.probability.toFixed(2)}`;
            }else if(bakeneko.probability.toFixed(2) > 0.75){
                classPrediction = `Bakeneko - ${bakeneko.probability.toFixed(2)}`;
            }
                
            labelContainer.innerHTML = `${classPrediction}` ;
            
                    }
        }

