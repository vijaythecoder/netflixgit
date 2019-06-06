# Netflix 

This application will let you search an organization and it fetches and shows 18 repositories. It will let you paginate and browse recent commits of a selected repository.

For online demo: [Click Here](https://netflix.vijaykumar.me)
## For setting up locally
clone the repo and then install dependencies using the following command.
```
npm install
```
Start the server using the following command
### Local setup
```
npm run serve
```

### Run your unit tests
For running tests
```
npm run test:unit
```

# Explanation

Currently this application has the following features

  - Search for an organization
  - Quickly click on the recent searched organization
  - Navigate through all the pages
  - Browse through commits of each repo

## Technology Stack
  - [Vuejs](https://vuejs.org/) (for single page application)
  - [Vuex](httpshttps://vuex.vuejs.org/) (for state management for vuejs similar to redux in reactjs)
  - [Vue Test Utils](https://vue-test-utils.vuejs.org/) (vuejs wrapper for testing using jest)
  - HTML
  - CSS
  - [Twitter Bootstrap](https://netflix.vijaykumar.me) (for quick designed components and responsive)
  - [jQuery](https://netflix.vijaykumar.me) (as a dependency for the bootstrap)
  - Webpack (module bundler)
  - Visual Studio Code

## Screenshots of the application

#### Search
![Search](src/assets/screenshots/search-box.png)
#### List of Repositories
![List of Repositories](src/assets/screenshots/list-of-repos.png)
#### List of Commits
![List of Commits](src/assets/screenshots/commits.png)
