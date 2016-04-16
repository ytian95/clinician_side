var data=null;
var month =-1;
var listOfSections; // list of sections in the current SWYC
var _this=this;
var scoringGuide;

//this function color the display box for screening result
function colorIt(sectionName,boxName){

    var screeningString ="Screening: ";
    var posOrNot;
    if (sectionName== 'Development Milestones' && findScoreForPlot(sectionName,'') <= devMilestoneScoringGuide[month]  ){    
        boxName.style.backgroundColor= "red";
        posOrNot=true;
    }else if(sectionName== 'PPSC' && findScoreForPlot(sectionName,'') >= 9){
        boxName.style.backgroundColor="red";
        posOrNot=true;
    }else if(sectionName== 'BPSC' && (findScoreForPlot(sectionName,'Irritability') >= 3 ||findScoreForPlot(sectionName,'Inflexibility') >= 3||findScoreForPlot(sectionName,'Difficulty with Routines') >= 3 )){
        boxName.style.backgroundColor="red";
        posOrNot=true;
    }else if(sectionName== 'Emotional Changes With A New Baby'&& findScoreForPlot(sectionName,'') >= 13){
        boxName.style.backgroundColor="red";
        posOrNot=true;
    }else if(sectionName== 'POSI'){
        var posiResult=findPOSIResult('POSI'); 
        //console.log(posiResult);
        if (posiResult){ 
            //posi positive and PPSC positive
            if(findScoreForPlot('PPSC','') >=9){
                boxName.style.backgroundColor="red";
                posOrNot=true; 


            }else{
                allDevMileQuestionsAns= data[month]['Development Milestones']["questions"];
                // allDevMileQuestions=[];
                // //get only questions
                // for (q in allDevMileQuestionsAns){
                //     allDevMileQuestions.push(q[0]);
                // }
                var foundLangageIssues= false;
                for (var qstn of allDevMileQuestionsAns){
                    if (languageQuestions.indexOf(qstn[0]) >=0 && parseInt(qstn[1])==0 ){//if the question is language question
                         //posi positive and language issues
                        boxName.style.backgroundColor="red";
                        posOrNot=true; 
                        foundLangageIssues=true;
                         break;
                    }
                }
                 
                //posi positive only
                if (!foundLangageIssues){
                    boxName.style.backgroundColor="yellow";
                    posOrNot="T/F";
                }
            }
        }else{
            boxName.style.backgroundColor="green";
            posOrNot=true;
        }
        
    }else {
        boxName.style.backgroundColor= "green";
    }   

    // scrren: positive or screening: negative
    if (posOrNot){
        screeningString=screeningString+ 'Positive'
    }else if (posOrNot=='T/F'){
        screeningString=screeningString+ 'Unsure'
    }else {
         screeningString=screeningString+ 'Negative'
    }
    var screeningResult= document.createTextNode(screeningString);
    boxName.appendChild(screeningResult);
}

//draw section title
function drawSectionTitle(sectionName,containerNameforTitle){

    //TODO change to javascript
    //Use jquery selector to hide
    var tileAndButtons= document.createElement("div");
    tileAndButtons.id= "TitleAndSwitch";
    containerNameforTitle.appendChild(tileAndButtons);

    var sectionTitlesText =document.createTextNode(sectionName);
    var sectionTitles= document.createElement("div");
    sectionTitles.className= 'sectionTitles';
    sectionTitles.appendChild(sectionTitlesText);
    tileAndButtons.appendChild(sectionTitles); 

//add show Responses and  Summary buttons for all
    var textTitleDiv= document.createElement("div");
    textTitleDiv.className="btn-group";
    tileAndButtons.appendChild(textTitleDiv);

    var response_button= document.createElement("button");
    response_button.setAttribute('type','button');
    response_button.className="btn btn-primary response";
    textTitleDiv.appendChild(response_button);
    response_button.onclick = function() {responseButton(this,sectionName)}
    response_button_text=document.createTextNode("Responses");
    response_button.appendChild(response_button_text);

    var summary_button= document.createElement("button");
    summary_button.setAttribute('type','button');
    summary_button.className="btn btn-primary active summary";//change class name to make inactive
    textTitleDiv.appendChild(summary_button);
    summary_button.onclick = function() {summaryButton(this,sectionName)}
    summary_button_text=document.createTextNode("Summary");
    summary_button.appendChild(summary_button_text);

 // add the bar to print out the screening result
    var screeningResultContainer= document.createElement("div");
    screeningResultContainer.className= 'screeningResultContainer';
    tileAndButtons.appendChild(screeningResultContainer);
    colorIt(sectionName,screeningResultContainer);

}



//visualize response for sections with no charts
function visualizeListResponses(sectionName,containerName){
    //get questions
    var questionInSection= data[month][sectionName]["questions"];
    //create a div
    var div_for_question_display = document.createElement("div");
    div_for_question_display.className= "displayBox";
    containerName.appendChild(div_for_question_display);
    //create unordered list
    var ul_for_question = document.createElement("ul");
    ul_for_question.className= "list-group";
    div_for_question_display.appendChild( ul_for_question);
    //display all questions
    //console.log(questionInSection.length);
    var qNumber=0;
    for (questionAndAnswer of questionInSection) {
        //console.log(questionAndAnswer);
        //console.log(qNumber);
        qNumber++;
        var li_for_question = document.createElement("li");
        li_for_question.className="list-group-item";
        ul_for_question.appendChild(li_for_question);
        var span_for_question = document.createElement("span");
        span_for_question.className= "badge";
        li_for_question.appendChild(span_for_question);
         //add question
        var questionText= document.createTextNode(questionAndAnswer[0]);
        
        //add icons for family questions
        if (sectionName=='Family Questions'){
            var img = document.createElement("img");
            img.className= "familyQuestionIcon";
            //select image based on question Number
            if (qNumber==1){
                img.src = "tobacco.png";
            }else if(2 <= qNumber && qNumber<=4){
                img.src = "alcohol.png";
            }else if(qNumber==5){
                img.src = "HealthyFood_Icon.jpg";
            }else if (questionInSection.length==7){
                img.src = "domesticViolence.png";
            }else {
                if(6 <= qNumber && qNumber<=7){
                    img.src = "parent_depression.png";
                }else{
                    img.src = "domesticViolence.png";
                }
            }
            // align the symbols first
            li_for_question.appendChild(img);
        }
        li_for_question.appendChild(questionText);
        //add option selected to the button display
        drawButtonOption(sectionName,qNumber,span_for_question,questionInSection.length);
    }

}



//draw Stacked Chart function

function drawStackedChart(sectionName,containerName){
	//TODO :if BPSC checks
	var margins = {
    top: 50,
    left: 120,
    right: 20,
    bottom: 24
	},



	width = 1000 - margins.left - margins.right ,
    height = 200 - margins.top - margins.bottom;

    if (sectionName=='PPSC') {
        //console.log(true);
		//TODO store questions
	    dataset = [{
	        data: [{
	        	//positive
	            barLabel: 'PPSC',
	            range: 8
	        }],
	    }, {
	        data: [{
	            barLabel: 'PPSC',
	            range: 28
	        }],
	    }

	    ]
    }else if (sectionName=='Development Milestones'){

        //read the scoring file

        dataset = [{
            data: [{
                //positive
                barLabel: 'Dev Milestones',
                range: parseInt(devMilestoneScoringGuide[month], 10)
            }],
        }, {
            data: [{
                barLabel: 'Dev Milestones',
                range: 20 -parseInt(devMilestoneScoringGuide[month], 10)
            }],
        }
        //separate domain for PPSC

        ]
    }else if (sectionName=='BPSC') {

     dataset = [{
        data: [{
            barLabel: 'Irritability',
            range: 3
        }, {
            barLabel: 'Inflexibility',
            range: 3
        }, {
            barLabel: 'Difficulty with Routines',
            range: 3
        }]
    }, {
        data: [{
            barLabel: 'Irritability',
            range: 5
        }, {
            barLabel: 'Inflexibility',
            range: 5
        }, {
            barLabel: 'Difficulty with Routines',
            range: 5
        }]
    }

    ]

    } else {
     //postnatal depression
        dataset = [{
            data: [{
                //positive
                barLabel: 'Emotional Changes',
                range: 10
            }],
        }, {
            data: [{
                barLabel: 'Emotional Changes',
                range: 2
            }],
        },{
            data: [{
                barLabel: 'Emotional Changes',
                range: 18
            }],
        }

        ]

    }

    // }else if (sectionName=='POSI'){

    // }else if (sectionName=='Parent Concerns'){

    // }else if (sectionName=='Family Questions'){

    // }
    //put data in the dataset
    dataset = dataset.map(function (d) {
        return d.data.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                y: o.range,
                x: o.barLabel
            };
        });
    }),
    stack = d3.layout.stack();
    stack(dataset);

    //
    var dataset = dataset.map(function (group) {
        return group.map(function (d) {
            // Invert the x and y values, and y0 becomes x0
            return {
                x: d.y,
                y: d.x,
                x0: d.y0
            };
        });
    }),
    //add svg element to the body
    svg = d3.select(containerName)
        .append('svg')
        .attr('width', width + margins.left + margins.right)
        .attr('height', height + margins.top + margins.bottom)
        .append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),

    xMax = d3.max(dataset, function (group) {
        return d3.max(group, function (d) {
            return d.x + d.x0;
        });
    }),

    //get width of the parent element in pixels
    // parentWidth=mydiv.style.width
    xScale = d3.scale.linear()
        .range([0,width ]);
    //domain comes from csv if dev milestone
    if(sectionName=='Development Milestones'){
        //console.log(scoringGuide);
        xScale.domain([0, xMax]);
    }else{
        xScale.domain([0, xMax]);
    }

    labelForBar = dataset[0].map(function (d) {
        return d.y;
    }),
    // _ = console.log(months),
    yScale = d3.scale.ordinal()
        .domain(labelForBar)
        .rangeRoundBands([0, height], .1),
    xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom'),
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left');
    //colors
    if(sectionName=='Development Milestones'){
        //if only positive and negative screening
        colours = d3.scale.category10()
        .range(["red","green"])
   }else if(sectionName=='PPSC' || sectionName=='BPSC'){

        colours = d3.scale.category10()
        .range(["green","red"])

   }else if (sectionName=='Emotional Changes With A New Baby'){
        colours = d3.scale.category10()
        .range(["green","yellow","red"])

   }else{
        //if positive negative average and others
        colours = d3.scale.category10()
        .range(["red","orange","green","black"])
   }
    groups = svg.selectAll('g')
        .data(dataset)
        .enter()
        .append('g')
        .style('fill', function (d, i) {
        return colours(i);
    });

    var name_of_plot;
    var scoreOnGraph;

    //display rectangle box for score
    var displayBox = svg.data(dataset);
    var flag = displayBox.selectAll('rect')
        .data(function (d) {
        return d;
    })
        .enter()
        .append('rect')
        
        .attr('x', function (d) {
            name_of_plot= d.y;
            return xScale(findScoreForPlot(sectionName,name_of_plot))-12;
    })
        .attr('y', function (d) {
            //height of the bar is different for BPSC
            if (sectionName =='BPSC'){
                return (yScale(d.y) + height/4 -30) ;
            }else {
                return (yScale(d.y) -height*0.25 -30) ;
            }
    })
        .attr('height', '50px')
        .attr('width',"50px")
        .attr('fill','none')
        .attr('stroke','black');


        //display score
    var name_of_plot;
    texts = groups.selectAll('text')
        .data(function (d) {
        return d;
    })
        .enter()
        .append('text');
    var scoreOnGraph;
    texts.attr('x', function (d) {
            name_of_plot= d.y;
            //console.log(sectionName);
            //console.log(findScoreForPlot(sectionName,name_of_plot));
            scoreOnGraph= +findScoreForPlot(sectionName,name_of_plot);
            texts.text(scoreOnGraph);
            return xScale(scoreOnGraph);
    })
       .attr('y', function (d) {
            //height of the bar is different for BPSC
            if (sectionName =='BPSC'){
                return (yScale(d.y) + height/4) ;
            }else {
                return (yScale(d.y)-height*0.25) ;
            }
    })

        .attr("font-family", "sans-serif")
        .attr("font-size", "25px")
        .attr("fill", "blue")//changed from white


    //display chart
    rects = groups.selectAll('rect')
        .data(function (d) {
        return d;
    })
        .enter()
        .append('rect')
        .attr('x', function (d) {
        return xScale(d.x0);
    })
        .attr('y', function (d, i) {
        return yScale(d.y);
    })
        .attr('height', function (d) {
        return yScale.rangeBand();
    })
        .attr('width', function (d) {
        return xScale(d.x);
    })

    rects.on("click", function() {clickChartRect(this,sectionName)});





// //code for Axis
    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);


}



function getMonthAndSections(d){
	month= Object.keys(d)[0];
	//console.log(month);
	listOfSections= Object.keys(d[month]);
	//console.log(listOfSections );
}

// var patient_name= (document.getElementsByClassName("patient_name")[0]).id;
// //console.log(patient_name);
// d3.json("/clinician/"+patient_name+"/getpatientscore", function (error, json) {
d3.json("scoring.json", function (error, json) {
	if (error){
    console.log(error);
    return
  }
  console.log("JSON");
  console.log(json);
	data=json;
	  //assign global variables : sections and month
	getMonthAndSections(data);
	  //createGraphs(data);
	for (i = 0; i < listOfSections.length; i++) {
	    //console.log(listOfSections[i]);
	    //get score
	    //score=data[month][listOfSections[i]]["score"][0];
	    //console.log(score);
        
        //div to contain the three parts strength, visualisation and summary
        var bodyDOM = document.getElementsByTagName("body")[0];
        div_summary_response_strengths=document.createElement("div");
        bodyDOM.appendChild(div_summary_response_strengths);
        //add section titles and buttons about response and summary if required
        drawSectionTitle(listOfSections[i],div_summary_response_strengths);

        if (listOfSections[i]=='PPSC' || listOfSections[i]=='BPSC' || listOfSections[i]=='Development Milestones' || listOfSections[i]=='Emotional Changes With A New Baby'){
            drawStackedChart(listOfSections[i],div_summary_response_strengths);
            showAllResponses(listOfSections[i],div_summary_response_strengths);
            showStrengthAndWeakness(listOfSections[i],div_summary_response_strengths);
        }else if ( listOfSections[i]=='Parent Concerns'|| listOfSections[i]=='Family Questions' || listOfSections[i]=='POSI'){
            //listOfSections[i]=='POSI' | listOfSections[i]=='Parent Concerns' | listOfSections[i]=='Family Questions'
           // no chart because scale is not clear
           visualizeListResponses(listOfSections[i],div_summary_response_strengths);
           showAllResponses(listOfSections[i],div_summary_response_strengths);
           showStrengthAndWeakness(listOfSections[i],div_summary_response_strengths);
        }
	}

});


