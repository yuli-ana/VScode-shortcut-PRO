// NAMESPACE
const quizApp = {};
quizApp.counter = 0;

// DATA STRUCTURE
quizApp.quiz = [
    { question: "Enter shortcut for creating a new file ?", answer: ["Cmd", "n"], userKeys: [], },
    { question: "Enter shortcut to open terminal ?", answer: ["Control", "`"], userKeys: [], },
    { question: "Enter shortcut to quickly find/replace text in currently open file ?", answer: ["Cmd", "f"], userKeys: [], },
    { question: "Enter shortcut to open folder ?", answer: ["Cmd", "o"], userKeys: [], },
    { question: "Enter shortcut to quickly open a file/folder ?", answer: ["Cmd", "p"], userKeys: [], }
];

// ANIMATE MODAL
quizApp.animateModal = function () {
    const modalLeft = $(".modalLeft");
    const modalRight = $(".modalRight");
    // Remove width from modal left/right to hide it
    modalRight.animate({
        width: 0
    });

    modalLeft.animate({
        width: 0
    });

    // Hide an introduction text
    $(".modalIntroTitle").hide();

}

// SHOW MODAL RULES
quizApp.showRulesModal = function () {
    $(".mainRules").animate({
        top: "20%"
    }, 1000);

    this.hideRulesModal();
}

// HIDE MODAL RULES
quizApp.hideRulesModal = function () {
    $(".btnCloseRules").on("click", (e) => {
        e.preventDefault();

        // On click ("buttonStart") render 1 question
        $("h2").text(`${this.quiz[this.counter].question}`);

        $(".mainRules").animate({
            top: "-80%"
        }, 1000);
    })
}

// CLEAR HTML
quizApp.clearHtml = () => {
    $(".userInput1").text("");
    $(".userInput2").text("");

}

// UPDATE SCORE
quizApp.updateScoreHtml = function () {
    const scoreList = $(".scoreList");
    const myArr = this.quiz;

    scoreList.empty();

    // Update DOM with questions and score
    myArr.forEach(question => {
        const listItem = $("<li>").addClass("auto").css({ "align-items": "center" });
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

// UPDATE AN INPUT
quizApp.updateInput = function (input) {
    const userArr = this.quiz;
    const i = this.counter;

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

//UPDATE COUNTER
quizApp.updateCounter = function () {
    let counter = this.counter;
    $(".counter").text(`${counter < 5 ? counter + 1 : counter}`);
}

//SHUFFLE AN ARRAY
quizApp.shuffleArray = function () {

    // Assign an empty array to update userKeys for each game
    const arr = this.quiz.forEach(item => {
        item.userKeys = [];
    });

    let newArr, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        newArr = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[newArr];
        arr[newArr] = temp;
    }
}

// OPEN MODAL SCORE
quizApp.openModalScore = function () {
    // Show modal score when game is over
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
        $(".modalScoreTotal").animate({
            top: "10%"
        });
    }, 2000)

}

// CLOSE MODAL SCORE
quizApp.closeModalScore = function () {
    $(".modalScoreTotal").animate({
        top: "-100%"
    }, 200);

    setTimeout(function () {
        $(".modalScoreLeft").animate({
            left: "-50%"
        }, 1000);

        $(".modalScoreRight").animate({
            right: "-50%"
        }, 1000);
    })

    this.updateScoreHtml();

    setTimeout(function () {
        $(".modalScore").addClass("close");
    }, 2000);
}

// START APP
quizApp.init = function () {
    // Hide modal score
    $(".modalScore").addClass("close");

    // BUTTON START
    $(".btnStart").on("click", (e) => {
        e.preventDefault();

        this.clearHtml();
        this.animateModal();
        this.showRulesModal();

        setTimeout(function () {
            $(".modalIntro").css({ "display": "none" })
        }, 1000);
    });

    // KEYDOWN EVENT
    $(document).on("keydown", (e) => {
        let key = e.key;

        // Prevent browser default behavior on specific keys
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

    // BUTTON PLAY AGAIN
    $(".btnPlayAgain").on("click", (e) => {
        e.preventDefault();

        this.counter = 0;
        this.updateCounter();

        this.clearHtml();
        this.closeModalScore();
        this.shuffleArray();

        $("h2").text(`${this.quiz[this.counter].question}`);

    })

    // BUTTON NEXT
    $(".btnNext").on("click", (e) => {
        e.preventDefault();

        if (this.counter < this.quiz.length - 1) {
            $("h2").text(`${this.quiz[this.counter + 1].question}`);
            this.counter += 1;
        } else {
            this.openModalScore();
        }

        this.clearHtml();
        this.updateCounter();
    })
}

$(function () {
    quizApp.init();
})

