//change name. Contains the QeustionBlock and buttons
//handles any other buttons on the page ie Submit
function QuestionsPage(){
	
}

//Contains Questions
//variables need to be renamed
/*function QuestionBlock(container){
	this.container = container; //id will be adding questions to
}

QuestionBlock.prototype.show = function(questionsText){
	this.container.innerHTML = "";
	for(var i = 0; i < questionsText.length; i++){
        var newDevQuestion = document.createElement("dev-question");
        newDevQuestion.questionString = questionsText[i];
        this.container.appendChild(newDevQuestion);
	}
}
*/

function getScore() {
    console.log("click");
    var list = document.querySelectorAll("dev-question"); // use document.querySelecotorAll() to get the elements.
    console.log(list[0].score); //get the score of first question
}

function initialize(){
	//window.alert(document.getElementById("dmQuestions"));
	/*var questionBlock = new QuestionBlock(
		document.querySelector("dev-page"));

    questionBlock.show(["Makes sounds that let you know he or she is happy or upset",
     "Seems happy to see you ", "Follows a moving toy with his or her eyes", "Turns head to find the person who is talking","Holds head steady when being pulled up to a sitting position", "Brings hands together", "Laughs", "Keeps head steady when held in a sitting position", 'Makes sounds like "ga," "ma," or "ba"', "Looks when you call his or her name" ]);
     */
}

window.onload = initialize;