/* eslint-disable no-console */
/* globals Mustache */

(function(window, $){

  var $issues = $('#issues'),
    issueTemplate = $('#issue-template').html();


  function makeList (issues) {
    // Create HTML from template
    $issues.html( Mustache.render(
      issueTemplate,
      { issues }
    ))
    // Bind data to HTML
    .find('li').each(function (i) {
      $(this).data( issues[i] );
    });
  }

  function filterList (type, value) {
    $('#filters').html(`${type}: ${value}`)
    $issues.find('li').each(function () {
      var datum = $(this).data();
      var hidden = datum[type] !== value;
      $(this).toggleClass('hidden', hidden);
    });
  }



  $(function(){
    $.getJSON('data/issues.json', makeList);

    $issues.on('click', '.issue_filter', function (e){
      var data = $(this).parents('li').data();
      var type = $(this).data('type');
      var value = $(this).text();
      console.log(type, value);
      filterList(type, value);


      e.preventDefault();
    });
  });


  // Export to Window
  // window.app = window.app || {};
  // window.app.main = {
  // };

})(window, jQuery);
