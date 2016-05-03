//This js file is to show the original questions and responses selected

//create Option Header
    //one row for the header options
function createRadioOptions(panel_table,optionType){
	var table_row = document.createElement("tr");
    table_row.id="row_border" //for border
    table_row.style.backgroundColor="#ebebe0";
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
//radioOrNot: radio button or Check box
//Odd  is for background color 
function createTableRow(panel_table,question_Answer,optionType,radioOrNot,Odd){
 	var table_row = document.createElement("tr");
    //table_row.id="row_border"
    //if odd color grey
    if (Odd){
        table_row.style.backgroundColor="#d6d6c2";
    }
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

    		var label_radio_input =document.createElement("label");
            var inline_input =document.createElement("input");
            label_radio_input.appendChild(inline_input);
           
             
    		//some questions have checkboxes instead of radio
    		if (radioOrNot){
    			inline_input.setAttribute("type", "radio");
                // same name for all options in a row unless multiple answers can be selected
                inline_input.name=question_Answer[0];
            // select the radio button for patient answer
            // if patient answer == and 0 is the first option so i+1
            // some sections have multiple answers
                if (question_Answer[1]==(i-1)){
                    inline_input.setAttribute("checked", "checked");
                }                

    		}else {
                //checkbox means multiple answers can be selected
    			inline_input.setAttribute("type", "checkbox");
                //console.log(question_Answer[1]);
                if (question_Answer[1].indexOf(i-1) >= 0){

                    inline_input.setAttribute("checked", "checked");
                }

    		}
    		
    		table_data.appendChild(label_radio_input);

    	}
    }
}


//display all questions and answer for a given question list
function displayQuestionsAndAnswers(questionsList,optionType,containerDiv,panelHeading,radioOrNot){
	//add a container for questions
	var div_for_all_Responses = document.createElement("div");
	div_for_all_Responses.className= "display_box_for_all_responses";
    //the summary button is preselected so responses are hidden
    div_for_all_Responses.style.display = 'none';
    containerDiv.appendChild(div_for_all_Responses);

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
    counterOE=0;
    for (questionAnswer of questionsList) {
        if(counterOE%2 ==0){
            oddOrEven=false;
        }else{
           oddOrEven=true; 
        }
    	//visualize questions 
    	createTableRow(panel_table,questionAnswer,optionType,radioOrNot,oddOrEven);
        counterOE=counterOE+1

    }

}




//show all the responses when the response toggle  button is clicked
function showAllResponses(sectionName,containerDiv){
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
		displayQuestionsAndAnswers(allTheAnswers,BPSC_allQuestion,containerDiv,'BPSC',true);
	}else if (sectionName=='PPSC' ){
		//PPSC and Parent's concers have the same option
		displayQuestionsAndAnswers(allTheAnswers,PPSC_allQuestion,containerDiv,'PPSC',true);

	}else if ( sectionName=='Parent Concerns'){
		displayQuestionsAndAnswers(allTheAnswers,parent_concern_allQuestion,containerDiv,'Parent Concerns',true);

	}else if (sectionName=='Development Milestones'){
		displayQuestionsAndAnswers(allTheAnswers,developmental_milestones_allQuestion,containerDiv,'Development Milestones',true);

	}else if (sectionName=='POSI'){
		displayQuestionsAndAnswers(allTheAnswers.slice(0 ,1),POSI_firstQuestion,containerDiv,'POSI',true);
		displayQuestionsAndAnswers(allTheAnswers.slice(1,5),POSI_secondToFifthQuestion,containerDiv,'',true);
		displayQuestionsAndAnswers(allTheAnswers.slice(5,6),POSI_sixth,containerDiv,'',false);
		displayQuestionsAndAnswers(allTheAnswers.slice(6,7),POSI_seventh,containerDiv,containerDiv,'',false);
		
	}else if (sectionName=='Emotional Changes With A New Baby'){
		displayQuestionsAndAnswers(allTheAnswers.slice(0 ,1),EmotionalChanges_first,containerDiv,'',true);
		displayQuestionsAndAnswers(allTheAnswers.slice(1 ,2),EmotionalChanges_second,containerDiv,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(2 ,3),EmotionalChanges_third,containerDiv,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(3 ,4),EmotionalChanges_fourth,containerDiv,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(4 ,5),EmotionalChanges_fifth,containerDiv,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(5 ,6),EmotionalChanges_sixth,containerDiv,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(6 ,7),EmotionalChanges_seventh,containerDiv,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(7 ,8),EmotionalChanges_eighth,containerDiv,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(8 ,9),EmotionalChanges_ninth,containerDiv,'',true);
 		displayQuestionsAndAnswers(allTheAnswers.slice(9 ,10),EmotionalChanges_tenth,containerDiv,'',true);

	}else if (sectionName=='Family Questions'){
		displayQuestionsAndAnswers(allTheAnswers.slice(0 ,5),familyQuestions_OneToFive,containerDiv,'',true);
		if (allTheAnswers.length==9){
            displayQuestionsAndAnswers(allTheAnswers.slice(5,7),familyQuestions_SixToSeven,containerDiv,'',true);
		}
		displayQuestionsAndAnswers(allTheAnswers.slice(7 ,8),familyQuestions_SecondToLast,containerDiv,'',true);
        displayQuestionsAndAnswers(allTheAnswers.slice(8 ,9),familyQuestions_Last,containerDiv,'',true);

	}else {
		console.log ("Invalid section Name");
	}


    	//visualize answers
}




