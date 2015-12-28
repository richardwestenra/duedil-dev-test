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
    // .end()
    // .on('click','li',function (){
    //   console.log($(this).data());
    // });
  }



  $(function(){
    $.getJSON('data/issues.json', makeList);
  });


  // Export to Window
  // window.app = window.app || {};
  // window.app.main = {
  // };

})(window, jQuery);
