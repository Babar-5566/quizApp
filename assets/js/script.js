const category = document.querySelector("#trivia_category");
const difficulty = document.querySelector("#trivia_difficulty");
const type = document.querySelector("#trivia_type");
const choosePage = document.querySelector(".choosePage");
let loader = document.querySelector(".loader");
const quizQuestions = document.querySelector(".quizQuestions");
const nxtBtn = document.querySelector(".nextMessage button");
const mssgBox = document.querySelector(".nextMessage .messageBox");
const scoreBoard = document.querySelector(".scoreBoard");

//making the api link
function makeAPILink(category, difficulty, type) {
    let baseLink = "https://opentdb.com/api.php?amount=10";
    if (category !== "any") {
        baseLink += `&category=${category}`;
    }
    if (difficulty !== "any") {
        baseLink += `&difficulty=${difficulty}`;
    }
    if (type !== "any") {
        baseLink += `&type=${type}`;
    }
    return baseLink
}

//when the next button is clicked on the choosePage
document.querySelector("form button").addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(category,difficulty,type);
    const APILink = makeAPILink(category.value, difficulty.value, type.value);
    console.log(APILink);

    //resetting all values of select tags
    category.value = "any";
    difficulty.value = "any";
    type.value = "any";

    //Removing choosePage
    choosePage.classList.add("hide");
    
    //showing loader and animating it
    loader.classList.add("show");
    let count = 0;
    const si_id = setInterval(() => {
        count = (count + 1) % 4; // cycles between 0 to 3
        loader.innerText = "Loading" + ".".repeat(count);
    }, 500);
    
    //disabling all the selecct as they are only not visible but present (opacity=0)
    const allSelects = choosePage.querySelectorAll("select");
    allSelects.forEach(element => {
        element.disabled = true;
    });
    startQuizProcessMCQ(APILink, si_id);
});

let questionsSet = [];
async function startQuizProcessMCQ(APILink, si_id) {
    const response = await fetch(APILink);
    const data = await response.json();
    questionsSet = data.results;
    console.log(questionsSet);
    // (data.results).forEach(element => {
    //     questionsSet.push(
    //         {
    //             question: `${element.question}`,
    //             incorrect_choices: `${Array.from(element.incorrect_answers)}`,
    //             correct_choice: `${element.correct_answer}`,
    //         }
    //     )
    // });
    // console.log(questionsSet);
    
    //making ten html elements for questions
    for (let count = 0; count < questionsSet.length; count++) {
        if (questionsSet[count].type === "multiple"){
            const mcqElement = makeQuestionElementMCQ(questionsSet[count],count);
            quizQuestions.insertBefore(mcqElement, document.querySelector(".nextMessage"));
        } else {
            const boolElement = makeQuestionElementBool(questionsSet[count],count);
            quizQuestions.insertBefore(boolElement, document.querySelector(".nextMessage"));
        }
    }
    
    const domQuestionSet = document.querySelectorAll(".eachQuestion");
    
    //hiding loader and showing questions
    loader.classList.add("hide");
    clearInterval(si_id);
    quizQuestions.classList.add("moveAnimation");
    
    let count = 0;
    domQuestionSet[count].classList.remove("displayHide");
    
    nxtBtn.addEventListener("click", () => {
        const selectedOption = domQuestionSet[count].querySelector('input[type="radio"]:checked');
        //check if any option selected or not
        if(!selectedOption){
            // showMssgBox("Please Select a option","warning");
            alert("Please Select a option");
            return;
        } 
        
        domQuestionSet[count].classList.add("displayHide");
        count++;
        console.log(count,questionsSet.length);
        if(count===domQuestionSet.length){
            nxtBtn.classList.add("displayHide");
            scoreBoard.classList.add("moveAnimation");
            showScoreBoard();
            return;
        }   
        domQuestionSet[count].classList.remove("displayHide");
    })

}

function showScoreBoard() {
    
}

// function showMssgBox(errorMssg,type){
//     if(type==="warning") mssgBox.style.backgroundColor = "red";
//         mssgBox.children[0].innerHTML = errorMssg;
//     setTimeout(() => {
//         mssgBox.style.opacity = 0;
//     }, 2000);
// }

// <div class="eachQuestion">
//     <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, pariatur?</h2>
//     <input type="radio" name="choice" value="0" id="choice0">
//         <label for="choice0">
//             Lorem ipsum dolor sit amet.
//         </label><br>
//             <input type="radio" name="choice" value="1" id="choice1">
//                 <label for="choice1">
//                     Lorem ipsum dolor sit amet.
//                 </label><br>
//                     <input type="radio" name="choice" value="2" id="choice2">
//                         <label for="choice2">
//                             Lorem ipsum dolor sit amet.
//                         </label><br>
//                             <input type="radio" name="choice" value="3" id="choice3">
//                                 <label for="choice3">
//                                     Lorem ipsum dolor sit amet.
//                                 </label><br>
//                                 </div>

function makeQuestionElementMCQ(question,count) {
    const element = document.createElement("div");
    element.classList.add(`eachQuestion`);
    element.classList.add(`question${count}`);
    element.classList.add(`displayHide`);
    const h2 = document.createElement("h2");
    h2.innerHTML = question.question;
    element.appendChild(h2);
    const rndmIdx = Math.floor(Math.random()*4);
    console.log(rndmIdx);
    
    let k = 0
    for (let count = 0; count < 4; count++) {
        const input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "choice");
        input.setAttribute("value", `${count}`);
        input.setAttribute("id", `choice${count}`);
        const label = document.createElement("label");
        label.setAttribute("for", `choice${count}`);
        if(count === rndmIdx)   label.innerText = `${question.correct_answer}`;
        else label.innerHTML = `${question.incorrect_answers[k++]}`;
        element.appendChild(input);
        element.appendChild(label);
        element.appendChild(document.createElement("br"));
    }
    return element;
}
function makeQuestionElementBool(question,count) {
    const element = document.createElement("div");
    element.classList.add(`eachQuestion`);
    element.classList.add(`question${count}`);
    element.classList.add(`displayHide`);
    const h2 = document.createElement("h2");
    h2.innerHTML = question.question;
    element.appendChild(h2);
    const rndmIdx = Math.floor(Math.random()*2);
    
    let k = 0;
    for (let count = 0; count < 2; count++) {
        const input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "choice");
        input.setAttribute("value", `${count}`);
        input.setAttribute("id", `choice${count}`);
        const label = document.createElement("label");
        label.setAttribute("for", `choice${count}`);
        if(count === rndmIdx)   label.innerText = `${question.correct_answer}`;
        else label.innerHTML = `${question.incorrect_answers[k++]}`;
        element.appendChild(input);
        element.appendChild(label);
        element.appendChild(document.createElement("br"));
    }
    return element;
}