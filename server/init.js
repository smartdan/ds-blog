Meteor.startup(function() {	
	// Create a test user. `createUser` returns the id of the created user
    if (Meteor.users.find({"emails.address": "info@danielesabetta.it"}).count() == 0){
		var ownerId = Accounts.createUser({
	      email: 'info@danielesabetta.it',
	      password: 'sabetta15'
	    });
	}
});