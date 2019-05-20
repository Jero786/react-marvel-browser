# Browser Marvel

### Prerequisites

`Node 9+`

### Installing

```
$ npm install -g eslint jest now
$ npm install
```
## In order to configure pre-commit that will execute prettier-eslint & unit-test before commit
```
$ npm install --save-dev husky prettier-eslint
```

## Setting environment variable

In order to connect with Marvel API, you will need create your account to get your public and private key.
Once you get boths, please create in a ROOT file, an new file called `.env` with the following information:

```
API_PRIVATE_KEY=YOUR_PRIVATE_KEY
API_PUBLIC_KEY=YOUR_PUBLIC_KEY
API_URL=http://gateway.marvel.com/v1/public
```

**NOTE**:
In case that use `nvm` you will need to set by default  Node+6 (eg: `nvm alias default v10.8.0`)

### Starting the application

In order to start, just execute the following command line:
```
$ npm run dev
```

And then, open a browser with the following link:
```
http://localhost:3000/?offset=0
```
## Running unit tests
```
$ npm run test
```
## Running unit tests in watch mode
```
$ npm run test:watch
```

## Some design, principles and best practices

* Single responsability principle, one reason to change. Each class/function has their own level of the abstraction.
* Action Creators: where happens all side-effects, been in charge to trigger the action performed by the user interactions.
* Selectors: to performance reason with memoization mechanism, lifting state store and separate clean way complex state logic in a modular way.
* Following top down best practice. (Most important and public collaborates first, like a news paper)
* Favor React controller component over uncontrolled component. (In order to follow single source of truth principle as much as possible, and also to get component easier to work with).
* BEM: using block element modifier and with some variatios of SMACSS like (`is-visible` instead of `block--visible`) is a really clean way to style components. Also it's a really a performance way to style component instead use neested selectors. (you don't care any more about not pass to 3 nested level)

## Frameworks & libraries
* NextJS used to provider server rendering for performance, SEO and Code splitting reasons.
* React-testing-Library: A really usefull library to help us to test React component in a clean, predictable and readable way.
* Redux: The reactive programming allow us to build more predictible, scalable & Solid web application.
* Immutablejs: For performance reason, allowing us to perform shallow equality and avoid uneeded rendering. (only for container component and reducer layer. In order to avoid problems when handling data, try to minimize the interoperability, and only keep your container component with immutable info. Lets dumb components with native objects.
* Lodash: For cross browsing suppport, performance and reliable way to handler data. (only for dump component and action creators).
* Prettier/husky/lint-staged/Eslint, Help us to avoid commit and push some code that don't follow with the default standars of the project and also prevent to push some code that don't pass the UT. (It's already configure airbnb, and eslint:recommended practices)
## Testing tips

* Test should follow the SRP principle too (single responsibility principle). Do one thing, test one thing.
* Keep in mind the implicit structure of test must be AAA (Arrange, Act, Assert).
* Each test must be isolated, means that one test not be dependent to another in order to get given result, therefore it should not matter the order of execution of them.
* Avoid global variables. Instead, declare them in setup method.
* Follow the DRY principle (Don’t Repeat Yourself). If we identify that we have repeated code throughout our tests use beforeEach function to put the code in one place.
* Putting comments in the header of the test is an anti-pattern, avoid them.
* Dont test action isolate, when testing reducer I like to test action as well in order to avoid unwanted testing. (I know that sounds like a integrating test instead of unit test, but it make sense for me.)

## Some comments
* I was not able to find any Biography information in a clean Rest API. So I was need to scraping the content of some sub links returned by character API. So in some cases is there, like character named: `Abomination (Emil Blonsky)`, and in some other cases does not exist the biography.

## Pendign implementations
* Implement TypeScript, in order to catch problems at runtime and also avoid problems with interoperability between Immutable Obj and native JS obj.
* Implement Normalize, to have a flatten state. That help you to make more performante the shallow equality performed and also to deal with a easy structure store.
* Implement some CI such as Circle or Travis.
* E2E Testing with Cypress. It's really powerfull implement it, in order to save time in the regressions testing.
* Implement some Lib report in Backend side and also in fron-end side to be sure that your app are working properly, otherwise send a email when throws some error.
