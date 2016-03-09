# Gulp Tasks #

This boilerplate includes these Gulp tasks:

* `gulp` - default task to that compiles dist folder, launches the server and watches for changes of the source files
    * `build` - builds the dist folder without launching the server
    * `index` - injects scripts and stylesheets to index.html
    * `vendor` - aggregates vendor files defined at the top of gulpfile, auto vendor loading is not being used because it doesn't always work as intended and not all vendor bower files include main entry points. Outputs vendor-*.js and vendor-*.css
    * `js` - concats and uglifies js files inside src/js. Outputs app-*.js
    * `images` - minifies and moves images to dist
    * `css` - builds less in src/less. Outputs app-*.css
    * `template` - takes templates in src/html and puts them inside angular template cache format for faster loading. Outputs templates-*.js
    * `ftpUpload` - uploads dist folder to ftp without building
    * `ftp` - runs build task and then uploads dist folder to configured ftp
    
Resulting vendor and app scripts are appended with a sha fingerprint to avoid caching on user's end should you change anything.    

There are other subtasks that these main tasks launch, but you shouldn't worry about them unless you are interested.

Anyway, I invite you to edit [the gulpfile](../gulpfile.js)

[Back to index](index.md)