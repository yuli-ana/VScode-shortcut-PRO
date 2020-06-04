// Create a namespace
const quizApp = {};
quizApp.counter = 0;

// Create an array of objects with question and correct answer
quizApp.quiz = [
    { question: "Enter shortcut command to create a new file ?", answer: ["cmd", "n"], userKeys: [], },
    { question: "Enter shortcut command to insert backtick notation `` ?", answer: ["control", "`"], userKeys: [], },
    { question: "Enter shortcut command to find anything in VScode ?", answer: ["cmd", "f"], userKeys: [], },
    { question: "Enter shortcut command to open file ?", answer: ["cmd", "o"], userKeys: [], },
    { question: "Enter shortcut command - quick open ?", answer: ["cmd", "p"], userKeys: [], }
];


quizApp.animateModal = function() {
    // Remove width from modal left/right to hide it (or animate)
    $('.modalRight').animate({
        width: 0
    });

    $(".modalLeft").animate({
        width: 0
    });

    // Hide introduction text
    $(".intro").hide();

    // Load first quiz question on pressing start button
    $("h2").text(`${this.quiz[this.counter].question}`);
}


quizApp.clearHtml = () => {
    $(".userInput1").text("");
    $(".userInput2").text("");

}

quizApp.updateScoreHtml = function() {
    const scoreList = $(".scoreList");
    const myArr = this.quiz;
    
    // Update DOM with questions and score
    myArr.forEach((question) => {
        const listItem = $("<li>").addClass("auto");
        const questionHtml = $("<p>").addClass("auto");
        const finalScore = $("<p>").addClass("questionFinalScore auto");
        let defaultAnswer = "correct";
        questionHtml.text(question.question);

        for (let i = 0; i < question.answer.length; i += 1) {
            if (question.answer[i] !== question.userKeys[i]) {
                defaultAnswer = "fail";
            }
        }

        finalScore.text(defaultAnswer);

        listItem.append(questionHtml, finalScore);
        scoreList.append(listItem);
    })
}

quizApp.updateInput = function(input) {
    const userArr = this.quiz;
    const i = this.counter;
    console.log(i);

    //If userKey.length < answer.length allow to populate "userKey" array with user input, esle empty an array
    if (userArr[i].userKeys.length < userArr[i].answer.length) {
        userArr[i].userKeys.push(input);
    } else {
        userArr[i].userKeys.length = 0;
        userArr[i].userKeys.push(input);
    }

    // Update the DOM with the user inputs
    $(".userInput1").text(userArr[i].userKeys[0]);
    $(".userInput2").text(userArr[i].userKeys[1]);
}

quizApp.updateCounter = function () {
    $(".counter").text(`${this.counter + 1}`);
}

quizApp.openModalScore = function() {
    // Hide modal intro when game is over
    $(".modalScore").removeClass("close");

    // Animate 
    setTimeout(function () {
        $(".modalScoreLeft").animate({
            left: "0"
        }, 1000);

        $(".modalScoreRight").animate({
            right: "0"
        }, 1000);
    })    

    this.updateScoreHtml();

    // Wait for animation to be finished then display score window
    setTimeout(function () {
        $('.scoreTotal').show(2000, function () {

            $(this).css({ "top": "10%" });
        });
    }, 2000)
}


quizApp.init = function () {
    $('.modalScore').addClass('close');

    $(".buttonStart").on("click", (e) => {
        e.preventDefault();

        this.animateModal();
    });


    // Listen "document" object on the keydown event 
    $(document).on("keydown", (e) => {
        let key = e.key;
        // Prevent browser default behavior 
        if (e.key === "s" || e.key === "o" || e.key === "f" || e.key === "p") {
            e.preventDefault();
        }


        // Change default value of META & SPACE keys 
        if (key === "Meta") {
            key = "Cmd";
        }

        if (key === " ") {
            key = "Space";
        }

        this.updateInput(key);
    });




    $(".buttonNext").on("click", (e) => {
        e.preventDefault();

        $("h2").text(this.quiz[this.counter += 1].question);

        this.clearHtml();
        this.updateCounter();

        // Check when user hits the last question
        if ((this.quiz.length - 1) === this.counter) {
            this.openModalScore();
        }
    })
}



$(function () {
    quizApp.init();
})

