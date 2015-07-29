// /client/views/posts.js


Template.posts.helpers({
  myUser:function(){
    var myusr = Meteor.users.find({"emails.address": "info@danielesabetta.it"}).fetch()[0];
    if(Meteor.userId() == myusr._id )
        return true;
  },  
  isCreatingPost: function () {
    return Session.get('isCreatingPost');
  },
  posts: function () {
    return Posts.find({}, {"sort" : [['date', 'desc']]} );
  }
});

Template.posts.events({    
  'click a.create': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreatingPost', true);
  },

  'click button.cancel': function (e, tpl) {
    e.preventDefault();
    Session.set('isCreatingPost', false);
  },

  'submit form.create-post': function (e, tpl) {
    e.preventDefault();
     
    var t = $('#title').val();
    var a = $('#author').val();
    var b = $('#body').val();

    Session.set('isCreatingPost', false);

    Posts.insert({ title: t, author: a, body: b, date: new Date(), authorId: Meteor.userId()},function(error, _id){
      if(error){
        alert(error);
        Session.set('isCreatingPost', true);
        Tracker.afterFlush(function(){
           $('#title').val(t);
           $('#author').val(a);
           $('#body').val(b);
        });
      }
    });        
  }
});