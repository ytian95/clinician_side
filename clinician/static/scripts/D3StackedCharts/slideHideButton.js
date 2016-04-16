
//handle response button click
 function responseButton(event,sectionName) {
    console.log("clicked response");
    $(event).addClass("active");
    $(event).next().removeClass("active");

   //console.log($(event.target).parent().parent().nextAll(".display_box_for_all_responses:first"));
   //hide the svg show the responses
   if (sectionName=='BPSC'||sectionName=='PPSC'||sectionName=='Development Milestones'||sectionName=='Emotional Changes With A New Baby'){
   		$(event).parent().parent().nextAll("svg:first").hide();
		}else{
			$(event).parent().parent().nextAll(".displayBox:first").hide();
		}

    $(event).parent().parent().nextAll(".display_box_for_all_responses:first").show();

    if (sectionName=='Emotional Changes With A New Baby'){
      $(event).parent().parent().nextAll(".display_box_for_all_responses:lt(10)").show();
    }
    


};

	//handle summary button click
function summaryButton(event,sectionName) {
        console.log("clicked summary");
        $(event).addClass("active");
        $(event).prev().removeClass("active");
        //show the SVG hide responses
        $(event).parent().parent().nextAll(".display_box_for_all_responses:first").hide();
        if (sectionName=='BPSC'||sectionName=='PPSC'||sectionName=='Development Milestones'||sectionName=='Emotional Changes With A New Baby'){
       		$(event).parent().parent().nextAll("svg:first").show();
		}else{
			$(event).parent().parent().nextAll(".displayBox:first").show();
		}


	};

		//handle summary button click
function clickChartRect(event,sectionName) {
        console.log("clicked chart");
        //show the SVG hide responses

        if ($(event).closest('svg').nextAll(".display_box_for_all_stength_weakness").css('display')=="none"){
        	$(event).closest('svg').nextAll(".display_box_for_all_stength_weakness").show();
        }else{
        	$(event).closest('svg').nextAll(".display_box_for_all_stength_weakness").hide();
        }
	};