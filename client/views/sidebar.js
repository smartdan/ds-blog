
UI.registerHelper('formatTime', function(context, options) {
  if(context)
    return moment(context).format('MMM YYYY');
});

Template.sidebar.helpers({
  posts: function () {
    var pps = Posts.find({}, {"sort" : [['date', 'desc']]} );
    return pps;
  },
  recents:  function () {
    return Posts.find({}, {"sort" : [['date', 'desc']], "limit" : 10} );
  }
});