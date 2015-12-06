(function() {
  var arrayEqual, currentSelection, hasResults, highlightSelection, hoverSelection, results, traverseDown, traverseUp;

  hasResults = $('#search-results a').length > 0 ? true : false;

  currentSelection = $("#search-results a.selected");

  results = $('#search-results');

  traverseUp = function() {
    console.log('up arrow pressed');
  };

  traverseDown = function() {
    console.log('down arrow pressed');
    return $("#search-results a.selected").removeClass('selected').next().addClass('selected');
  };

  hoverSelection = function() {
    var query;
    query = $('#search-results a');
    $(query).on('mouseenter', function() {
      return $(this).addClass('selected');
    });
    $(query).on('mouseleave', function() {
      return $(this).removeClass('selected');
    });
  };

  arrayEqual = function(a, b) {
    return a.length === b.length && a.every(function(elem, i) {
      return elem === b[i];
    });
  };

  highlightSelection = function() {
    var config, observer, target;
    target = document.querySelector('#search-results');
    observer = new MutationObserver(function(mutations) {
      var i, len, newResults, oldResults, resultsList, url;
      oldResults = [];
      if ($('#search-results a').index() !== -1) {
        $('#search-results a').each(function(index, element) {
          var url;
          url = $(this).attr('href');
          oldResults.push(url);
        });
      }
      console.log('old results: ' + oldResults);
      console.log('oldResults count: ' + $(oldResults).length);
      i = 0;
      len = mutations.length;
      newResults = [];
      while (i < len) {
        resultsList = mutations[0].target;
        if (i < mutations[0].length - 1) {
          url = resultsList.querySelectorAll('a')[i].pathname;
          newResults.push(url);
          $('#search-results a').each(function(index, element) {
            if (index === 0) {
              return $(this).addClass('selected');
            }
          });
        }
        i++;
      }
      return $('#search-results a').each(function(index, element) {
        if (index === 0) {
          console.log('index = 0');
          $(this).addClass('selected');
        }
      });
    });
    config = {
      childList: true,
      subtree: true
    };
    observer.observe(target, config);
    $('#search-posts').keydown(function(e) {
      var endOfList;
      if (e.which === 40) {
        e.preventDefault();
        endOfList = $("#search-results a.selected").index() + 1 === $("#search-results").children().length;
        observer.disconnect();
        if (!endOfList) {
          return traverseDown();
        }
      } else if (e.which === 38) {
        e.preventDefault();
        observer.disconnect();
        return traverseUp();
      }
    });
    $('#search-posts').keyup(function(e) {
      if (e.which === 40 || e.which === 38) {
        return observer.observe(target, config);
      }
    });
  };

  $(document).ready(function() {
    highlightSelection();
    hoverSelection();
    Mousetrap.bind('enter', function(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      return window.open($('#search-results a.selected').attr('href'), '_self');
    });
    Mousetrap.bind('o h', function() {
      return console.log('io');
    });
    Mousetrap.bind('l i n u x', function() {
      return console.log('GNU/Linux');
    });
    Mousetrap.bind('j i f', function() {
      return console.log('gif');
    });
    Mousetrap.bind('b u g', function() {
      return console.log('feature');
    });
    Mousetrap.bind('v i m', function() {
      return console.log('did you mean: emacs');
    });
    Mousetrap.bind('e m a c s', function() {
      return console.log('did you mean: vim');
    });
  });

}).call(this);

(function() {
  $(document).ready(function() {
    return $('#mc_embed_signup').find('form').ajaxChimp();
  });

  (function($) {
    'use strict';
    $.ajaxChimp = {
      responses: {
        'We have sent you a confirmation email': 0,
        'Please enter a valid email': 1,
        'An email address must contain a single @': 2,
        'The domain portion of the email address is invalid (the portion after the @: )': 3,
        'The username portion of the email address is invalid (the portion before the @: )': 4,
        'This email address looks fake or invalid. Please enter a real email address': 5
      },
      translations: {
        'en': null
      },
      init: function(selector, options) {
        $(selector).ajaxChimp(options);
      }
    };
    $.fn.ajaxChimp = function(options) {
      $(this).each(function(i, elem) {
        var email, form, label, settings, url;
        form = $(elem);
        email = form.find('input[type=email]');
        label = form.find('.info');
        settings = $.extend({
          'url': form.attr('action'),
          'language': 'en'
        }, options);
        url = settings.url.replace('/post?', '/post-json?').concat('&c=?');
        form.attr('novalidate', 'true');
        email.attr('name', 'EMAIL');
        form.submit(function() {
          var data, dataArray, msg, submitMsg, successCallback;
          msg = void 0;
          data = {};
          dataArray = form.serializeArray();
          successCallback = function(resp) {
            var i;
            var e, index, parts;
            if (resp.result === 'success') {
              msg = 'We have sent you a confirmation email';
              label.removeClass('error').addClass('valid');
              email.removeClass('error').addClass('valid');
            } else {
              email.removeClass('valid').addClass('error');
              label.removeClass('valid').addClass('error');
              index = -1;
              try {
                parts = resp.msg.split(' - ', 2);
                if (parts[1] === void 0) {
                  msg = resp.msg;
                } else {
                  i = parseInt(parts[0], 10);
                  if (i.toString() === parts[0]) {
                    index = parts[0];
                    msg = parts[1];
                  } else {
                    index = -1;
                    msg = resp.msg;
                  }
                }
              } catch (_error) {
                e = _error;
                index = -1;
                msg = resp.msg;
              }
            }
            if (settings.language !== 'en' && $.ajaxChimp.responses[msg] !== void 0 && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]) {
              msg = $.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]];
            }
            label.html(msg);
            label.show(2000);
            if (settings.callback) {
              settings.callback(resp);
            }
          };
          $.each(dataArray, function(index, item) {
            data[item.name] = item.value;
          });
          $.ajax({
            url: url,
            data: data,
            success: successCallback,
            dataType: 'jsonp',
            error: function(resp, text) {
              console.log('mailchimp ajax submit error: ' + text);
            }
          });
          submitMsg = 'Submitting...';
          if (settings.language !== 'en' && $.ajaxChimp.translations && $.ajaxChimp.translations[settings.language] && $.ajaxChimp.translations[settings.language]['submit']) {
            submitMsg = $.ajaxChimp.translations[settings.language]['submit'];
          }
          label.html(submitMsg).show(2000);
          return false;
        });
      });
      return this;
    };
  })(jQuery);

}).call(this);

(function() {
  var setNavigation;

  $(function() {
    return setNavigation();
  });

  setNavigation = function() {
    var baseUrl, p, u;
    baseUrl = "/open-source-club-website";
    p = window.location.pathname;
    u = window.location.host.indexOf("github.io");
    if (u > -1) {
      p = p.replace(baseUrl, "");
    }
    p = p.replace(/\/$/, '');
    $('#main-nav>a').each(function() {
      var href;
      href = $(this).attr('href');
      if (p.substring(0, href.length) === href) {
        if (href.length > 1) {
          $(this).addClass('active');
        }
      } else if (href.length === 1) {
        $(this).addClass('active');
      }
    });
  };

}).call(this);

(function() {
  $(document).ready(function() {
    $('#page-content-wrapper').scroll(function() {
      if ($('#page-content-wrapper').scrollTop() > 300) {
        $('.scrollToTop').css('display', 'initial');
      } else {
        $('.scrollToTop').css('display', 'none');
      }
    });
    $('.scrollToTop').click(function() {
      $('#page-content-wrapper').animate({
        scrollTop: 0
      }, 800);
      return false;
    });
  });

}).call(this);

(function() {
  $(function() {
    var $baseUrl, $u;
    $baseUrl = '/open-source-club-website';
    $u = window.location.host.indexOf('github.io');
    if ($u === -1) {
      $baseUrl = '';
    }
    SimpleJekyllSearch({
      searchInput: document.getElementById('search-posts'),
      resultsContainer: document.getElementById('search-results'),
      json: $baseUrl + '/search.json',
      searchResultTemplate: '<a href="{url}"><li><div class="primary">{title}</div><div class="secondary">{date}</div></li></a>',
      noResultsText: '<li class="no-results">No results found</li>',
      limit: 10,
      fuzzy: false
    });
  });

}).call(this);

(function() {
  var $lines, terminal;

  $lines = $('.term>.term-cmd');

  $(function() {
    $lines.hide();
    return terminal();
  });

  terminal = function() {
    var lineContents, skip, typeLine;
    skip = 0;
    lineContents = new Array;
    typeLine = function(idx) {
      var charIdx, content, element, typeChar;
      idx === null && (idx = 0);
      element = $lines.eq(idx);
      content = lineContents[idx];
      if (typeof content === 'undefined') {
        $('.skip').hide();
        return;
      }
      charIdx = 0;
      typeChar = function() {
        var rand;
        rand = Math.round(Math.random() * 150) + 25;
        setTimeout((function() {
          var char;
          char = content[charIdx++];
          element.append(char);
          if (typeof char !== 'undefined') {
            typeChar();
          } else {
            element.append('<br/><span class="term-output">' + element.text().slice(9, -1) + '</span>');
            element.removeClass('term-active');
            typeLine(++idx);
          }
        }), skip ? 0 : rand);
      };
      content = 'echo "' + content + '"';
      element.append('~$ ').addClass('term-active');
      typeChar();
    };
    $lines.each(function(i) {
      lineContents[i] = $(this).text();
      $(this).text('').show();
    });
    typeLine();
  };

}).call(this);

(function() {
  var moveClouds;

  $(document).ready(function() {
    return moveClouds();
  });

  moveClouds = function(e, s, d) {
    var wait;
    $(e).css('right', '-20%');
    wait = window.setTimeout((function() {
      $(e).animate({
        right: '120%'
      }, s, 'linear', function() {
        moveClouds(e, s, d);
      });
    }), d);
  };

}).call(this);

(function() {
  var setWidth;

  $(function() {
    return setWidth();
  });

  setWidth = function() {
    var contentWrapperWidth;
    if ($(window).width() < 1200) {
      if ($('.sidebar').is('.active')) {
        if ($(window).width() < 750) {
          contentWrapperWidth = $(window).width();
        } else {
          contentWrapperWidth = 'inherit';
        }
      } else {
        if ($(window).width() < 750) {
          contentWrapperWidth = $(window).width();
        } else {
          contentWrapperWidth = 'inherit';
        }
      }
    } else {
      contentWrapperWidth = $(window).width() - $('.sidebar').width();
    }
    $('#page-content-wrapper').css('width', contentWrapperWidth);
    $('.navbar').css('width', contentWrapperWidth);
  };

  $(window).resize(function() {
    setWidth();
  });

}).call(this);

(function() {
  $(document).ready(function() {
    var $menu, $menulink;
    $('#scroll-indicator').addClass('animated bounce').removeClass('hidden');
    $('body').addClass('js');
    $menu = $('.sidebar');
    $menulink = $('.menu-toggle');
    $menulink.click(function() {
      $menulink.toggleClass('active');
      $menu.toggleClass('active');
      $('#page-content-wrapper').toggleClass('active');
      return false;
    });
  });

}).call(this);
