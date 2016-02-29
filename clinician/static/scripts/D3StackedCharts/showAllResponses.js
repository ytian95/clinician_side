//create Option Header
    //one row for the header options
function createRadioOptions(panel_table,optionType){
	var table_row = document.createElement("tr");
	panel_table.appendChild(table_row);
	//fill row with data
    for (var i=0; i<=optionType.length;i++){
    	var table_data = document.createElement("td");
    	table_row.appendChild(table_data);
    	
    	if (i==0){
    		//add nothin
    		var questionText= document.createTextNode( " ");
    		table_data.appendChild(questionText);

    	}else{
    		table_data.className= "textToCenter";
    		//add radio button
			var questionText= document.createTextNode(optionType[i-1]);
    		table_data.appendChild(questionText);
    	}
    }


}

//create a row of question and options
function createTableRow(panel_table,question_Answer,optionType,radioOrNot){
 	var table_row = document.createElement("tr");
    panel_table.appendChild(table_row);
    //number of radio buttons needed depends on input type
    for (var i=0; i<=optionType.length;i++){
    	var table_data = document.createElement("td");
    	table_row.appendChild(table_data);
    	if (i==0){
    		//add question
    		var questionText= document.createTextNode( question_Answer[0]);
    		table_data.appendChild(questionText);

    	}else{
    		//add radio button
    		//TODO select the right button
    		table_data.className= "textToCenter";
    		var label_radio_input =document.createElement("input");
    		//some questions have checkboxes instead of radio
    		if (radioOrNot){
    			label_radio_input.setAttribute("type", "radio");

    		}else {
    			label_radio_input.setAttribute("type", "checkbox");

    		}
    		
    		table_data.appendChild(label_radio_input);
    	}
    }
}


//display all questions and answer for the array
function displayQuestionsAndAnswers(questionsList,optionType,panelHeading,radioOrNot){
	//add a container for questions
	var div_for_all_Responses = document.createElement("div");
	div_for_all_Responses.className= "display_box_for_all_responses";
    //the summary button is preselected so responses are hidden
    div_for_all_Responses.style.display = 'none';
    var bodyDOM = document.getElementsByTagName("body")[0];
    bodyDOM.appendChild(div_for_all_Responses);

    // default panel
    var  panel_default = document.createElement("div");
	panel_default.className= "panel panel-default";
    div_for_all_Responses.appendChild(panel_default);

    //add panel heading
    var panel_heading = document.createElement("div");
	panel_heading.className= "panel-heading";
    panel_default.appendChild(panel_heading);
    var heading_text= document.createTextNode(panelHeading);
    panel_heading.appendChild(heading_text);

    //add table
    var  panel_table = document.createElement("table");
	panel_table.className= "table";
    panel_default.appendChild(panel_table);

    //add header
    createRadioOptions(panel_table,optionType);

    for (questionAnswer of questionsList) {
    	//visualize questions 
    	createTableRow(panel_table,questionAnswer,optionType,radioOrNot);

    }

}




//show all the responses when the response toggle  button is clicked
function showAllResponses(sectionName){
	if (sectionName=='BPSC'){
		//add all subsections ittitability, inflexibility and difficulty with routines
		allTheAnswers=(data[month][listOfSections[i]]["Irritability"]["questions"]).concat((data[month][listOfSections[i]]["Inflexibility"]["questions"])).concat((data[month][listOfSections[i]]["Difficulty with Routines"]["questions"]));
        //console.log(allTheAnswers);		
	}else{
		allTheAnswers=data[month][listOfSections[i]]["questions"];
		//console.log(allTheAnswers);		
	}
	// displayQuestionsAndAnswers(allTheAnswers);

	//display all questions and answer for the array
	if (sectionName=='BPSC'){
		displayQuestionsAndAnswers(allTheAnswers,BPSC_allQuestion,'BPSC',true);
	}else if (sectionName=='PPSC' ){
		//PPSC and Parent's concers have the same option
		displayQuestionsAndAnswers(allTheAnswers,PPSC_allQuestion,'PPSC',true);

	}else if ( sectionName=='Parent Concerns'){
		displayQuestionsAndAnswers(allTheAnswers,parent_concern_allQuestion,'Parent Concerns',true);

	}else if (sectionName=='Development Milestones'){
		displayQuestionsAndAnswers(allTheAnswers,developmental_milestones_allQuestion,'Development Milestones',true);

	}else if (sectionName=='POSI'){
		displayQuestionsAndAnswers(allTheAnswers.slice(0 ,1),POSI_firstQuestion,'POSI',true);
		displayQuestionsAndAnswers(allTheAnswers.slice(1,5),POSI_secondToFifthQuestion,'',true);
		displayQuestionsAndAnswers(allTheAnswers.slice(5,6),POSI_sixth,'',false);
		displayQuestionsAndAnswers(allTheAnswers.slice(6,7),POSI_seventh,'',false);
		
	}else if (sectionName=='Emotional Changes With A New Baby'){
		displayQuestionsAndAnswers(allTheAnswers.slice(0 ,1),EmotionalChanges_first,'',true);
		displayQuestionsAndAnswers(allTheAnswers.slice(1 ,2),EmotionalChanges_second,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(2 ,3),EmotionalChanges_third,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(3 ,4),EmotionalChanges_fourth,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(4 ,5),EmotionalChanges_fifth,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(5 ,6),EmotionalChanges_sixth,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(6 ,7),EmotionalChanges_seventh,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(7 ,8),EmotionalChanges_eighth,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(8 ,9),EmotionalChanges_ninth,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(9 ,10),EmotionalChanges_tenth,'',true);

	}else if (sectionName=='Family Questions'){
		displayQuestionsAndAnswers(allTheAnswers.slice(0 ,5),familyQuestions_OneToFive,'',true);
		if (allTheAnswers.length==9){
            displayQuestionsAndAnswers(allTheAnswers.slice(5,7),familyQuestions_SixToSeven,'',true);
		}
		displayQuestionsAndAnswers(allTheAnswers.slice(7 ,8),familyQuestions_SecondToLast,'',true);
        displayQuestionsAndAnswers(allTheAnswers.slice(8 ,9),familyQuestions_Last,'',true);

	}else {
		console.log ("Invalid section Name");
	}


    	//visualize answers
}




