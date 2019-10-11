// Ref: https://github.com/yeoman/yeoman.io/blob/source/app/assets/js/generator.js

(function (win) {
  'use strict';

  var $ = win.jQuery;
  var doT = win.doT;
  doT.templateSettings.interpolate = /<\%=([\s\S]+?)\%\>/g;
  var itemTemplate = doT.template($('#template-item').text());

  function highlight(item, key) {
    if (item._highlightResult[key]) {
      return item._highlightResult[key].value;
    }
    return item[key];
  }

  function getUrl(item) {
    if (item.homepage) {
      return item.homepage;
    }
    if (item.githubRepo) {
      return 'https://github.com/' + item.githubRepo.user + '/' + item.githubRepo.project;
    }
    return 'https://npmjs.com/package/' + item.name;
  }


  $(function() {
    var search = instantsearch({
      appId: 'OFCNCOG2CU',
      apiKey: '14ddf54fd4f3435c1cd4038395a0cf10',
      indexName: 'npm-search',
      searchParameters: {
        filters: 'deprecated:false'
      },
      routing: true
    });

    search.addWidget(
      instantsearch.widgets.searchBox({
        container: '#searchbox',
        poweredBy: true,
        placeholder: 'Search with prefix: svrx-plugin-'
      })
    );

    search.addWidget(
      instantsearch.widgets.hits({
        container: '#results',
        templates: {
          empty: 'No matching plugin found. Try something else.',
          item: function(item) {
            var name = highlight(item, 'name');
            var url = getUrl(item);
            var description = highlight(item, 'description');
            var authorName = item.owner.name;
            var authorUrl = item.owner.link;
            var authorAvatar = 'https://res.cloudinary.com/hilnmyskv/image/fetch/w_40,h_40,f_auto,q_80,fl_lossy/' + item.owner.avatar;
            var version = item.version;
            var downloadReadable = item.humanDownloadsLast30Days;
            var lastUpdated = timeago().format(item.modified);
            if (item.name === 'svrx-plugin-demo') return '';
            return itemTemplate({
              name: name,
              url: url,
              description: description,
              authorName: authorName,
              authorAvatar: authorAvatar,
              authorUrl: authorUrl,
              version: version,
              downloadReadable: downloadReadable,
              lastUpdated: lastUpdated
            });
          }
        }
      })
    );

    search.start();
  });
})(window);
