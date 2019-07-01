//------------------------------------------------------------------------
//  Collapsible button
//------------------------------------------------------------------------

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

var coll = document.getElementsByClassName("collapsible2");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

$('.nav a').on('click', function(){
    $('.btn-navbar').click(); //bootstrap 2.x
    $('.navbar-toggle').click(); //bootstrap 3.x by Richard
    $('.navbar-toggler').click(); //bootstrap 4.x
});

//------------------------------------------------------------------------
// PAGES 
//------------------------------------------------------------------------
$(document).ready(function() {
  salamander();
})

function salamander(options) {

  var defaults = {
      pageFromAnimationOut: "fadeOut",
      pageFromAnimationOutSpeed: 1000,
      pageFromAnimationIn: "fadeIn",
      pageFromAnimationInSpeed: 1000,
      pageToAnimationIn: "fadeIn",
      pageToAnimationInSpeed: 1000,
      pageToAnimationOut: "fadeOut",
      pageToAnimationOutSpeed: 1000,

      panelAnimationIn: "fadeIn",
      panelAnimationInSpeed: 200,
      panelAnimationOut: "fadeOut",
      panelAnimationOutSpeed: 200,
    },
    options = $.extend(defaults, options)

  /*** SET UP PAGES ***/
  $('.page').css('display', 'none').css('visibility', 'hidden').addClass('animated');
  $('.activePage').css('display', 'block').css('visibility', 'visible');
  window.location.hash = $('.activePage').attr('id');

  $('a.pageLink').click(function(e) {
    changePage($(this).attr('href'), options);
    e.preventDefault();
  })

  $(window).on('hashchange', function() {
    changePage(location.hash, options);
    closePanel(options);
  });

  /*** SET UP PANELS AND POPUPS ***/
  $('.popup').addClass('panel');
  $('.panel').css('display', 'none').css('visibility', 'hidden').addClass('animated');

  $('.panelLink').click(function(e) {
    togglePanel($(this).attr('href'), options);
    e.preventDefault();
  })

  $('.page').click(function(e) {
    closePanel(options);
  })
}

function changePage(pageTo, options) {

  var opt = options;

  window.location.hash = pageTo;

  var pageFrom = '#' + $('.activePage').attr('id');

  if (!$(pageTo).hasClass('activePage')) {

    var pageFromData = $(pageFrom).data('animations');
    var pageToData = $(pageTo).data('animations');

    if (pageFromData) {
      if (pageFromData.hasOwnProperty('in')) {
        opt.pageFromAnimationIn = pageFromData.in
      }
      if (pageFromData.hasOwnProperty('inSpeed')) {
        opt.pageFromAnimationInSpeed = pageFromData.inSpeed
      }
      if (pageFromData.hasOwnProperty('out')) {
        opt.pageFromAnimationOut = pageFromData.out
      }
      if (pageFromData.hasOwnProperty('outSpeed')) {
        opt.pageFromAnimationOutSpeed = pageFromData.outSpeed
      }
    }

    if (pageToData) {
      if (pageToData.hasOwnProperty('in')) {
        opt.pageToAnimationIn = pageToData.in
      }
      if (pageToData.hasOwnProperty('inSpeed')) {
        opt.pageToAnimationInSpeed = pageToData.inSpeed
      }
      if (pageToData.hasOwnProperty('out')) {
        opt.pageToAnimationOut = pageToData.out
      }
      if (pageToData.hasOwnProperty('outSpeed')) {
        opt.pageToAnimationOutSpeed = pageToData.outSpeed
      }
    }

    $(pageFrom)
      .removeClass(opt.pageFromAnimationOut)
      .removeClass(opt.pageFromAnimationIn)
      .css('animation-duration', '');

    $(pageTo)
      .removeClass(opt.pageToAnimationIn)
      .removeClass(opt.pageToAnimationOut)
      .removeClass('loadingPage')
      .css('animation-duration', '');

    fireEvent('leavingPage', $(pageFrom));
    fireEvent('loadingPage', pageTo);

    $('body').css('overflow-y', 'hidden');
    $(pageFrom).css('animation-duration', opt.pageFromAnimationOutSpeed + 'ms').addClass(opt.pageFromAnimationOut);
    $(pageTo).css('display', 'block').css('visibility', 'visible').css('animation-duration', opt.pageToAnimationInSpeed + 'ms').addClass(opt.pageToAnimationIn).addClass('loadingPage');

    window.setTimeout(function() {
      $(pageFrom)
        .css('visibility', 'hidden')
        .css('display', 'none')
        .removeClass('activePage');
      $(pageTo)
        .removeClass('loadingPage')
        .addClass('activePage');
      $('body').css('overflow-y', 'auto');
      fireEvent('loadedPage', pageTo);
    }, opt.pageToAnimationInSpeed);
  }
}

/*** PANELS ***/

var optOpen, optClose, panelData;

function togglePanel(panel, options) {
  if (!$(panel).hasClass('openPanel')) {
    openPanel(panel, options);
  } else {
    closePanel(options);
  }
}

function openPanel(panel, options) {

  closePanel(panel, options);

  optOpen = $.extend(optOpen, options);

  panelData = $(panel).data('animations');

  if (panelData) {
    if (panelData.hasOwnProperty('in')) {
      optOpen.panelAnimationIn = panelData.in
    }
    if (panelData.hasOwnProperty('inSpeed')) {
      optOpen.panelAnimationInSpeed = panelData.inSpeed
    }
  }

  $(panel).removeClass(optOpen.panelAnimationIn).removeClass(optOpen.panelAnimationOut);
  fireEvent('openingPanel', panel);

  $(panel)
    .css('display', 'block')
    .css('visibility', 'visible')
    .css('animation-duration', optOpen.panelAnimationInSpeed + 'ms')
    .addClass(optOpen.panelAnimationIn)

  window.setTimeout(function() {
    $(panel)
      .addClass('openPanel');
    fireEvent('openedPanel', panel);
  }, optOpen.panelAnimationInSpeed);
}

function closePanel(options) {
  if ($('.openPanel').length) {

    optClose = $.extend(optClose, options);

    panelData = $('.openPanel').data('animations');

    if (panelData) {
      if (panelData.hasOwnProperty('in')) {
        optClose.panelAnimationIn = panelData.in
      }
      if (panelData.hasOwnProperty('inSpeed')) {
        optClose.panelAnimationInSpeed = panelData.inSpeed
      }
      if (panelData.hasOwnProperty('out')) {
        optClose.panelAnimationOut = panelData.out
      }
      if (panelData.hasOwnProperty('outSpeed')) {
        optClose.panelAnimationOutSpeed = panelData.outSpeed
      }
    }

    fireEvent('closingPanel', $('.openPanel').attr('id'));
    $('.openPanel').removeClass(optClose.panelAnimationIn).removeClass(optClose.panelAnimationOut).addClass(optClose.panelAnimationOut);
    window.setTimeout(function() {
      $('.openPanel')
        .removeClass('openPanel')
        .css('visibility', 'hidden')
        .css('display', 'none')
        .removeClass(optClose.panelAnimationIn).removeClass(optClose.panelAnimationOut);
      fireEvent('closedPanel', $('.openPanel').attr('id'));
    }, optClose.panelAnimationOutSpeed);
  }
}

/*** EVENTS ***/

function fireEvent(event, element) {
  $(element).trigger(event, $(element).attr('id'));
}

/*** EVENT EXAMPLES ***/

$(document).on('loadedPage', function(e, page) {
  console.log('Loaded ' + page)
})

$(document).on('loadingPage', function(e, page) {
  console.log('Loading ' + page)
})

$(document).on('leavingPage', function(e, page) {
  console.log('Leaving ' + page)
})

$(document).on('openingPanel', function(e, panel) {
  console.log('Opening ' + panel)
})

$(document).on('openedPanel', function(e, panel) {
  console.log('Opened ' + panel)
})

$(document).on('closingPanel', function(e, panel) {
  console.log('Closing ' + panel)
})

$(document).on('closedPanel', function(e, panel) {
  console.log('Closed ' + panel)
})