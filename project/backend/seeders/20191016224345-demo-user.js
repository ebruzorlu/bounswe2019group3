'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[
      {
          username:   "admin",
          email:      "email1",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     1.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "user",
          email:      "email2",
          bio:        "Anonymous",
          avatar:     "https://randomuser.me/api/portraits/lego/2.jpg",
          rating:     1.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "lazyostrich850",
          email:      "robby.vanbaren@example.com",
          bio:        "I am Robby Van Baren, and I live in Wessem, Netherlands.I want to learn foreign languages.",
          avatar:     "https://randomuser.me/api/portraits/men/57.jpg",
          rating:     3.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "angrydog556",
          email:      "zachary.pelletier@exarmple.com",
          bio:        "I am Zachary Pelletier, and I live in Fountainbleu, Canada.I want to learn foreign languages.",
          avatar:     "https://randomuser.me/api/portraits/men/42.jpg",
          rating:     5.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "browncat819",
          email:      "lily.edwards@example.com",
          bio:        "I am Lily Edwards, and I live in Whangarei, New Zealand.I want to learn foreign languages.",
          avatar:     "https://randomuser.me/api/portraits/women/82.jpg",
          rating:     4.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      },
      {
          username:   "orangelion929",
          email:      "elza.vieira@example.com",
          bio:        "I am Elza Vieira, and I live in Poços de Caldas, Brazil.I want to learn foreign languages.",
          avatar:     "https://randomuser.me/api/portraits/women/72.jpg",
          rating:     2.0,
          createdAt:  new Date(),
          updatedAt:  new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', 
    {username: {[Sequelize.Op.in]: ["admin", "user", "lazyostrich850", "angrydog556", "browncat819", "orangelion929", "admin"]}}
    );
  }
};
