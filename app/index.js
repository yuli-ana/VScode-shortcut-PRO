// Select: (modal left/right, startButton, intro, userInput)

const modalLeft = $(".modalLeft");
const modalRight = $(".modalRight");
const intro = $('.intro');
const buttonStart = $('.buttonStart');

// Create an array of objects with question and correct answer

const quiz = [
    { question: "Enter shortcut command to create a new file ?", answer: ["Meta", 'n'] },
    { question: "Enter shortcut command to insert backtick notation `` ?", answer: ["Control", '`'] },
    { question: "Enter shortcut command to find anything in VScode ?", answer: ["Meta", 'f'] },
    { question: "Enter shortcut command to open file ?", answer: ["Meta", 'o'] },
    { question: "Enter shortcut command - quick open ?", answer: ["Meta", 'p'] }
];





$(function () {
    buttonStart.on('click', function (e) {
         // prevent link default behaviour 
         e.preventDefault();
 
         // Remove width from modal left/right to hide it (or animate)
         $(modalRight).animate({
             width: 0
         });
         $(modalLeft).animate({
             width: 0
         });
 
         // Hide introduction text
         $(intro).hide();
     }) 



    // Listen "document" object on the keydown event 
    let userKeys = [];

    $(document).on('keydown', function (e) {
        // Prevent browser default behavior 
        if (e.key === 's' || e.key === 'o' || e.key === 'f' || e.key === 'p' || e.key === 'n') {
            e.preventDefault();
        }

        // Change the default value of META & SPACE keys 
        if (e.key === "Meta") {
            e.key = 'cmd';
        }

        if (e.code === "Space") {
            e.key = "space";
        }

        // Push user inputs into array
        userKeys.push(e.key);

        // Update html with first user input
        let firstInput = $('.userInput1').text(userKeys[0]);
        let secondInput = $('.userInput2').text(userKeys[1]);

        if (userKeys.length > 2) {
            userKeys = [];
            userKeys.push(e.key);
            firstInput.text(userKeys[0]);
            secondInput.text(userKeys[1]);
        }
    });




    let counter = 0;
    let counter2 = 1;

    const updateCounter = (val) => {
        $('.counter').text(`${val}`);
    }

    let innerHtml = $('h2').text(`${quiz[counter].question}`);

    $('.buttonNext').on('click', function (e) {
        e.preventDefault();
        innerHtml = $('h2').text(`${quiz[++counter].question}`);
        $('.userInput1').text('');
        $('.userInput2').text('');
        updateCounter(++counter2);
    })
});



// for (let i = 0; i < quiz.length; i++) {
//     console.log(quiz[i].answer[i]);
//     for (let l = 0; l < userKeys.length; l++) {
//         if (quiz[i].answer[i] === userKeys[l]) {
//             console.log(true);
//         } 
//     }
// }


 // Create a namespace
        // Create an array of objects with a question and correct answer
        // Select: (modal left/right, startButton, intro, userInput)

        // Modal-intro pseudo-code (on click event):
        // prevent link default behaviour 
        // Remove width from modal left/right to hide it (or animate)
        // Hide introduction text



        // Quiz game pseudo-code :
        // Listen "document" on keydown event
        // Pass (event) object as an argument to the callback
        // Prevent default behaviour 
        // Prevent browser shortcuts default behaviour
        // Create an array "userKeys" = [] inside of "quiz"
        // Store user input in an array "userKeys"
        // Update DOM with the user input dynamically 
        // Create new object "score"
        // Loop through the quiz array 
        // While looping compare (with if statement) "userKeys" and "answer"
        // Store each "question" and (true/false) answer in a "score" object
        // Update modal window DOM with the user inputs

        // Add click event:
        // prevent link default behaviour 
        // add counter
        // On click event update counter (add 1) each time user hit "next" button
        // Update HTML "counter" dynamically
        // Update question (on click is should display next question)
        // Keep track of last question with if statement
        // When last question was answered pop up modal window (addClass('open')) with the user score

        // On page load call init method
