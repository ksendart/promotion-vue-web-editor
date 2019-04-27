# Vue Web Editor

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run unit tests
```
npm run test:unit
```

### Main Information
Vue Web Editor is a VueCLI-based application that was created for job promotion.

This application is a FE part that is based on VueCLI framework, uses RxJS and Firebase. 
Vue Web Editor is allowing users to create and edit shared documents. Users are able to see other user’s changes and to discuss the document with other editors in a chat.

Application stores data in Cloud Firestore. Firestore contains two separate collections for documents and messages.
Data Access is provided by default Firestore Authentication by user email and password. 

Application User Interface is based on Vue-Bootstrap library and uses Vue2Editor for document editing.
