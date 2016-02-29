function findScoreForPlot(sectionName,barLabel){
	if (sectionName =='BPSC' ){
		console.log("BPSC : " +barLabel+ " :" + data[month][sectionName][barLabel]["score"][0]);
		return data[month][sectionName][barLabel]["score"][0];
		
	}else{
       return data[month][sectionName]["score"][0];
	}

}