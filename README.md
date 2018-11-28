# Real World GraphQL Workshop

This is a workshop repo to teach you about GraphQL.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Topics covered](#topics-covered)
- [Branches & Tags](#branches--tags)
- [System Requirements](#system-requirements)
- [Setup](#setup)
- [Running the app](#running-the-app)
- [About the app](#about-the-app)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Topics covered

**Server**
  1. Schema Definition Language
  2. GraphQL types
  3. Resolvers
  4. Enums
  5. Scalars
  6. DataLoader
  7. Mutations

**Apollo Client**
  1. Basic queries
  2. Fragments
  3. Pagination
  4. Auth
  5. Mutations

There is way more that we _could_ cover, time permitting, but this is broadly what we'll be focussing on. Depending on the flow of the day, we may have more or less time available and the material will adjust to suit.

## Branches & Tags

You may notice a number of tags and branches peppered throughout the supporting repo. The workshop steps are tagged such that, if needed, we can skip through to completed examples. The required tag will be documented at the beginning of each section.

## Code Sandbox
It can be a time consuming challenge to ensure that everyone participating has their machine setup correctly. For this reason we like to use codesandbox to get everyone running nice 'n quickly.

These are a list of the available branches as codeboxes. When prompted, go ahead and fork them to your own sandbox:

- Server: Launch Pad https://codesandbox.io/s/github/FormidableLabs/gql-workshop-app/tree/launch/server
- Server: Starter https://codesandbox.io/s/github/FormidableLabs/gql-workshop-app/tree/initial-server/server
- Server: Complete https://codesandbox.io/s/github/FormidableLabs/gql-workshop-app/tree/client-starting-point/server
- Client: Start https://codesandbox.io/s/github/FormidableLabs/gql-workshop-app/tree/client-starting-point/client

---

If really must develop locally, the following are the setup steps, proceed at your peril:

## System Requirements

* [git][git] v2.14.1 or greater
* [NodeJS][node] v8.9.4 or greater
* [yarn][yarn] v1.3.0 or greater
* [GraphQL Playground][gqlplayground] _recommended_
* [Apollo Dev Tools][apollodevtools] for Chrome _recommended_



All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```
git --version
node --version
yarn --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/) or
[mac/linux](http://stackoverflow.com/a/24322978/971592).


## Setup

Once you've verified that your system is setup correctly. Go ahead and clone our workshop project.

```
git clone https://github.com/imranolas/moviedb.git
cd moviedb
```

You should see 2 folders:
  1. `server`
  2. `client`

Each folder contains a `package.json` and will require a `yarn install` to be run in the package root.

## Running the app

To get the app up and running, run `yarn start` in both roots.

This will start the GQL server, and the client server in development mode.

## About the app

This app is based on the [The MovieDB API](moviedb). It consists of a GraphQL service that wraps the MovieDB API and serves it to the React client app. This is the completed example but we will be starting from a minimal bootstrapped starting point via git tag.

[moviedb]: https://www.themoviedb.org/
[yarn]: https://yarnpkg.com/
[node]: https://nodejs.org
[git]: https://git-scm.com/
[gqlplayground]: https://github.com/graphcool/graphql-playground
[apollodevtools]: https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm
