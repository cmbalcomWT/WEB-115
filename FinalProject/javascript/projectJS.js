//Put Everything in this event listener, this prevents the script from trying to run before the page is loaded, which was causing me issues
document.addEventListener('DOMContentLoaded',function(){
    //Link to HTML button
    const submitButton = document.getElementById("submitButton").addEventListener('click', function(event){
        newWindow(event);
    });


    //validate email function
    function validateEmail(userEmail){
        var validMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return validMail.test(userEmail);
    }
    //add validate Name function

    //function for Eventlistener
    function newWindow(event){
        //Get User Input
        //Name and Email + validation
        userName = document.getElementById("userName").value;
        userEmail = document.getElementById("emailAddress").value;

        if(validateEmail(userEmail)){
            console.log("Valid Email");
        }
        else{
            console.log("Invalid Email");
            alert("Invalid Email Address. Please Try Again.");
            return; //Exits function w/o refreshing the page, so nobody has to type everything again
        }
    

        //Get Weekly Goals and Display
        //This part was super fun to research
        //Monday
        var monField = document.getElementById("monGoal").value; //gets the list from the input field
        var monGoal = monField.split(','); //split() breaks a string into an array, i used a comma as the separator
        monGoal = monGoal.map(item => item.trim()); //gets rid of any whitespace before or after item
        monGoal = monGoal.filter(item => item !== ""); //makes sure that a blank space cannot be accepted
        //console.log("Got Mon");

        //Tuesday
        var tuesField = document.getElementById("tuesGoal").value;
        var tuesGoal = tuesField.split(',');
        tuesGoal = tuesGoal.map(item => item.trim());
        tuesGoal = tuesGoal.filter(item => item !== "");
        //console.log("got tues");

        //Wednesday
        var wedField = document.getElementById("wedGoal").value;
        var wedGoal = wedField.split(',');
        wedGoal = wedGoal.map(item => item.trim());
        wedGoal = wedGoal.filter(item => item !== "");

        //Thursday
        var thursField = document.getElementById("thursGoal").value;
        var thursGoal = thursField.split(',');
        thursGoal = thursGoal.map(item => item.trim());
        thursGoal = thursGoal.filter(item => item !== "");

        //Friday
        var friField = document.getElementById("friGoal").value;
        var friGoal = friField.split(',');
        friGoal = friGoal.map(item => item.trim());
        friGoal = friGoal.filter(item => item !== "");

        //Saturday
        var satField = document.getElementById("satGoal").value;
        var satGoal = satField.split(',');
        satGoal = satGoal.map(item => item.trim());
        satGoal = satGoal.filter(item => item !== "");

        //Sunday
        var sunField = document.getElementById("sunGoal").value;
        var sunGoal = sunField.split(',');
        sunGoal = sunGoal.map(item => item.trim());
        sunGoal = sunGoal.filter(item => item !== "");


        //Make Sure arrays have 5 items
        if(!validateGoal(monGoal, 1)){
            event.preventDefault();
            return;
        }
        //console.log("MonCon")
        if(!validateGoal(tuesGoal, 2)){
            event.preventDefault();
            return;
        }
        //console.log("TuesCon");
        if(!validateGoal(wedGoal, 3)){
            event.preventDefault();
            return;
        }
        if(!validateGoal(thursGoal, 4)){
            event.preventDefault();
            return;
        }
        if(!validateGoal(friGoal, 5)){
            event.preventDefault();
            return;
        }
        if(!validateGoal(satGoal, 6)){
            event.preventDefault();
            return;
        }
        if(!validateGoal(sunGoal, 7)){
            event.preventDefault();
            return;
        }

        //Used when testing
        //console.log(monGoal);
        //console.log(monGoal[1]);

        //put all the text into a string
        resultText = ("<html><head><title>Weekly Goal</title><link rel='stylesheet' type='text/css' href='css/projectCSS.css'></head><body><div id='contentDiv'>");
        resultText += ("Hello " + userName + " at " + userEmail + "!");
        resultText += ("<br/>Here is your weekly goal:<br/>");
        resultText += ("<br/><h3>Monday: </h3>" + generateGoal(monGoal) + "<br/>");
        resultText += ("<br/><h3>Tuesday: </h3>" + generateGoal(tuesGoal) + "<br/>");
        resultText += ("<br/><h3>Wednesday: </h3>" + generateGoal(wedGoal) + "<br/>");
        resultText += ("<br/><h3>Thursday: </h3>" + generateGoal(thursGoal) + "<br/>");
        resultText += ("<br/><h3>Friday: </h3>" + generateGoal(friGoal) + "<br/>");
        resultText += ("<br/><h3>Saturday: </h3>" + generateGoal(satGoal) + "<br/>");
        resultText += ("<br/><h3>Sunday: </h3>" + generateGoal(sunGoal) + "<br/></div>");

        //Add Buttons to Clear, Print, and Download
        resultText += ("<br><button onclick='clearPlanner()'>Clear Planner</button>");
        resultText += ("<button onclick='printPlanner()'>Print</button>");
        resultText += ("<button onclick='downloadPlanner()'>Download</button>");

        resultText += ("</body></html>");

        //Dispay
        flyWindow = window.open('about:blank','myPop','width=' + screen.width + ',height=' + screen.height + ',left=0,top=0'); //makes flyWindow fullscreen
        flyWindow.document.write(resultText); //This line sometimes doesnt work check later

        //Button Functions
        //Clear Planner
        flyWindow.clearPlanner = function(){
            var contentDiv = flyWindow.document.getElementById('contentDiv');
            if (contentDiv) {
                contentDiv.innerHTML = '';
            } else {
                console.error("Element with ID 'contentDiv' not found."); //test because div wasn't loading properly
            }
        };
        //Print
        flyWindow.printPlanner = function(){
            flyWindow.print();
        };
        //Download
        flyWindow.downloadPlanner = function(){
            var textOnly = flyWindow.document.getElementById('contentDiv').innerText; //Gets only the text from document
            var dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textOnly);
            var link = flyWindow.document.createElement('a'); //creates link in page for download
            link.href = dataUri;
            link.download = 'weekly_goal.txt'; //This is the default file name
            link.click(); //triggers a click to initate download
        }
    }
});

//Validate Goal Function
function validateGoal(goal, day){
    dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    today = day - 1;

    //console.log("Goal:", goal);
    //console.log("Today:", today);

    //Make Sure arrays have 5 items
    if(goal.length > 5){
        alert("Only 5 meals per day! Please recheck Monday Meals.");
        return false;
    }
    else if(goal.length < 5){
        alert("Not enough meals listed! Please recheck " + dayArray[today] + " Meals and check for missing/misplaced commas.");
        return false;
    }
    //console.log("ayo");
    return true;
}

//Generate Goal function
function generateGoal(theDay){
    genText = "";
    for(i=0; i<5; i++){
        genText += (theDay[i] + "<br/>");
    }
    return genText;
}