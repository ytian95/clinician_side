// This js file is to help with 
var data=null;
var month =-1;
var listOfSections; // list of sections in the current SWYC

function getMonthAndSections(d){
    month= Object.keys(d)[0]; 
    //console.log(month);
    listOfSections= Object.keys(d[month]);  
    //console.log(listOfSections );
}

d3.json("sample_Score.json", function (error, json) {
if (error) return console.warn (error);
  data=json;
  //assign global variables : sections and month
  getMonthAndSections(data);
  //change score to Integer
  scoreInteger= type(data);
  
});


var margins = {
    top: 12,
    left: 120,
    right: 24,
    bottom: 24
},
legendPanel = {
    width: 180
},
width = 1000 - margins.left - margins.right - legendPanel.width,
    height = 200 - margins.top - margins.bottom,
    dataset = [{
        data: [{
            month: 'Irritability',
            count: 3
        }, {
            month: 'Inflexibility',
            count: 3
        }, {
            month: 'Difficulty with Routine',
            count: 3
        }],
        name: 'Series #1'
    }, {
        data: [{
            month: 'Irritability',
            count: 3
        }, {
            month: 'Inflexibility',
            count: 1
        }, {
            month: 'Difficulty with Routine',
            count: 1
        }],
        name: 'Series #2'
    }

    ],
    series = dataset.map(function (d) {
        return d.name;
    }),
    dataset = dataset.map(function (d) {
        return d.data.map(function (o, i) {
            // Structure it so that your numeric
            // axis (the stacked amount) is y
            return {
                y: o.count,
                x: o.month
            };
        });
    }),
    stack = d3.layout.stack();

stack(dataset);

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
    svg = d3.select('body')
        .append('svg')
        .attr('width', width + margins.left + margins.right + legendPanel.width)
        .attr('height', height + margins.top + margins.bottom)
        .append('g')
        .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')'),
    xMax = d3.max(dataset, function (group) {
        return d3.max(group, function (d) {
            return d.x + d.x0;
        });
    }),
    xScale = d3.scale.linear()
        .domain([0, xMax])
        .range([0, width]),
    months = dataset[0].map(function (d) {
        return d.y;
    }),
    _ = console.log(months),
    yScale = d3.scale.ordinal()
        .domain(months)
        .rangeRoundBands([0, height], .1),
    xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom'),
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient('left'),
    colours = d3.scale.category10()
     .range(["red", "green"]),
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

    svg.append('g')
        .attr('class', 'axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    svg.append('g')
    .attr('class', 'axis')
    .call(yAxis);

