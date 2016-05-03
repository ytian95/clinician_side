// cant be used to find score of POSI or Parent's concerns 
function findScoreForPlot(sectionName,barLabel){
	if (sectionName =='BPSC' ){
		//console.log("BPSC : " +barLabel+ " :" + data[month][sectionName][barLabel]["score"][0]);
		return data[month][sectionName][barLabel]["score"][0];
		
	}else{
       return data[month][sectionName]["score"][0];
	}

}

function findPOSIResult(sectionName){
	var listOfQuestions = data[month][sectionName]["questions"];
	//countForNumberOf Questions in last three columns
	countOfLastThreeColumns=0;
	var qNumber=1;
	for (question of listOfQuestions){
		//console.log(question[1]);
		if (qNumber <=5 ){
			if (parseInt(question[1]) >= 2){
				//console.log(qNumber +" : <5 +1");
				countOfLastThreeColumns=countOfLastThreeColumns+1;
			}
		}else{
			//console.log(question[1]);
			if ((question[1]).indexOf(2)>=0 || (question[1]).indexOf(3)>=0 || (question[1]).indexOf(4)>=0){
				countOfLastThreeColumns=countOfLastThreeColumns+1;
				//console.log(qNumber +" : >5 +1");
			}
		}
		qNumber=qNumber+1;
	}

	if (countOfLastThreeColumns >=3){
		return true;
	}else{
		return false;
	}
}