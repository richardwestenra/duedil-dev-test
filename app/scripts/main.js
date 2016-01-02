/* eslint-disable no-console */
/* globals Mustache */

(function (window, $) {

  const categories = ['project','category','assignee'];

  const $issues = $('#issues'),
    $clear = $('#filter-clear'),
    issueTemplate = $('#issue-template').html();

  var selectizes = [],
    // flag to avoid infinite causal loop:
    activeFilter = false;


  // Add the jQuery unique function to the array prototype to allow chaining:
  Array.prototype.$unique = function () {
    return $.unique(this);
  }


  function makeIssueList(issues) {
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


  function preventLoop(callback) {
    activeFilter = true;
    callback();
    activeFilter = false;
  }


  function filterIssueList(type, value) {
    $('#filters').html(value);

    preventLoop(() => {
      selectizes.forEach(s => {
        if (s.name === type && value) {
          s.api.setValue(value);
        } else {
          s.api.clear();
        }
      });
    });

    if (!value) {
      $clear.fadeOut(200);
      $issues.find('li').removeClass('hidden');
      return;
    }

    $clear.fadeIn(200);

    $issues.find('li').each(function () {
      var datum = $(this).data();
      var hidden = datum[type] !== value;
      $(this).toggleClass('hidden', hidden);
    });
  }


  function getFilterData(data) {
    function formatData (key) {
      return data.map(d => d[key])
        .filter(d => !!d)
        .$unique()
        .sort();
    }

    return function (key) {
      var list = formatData(key);
      return makeFilterNav(key,list);
    };
  }


  function makeFilterNav(key, data) {

    var selectItems = data.map(d => {
      return { value: d };
    });

    var selectize = $(`#filter-${key}`).selectize({
      plugins: ['remove_button'],
      allowEmptyOption: true,
      valueField: 'value',
      labelField: 'value',
      searchField: 'value',
      options: selectItems,
      onChange: function (d){
        if (!activeFilter) {
          filterIssueList(key, d);
        }
      }
    })[0].selectize;

    return {
      name: key,
      api: selectize
    };
  }



  // Initialise:

  $(function(){

    $.getJSON('data/issues.json', (data) => {
      selectizes = categories.map( getFilterData(data) );
      makeIssueList(data);
    });

    $clear.on('click', function (e){
      filterIssueList();
      e.preventDefault();
    });

    $issues.on('click', '.issue_filter', function (e){
      var type = $(this).data('type');
      var value = $(this).text();
      filterIssueList(type, value);
      e.preventDefault();
    });

  });


})(window, jQuery);
