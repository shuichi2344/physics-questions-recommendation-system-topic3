const questionElement = document.getElementById("question");
const difficultyElement = document.getElementById("difficulty");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
const maxQuestions = 15;
let consecutiveIncorrectAnswers = 0;
let askedQuestionIDs = []; // Array to store IDs of asked questions 
let similarQuestionsQueue = [];

const questions = [
    {
        QuestionID: 3001,
        Topics: "Work, Energy, and Power",
        Question: "A force of 50 N is applied to an object to move it a distance of 5 m. How much work is done on the object?",
        AnswerChoices: ["250 J", "200 J", "300 J", "150 J"],
        Answer: "250 J",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3008, 3020, 3002],
        Similarity_Score: [1.0, 0.41835681668449554, 0.39136700655805856]
    },
    {
        QuestionID: 3002,
        Topics: "Work, Energy, and Power",
        Question: "An object with a mass of 2 kg is lifted vertically through a distance of 5 m. What is the change in gravitational potential energy of the object?",
        AnswerChoices: ["100 J", "90 J", "50 J", "20 J"],
        Answer: "100 J",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3031, 3024, 3035],
        Similarity_Score: [1.0000000000000002, 0.5193015723810906, 0.3873558736640648]
    },
    {
        QuestionID: 3003,
        Topics: "Work, Energy, and Power",
        Question: "A 500 W motor is used to lift a 200 kg object vertically upwards. How long does it take to raise the object by 4 meters?",
        AnswerChoices: ["20 s", "16 s", "25 s", "10 s"],
        Answer: "16 s",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3023, 3036, 3001],
        Similarity_Score: [1.0000000000000002, 0.44493739252013037, 0.3330298515767271]
    },
    {
        QuestionID: 3004,
        Topics: "Work, Energy, and Power",
        Question: "A 1000 kg car accelerates from rest to a speed of 20 m/s in 5 seconds. What is the average power developed by the engine during this time?",
        AnswerChoices: ["4000 W", "2000 W", "2500 W", "5000 W"],
        Answer: "4000 W",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3027, 3012, 3020],
        Similarity_Score: [1.0000000000000004, 0.6910588135634764, 0.6858601741125245]
    },
    {
        QuestionID: 3005,
        Topics: "Work, Energy, and Power",
        Question: "How much work is done to stop a car of mass 1200 kg that is moving at a speed of 15 m/s? (Assuming it comes to rest)",
        AnswerChoices: ["90000 J", "60000 J", "80000 J", "70000 J"],
        Answer: "90000 J",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3032, 3038, 3015],
        Similarity_Score: [1.0, 0.42663424776609077, 0.36515190008075343]
    },
    {
        QuestionID: 3006,
        Topics: "Work, Energy, and Power",
        Question: "A machine lifts a load of 500 N vertically upwards through a distance of 10 m. How much work does the machine do against gravity?",
        AnswerChoices: ["5000 J", "50000 J", "5500 J", "4500 J"],
        Answer: "5000 J",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3037, 3009, 3036],
        Similarity_Score: [0.9999999999999998, 0.7048164835763971, 0.45236762904555433]
    },
    {
        QuestionID: 3007,
        Topics: "Work, Energy, and Power",
        Question: "A ball is thrown vertically upwards with an initial velocity of 15 m/s. What is its kinetic energy when it reaches its maximum height?",
        AnswerChoices: ["112.5 J", "150 J", "75 J", "100 J"],
        Answer: "112.5 J",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3022, 3024, 3032],
        Similarity_Score: [1.0, 0.6732741293480479, 0.3735161498683692]
    },
    {
        QuestionID: 3008,
        Topics: "Work, Energy, and Power",
        Question: "A force of 20 N is applied to push a crate across a frictionless surface for a distance of 5 m. How much work is done?",
        AnswerChoices: ["100 J", "50 J", "75 J", "25 J"],
        Answer: "100 J",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3014, 3001, 3020],
        Similarity_Score: [1.0000000000000002, 0.6077718417484619, 0.41835681668449554]
    },
    {
        QuestionID: 3009,
        Topics: "Work, Energy, and Power",
        Question: "A machine lifts a mass of 200 kg to a height of 10 m in 20 seconds. What is the power output of the machine?",
        AnswerChoices: ["1000 W", "200 W", "500 W", "1500 W"],
        Answer: "1000 W",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3037, 3006, 3016],
        Similarity_Score: [1.0000000000000004, 0.681349564345633, 0.45236762904555433]
    },
    {
        QuestionID: 3010,
        Topics: "Work, Energy, and Power",
        Question: "A spring with a force constant of 200 N/m is compressed by 0.2 m. What is the potential energy stored in the spring?",
        AnswerChoices: ["8 J", "16 J", "4 J", "12 J"],
        Answer: "8 J",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3033, 3025, 3038],
        Similarity_Score: [1.0, 0.8648265268712418, 0.7785168547720623]
    },
    {
        QuestionID: 3011,
        Topics: "Work, Energy, and Power",
        Question: "An object of mass 5 kg is dropped from a height of 10 m. What is its kinetic energy just before it hits the ground?",
        AnswerChoices: ["500 J", "250 J", "100 J", "750 J"],
        Answer: "500 J",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3026, 3024, 3032],
        Similarity_Score: [1.0, 0.49820566241211817, 0.4497401755679493]
    },
    {
        QuestionID: 3012,
        Topics: "Work, Energy, and Power",
        Question: "A 60 kg sprinter accelerates from rest to a speed of 10 m/s in 4 seconds. What is the average power developed during this acceleration?",
        AnswerChoices: ["1500 W", "600 W", "750 W", "1000 W"],
        Answer: "1500 W",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3027, 3004, 3020],
        Similarity_Score: [1.0000000000000002, 0.7929810605255857, 0.6858601741125245]
    },
    {
        QuestionID: 3013,
        Topics: "Work, Energy, and Power",
        Question: "A roller coaster car with a mass of 500 kg starts from rest at a height of 50 m. What is its kinetic energy at the bottom of the first hill?",
        AnswerChoices: ["250000 J", "125000 J", "100000 J", "175000 J"],
        Answer: "250000 J",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3035, 3032, 3018],
        Similarity_Score: [1.0000000000000002, 0.39043757920942096, 0.3559936006297725]
    },
    {
        QuestionID: 3014,
        Topics: "Work, Energy, and Power",
        Question: "A machine applies a force of 200 N to push a block along a frictionless horizontal surface for a distance of 10 m. How much work is done?",
        AnswerChoices: ["2000 J", "4000 J", "1600 J", "1000 J"],
        Answer: "2000 J",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3008, 3020, 3037],
        Similarity_Score: [1.0, 0.6077718417484619, 0.5142439050487827]
    },
    {
        QuestionID: 3015,
        Topics: "Work, Energy, and Power",
        Question: "How much work is required to lift a 50 kg crate to a height of 8 m above the ground? (Assuming g = 10 m/s²)",
        AnswerChoices: ["4000 J", "5000 J", "3200 J", "6000 J"],
        Answer: "4000 J",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3021, 3005, 3008],
        Similarity_Score: [1.0000000000000002, 0.319416141274105, 0.30587443797062247]
    },
    {
        QuestionID: 3016,
        Topics: "Work, Energy, and Power",
        Question: "A motor lifts a load of 3000 N vertically upwards through a distance of 15 m in 20 seconds. What is the power output of the motor?",
        AnswerChoices: ["2250 W", "3000 W", "3750 W", "4000 W"],
        Answer: "2250 W",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3036, 3037, 3009],
        Similarity_Score: [1.0, 0.594460120562726, 0.4236629946807572]
    },
    {
        QuestionID: 3017,
        Topics: "Work, Energy, and Power",
        Question: "A car engine produces a constant power of 60 kW. How much work does it do in 10 seconds?",
        AnswerChoices: ["600 kJ", "6 MJ", "600 J", "6 kJ"],
        Answer: "600 kJ",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [3039, 3030, 3006],
        Similarity_Score: [1.0, 0.8122687257230825, 0.47313979561535446]
    },
    {
        QuestionID: 3018,
        Topics: "Work, Energy, and Power",
        Question: "A block of ice with a mass of 2 kg slides down a frictionless incline from a height of 10 m. What is its speed at the bottom of the incline?",
        AnswerChoices: ["14 m/s", "20 m/s", "10 m/s", "7 m/s"],
        Answer: "20 m/s",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3024, 3027, 3013],
        Similarity_Score: [1.0000000000000002, 0.3766852421747807, 0.3676611842010807]
    },
    {
        QuestionID: 3019,
        Topics: "Work, Energy, and Power",
        Question: "A light bulb consumes 60 J of electrical energy per second. How much power does it consume in kilowatts?",
        AnswerChoices: ["60 kW", "0.06 kW", "0.6 kW", "600 kW"],
        Answer: "0.06 kW",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3017, 3039, 3022],
        Similarity_Score: [1.0, 0.2654418807255468, 0.19767158052656392]
    },
    {
        QuestionID: 3020,
        Topics: "Work, Energy, and Power",
        Question: "A 50 kg block is pushed along a rough horizontal surface with a force of 100 N. If the coefficient of kinetic friction is 0.3, how much work is done to move the block a distance of 10 m?",
        AnswerChoices: ["700 J", "650 J", "750 J", "800 J"],
        Answer: "650 J",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3014, 3026, 3038],
        Similarity_Score: [1.0, 0.5142439050487827, 0.4970085860681282]
    },
    {
        QuestionID: 3021,
        Topics: "Work, Energy, and Power",
        Question: "A mass is raised to a height of 20 meters above the ground. What is the increase in its gravitational potential energy if the acceleration due to gravity is 9.8 m/s²?",
        AnswerChoices: ["1960 J", "2000 J", "1800 J", "1900 J"],
        Answer: "1960 J",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3031, 3026, 3002],
        Similarity_Score: [1.0000000000000002, 0.4838810141317829, 0.42508710368705827]
    },
    {
        QuestionID: 3022,
        Topics: "Work, Energy, and Power",
        Question: "A ball is thrown vertically upward with an initial velocity of 30 m/s. What is its maximum height?",
        AnswerChoices: ["45 m", "60 m", "30 m", "15 m"],
        Answer: "45 m",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [3007, 3024, 3032],
        Similarity_Score: [1.0, 0.6732741293480479, 0.23728005516727493]
    },
    {
        QuestionID: 3023,
        Topics: "Work, Energy, and Power",
        Question: "A 5000 W engine is used to lift a load vertically upwards. If the engine lifts a 1000 kg load a distance of 10 meters, how long does it take to accomplish this?",
        AnswerChoices: ["2 s", "4 s", "6 s", "8 s"],
        Answer: "2 s",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3003, 3036, 3006],
        Similarity_Score: [1.0000000000000002, 0.44493739252013037, 0.3924360306625267]
    },
    {
        QuestionID: 3024,
        Topics: "Work, Energy, and Power",
        Question: "A 2 kg object is moving with a velocity of 10 m/s. What is its kinetic energy?",
        AnswerChoices: ["100 J", "50 J", "20 J", "200 J"],
        Answer: "100 J",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [3032, 3011, 3029],
        Similarity_Score: [1.0000000000000002, 0.7085989190897154, 0.4497401755679493]
    },
    {
        QuestionID: 3025,
        Topics: "Work, Energy, and Power",
        Question: "A cyclist applies a constant force of 200 N to pedal a bicycle up a hill with an incline of 30 degrees to the horizontal. If the cyclist covers a distance of 100 m along the incline, what is the work done against gravity?",
        AnswerChoices: ["10000 J", "17320 J", "20000 J", "8660 J"],
        Answer: "10000 J",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3021, 3028, 3018],
        Similarity_Score: [1.0000000000000002, 0.5952476421163914, 0.47353212030345154]
    },
    {
        QuestionID: 3026,
        Topics: "Work, Energy, and Power",
        Question: "A ball is dropped from a height of 20 m above the ground. If it loses 20% of its mechanical energy due to air resistance, what is its speed just before hitting the ground?",
        AnswerChoices: ["14.7 m/s", "12.7 m/s", "15.7 m/s", "10.7 m/s"],
        Answer: "14.7 m/s",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3011, 3021, 3031],
        Similarity_Score: [1.0000000000000002, 0.49820566241211817, 0.42508710368705827]
    },
    {
        QuestionID: 3027,
        Topics: "Work, Energy, and Power",
        Question: "A car of mass 1500 kg accelerates from rest to a speed of 30 m/s in 10 seconds. What is the average power developed during this acceleration?",
        AnswerChoices: ["4500 W", "3000 W", "1500 W", "6000 W"],
        Answer: "4500 W",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3012, 3004, 3035],
        Similarity_Score: [1.0000000000000002, 0.7929810605255857, 0.6910588135634764]
    },
    {
        QuestionID: 3028,
        Topics: "Work, Energy, and Power",
        Question: "A 300 kg object is lifted to a height of 20 m. What is the work done against gravity?",
        AnswerChoices: ["58800 J", "5880 J", "588000 J", "588 J"],
        Answer: "5880 J",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [3002, 3001, 3021],
        Similarity_Score: [1.0000000000000002, 0.3700514519827797, 0.3364213226203099]
    },
    {
        QuestionID: 3029,
        Topics: "Work, Energy, and Power",
        Question: "A bullet with a mass of 0.05 kg is fired from a gun with a velocity of 300 m/s. What is its kinetic energy?",
        AnswerChoices: ["2250 J", "450 J", "900 J", "675 J"],
        Answer: "2250 J",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3032, 3024, 3035],
        Similarity_Score: [1.0000000000000004, 0.44904294943250606, 0.4452795560079721]
    },
    {
        QuestionID: 3030,
        Topics: "Work, Energy, and Power",
        Question: "A rocket of mass 1000 kg accelerates vertically upwards with a constant force of 5000 N for 10 seconds. What is the change in kinetic energy of the rocket during this time?",
        AnswerChoices: ["500 kJ", "500 J", "50 kJ", "50 J"],
        Answer: "500 kJ",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3004, 3035, 3027],
        Similarity_Score: [1.0, 0.4035046375388686, 0.39755217790747954]
    },
    {
        QuestionID: 3031,
        Topics: "Work, Energy, and Power",
        Question: "A 2 kg object is held 5 meters above the ground. What is the gravitational potential energy of the object with respect to the ground?",
        AnswerChoices: ["98 J", "49 J", "10 J", "20 J"],
        Answer: "98 J",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3002, 3021, 3024],
        Similarity_Score: [1.0, 0.5193015723810906, 0.4838810141317829]
    },
    {
        QuestionID: 3032,
        Topics: "Work, Energy, and Power",
        Question: "A car of mass 1200 kg is moving with a velocity of 20 m/s. What is its kinetic energy?",
        AnswerChoices: ["240 kJ", "240 J", "24 kJ", "24 J"],
        Answer: "240 kJ",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [3024, 3035, 3029],
        Similarity_Score: [1.0000000000000002, 0.7085989190897154, 0.47449993657376904]
    },
    {
        QuestionID: 3033,
        Topics: "Work, Energy, and Power",
        Question: "A spring has a spring constant of 500 N/m. If it is compressed by 0.1 m, what is the potential energy stored in the spring?",
        AnswerChoices: ["2.5 J", "25 J", "5 J", "50 J"],
        Answer: "2.5 J",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3010, 3025, 3038],
        Similarity_Score: [1.0, 0.8648265268712418, 0.7943055460033897]
    },
    {
        QuestionID: 3034,
        Topics: "Work, Energy, and Power",
        Question: "A person exerts a force of 50 N to lift a box vertically upwards through a distance of 3 m. How much work is done by the person?",
        AnswerChoices: ["150 J", "100 J", "200 J", "50 J"],
        Answer: "150 J",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3001, 3026, 3040],
        Similarity_Score: [1.0000000000000002, 0.3375605606462847, 0.33304544295704674]
    },
    {
        QuestionID: 3035,
        Topics: "Work, Energy, and Power",
        Question: "A car of mass 1500 kg accelerates from rest to a velocity of 30 m/s. What is the change in kinetic energy of the car?",
        AnswerChoices: ["675 kJ", "450 kJ", "900 kJ", "225 kJ"],
        Answer: "675 kJ",
        Difficulty_Level: "Intermediate",
        Similar_Question_ID: [3027, 3032, 3022],
        Similarity_Score: [1.0, 0.5734330543094889, 0.47449993657376904]
    },
    {
        QuestionID: 3036,
        Topics: "Work, Energy, and Power",
        Question: "A 500 W motor lifts a load vertically upwards with a force of 1000 N. If the load is raised by 5 meters in 10 seconds, what is the efficiency of the motor?",
        AnswerChoices: ["50%", "25%", "75%", "100%"],
        Answer: "50%",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3016, 3023, 3037],
        Similarity_Score: [1.0000000000000002, 0.594460120562726, 0.3924360306625267]
    },
    {
        QuestionID: 3037,
        Topics: "Work, Energy, and Power",
        Question: "A machine lifts a load of 500 N vertically upwards through a distance of 10 m. If the machine applies a constant force, what is the power output of the machine?",
        AnswerChoices: ["500 W", "1000 W", "200 W", "250 W"],
        Answer: "500 W",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3006, 3009, 3016],
        Similarity_Score: [1.0, 0.7048164835763971, 0.681349564345633]
    },
    {
        QuestionID: 3038,
        Topics: "Work, Energy, and Power",
        Question: "A block of mass 2 kg is moving with a speed of 10 m/s. If it is brought to rest by a constant frictional force in a distance of 5 m, what is the work done by friction?",
        AnswerChoices: ["100 J", "50 J", "200 J", "25 J"],
        Answer: "100 J",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3020, 3005, 3027],
        Similarity_Score: [1.0, 0.43907371650034854, 0.36515190008075343]
    },
    {
        QuestionID: 3039,
        Topics: "Work, Energy, and Power",
        Question: "A car engine produces a constant power of 75 kW. How much work does it do in 5 minutes?",
        AnswerChoices: ["2250 MJ", "15 MJ", "3750 MJ", "30 MJ"],
        Answer: "2250 MJ",
        Difficulty_Level: "Easy",
        Similar_Question_ID: [3017, 3030, 3006],
        Similarity_Score: [1.0, 0.8122687257230825, 0.4539290911091252]
    },
    {
        QuestionID: 3040,
        Topics: "Work, Energy, and Power",
        Question: "A weightlifter raises a barbell weighing 200 N vertically upwards through a distance of 2 m. How much work is done by the weightlifter?",
        AnswerChoices: ["400 J", "100 J", "200 J", "800 J"],
        Answer: "400 J",
        Difficulty_Level: "Difficult",
        Similar_Question_ID: [3034, 3006, 3029],
        Similarity_Score: [1.0000000000000002, 0.3133487836598442, 0.24686295112424247]
    }
];

function startQuiz() {
    console.log('Quiz Starting:', askedQuestionIDs);

    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    difficultyElement.style.display = "inline-block";
    shuffleQuestions(questions); // Shuffle questions for randomization
    originalIncorrectQuestion = null; // Reset originalIncorrectQuestion
    similarQuestionsQueue = []; // Reset similar questions queue
    loadQuestion();

    // Reset questionsAnswered
    questionsAnswered = 0;
}

function shuffleQuestions(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    resetState();
    console.log('Loading Question:', currentQuestionIndex, askedQuestionIDs); 

    currentQuestion = questions[currentQuestionIndex];
    
    questionElement.innerHTML = currentQuestion.Question;
    difficultyElement.innerHTML = currentQuestion.Difficulty_Level;

    currentQuestion.AnswerChoices.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn");
        
        if(answer === currentQuestion.Answer){
            button.dataset.correct = "true";
        }
        
        // Pass currentQuestion as an argument to selectAnswer
        button.addEventListener("click", (e) => selectAnswer(e, currentQuestion));
        answerButtons.appendChild(button);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    // Remove existing 'correct' and 'incorrect' classes
    Array.from(answerButtons.children).forEach(button => {
    button.classList.remove("correct", "incorrect");
    button.disabled = false; // Re-enable buttons
  });
}
let originalIncorrectQuestion = null; // Make this global
let similarQuestionsLoaded = false; // Flag to track if similar questions are already loaded

function selectAnswer(e, currentQuestion) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // Check if the question has not been answered before
    if (!selectedBtn.classList.contains("correct") && !selectedBtn.classList.contains("incorrect")) {
        totalQuestionsAnswered++; // Increment the total questions answered

        // Highlight the selected answer
        if (isCorrect) {
            selectedBtn.classList.add("correct");
            score++;
        } else {
            selectedBtn.classList.add("incorrect");
            // Set originalIncorrectQuestion if the selected answer is incorrect
            originalIncorrectQuestion = currentQuestion;
            // Set similar question IDs
            similarQuestionIDs = currentQuestion.Similar_Question_ID.slice(0, 3); // Get the first three similar question IDs
            shuffleQuestions(similarQuestionIDs); // Shuffle similar question IDs for randomization
        }

        // Disable all buttons
        Array.from(answerButtons.children).forEach(button => {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
        });

        // Show the "Next" button
        nextButton.style.display = "block";
    }
}



let similarQuestionsDisplayed = 0; // Variable to track the number of similar questions displayed for the current incorrect question
let similarQuestionIDs = []; // Array to store the similar question IDs for the current incorrect question
let totalQuestionsAnswered = 0; // Variable to track the total number of questions answered

function nextQuestion() {
    if (originalIncorrectQuestion !== null) {
        loadSimilarQuestion(); // Call loadSimilarQuestion if there's an original incorrect question
    } else {
        handleNextButton(); // Otherwise, proceed with handling the next question as usual
    }
}

function loadSimilarQuestion() {
    // Hide the "Next" button initially
    nextButton.style.display = "none";

    // Load similar questions up to a maximum of 3 times
    if (similarQuestionsDisplayed < 3 && similarQuestionIDs.length > 0) {
        const similarQuestionID = similarQuestionIDs.shift();
        const similarQuestion = questions.find(q => q.QuestionID === similarQuestionID);

        if (similarQuestion) {
            // Display the similar question
            questionElement.innerHTML = similarQuestion.Question;
            difficultyElement.innerHTML = `Difficulty: ${similarQuestion.Difficulty_Level}`;

            // Remove existing answer buttons
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }

            // Create buttons for each answer choice
            similarQuestion.AnswerChoices.forEach(answer => {
                const button = document.createElement("button");
                button.innerHTML = answer;
                button.classList.add("btn");

                if (answer === similarQuestion.Answer) {
                    button.dataset.correct = "true";
                } else {
                    button.dataset.correct = "false"; // Ensure all incorrect choices are marked as such
                }

                button.addEventListener("click", (e) => selectAnswer(e, similarQuestion));
                answerButtons.appendChild(button);
            });
            similarQuestionsDisplayed++;
        }
    } else {
        // If there are no more similar questions to display or the maximum limit is reached, proceed to the next question
        handleSimilarQuestionEnd();
    }
}

function handleSimilarQuestionEnd() {
    // Reset similar questions displayed count and similar question IDs
    similarQuestionsDisplayed = 0;
    similarQuestionIDs = [];
    // Reset originalIncorrectQuestion to continue the quiz normally
    originalIncorrectQuestion = null;
    // Proceed to the next question or show score if 15 questions have been answered
    if (totalQuestionsAnswered < 15) {
        handleNextButton();
    } else {
        showScore();
    }
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${maxQuestions}!`;
    difficultyElement.style.display = "none";
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block"; // Make sure the button is displayed
}
  
// Define a variable to track the number of questions answered
let questionsAnswered = 0;

function handleNextButton() {
    const result = document.querySelector(".result");
    if (result) {
        result.remove();
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < maxQuestions) {
        if (originalIncorrectQuestion !== null) {
            loadSimilarQuestion(originalIncorrectQuestion.Similar_Question_ID);
        } else {
            loadQuestion();
        }
    } else {
        showScore();
        currentQuestionIndex = 0;
        originalIncorrectQuestion = null;
        nextButton.innerHTML = "Try Again";
        nextButton.style.display = "block";
        nextButton.addEventListener("click", handleTryAgain);
    }
}

answerButtons.addEventListener("click", function(e) {
    // Pass the event object and currentQuestion to the selectAnswer function
    selectAnswer(e, currentQuestion);
});

// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
    if (questionsAnswered < maxQuestions) {
        handleNextButton();
    }
});

function handleTryAgain() {
    // Reset all relevant variables and states
    originalIncorrectQuestion = null;
    similarQuestionsDisplayed = 0;
    similarQuestionIDs = [];
    totalQuestionsAnswered = 0;
    score = 0;

    // Remove the event listener for "Try Again"
    nextButton.removeEventListener("click", handleTryAgain);

    // Restart the quiz
    startQuiz();
}

startQuiz(); 