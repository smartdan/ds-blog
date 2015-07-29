Session.set('showShort', true);

Template.post.helpers({
  myUser:function(){
    var myusr = Meteor.users.find({"emails.address": "info@danielesabetta.it"}).fetch()[0];
    if(Meteor.userId() == myusr._id )
        return true;
  },  
  dateFormatted: function () {
    return moment(this.date).format('DD-MMM-YYYY');
  },
  isEditingPost: function(){
    return Session.get('editedPostId') === this._id;
  },
  shortBody: function(){
    return this.body.substring(0,200) + "..."; 
  },
  showShort: function(){
    return Session.get('showShort'); 
  }
});

Template.post.events({
   "click a.more": function(e, tpl){
    e.preventDefault();
    Session.set('showShort', false);
  },
   "click a.less": function(e, tpl){
    e.preventDefault();
    Session.set('showShort', true);
  },
  "click a.edit": function(e, tpl){
    e.preventDefault();
    Session.set('editedPostId', this._id);
  },
  "submit form.form-edit": function(e, tpl){
    e.preventDefault();
 
    var t = tpl.$('#title').val();
    var a =  tpl.$('#author').val();
    var b =  tpl.$('#body').val();
    
    if(t.length){
      Posts.update(this._id, {$set: {title: t, body: b, author: a, authorId: Meteor.userId()}});
      Session.set('editedPostId', null);
    }
  },
  "click button.cancel": function(e, tpl){
    e.preventDefault();
    Session.set('editedPostId', null);
  },
  'click a.remove': function(e, tpl){
    e.preventDefault();
    Posts.remove(this._id);
  }
});