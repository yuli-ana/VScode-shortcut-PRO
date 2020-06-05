// Create a namespace
const quizApp = {};
quizApp.counter = 0;

// Create an array of objects with question and correct answer
quizApp.quiz = [
    { question: "Enter shortcut for creating a new file ?", answer: ["Cmd", "n"], userKeys: [], },
    { question: "Enter shortcut to open terminal ?", answer: ["Control", "`"], userKeys: [], },
    { question: "Enter shortcut to quickly find/replace text in currently open file ?", answer: ["Cmd", "f"], userKeys: [], },
    { question: "Enter shortcut to open folder ?", answer: ["Cmd", "o"], userKeys: [], },
    { question: "Enter shortcut to quickly open a file/folder ?", answer: ["Cmd", "p"], userKeys: [], }
];


quizApp.animateModal = function () {
    // Remove width from modal left/right to hide it (or animate)
    $('.modalRight').animate({
        width: 0
    });

    $(".modalLeft").animate({
        width: 0
    });

    // Hide introduction text
    $(".intro").hide();

    //     // On click ("buttonStart") render 1 question
    //     $("h2").text(`${this.quiz[this.counter].question}`);
}

quizApp.hideRulesModal = function () {
    $('.closeRules').on('click', (e) => {
        e.preventDefault();

        // On click ("buttonStart") render 1 question
        $("h2").text(`${this.quiz[this.counter].question}`);

        $('.headerRules').animate({
            top: "-80%"
        }, 1000);
    })
}

quizApp.showRulesModal = function () {
    $('.headerRules').animate({
        top: "20%"
    }, 1000);

    this.hideRulesModal();
}


quizApp.clearHtml = () => {
    $(".userInput1").text("");
    $(".userInput2").text("");

}

quizApp.updateScoreHtml = function () {
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

quizApp.updateCounter = function () {
    $(".counter").text(`${this.counter < 5 ? this.counter + 1 : '5'}`);
}

quizApp.shuffleArray = function (arr) {
    let newArr, temp;
    for (let i = arr.length - 1; i > 0; i--) {
        newArr = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[newArr];
        arr[newArr] = temp;
    }

    return arr;
}

quizApp.openModalScore = function () {
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
        $('.scoreTotal').animate({
            top: "10%"
        });
    }, 2000)

}



quizApp.init = function () {
    $('.modalScore').addClass('close');

    $(".buttonStart").on("click", (e) => {
        e.preventDefault();

        this.animateModal();

        this.showRulesModal();

    });


    // Listen "document" object on the keydown event 
    $(document).on("keydown", (e) => {
        let key = e.key;

        // Prevent browser default behavior on keys 
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

    $('.btnPlayAgain').on('click', () => {
        $('.modalIntro').addClass('close');
        this.shuffleArray(this.quiz);
    })



    $(".buttonNext").on("click", (e) => {
        e.preventDefault();

        if (this.counter < this.quiz.length - 1) {
            $("h2").text(`${this.quiz[this.counter + 1].question}`);
            console.log(this.counter);
        }else {
            this.openModalScore();
        }
        
        if ((this.quiz.length - 1) >= this.counter) {
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

