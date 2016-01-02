/* eslint-disable no-console */
/* globals Mustache */

(function (window, $) {

  const categories = ['project','category','assignee'],
    lsKey = 'duedil-view';

  const $issues = $('#issues'),
    $viewNav = $('#viewNav'),
    $clear = $('#filter-clear'),
    issueTemplate = $('#issue-template').html();

  var selectizes = [],
    // flag to avoid infinite causal loop:
    activeFilter = false;


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


  // Prevent the filter event listeners from
  // triggering themselves using a flag variable
  function preventLoop(callback) {
    activeFilter = true;
    callback();
    activeFilter = false;
  }


  function filterIssueList(type, value) {

    preventLoop(function () {
      selectizes.forEach(s => {
        if (s.name === type && value) {
          s.api.setValue(value);
        } else {
          s.api.clear();
        }
      });
    });

    if (!value) {
      $('#filters').html('');
      $clear.fadeOut(200);
      $issues.find('li').removeClass('hidden');
      return;
    }

    $('#filters').html(value);
    $clear.fadeIn(200);

    $issues.find('li').each(function () {
      var datum = $(this).data();
      var hidden = datum[type] !== value;
      $(this).toggleClass('hidden', hidden);
    });
  }


  function getFilterData(data) {
    function formatData (key) {
      return $.unique(
        data.map(d => d[key]).filter(d => !!d)
      ).sort();
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


  function toggleView(view){

    $viewNav.find('button')
      .removeClass('view-active')
      .filter(`.view-${view}`)
      .addClass('view-active');

    $('body').removeClass('list grid')
      .addClass(view);
  }



  // Initialise:

  $(function(){

    // Update view from localStorage
    var lsView = window.localStorage.getItem(lsKey);
    if (lsView) {
      toggleView(lsView);
    }

    // Get data and populate list and filters
    $.getJSON('data/issues.json', (data) => {
      makeIssueList(data);
      selectizes = categories.map( getFilterData(data) );
    });

    // Add clear filter button event listener
    $clear.on('click', function (e){
      filterIssueList();
      e.preventDefault();
    });

    // Add inline issue filter event listener
    $issues.on('click', '.issue_filter', function (e){
      var type = $(this).data('type');
      var value = $(this).text();
      filterIssueList(type, value);
      e.preventDefault();
    });

    // Add view toggle button event listener
    $viewNav.on('click', 'button', function () {
      var view = $(this).text().toLowerCase();
      toggleView(view);
      window.localStorage.setItem(lsKey, view);
    });

  });


})(window, jQuery);
