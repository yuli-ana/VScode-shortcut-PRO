// Create a namespace
const quizApp = {};

// Create an array of objects with question and correct answer
quizApp.quiz = [
    { question: "Enter shortcut command to create a new file ?", answer: ["cmd", "n"], userKeys: [], },
    { question: "Enter shortcut command to insert backtick notation `` ?", answer: ["control", "`"], userKeys: [], },
    { question: "Enter shortcut command to find anything in VScode ?", answer: ["cmd", "f"], userKeys: [], },
    { question: "Enter shortcut command to open file ?", answer: ["cmd", "o"], userKeys: [], },
    { question: "Enter shortcut command - quick open ?", answer: ["cmd", "p"], userKeys: [], }
];

quizApp.counter = 0;

quizApp.animateModal = i => {
    // Remove width from modal left/right to hide it (or animate)
    $(".modalRight").animate({
        width: 0
    });

    $(".modalLeft").animate({
        width: 0
    });

    // Hide introduction text
    $(".intro").hide();

    // Load first quiz question on pressing strat button
    $("h2").text(`${quizApp.quiz[i].question}`);
}


quizApp.userInput = (input, i) => {
    // Push user inputs into "userKeys" array
    const userArr = quizApp.quiz;

    //Allows to hold only 2 values in an array

    if (userArr[i].userKeys.length < userArr[i].answer.length) {
        userArr[i].userKeys.push(input);
    } else {
        userArr[i].userKeys = [];
        userArr[i].userKeys.push(input);
    }

    $(".userInput1").text(userArr[i].userKeys[0]);
    $(".userInput2").text(userArr[i].userKeys[1]);
}

quizApp.updateCounter = val => {
    const counterHTML = $(".counter").text(`${val}`);
    return counterHTML;
}

quizApp.openModalScore = num => {
    const myArr = quizApp.quiz;
    const scoreList = $(".scoreList");

    // Hide modal intro when game is over
    $(".modalScore").removeClass("close");

    // Add animation
    setTimeout(function () {
        $(".modalScoreLeft").animate({
            left: "0"
        }, 1000);

        $(".modalScoreRight").animate({
            right: "0"
        }, 1000);
    })

    // Update DOM with questions and score
    myArr.forEach(question => {
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

    // Wait for animation to be finished then display score window
    setTimeout(function () {
        $('.scoreTotal').show(2000, function () {

            $(this).css({ "top": "10%" });
        });
    }, 2000)
}


quizApp.init = function() {
    $('.modalScore').addClass('close');


    $(".buttonStart").on("click", (e) => {
      
        // prevent link default behaviour 
        e.preventDefault();

        // index starts at 0
        this.animateModal(this.counter);
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

        this.userInput(key, this.counter);
    });




    $(".buttonNext").on("click", (e) => {
        e.preventDefault();

        this.counter += 1;

        $("h2").text(this.quiz[this.counter].question);

        // Clears up user input
        $(".userInput1").text("");
        $(".userInput2").text("");

        quizApp.updateCounter((this.counter + 1));

        if ((this.quiz.length - 1) === this.counter) {
            this.openModalScore();
        }
    })
}



$(function () {
    quizApp.init();
})

