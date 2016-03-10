# AngularJS Boilerplate #

[Documentation](docs/index.md)

This is an [AngularJS](https://angularjs.org/) boilerplate using awesome [AdminLTE](https://almsaeedstudio.com/preview) skin. It also adds some useful directives for common tasks, such as displaying an index list fetched from API.

## Why? ##

This boilerplate was created to alleviate the overhead of starting new frontend projects that use general Information System styling (aka Dashboards)

## How? ##

### Prerequisites ###

This boilerplate uses Gulp as a builder, to build distribution files, therefore these are the things you need to get started:

* [NPM](https://nodejs.org/en/)
* [Bower](http://bower.io/)
* [Gulp](http://gulpjs.com/)

### Steps ###

1. Clone or fork this repository to your project folder
2. Install node modules used by Gulp. This will take a while, so grab a coffee or something

        npm install
    
3. Next you need to install your frontend dependencies with Bower

        bower install
    
4. After installing all dependencies your are ready to build

        gulp

    This will create a `dist` folder and launch a local server with auto refresh. You can check all the tasks [here](docs/tasks.md) or inside [gulpfile.js](gulpfile.js)

## Checklist ##

- [x] Create a general boilerplate to get the team going
- [x] List directive
- [x] Popup modals
- [ ] Fixed alerts with auto hide
- [ ] Form boilerplate
- [ ] Table column filters (such as currency, etc)
- [ ] Remove smart table
- [ ] Add tables sorting
- [ ] Table templating
- [ ] Fix Gulp watch to not reload two times in one pass
- [ ] Slim down some dependencies