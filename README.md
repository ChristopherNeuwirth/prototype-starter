# New Project Starter Monorepo

This project is a starter to kickstart prototype and spa development with a middleware and mongodb setup. Waste no time setup up a boilerplate instead put the energy in realizing your idea not wasting it into seting things up.

⚠️ NestJs is not deployable at Netlify at the moment so currently its neccessary to use netlify for ui deployment and zeit.co for api deployment.

The project uses a monorepo approach and contains the sources for the ui and the api.

![Netlify Monorepo](https://github.com/ChristopherNeuwirth/prototype-starter/blob/master/doc/media/readme-netlify.png?raw=true)

## UI

The ui uses Angular as framework. It is already set up with environment variables, Typescript, Prettier, Material Design, Router and useful custom, global SCSS Mixins.

```
./ui
```

Check out a [live version](https://prototype-starter-ui.netlify.com) running.

## API

The api uses NestJs and works with the Zeit.co Functions, a wrapper for AWS Lambda functions. It also is packed with Typescript, Prettier and Hot Module Replacement for Development.

```
./api
```

Check out a live version running:

```
curl https://nestjs-now.capbb.now.sh
```

## Start Development and Deployment

- Clone this project and create GitHub repository.
- Create a Netlify Account and connect your GitHub account.
- Create a site at Netlify
- Create a Zeit.co Account
- create a MongoDB Atlas Account

**UI Settings**

_Build & Deployment_

- Base directory: `ui`
- Build command: `npm run build`
- Publish directory: `ui/dist`

**API Settings**

_Build & Deployment_

- Add the secrets recquired for db connection under a local .env file in the root of api (see an example in `.env.example`)
- Add the secrets to zeit.co, eg: `now secrets add DATABASE_PASSWORD <PASSWORD>`

## Todos and Ideas

- Make NestJs work with Netlify
