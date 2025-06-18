const category = document.querySelector("#trivia_category");
const difficulty = document.querySelector("#trivia_difficulty");
const type = document.querySelector("#trivia_type");
const APILink = makeAPILink(category.value,difficulty.value,type.value);

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
    console.log(category,difficulty,type);
    console.log(APILink);
    
    //resetting all values of select tags
    category.value = "any";
    difficulty.value = "any";
    type.value = "any";

    //Removing choosePage
    document.querySelector("#choosePage").style.opacity = 0;

    //showing loader
    document.querySelector("#loader").style.opacity = 1;

    //show animation
    // document.querySelector("#quizQuestions").classList.add("moveAnimation");
});

