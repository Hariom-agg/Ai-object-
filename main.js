Status = "";
 objects = [];
input = "";
function preload()
{

}

function setup()
{
    canvas = createCanvas(400,300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(400,300);
}

function start_js()
{
    objectdetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("object").innerHTML = "Status : Detecting objects";
    input = document.getElementById("input_id").value;
    console.log(input)
}

function gotResults(error,results)
{
   if (error)
   {
       console.log(error)
   }
   console.log(results);
   objects = results;
}

function modelLoaded()
{
    console.log("modelLoaded!");
    Status = true;
}

function draw()
{
    image(video , 0, 0, 400 , 300);

    if(Status != "")
    {
       for(i = 0; i<objects.length; i++)
       {
        objectdetector.detect(video, gotResults);
           percent = floor(objects[i].confidence * 100);
           

           if(objects[i].label == input)
           {
               video.stop()
               document.getElementById("found").innerHTML = input + "found";
           }
           else
           {
            document.getElementById("found").innerHTML = input + "not found";

           }
           
       }

    
    }
}
