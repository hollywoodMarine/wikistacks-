var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
	logging: false
});

let Page = db.define('page', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
	},
	urlTitle: {
		type: Sequelize.STRING,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	status: {
		type: Sequelize.ENUM('open','closed')
	},
	date: {
		type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
	}
	},
	{
		getterMethods : {
			route: function(){
				return "/wiki/"+ this.urlTitle
			}
		}
	},
	{
		hooks: {
			beforeValidate: function (title) {
				 	console.log(title); 
				  if (title) {
				    // Removes all non-alphanumeric characters from title
				    // And make whitespace underscore

				    this.urlTitle = title.replace(/\s+/g, '_').replace(/\W/g, '');
				    return this.urlTitle;
				  } else {
				    // Generates random 5 letter string
				    return Math.random().toString(36).substring(2, 7);
				  }
				}
		}
	}

);

let User = db.define('user', {
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false, 
		validate: {
            isEmail: true
        }
	}
});

module.exports = {
	Page: Page,
	User: User
}
