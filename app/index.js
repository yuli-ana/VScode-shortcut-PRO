// Create a namespace
const quizApp = {};

// Create an array of objects with question and correct answer
quizApp.quiz = [
    { question: "Enter shortcut command to create a new file ?", answer: ["Meta", "n"], userKeys: [], },
    { question: "Enter shortcut command to insert backtick notation `` ?", answer: ["Control", "`"], userKeys: [], },
    { question: "Enter shortcut command to find anything in VScode ?", answer: ["Meta", "f"], userKeys: [], },
    { question: "Enter shortcut command to open file ?", answer: ["Meta", "o"], userKeys: [], },
    { question: "Enter shortcut command - quick open ?", answer: ["Meta", "p"], userKeys: [], }
];


quizApp.animateModal = (i) => {
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

quizApp.keyChecker = (key) => {
    // In a key placeholder I passed e.key argument
    // Change the default value of META & SPACE keys 
    if (key === "Meta") {
        key = "cmd";
    }

    if (key === "Space") {
        key = "space";
    }
}


quizApp.userInput = (input) => {
    // Push user inputs into "userKeys" array
}

quizApp.updateCounter = (val) => {
    const counterValue = $(".counter").text(`${val}`);
    return counterValue;
}

quizApp.openModalScore = (num) => {
    const myArr = quizApp.quiz;
    if ((myArr.length - 1) === num) {

        // Display: none modal intro when game is over
        $('.modalScore').removeClass('close');

        // Add animation
        setTimeout(function () {
            $(".modalScoreLeft").animate({
                left: "0"
            }, 1000);

            $(".modalScoreRight").animate({
                right: "0"
            }, 1000);
        })

        // Wait for animation to be finished then display score window
        setTimeout(function () {
            $('.scoreTotal').show(2000, function () {
                $(this).css({ "top": "15%" });
            });
        }, 2000)
    }
}

quizApp.init = () => {
    let counter = 0;
    $('.modalScore').addClass('close');



    $(".buttonStart").on("click", function (e) {
        // prevent link default behaviour 
        e.preventDefault();

        // index starts at 0
        quizApp.animateModal(counter);
    });


    // Listen "document" object on the keydown event 
    $(document).on("keydown", function (e) {
        // Prevent browser default behavior 
        if (e.key === "s" || e.key === "o" || e.key === "f" || e.key === "p") {
            e.preventDefault();
        }

        quizApp.keyChecker(e.key);
        quizApp.userInput(e.key)
    });




    $(".buttonNext").on("click", function (e) {
        e.preventDefault();

        $("h2").text(`${quizApp.quiz[++counter].question}`);
        
        // Clears up user input
        $(".userInput1").text("");
        $(".userInput2").text("");

        quizApp.updateCounter((counter + 1));
        quizApp.openModalScore(counter);
    })
}





$(function () {
    quizApp.init();
})

