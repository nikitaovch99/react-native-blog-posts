# React-Native(expo) Blog Posts App

## Description

This App contains 2 pages: LogInScreen and HomeScreen. Using [{JSON} Placeholder](https://jsonplaceholder.typicode.com/)(Free fake API for testing and prototyping).
Implemented API requests so you can Log In by using user.email as Email and user.phone as Password. Also, Data is stored in AsyncStorage so even on refresh you stay logged in. But you can always log out by using Log Out button in HomeScreen. In HomeScreen you also have a list of user's posts by pressing on each opens a modal window with post info and comments for this post. Pressing anywhere out of the Modal window will close it. Also if any data requests problems will happen Snackbar will appear with a button proposing to load data again. And by swiping down you can refresh posts. If there is no internet connection additional text in header will pop up.

### Installing

* Fork and clone this repository
* Run `npm install`
* Run `npm start`
You can open project in browser by pressing w (not recommended) but better use Expo Go app and run in there.