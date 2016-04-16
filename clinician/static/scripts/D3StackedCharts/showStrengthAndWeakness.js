//This js file is to show the original questions and responses selected
//Massive Cleaning needed here
//create Option Header
    //one row for the header options
function createStrenthWeaknessOptionHeader(panel_table,optionType){
	var table_row = document.createElement("tr");
    table_row.id="row_border" //for border
    table_row.style.backgroundColor="#ebebe0";
	panel_table.appendChild(table_row);
	//fill row with data
    for (var i=0; i<optionType.length;i++){
    	var table_data = document.createElement("td");
    	table_row.appendChild(table_data);
		table_data.className= "textToCenter";
		//add radio button
		var questionText= document.createTextNode(optionType[i]);
		table_data.appendChild(questionText);
    }


}

//create a row of question and options
//radioOrNot: radio button or Check box
//Odd  is for background color 
function createStrenthWeaknessText(panel_table,question_Answer,optionType,radioOrNot){
 	//Clean Repeatetion
    //number of radio buttons needed depends on input type
	//add question
    if (question_Answer[1]==0){
        //check if table has no rows and add header
        if ( $(panel_table).find("tr").length === 0 ) {
            createStrenthWeaknessOptionHeader(panel_table,["Strengths", "Weaknesses"]);
        }
        var table_row = document.createElement("tr");
        table_row.style.backgroundColor="#b3ffb3";
        panel_table.appendChild(table_row);

        var table_data = document.createElement("td");
        table_row.appendChild(table_data);
		var questionText= document.createTextNode( question_Answer[0]);
		table_data.appendChild(questionText);

        //empty td
        //clean here
        var table_data_empty = document.createElement("td");
        table_row.appendChild(table_data_empty);
        var questionText_empty= document.createTextNode( "");
        table_data_empty.appendChild(questionText_empty);

    }else if (question_Answer[1]==optionType.length-1){

        if ( $(panel_table).find("tr").length === 0 ) {
            createStrenthWeaknessOptionHeader(panel_table,["Strengths", "Weaknesses"]);
        }

        var table_row = document.createElement("tr");
        table_row.style.backgroundColor="#ffc2b3";
        panel_table.appendChild(table_row);
        
        //empty td
        //clean here
        var table_data_empty = document.createElement("td");
        table_row.appendChild(table_data_empty);
        var questionText_empty= document.createTextNode( "");
        table_data_empty.appendChild(questionText_empty);

        var table_data = document.createElement("td");
        table_row.appendChild(table_data);
        var questionText= document.createTextNode( question_Answer[0]);
        table_data.appendChild(questionText);
    }
    
}


//display Positive And Negative for all question in an Array
function displayPositiveNegative(questionsList,optionType,containerDiv,panelHeading,radioOrNot){
	//add a container for questions
	var display_box_for_all_stength_weakness = document.createElement("div");
	display_box_for_all_stength_weakness.className= "display_box_for_all_stength_weakness";
    //the summary button is preselected so responses are hidden
    display_box_for_all_stength_weakness.style.display = 'none';

    containerDiv.appendChild(display_box_for_all_stength_weakness);

    // default panel
    var  panel_default = document.createElement("div");
	panel_default.className= "panel panel-default";
    display_box_for_all_stength_weakness.appendChild(panel_default);

    //add panel heading
    //var panel_heading = document.createElement("div");
	//panel_heading.className= "panel-heading";
    //panel_default.appendChild(panel_heading);
    //var heading_text= document.createTextNode(panelHeading);
    //panel_heading.appendChild(heading_text);

    //add table
    var  panel_table = document.createElement("table");
	panel_table.className= "table";
    panel_default.appendChild(panel_table);

    //add header
    //createStrenthWeaknessOptionHeader(panel_table,["Strengths", "Weaknesses"]);
    for (questionAnswer of questionsList) {
    	createStrenthWeaknessText(panel_table,questionAnswer,optionType,radioOrNot);
    }

}




//show strengths and Weaknesses for all Sections
function showStrengthAndWeakness(sectionName,containerDiv){
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
		displayPositiveNegative(allTheAnswers,BPSC_allQuestion,containerDiv,'BPSC',true);
	}else if (sectionName=='PPSC' ){
		//PPSC and Parent's concers have the same option
		displayPositiveNegative(allTheAnswers,PPSC_allQuestion,containerDiv,'PPSC',true);

	}else if ( sectionName=='Parent Concerns'){
		displayPositiveNegative(allTheAnswers,parent_concern_allQuestion,containerDiv,'Parent Concerns',true);

	}else if (sectionName=='Development Milestones'){
		displayPositiveNegative(allTheAnswers,developmental_milestones_allQuestion,containerDiv,'Development Milestones',true);

	}else if (sectionName=='POSI'){
		displayPositiveNegative(allTheAnswers.slice(0 ,1),POSI_firstQuestion,containerDiv,'POSI',true);
		displayPositiveNegative(allTheAnswers.slice(1,5),POSI_secondToFifthQuestion,containerDiv,'',true);
		displayPositiveNegative(allTheAnswers.slice(5,6),POSI_sixth,containerDiv,'',false);
		displayPositiveNegative(allTheAnswers.slice(6,7),POSI_seventh,containerDiv,'',false);
		
	}else if (sectionName=='Emotional Changes With A New Baby'){
		displayPositiveNegative(allTheAnswers.slice(0 ,1),EmotionalChanges_first,containerDiv,'',true);
		displayPositiveNegative(allTheAnswers.slice(1 ,2),EmotionalChanges_second,containerDiv,'',true);
 		displayPositiveNegative(allTheAnswers.slice(2 ,3),EmotionalChanges_third,containerDiv,'',true);
 		displayPositiveNegative(allTheAnswers.slice(3 ,4),EmotionalChanges_fourth,containerDiv,'',true);
 		displayPositiveNegative(allTheAnswers.slice(4 ,5),EmotionalChanges_fifth,containerDiv,'',true);
 		displayPositiveNegative(allTheAnswers.slice(5 ,6),EmotionalChanges_sixth,containerDiv,'',true);
 		displayPositiveNegative(allTheAnswers.slice(6 ,7),EmotionalChanges_seventh,containerDiv,'',true);
 		displayPositiveNegative(allTheAnswers.slice(7 ,8),EmotionalChanges_eighth,containerDiv,'',true);
 		displayPositiveNegative(allTheAnswers.slice(8 ,9),EmotionalChanges_ninth,containerDiv,'',true);
 		displayPositiveNegative(allTheAnswers.slice(9 ,10),EmotionalChanges_tenth,containerDiv,'',true);

	}else if (sectionName=='Family Questions'){
		displayPositiveNegative(allTheAnswers.slice(0 ,5),familyQuestions_OneToFive,containerDiv,'',true);
		if (allTheAnswers.length==9){
            displayPositiveNegative(allTheAnswers.slice(5,7),familyQuestions_SixToSeven,containerDiv,'',true);
		}
		displayPositiveNegative(allTheAnswers.slice(7 ,8),familyQuestions_SecondToLast,containerDiv,'',true);
        displayPositiveNegative(allTheAnswers.slice(8 ,9),familyQuestions_Last,containerDiv,'',true);

	}else {
		console.log ("Invalid section Name: " + sectionName );

	}


    	//visualize answers
}




