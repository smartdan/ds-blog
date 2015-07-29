Router.configure({
    layoutTemplate: 'main'
});

Router.route('about', {
  path: '/about',
  template: 'about'
});

Router.route('/', {
    template: 'posts'
});

Router.route('show', {
  path: '/show/:title',
  template: 'post',
  data: function() {
    return Posts.findOne({title: this.params.title});
  }
});