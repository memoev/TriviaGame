# TriviaGame
A Lord of the Rings trivia game using JavaScript as logic and jQuery to manipulate HTML.

## Game Proposition
  
This game can be added to either a static or dynamic web page to make it more attrative to clicks (no SEO).

## Instructions :memo:  
  
Trivia game randomly looping through an array/list of quesitons and answers. The game starts showing one question until the player answers it or their time runs out. If the player selects the correct answer, a screen congratulating them for choosing the right option is displayed. After a `5 seconds` wait, the next questions is display -- without user input.  
    
The scenario is similar for wrong answers and time-outs. If the player runs out of time, a time's up screen shows up and the correct answer gets displayed, after a `5 seconds` wait the next question is showed. If the player chooses the wrong answer, the game tells the player they selected the wrong option and displays along the correct answer. Following the same `5 sesonds` time logic, it shows the next question. 
  
On the final screen, you'll be able to see the number of correct answers, incorrect answers, and an option to restart the game (without having to reload the page).  
  
## Code Overview :deciduous_tree:

I would like to start by stating that this code is still a little WET and needs to get refactored, but it works like a charm! Refactorization will be done as a part of the maintenance to the code. It's been proven that *"Premature optimization is the root of all evil" - Donald Knuth*. 
  
Time is the most important variable in this assignment, because along with the buttons, controls the ligc of the game. Time gets strated, run, and stoped using the `setInterval` and `clearInterval` javascript methods, encapsulated inside and object that also has a `timeConverter` method embeded. 
  
Since the `runTime` method inside of the `timeStuff` object is the one that "controls" time reducing it by 1, there's a check point for `(time === 0)`. First of all if empties the display, stops time with `stopTimer`, and checks on which lap the game is at. Laps are definied as a variable depending on the legnth of the string of possible Q&As. So, if `(questionLap === 0)` the `finish` method inside of the `game` object gets called, if not, the game keeps doing wit the `play` method.  
  
```javascript
var timeStuff = {
    timeConverter: function(t) {

        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },
    startTimer: function() {

        if (!clockRunning) {
            intervalId = setInterval(this.runTimer, 1000);
            this.clockRunning = true;

        }
    },
    runTimer: function() {

        time--;
        
        let convertedTime = timeStuff.timeConverter(time);
        
        $('.timer').text(convertedTime);
        if (time === 0) {
            $("#result").empty();
            $("#question").empty();
            $("#answers").empty();
            timeStuff.stopTimer();
            if (questionLap === 0){
                game.finish(correct, incorrect);
            } else {
                if (checker !== false) {
                    game.play();
                } else {
                    incorrect++;
                    questionLap--;
                    console.log(incorrect);
                    $(".lead").empty();
                    $(".timer").empty();
                    $("#question").empty();
                    $("#answers").empty();
                    $("#result").append("<h3>");
                    $("h3").text("Time is not eternal, my friend! The correct answer is " + trivia.QandA[k].CorrectAns);
                    timeStuff.stopTimer();
                    time = 5;
                    timeStuff.startTimer();
                    timeStuff.runTimer();
                    trivia.QandA.splice(k, 1);
                    checker =  true;
                }
            }
        }
        
    },
    stopTimer: function() {

        clearInterval(intervalId);
        clockRunning = false;

    }
};
```
## Prerequisites
Working web browser (e.g Chrome, Firefox, Safari, Opera, etc.) fromt the list of browser that support jQuery (https://jquery.com/browser-support/):

* Desktop:
  * Chrome: (Current - 1) and Current
  * Edge: (Current - 1) and Current
  * Firefox: (Current - 1) and Current, ESR
  * Internet Explorer: 9+
  * Safari: (Current - 1) and Current
  * Opera: Current

* Mobile
  * Stock browser on Android 4.0+
  * Safari on iOS 7+