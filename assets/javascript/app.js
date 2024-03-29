var trivia = {
    //  Array of questions, answers, images and correct selection
    QandA: [
        {
           Question: "The Lord of the Rings movies are based on a novel by what author?",
           CorrectAns: "J. R. R. Tolkien",
           Answers: [
               "George R. R. Martin", "J. R. R. Tolkien", "J. K. Rowling", "William Shakespeare"
           ],
           Image: "../TriviaGame/assets/images/tolkien.gif"
        },
        {
           Question: "The only way to destroy the Ring of Power is to throw it into the fires of?",
           CorrectAns: "Mount Doom",
            Answers: [
                "Mount Zion", "Mount Doom", "Mount Mordor", "Mount Everest"
           ],
            Image: "../TriviaGame/assets/images/doom.gif"
        },
        {
            Question: "Which of the following is NOT one of Gandalf's many nicknames?",
            CorrectAns: "Flame of Udun",
            Answers: [
                "The Grey Pilgrim", "Gandalf Greyhame", "Flame of Udun", "Gandalf Stormcrow"
            ],
            Image: "../TriviaGame/assets/images/gandalf.gif"
        },
        {
            Question: "How does Frodo knows Sam?",
            CorrectAns: "Sam is Frodo's gardener",
            Answers: [
                "Sam is Frodo's BFF", "Sam is Frodo's software developer", "Sam is Frodo's second cousin", "Sam is Frodo's gardener"
            ],
            Image: "../TriviaGame/assets/images/sam.gif"
        },
        {
            Question: "Who is Aragorn in love with?",
            CorrectAns: "Arwen",
            Answers: [
                "Arwen", "Éowyn", "Elrond", "Himself"
            ],
            Image: "../TriviaGame/assets/images/arwen.gif"
        }  
    ]
};
//  Clone object of QandA from trivia object
var emptytrivia = {
    QandA : []
};
//  The quesiton lap is determined by the varible value of length inside the trivia object
var questionLap = trivia.QandA.length;
// Time variable 
var time;
// Correct and Incorrect answer trackers
var correct = 0;
var incorrect = 0;
// Support variables -  Start
var k;
var checker;
var intervalId;
var clockRunning = false;
// Support variables -  End

//  The timeStuff object and it methods controls time and run a check per second and lap number.
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

        //  TODO: increment time by 1, remember we cant use "this" here.
        time--;
        

        //  TODO: Get the current time, pass that into the timeConverter function,
        //        and save the result in a variable.
        //console.log(time);
        let convertedTime = timeStuff.timeConverter(time);
        //console.log(timeStuff.timeConverter(time));
        
        //  TODO: Use the variable you just created to show the converted time in the "display" div.
        
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

        //  TODO: Use clearInterval to stop the count here and set the clock to not be running.
        clearInterval(intervalId);
        clockRunning = false;

    }
};
//  The game objects holds methods that carry timer assignments and HTML manipulation.
var game = {
    //  Starts the game
    play: function() {

        checker = false;
        $("#result").empty();
        //  Variable questions and answers happens right here
        k = Math.floor(Math.random() * trivia.QandA.length)
        //You can adjust the time for questions here
        time = 20 + 1;
        timeStuff.startTimer();
        timeStuff.runTimer();
        $(".lead").text('Time remaining:')
        $("#question").text(trivia.QandA[k].Question)

        //  Display list of answers to a specific question
        for (i = 0; i < trivia.QandA[k].Answers.length; i++) {
            $("ul").append("<li><button>" + trivia.QandA[k].Answers[i] + "</button></li>");  
        };

        //  Correct or Incorrect Logic
        $("button").click( function() {
            if (this.innerHTML === trivia.QandA[k].CorrectAns) {
                //  Correct answer path
                correct++;
                questionLap--;
                checker = true;
                console.log(correct);
                $(".lead").empty();
                $(".timer").empty();
                $("#question").empty();
                $("#answers").empty();
                $("#result").append("<h3>");
                $("h3").text("You picked the correct answer, my friend!");
                $("#result").append("<img>");
                $("img").addClass("size");
                $("img").attr("src", trivia.QandA[k].Image);
                timeStuff.stopTimer();
                time = 5;
                timeStuff.startTimer();
                timeStuff.runTimer();
                //  Removal from current question from the game, to avoid repeated questions
                trivia.QandA.splice(k, 1);
                
            } else {
                //  Wrong answer path
                incorrect++;
                questionLap--;
                checker = true;
                console.log(incorrect);
                $(".lead").empty();
                $(".timer").empty();
                $("#question").empty();
                $("#answers").empty();
                $("#result").append("<h3>");
                $("h3").text("This is not the correct answer, my friend! The correct answer is " + trivia.QandA[k].CorrectAns);
                timeStuff.stopTimer();
                time = 5;
                timeStuff.startTimer();
                timeStuff.runTimer();
                //  Removal from current question from the game, to avoid repeated questions
                trivia.QandA.splice(k, 1);
                
            };
        });
    },
    //  Displays results from game when there are no more questions
    finish: function(cor, inc) {
        $("#result").text("Here's how you did - Correct Answers: " + cor + " Incorrect Answers: " + inc);
        $("#result").append("<button> Start Again? </button>");

        //  Restart the game
        $("button").click( function() {
            correct = 0;
            incorrect = 0;
            for (i = 0; i < emptytrivia.QandA.length; i++) {
                trivia.QandA.push(emptytrivia.QandA[i]);
            }
            questionLap = trivia.QandA.length;
            game.play();
        })
    }
}

//  Play game when the window is fully loaded
window.onload = function() {

    // Clone variable emptytrivia get's values from trivia object
    for (i = 0 ; i < trivia.QandA.length ; i++){
        emptytrivia.QandA.push(trivia.QandA[i]);
    }
    // Game plays after clonning
    game.play();
}