Posts = new Mongo.Collection('posts');


Posts.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.authorId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.authorId === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.authorId === userId;
  },
  fetch: ['authorId']
});