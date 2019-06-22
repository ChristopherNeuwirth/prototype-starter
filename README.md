# New Project Starter Monorepo

This project is a starter to kickstart prototype and spa development with a middleware setup. Waste no time setup up a boilerplate isntead put the energy in realizing your idea not wasting it into seting things up.

The project uses a monorepo approach and contains the sources for the ui and the api.

![Netlify Monorepo](https://github.com/ChristopherNeuwirth/prototype-starter/blob/master/doc/media/readme-netlify.png?raw=true)

## UI

The ui uses a vue as framework. It is already set up with environment variables, Typescript, Prettier, Vuetify, Router and useful custom, global SCSS Mixins. Statemangement (VUEX) is not enabled but can be easily via VUECLI.

```
./ui
```

Check out a live version running:

```
https://prototype-starter-ui.netlify.com
```

## API

The api uses a combination of expressjs, cors middleware and the serverless bibliothek to make it work with the Netlify Functions, a wrapper for AWS Lambda functions (Serverless). It also is packed with Typescript, Prettier and Hot Module Replacement for Development.

```
./api
```

Check out a live version running:

```
curl https://prototype-starter-api.netlify.com/.netlify/functions/server/hello
```

## Todos and Ideas

- Move to Angular?
