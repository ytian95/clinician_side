d3.csv('ScoringMilestone.csv', function(d) {
         //create a key
    var swycMonth=d.month;
    console.log("swyc month:" + swycMonth);
    _this.swycMonth = swycMonth;
    scoringGuide= {swycMonth:{
            "0" : +d.Zero,
            "0.25":+d.ZeroQuarter,
            "0.5":+d.ZeroHalf }} ;
    //console.log("sguide");
    //console.log(scoringGuide);
    return scoringGuide;
    // return {
    //      swycMonth:{
    //         "0" : +d.Zero,
    //         "0.25":+d.ZeroQuarter,
    //         "0.5":+d.ZeroHalf
            // 0.75:+d.ZeroThreeQuarter,
            // 1:+d.One,
            // 1.25:+d.OneQuarter,
            // 1.5:+d.OneHalf,
            // 1.75:+d.OneThreeQuarter,
            // 2:+d.Two,
            // 2.25:+d.TwoQuarter,
            // 2.5:+d.TwoHalf,
            // 2.75:+d.TwoThreeQuarter,
            // 3:+d.Three,
            // 3.25:+d.ThreeQuarter,
            // 3.5:+d.ThreeHalf,
            // 3.75:+d.ThreeThreeQuarter,
            // 4:+d.Four,
            // 4.25:+d.FourQuarter,
            // 4.5:+d.FourHalf,
            // 4.75:+d.FourThreeQuarter,
            // 5:+d.Five,
            // 5.25:+d.FiveQuarter,
            // 5.5:+d.FiveHalf,
            // 5.75:+d.FiveThreeQuarter,
            // 6:+d.Six,
            // 6.25:+d.SixQuarter,
            // 6.5:+d.SixHalf,
            // 6.75:+d.SixThreeQuarter,
            // 7:+d.Seven,
            // 7.25:+d.SevenQuarter,
            // 7.5:+d.SevenHalf,
            // 7.75:+d.SevenThreeQuarter,
            // 8:+d.Eight,
            // 8.25:+d.EightQuarter,
            // 8.5:+d.EightHalf,
            // 8.75:+d.EightThreeQuarter,
            // 9:+d.Nine,
            // 9.25:+d.NineQuarter,
            // 9.5:+d.NineHalf,
            // 9.75:+d.NineThreeQuarter,
            // 10:+d.Ten,
            // 10.25:+d.TenQuarter,
            // 10.5:+d.TenHalf,
            // 10.75:+d.TenThreeQuarter,
            // 11:+d.Eleven,
            // 11.25:+d.ElevenQuarter,
            // 11.5:+d.ElevenHalf,
            // 11.75:+d.ElevenThreeQuarter,
            // 12:+d.Twelve,
            // 12.25:+d.TwelveQuarter,
            // 12.5:+d.TwelveHalf
       // }
    //};
}, function(error, rows) {
        console.log(error);
        //console.log(rows);
});
console.log("scoring guide");
console.log(scoringGuide);