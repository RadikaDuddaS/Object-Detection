img= "";
Status = "";
objects = [];

function preload()
{
    img=loadImage('dog_cat.jpg');
}

function setup() 
{
    canvas = createCanvas(640,420);
    canvas.center()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
};

function draw()
{


    image(img, 0, 0, 640,420);

    if(Status != "")
    {
        for (i =0; i < objects.length; i++)
        {
            document.getElementById("Status").innerHTML = "Status : Object Detected";

            fill("pink");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("pink")
            rect(objects[i].x, objects[i].width, objects[i].height);
        }
    }

}

function modelLoaded() 
{
    console.group("Model Loaded!")
    Status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}