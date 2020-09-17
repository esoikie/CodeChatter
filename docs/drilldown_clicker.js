  $(function() {
    $('.tablesorter-childRow1 td').hide();
    $('.tablesorter-childRow2 td').hide();
    $('.tablesorter-childRow3 td').hide();
    $('.tablesorter-childRow4 td').hide();
    $(".tablesorter")
        .tablesorter({
            cssChildRow: "tablesorter-childRow1"
        })
    $('.tablesorter').delegate('.toggle0', 'click', function() {
        $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow1').find('td').toggle();
        $('.tablesorter-childRow2 td').hide();
        $('.tablesorter-childRow3 td').hide();
        $('.tablesorter-childRow4 td').hide();
        return false;
    });
    $('.tablesorter').delegate('.toggle1', 'click', function() {
        $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow2)').find('td').toggle();
        $('.tablesorter-childRow3 td').hide();
        $('.tablesorter-childRow4 td').hide();
        return false;
    });
    $('.tablesorter').delegate('.toggle2', 'click', function() {
        $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow3)').find('td').toggle();
        $('.tablesorter-childRow4 td').hide();
        return false;
    });
    $('.tablesorter').delegate('.toggle3', 'click', function() {
        $(this).closest('tr').nextUntil('tr:not(.tablesorter-childRow4)').find('td').toggle();
        return false;
    });
  });
