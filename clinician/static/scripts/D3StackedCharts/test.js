var data=null;
var month =-1;
var listOfSections; // list of sections in the current SWYC
var _this=this;
var scoringGuide;

//draw section title
function drawSectionTitle(sectionName){

    //TODO change to javascript
    //Use jquery selector to hide
    var tileAndButtons= document.createElement("div");
    tileAndButtons.id= "TitleAndSwitch";

    var body= document.getElementsByTagName("body")[0];
    body.appendChild(tileAndButtons);

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
    response_button.className="btn btn-primary";
    textTitleDiv.appendChild(response_button);
    response_button_text=document.createTextNode("Responses");
    response_button.appendChild(response_button_text);

    var summary_button= document.createElement("button");
    summary_button.setAttribute('type','button');
    summary_button.className="btn btn-primary active";//change class name to make inactive
    textTitleDiv.appendChild(summary_button);
    summary_button_text=document.createTextNode("Responses");
    summary_button.appendChild(summary_button_text);



}
//visualize response for sections with no charts
function visualizeListResponses(sectionName){
    //get questions
    var questionInSection= data[month][sectionName]["questions"];
    //create a div
    var div_for_question_display = document.createElement("div");
    div_for_question_display.className= "displayBox";
    var bodyDOM = document.getElementsByTagName("body")[0];
    bodyDOM.appendChild(div_for_question_display);
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
        li_for_question.appendChild(questionText);
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

            li_for_question.appendChild(img);
        }

        //add option selected to the button display
        drawButtonOption(sectionName,qNumber,span_for_question,questionInSection.length);
    }

}



//draw Stacked Chart function

function drawStackedChart(sectionName){
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
                range: 3.5
            }],
        }, {
            data: [{
                barLabel: 'Dev Milestones',
                range: 7
            }],
        }, {
            data: [{
                barLabel: 'Dev Milestones',
                range: 2.75
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
    svg = d3.select('body')
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
    if(sectionName=='PPSC' |sectionName=='BPSC'){
        //if only positive and negative screening
        colours = d3.scale.category10()
        .range(["red","green"])
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
    }),

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
        .on('mouseover', function (d) {
        var xPos = parseFloat(d3.select(this).attr('x')) / 2 + width / 2;
        var yPos = parseFloat(d3.select(this).attr('y')) + yScale.rangeBand() / 2;

        d3.select('#tooltip')
            .style('left', xPos + 'px')
            .style('top', yPos + 'px')
            .select('#value')
            .text(d.x);

        d3.select('#tooltip').classed('hidden', false);
    })
        .on('mouseout', function () {
        d3.select('#tooltip').classed('hidden', true);
    })
    // //display rectangle box for score
    // var name_of_plot;
    // diplayBox = groups.append('rect')
    //     .attr('x', function (d) {
    //         name_of_plot= d.y;
    //         return xScale(findScoreForPlot(sectionName,name_of_plot));
    // })
    //     .attr('y', function (d) {
    //         //height of the bar is different for BPSC
    //         if (sectionName =='BPSC'){
    //             return (yScale(d.y) ) ;
    //         }else {
    //             return (yScale(d.y) ) ;
    //         }
    // })
    //     .attr('height', function (d) {
    //         return (yScale.rangeBand());
    // })
    //     .attr('width',"50px")
    //     .attr('fill','black')
    //     .attr('stroke','black');

    //display score
    //var name_of_plot;
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
                return (yScale(d.y) + height/2) ;
            }
    })

        .attr("font-family", "sans-serif")
        .attr("font-size", "25px")
        .attr("fill", "white");

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

    //set offset for new drawing

}



function getMonthAndSections(d){
	month= Object.keys(d)[0];
	//console.log(month);
	listOfSections= Object.keys(d[month]);
	//console.log(listOfSections );
}

//clinician/static/scripts/D3StackedCharts/

var patient_name= (document.getElementsByClassName("patient_name")[0]).id;
//console.log(patient_name);
d3.json("/clinician/"+patient_name+"/getpatientscore", function (error, json) {
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
        //add section titles and buttons about response and summary if required
        drawSectionTitle(listOfSections[i]);
        if (listOfSections[i]=='PPSC' || listOfSections[i]=='BPSC' || listOfSections[i]=='Development Milestones' || listOfSections[i]=='Emotional Changes With A New Baby'){
	         drawStackedChart(listOfSections[i]);
           showAllResponses(listOfSections[i]);
        }else if ( listOfSections[i]=='Parent Concerns'|| listOfSections[i]=='Family Questions' || listOfSections[i]=='POSI'){
            //listOfSections[i]=='POSI' | listOfSections[i]=='Parent Concerns' | listOfSections[i]=='Family Questions'
           // no chart because scale is not clear
           visualizeListResponses(listOfSections[i]);
           showAllResponses(listOfSections[i]);

        }
	}

});