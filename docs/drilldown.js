function drilldown(myparams) {
    var query_name = myparams.query_name;
    var agg_cols = myparams.aggregate_columns;
    var sum_cols = myparams.sum_columns;
    var avg_cols = myparams.avg_columns;
    var rnd = myparams.rounding;
    var height = myparams.table_height;
    var tier = 0;

    var data = datasets.filter(function(d) {
        return d.queryName == query_name;
    })[0].content;



    var headers = Object.keys(data[0]);
    var code = "<div class=\"drilltable\" style=\"height:" + height + "px;\">";
    code = code + "<table class=\"tablesorter\"><head><tr>";
    headers.forEach(function(header) {
        var prefix = "";
        if (sum_cols.includes(header)) {
            prefix = "SUM: ";
        } else if (avg_cols.includes(header)) {
            prefix = "AVG: ";
        }
        code = code + "<th>" + prefix + header + "</th>"
    });
    code = code + "</tr></thead><tbody>";

    var col1_uniques = data.map(a => a[agg_cols[0]]).filter((item, i, ar) => ar.indexOf(item) === i);
    col1_uniques.forEach(function(col1) {
        first_rows = data.filter(function(row) {
            return row[agg_cols[0]] == col1;
        });
        code = code + "<tr class=\"tier1\">";

        function category_columns(header, column, tier) {
            if (agg_cols[tier] == header && agg_cols.indexOf(header) < agg_cols.length - 1) {
                code = code + "<td><a href=\"#\" class=\"toggle" + tier + "\">" + column + "</a></td>";
            } else if (agg_cols[tier] == header && agg_cols.indexOf(header) == agg_cols.length - 1) {
                code = code + "<td>" + column + "</td>";
            } else {
                code = code + "<td></td>";
            }
        }

        function aggregate_columns(header, rows) {
            if (sum_cols.includes(header)) {
                code = code + "<td class=\"drill_int\">" + parseFloat((rows.map(a => a[header]).filter(function(el) {
                    return el != null
                }).reduce(function(a, b) {
                    return a + b;
                }, 0)).toFixed(rnd)) + "</td>";
            } else if (avg_cols.includes(header)) {
                code = code + "<td class=\"drill_int\">" + parseFloat((rows.map(a => a[header]).filter(function(el) {
                    return el != null
                }).reduce(function(a, b) {
                    return a + b;
                }, 0) / rows.filter(function(el) {
                    return el[header] != null
                }).length).toFixed(rnd)) + "</td>";
            } else {
                code = code + "<td>Column Type not Defined</td>";
            }
        }

        headers.forEach(function(header) {
            tier = 0;
            if (agg_cols.includes(header)) {
                category_columns(header, col1, tier)
            } else {
                aggregate_columns(header, first_rows)
            }
        });
        code = code + "</tr>";

        if (agg_cols.includes(headers[1])) {
            var col2_uniques = first_rows.map(a => a[agg_cols[1]]).filter((item, i, ar) => ar.indexOf(item) === i);
            col2_uniques.forEach(function(col2) {
                second_rows = first_rows.filter(function(row) {
                    return row[agg_cols[1]] == col2;
                });
                code = code + "<tr class=\"tablesorter-childRow1 tier2\">";
                headers.forEach(function(header) {
                    tier = 1;
                    if (agg_cols.includes(header)) {
                        category_columns(header, col2, tier)
                    } else {
                        aggregate_columns(header, second_rows)
                    }
                });
                code = code + "</tr>";


                if (agg_cols.includes(headers[2])) {
                    var col3_uniques = second_rows.map(a => a[agg_cols[2]]).filter((item, i, ar) => ar.indexOf(item) === i);
                    col3_uniques.forEach(function(col3) {
                        third_rows = second_rows.filter(function(row) {
                            return row[agg_cols[2]] == col3;
                        });
                        code = code + "<tr class=\"tablesorter-childRow1 tablesorter-childRow2 tier3\">";
                        headers.forEach(function(header) {
                            tier = 2;
                            if (agg_cols.includes(header)) {
                                category_columns(header, col3, tier)
                            } else {
                                aggregate_columns(header, third_rows)
                            }
                        });
                        code = code + "</tr>";

                        if (agg_cols.includes(headers[3])) {
                            var col4_uniques = third_rows.map(a => a[agg_cols[3]]).filter((item, i, ar) => ar.indexOf(item) === i);
                            col4_uniques.forEach(function(col4) {
                                fourth_rows = third_rows.filter(function(row) {
                                    return row[agg_cols[3]] == col4;
                                });
                                code = code + "<tr class=\"tablesorter-childRow1 tablesorter-childRow2  tablesorter-childRow3 tier4\">";
                                headers.forEach(function(header) {
                                    tier = 3;
                                    if (agg_cols.includes(header)) {
                                        category_columns(header, col4, tier)
                                    } else {
                                        aggregate_columns(header, fourth_rows)
                                    }
                                });
                                code = code + "</tr>";
                            });
                        };


                    });
                };




            });
        };
    });
    code = code + "</tbody></table></div>";

    document.getElementById('testdiv').innerHTML = code
    $(function() {
        $('.tablesorter-childRow1 td').hide();
        $('.tablesorter-childRow2 td').hide();
        $('.tablesorter-childRow3 td').hide();
        $(".tablesorter")
            .tablesorter({
                cssChildRow: "tablesorter-childRow1"
            })
        $('.tablesorter').delegate('.toggle0', 'click', function() {
            $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow1').find('td').toggle();
            $('.tablesorter-childRow2 td').hide();
            $('.tablesorter-childRow3 td').hide();
            return false;
        });
        $('.tablesorter').delegate('.toggle1', 'click', function() {
            $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow2)').find('td').toggle();
            $('.tablesorter-childRow3 td').hide();
            return false;
        });
        $('.tablesorter').delegate('.toggle2', 'click', function() {
            $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow3)').find('td').toggle();
            return false;
        });
    });
};
