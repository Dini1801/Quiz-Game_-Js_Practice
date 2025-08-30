const questions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        a: "var",
        b: "int",
        c: "string",
        d: "declare",
        correct: "a",
    },
    {
        question: "Which symbol is used for addition in JavaScript?",
        a: "-",
        b: "+",
        c: "*",
        d: "/",
        correct: "b",
    },
    {
        question: "Which of these is used to display a message in the browser console?",
        a: "print()",
        b: "log()",
        c: "console.log()",
        d: "alert()",
        correct: "c",
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        a: "alertBox('Hello World');",
        b: "msg('Hello World');",
        c: "console.log('Hello World');",
        d: "alert('Hello World');",
        correct: "d",
    },
    {
        question: "Which data type is used to store true/false values?",
        a: "Boolean",
        b: "String",
        c: "Number",
        d: "Object",
        correct: "a",
    }
];

const quiz = document.getElementById("quiz");
const resultELe = document.getElementById("result-cont");
const scoreEle = document.getElementById("score");

const answersEle = document.querySelectorAll(".answer");
const questionEle = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const prev = document.getElementById("prev");
const next = document.getElementById("Next");   
const submit = document.getElementById("Submit");


let currentQ = 0;
let answered = 0;
let submitted = false;

let userselected = {};

loadQuiz();

function loadQuiz() {
    
    document.querySelectorAll(".op-label").forEach(lbl => {
        lbl.classList.remove("correct", "wrong");
    });

    questionEle.innerText = questions[currentQ].question;
    a_text.innerText = questions[currentQ].a;
    b_text.innerText = questions[currentQ].b;
    c_text.innerText = questions[currentQ].c;
    d_text.innerText = questions[currentQ].d;

    deSelect();

    if (userselected[currentQ]) {
        let selected = userselected[currentQ];
        document.getElementById(selected).checked = true;
    }
}

function deSelect() {
    answersEle.forEach((ans) => (ans.checked = false));

    
    if (currentQ === questions.length - 1) {
        next.style.display = "none";
        submit.style.display = "block";
    } else {
        next.style.display = "block";
        submit.style.display = "none";
    }

  
}

submit.addEventListener("click", () => {
    let answer = getSelected();

    if (!answer) {
        alert("Please select an option before submitting!");
        return;
    }

    if (answer === questions[currentQ].correct) {
        answered++;
    }

    submitted = true;
    quiz.style.display = "none";
    resultELe.style.display = "block";
    scoreEle.innerText =
        answered + "/" + questions.length + " questions answered correctly";
});



next.addEventListener("click", () => {
    let answer = getSelected();
    if (answer) {
        if (answer === questions[currentQ].correct) {
            answered++;
        }
        currentQ++;
        if (currentQ < questions.length) {
            loadQuiz();
        }
    } else {
        alert("Please select an option before proceeding!");
    }
});

prev.addEventListener("click", () => {
    if (currentQ > 0) {
        currentQ--;
        loadQuiz();
    }
});

function getSelected() {
    let answ;
    answersEle.forEach((ans) => {
        if (ans.checked) {
            answ = ans.id;
            userselected[currentQ] = answ;
        }
    });
    return answ;
}
