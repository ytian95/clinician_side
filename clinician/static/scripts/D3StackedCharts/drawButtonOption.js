//three options red, yellow green
function threeColors(span_for_question){
    if (questionAndAnswer[1] ==0){
        span_for_question.style.background="green";
    }else if (questionAndAnswer[1] ==1){
        span_for_question.style.background="orange";
    }else if (questionAndAnswer[1] ==2) {
        span_for_question.style.background="red";
    }    

}
//two Colors
function twoColors(span_for_question){
    if (questionAndAnswer[1] ==0){
        span_for_question.style.background="red"; //yes is 1
    }else if (questionAndAnswer[1] ==1){
        span_for_question.style.background="green";//no is 0
    }    
    
}

//POSI Colors

function POSIColors(span_for_question){
    if (questionAndAnswer[1] ==0 ||  questionAndAnswer[1] ==1){
        span_for_question.style.background="green";  //first two columns means OK
    }else if (questionAndAnswer[1] ==2 || questionAndAnswer[1] ==3 ){
        span_for_question.style.background="orange"; //needs attention
    }else if (questionAndAnswer[1] ==4 ){
        span_for_question.style.background="red";//need serious attention
    }    
    
}

//draws the button text display for all questions without scaled score
function drawButtonOption(sectionName,qNumber,span_for_question,numberOfQuestions){
    var optionText="";
    var answerArray;
    if (sectionName=='POSI'){
        if (qNumber==1){
            optionText= document.createTextNode(POSI_firstQuestion[questionAndAnswer[1]]);
        }else if (2 <= qNumber && qNumber<=5){
            optionText= document.createTextNode(POSI_secondToFifthQuestion[questionAndAnswer[1]]);
        }else if (qNumber==6){
            answerArray= questionAndAnswer[1];
            //console.log("Sixth : " + answerArray);
        }else if (qNumber==7){
            answerArray= questionAndAnswer[1];
            //console.log("seventh : " + answerArray);
        }
         //some questions have multiple selections possible
        if (qNumber==6 ){
            var allOptionsSelected ="";
            for (option of answerArray){
                allOptionsSelected= allOptionsSelected.concat(POSI_sixth[option]+ "\n");
            }
            optionText= document.createTextNode(allOptionsSelected);
            span_for_question.appendChild(optionText);
        }else if(qNumber==7 ){
            for (option of answerArray){
                optionText=document.createTextNode(POSI_seventh[option] +"\n");
                span_for_question.appendChild(optionText);
            }
        }
        else{
            span_for_question.appendChild(optionText);
        }
        POSIColors(span_for_question);
    }else if (sectionName=='Family Questions') {
        if (1 <= qNumber && qNumber<=5){
            optionText= document.createTextNode(familyQuestions_OneToFive[questionAndAnswer[1]]);
            //background color red and Green
            twoColors(span_for_question);
        }else {
            if (numberOfQuestions==9){
                if (6 <= qNumber && qNumber<= 7){
                optionText= document.createTextNode(familyQuestions_SixToSeven[questionAndAnswer[1]]);
                }else if (qNumber==8){
                    optionText= document.createTextNode(familyQuestions_SecondToLast[questionAndAnswer[1]]);
                    //color the button red, green yellow
                    threeColors(span_for_question);                   
                }else if (qNumber==9){
                    optionText= document.createTextNode(familyQuestions_Last[questionAndAnswer[1]]);
                    threeColors(span_for_question);
                }
            }else if (numberOfQuestions==9){
                if (qNumber==6){
                    optionText= document.createTextNode(familyQuestions_SecondToLast[questionAndAnswer[1]]);
                }else if (qNumber==7){
                    optionText= document.createTextNode(familyQuestions_Last[questionAndAnswer[1]]);
                }
            }
        }
        span_for_question.appendChild(optionText);
    }else if (sectionName=='Parent Concerns'){

        optionText= document.createTextNode(parentsConcerns[questionAndAnswer[1]]);
        span_for_question.appendChild(optionText);
        //color the button red, green yellow
        threeColors(span_for_question);
        // if (questionAndAnswer[1] ==0){
        //     span_for_question.style.background="green";
        // }else if (questionAndAnswer[1] ==1){
        //     span_for_question.style.background="orange";
        // }else if (questionAndAnswer[1] ==2) {
        //     span_for_question.style.background="red";
        // }

    } else {
     //if not POSI 
        optionText= document.createTextNode(questionAndAnswer[1]);
        span_for_question.appendChild(optionText);
    }
}