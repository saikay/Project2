# [Fridge Frenzy][6]
## Food Fix for a Frowny Fridge™
By: Casey Shore, Joshua Moore, Glory Avina, Case Griffiths (The Trash Pandas)

## Overview
This project uses API calls and a login system to push data to a SQL database and provide end users with the ability to search for food recipies based on what is in their fridge at any given time. For example, if a user only has cheese and potatos in their fridge, the recipie finder will search out and pull back baked cheese potatoes.

## Description
The user navigates to [Fridge Frenzy][6] and selects sign up or log in if they have already visited the site.

## Setup
1. Clone this repository
    * [Clone link][1]
2. Navigate to clone directory and use command 'npm i'
3. Create a local .env using .env.example as a template
    * Get a rapid api key or mashape key for [Spoonacular][2]
    * For deployment on [Heroku][3] use [JawsDB][4]
4. To run the app localy use 'test' build in models/index.js
    * Run the local server with command 'npm start'

[1]: https://github.com/the-trash-pandas/Project2.git "Git Clone"
[2]: https://spoonacular.com/food-api "Spoonacular"
[3]: https://heroku.com "Heroku"
[4]: https://elements.heroku.com/addons/jawsdb "Jaws DB"
## Sample
[Watch an example video][5]

[5]: https://drive.google.com/file/d/1lrLSvskFcPiJHQ-DgFLTRwCWC60fMlm8/view "Fridge Frenzy Example"
[6]: https://damp-ocean-47767.herokuapp.com/ "Fridge Frenzy Deployed"
## Technologies Used
- HTML
- CSS
- JavaScript/jQuery
- Firebase for persistant storage
- MySQL for database structure
- Node
- Handlebars
  
## QA Systems Used (dev dependencies)
- Chai
- ESLint
- Mocha
- Prettier
- TravisCLI

## Deployment
- GitHub
- Heroku
