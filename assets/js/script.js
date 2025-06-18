const category = document.querySelector("#trivia_category");
const difficulty = document.querySelector("#trivia_difficulty");
const type = document.querySelector("#trivia_type");
const choosePage = document.querySelector(".choosePage");
const loader = document.querySelector(".loader");
const quizQuestions = document.querySelector(".quizQuestions")

//making the api link
function makeAPILink(category,difficulty,type) {
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
    const APILink = makeAPILink(category.value,difficulty.value,type.value);
    console.log(APILink);
    
    //resetting all values of select tags
    category.value = "any";
    difficulty.value = "any";
    type.value = "any";
    
    //Removing choosePage
    choosePage.classList.add("hide");

    //showing loader
    loader.classList.add("show");
    
    startQuizProcessMCQ(APILink);
});

const questionsSet = [];
async function startQuizProcessMCQ(APILink) {
    const response = await fetch(APILink);
    const data = await response.json();
    console.log(data.results);
    (data.results).forEach(element => {
        // choices = [];
        // // correctAnsIndex = Math.floor(Math.random()*4);
        // for (let index = 0; index < 4; index++) {
            //     if (correctAnsIndex === index) {
                //         choices.push(element.correct_answer);
                //         continue;
                //     }
                //     choices.push(element.incorrect_answers[k++]);
                // }
                // console.log(choices);
                questionsSet.push(
                    {
                        question: `${element.question}`,
                        incorrect_choices: `${element.incorrect_answers}`,
                        correct_choice: `${element.correct_answer}`,
                    }
                )        
            });
            console.log(questionsSet);
            
            //hiding loader and showing questions
            loader.classList.add("hide");
            quizQuestions.classList.add("moveAnimation");
        }