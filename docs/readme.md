## Drilldown Tables
### Example
[Sample Report](https://app.mode.com/editor/shopify/reports/c0b17ede36f5)
![alt text](drilldown_example.gif)

### Building the SQL Query
Your SQL Query will want to consist of two types of columns.
Aggregate Header Columns & Sum or Individual Integer Columns.  Aggregate columns are the columns you have, or will be aggregating by in the final visualization.  There can be up to 5 aggregation columns which will expand when clicked on.  The default state is collapsed to reveal only the top level aggregation.

An Example table might look like this:

```
SELECT 
   Month,
   Day,
   Hour,
   sum("Tickets") AS "Tickets",
   sum("Interactions") AS "Interactions",
   sum("Handle Time") AS "Handle Time"
FROM 
   table
GROUP BY 
   Month,
   Day,
   Hour
```
```
|Month    |Day|Hour|Tickets|Interactions|Handle Time|
|---------|---|----|-------|------------|-----------|
|September| 30|  12|      5|          12|         42|
|October  |  1|  14|      7|          15|         56|
|October  |  2|  15|      3|          13|         39|
```

### The HTML Editor
#### - Link the Resources
You will need to link the following javascript resources and CSS files at the top of your editor:
```
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.3/js/jquery.tablesorter.min.js"></script>
<script type="text/javascript" src="https://esoikie.github.io/EvansSpace/drilldown.js"></script>
<link rel="stylesheet" href="https://esoikie.github.io/EvansSpace/drilldown.css">
```

#### - Place the Visualization
In order to add the visualization to your report you will need to add a div with an assigned id in the location where you would like to see the drilldown navigation.
```
<div id="mydrilldown"></div>
```

#### - Add the Javascript
At the bottom of the html editor you will need to add the following script:
```
<script>
  drilldown({
    query_name: "myquery",       // The name of the SQL query from which to get the data
    div_id: "mydrilldown",       // The ID of the div you will use for the visualization
    aggregate_columns: [         // A list of all columns which will be used for click through
      "Month",                      // navigation in order of appearance.
      "Day",
      "Hour"
    ],
    calculate_columns: [         // A list of all Aggregated Columns you would like displayed in 
      "Tickets",                    // order of appearance
      "Interactions",
      "Handle Time"
    ],
    sum_columns: [               // A list of all columns which will be aggregated by calculating 
      "Tickets",                    // the sum of the columns.
      "Interactions"
    ],
    avg_columns: [],             // A list of all columns which will be aggregated by calculating an average of the values.
                                    // Note that this should only be used when aggregation has not been done in the source
                                    // query and the data source includes one row per item.
    sum_avg_columns: {           // This is to be used when an average is to be calculated by dividing the sum of one 
      "Handle Time": "Tickets"      // column, by the sum of the second column to be entered as "Numerator":"Denominator"
    },                              // only the Numerator Column will be displayed.
    rounding: 1,                 // How many decimal places you would like to have calculations rounded to.
    table_height: 500,           // The height in pixels you would like the visualization to appear.
  })
</script>
```
