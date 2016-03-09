'use strict';

/*================== Config ===============*/
var config = {
    module: 'TekoriusAngularSkeleton',
    sourceDir: './src',
    distDir: './dist',
    vendor: {
        js: [
            './bower_components/jquery/dist/jquery.js',
            './bower_components/angular/angular.js',
            './bower_components/bootstrap/dist/js/bootstrap.js',
            './bower_components/angular-ui-router/angular-ui-router.js',
            './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            './bower_components/angular-ui-router/release/angular-ui-router.js',
            './bower_components/AdminLTE/dist/js/app.js',
            './bower_components/AdminLTE/plugins/slimScroll/jquery.slimscroll.js',
            './bower_components/AdminLTE/plugins/iCheck/icheck.js',
            './bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js',
            './bower_components/angular-wysiwyg/dist/angular-wysiwyg.js',
            './bower_components/angular-smart-table/dist/smart-table.js'
        ],
        css: [
            './bower_components/bootstrap/dist/css/bootstrap.css',
            './bower_components/AdminLTE/dist/css/AdminLTE.css',
            './bower_components/AdminLTE/dist/css/skins/skin-black-light.css', // You can change to your skin here
            './bower_components/AdminLTE/dist/css/skins/skin-blue.css',
            './bower_components/font-awesome/css/font-awesome.css',
            './bower_components/AdminLTE/plugins/iCheck/minimal/blue.css',
            './bower_components/angular-bootstrap-colorpicker/css/colorpicker.js'
        ],
        less: [
        ],
        fonts: [
            './bower_components/bootstrap/dist/fonts/*',
            './bower_components/font-awesome/fonts/*'
        ],
        templates: [
        ],
        images: [
            './bower_components/AdminLTE/plugins/iCheck/minimal/blue*.png',
            './bower_components/dropzone/downloads/images/*',
            './bower_components/angular-bootstrap-colorpicker/img/*'
        ]
    },
	ftp: {
		host: 'ftphost',
		user: 'user@ftphost',
		password: 'password',
		dir: '/angularskeleton'
	}
};

/*================= Requires ==============*/
var gulp              = require('gulp'),                              // main gulp plugin
    changed           = require('gulp-changed'),                      // changed plugin
    imagemin          = require('gulp-imagemin'),                     // minify images
    concat            = require('gulp-concat'),                       // concat files
    minify            = require('gulp-minify'),                       // minify files
    uglify            = require('gulp-uglify'),                       // uglify stream
    uglifycss         = require('gulp-uglifycss'),                    // uglify stream
    sourcemaps        = require('gulp-sourcemaps'),                   // generate sourcemaps
    rename            = require('gulp-rename'),                       // rename files
    rev               = require('gulp-rev'),                          // add fingerprint to files
    del               = require('del'),                               // delete files
    inject            = require('gulp-inject'),                       // inject files into html
    angularFilesort   = require('gulp-angular-filesort'),             // sort angular files
    less              = require('gulp-less'),                         // less compiler
    templatecache     = require('gulp-angular-templatecache'),        // cache html templates to js
    sequence          = require('run-sequence'),                      // temporary solution to run tasks in order
    watch             = require('gulp-watch'),
    LessPluginCleanCSS = require('less-plugin-clean-css'),
    cleancss          = new LessPluginCleanCSS({ advanced: true}),
    server            = require('gulp-webserver'),                    // server
    livereload        = require('gulp-livereload'),
    vendor            = require('bower-files')(),                     // vendor files
    merge             = require('merge-stream'),                      // merge streams
	ftp               = require('vinyl-ftp'),                         // ftp deployment
    streamqueue       = require('streamqueue');

/*================ Clean =================*/
gulp.task('cleanVendor', function() { return del( config.distDir + '/vendor*' ) });
gulp.task('cleanJS', function() { return del( [config.distDir + '/app*.js', config.distDir + '/app*.js.map'] ) });
gulp.task('cleanCSS', function() { return del( [config.distDir + '/app*.css', config.distDir + '/app*.css.map'] ) });
gulp.task('cleanImages', function() { return del( [config.distDir + '/images/*'] ) });
gulp.task('cleanTemplates', function() { return del( config.distDir + '/template*' ) });
gulp.task('cleanTemp', function() { return del( './.tmp' ) });

gulp.task('buildIndex', function() {
    return gulp.src( config.sourceDir + '/index.html' )
        .pipe( gulp.dest( config.distDir ) )
        .pipe( inject( gulp.src(
            [
                config.distDir + '/vendor*.css',
                config.distDir + '/vendor*.js'
            ], { read: false } ), {
            starttag: '<!-- inject:vendor:{{ext}} -->',
            removeTags: true,
            ignorePath: config.distDir,
            relative: true
        }) )
        .pipe( inject( gulp.src(
            [
                config.distDir + '/app*.css',
                config.distDir + '/app*.js'
            ], { read: false } ), {
            starttag: '<!-- inject:app:{{ext}} -->',
            removeTags: true,
            ignorePath: config.distDir,
            relative: true
        }) )
        .pipe( inject( gulp.src(
            [
                config.distDir + '/template*.js'
            ], { read: false } ), {
            starttag: '<!-- inject:template:{{ext}} -->',
            removeTags: true,
            ignorePath: config.distDir,
            relative: true
        }) )
        .pipe( gulp.dest( config.distDir ) );
});

/*================ Images ================*/
gulp.task('buildImages', function() {
    return gulp.src( config.sourceDir + '/images/**/*' )
        .pipe(changed( config.distDir + '/images' ))
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest( config.distDir + '/images' ));
});

/*================ Vendors ==================*/
gulp.task('buildVendorJS', function() {

    return streamqueue({ objectMode: true },
        //gulp.src( vendor.ext('js').files ),
        gulp.src( config.vendor.js )
    ).pipe( sourcemaps.init({ loadMaps: true }) )
        .pipe( concat('vendor.js') )
        .pipe( uglify({
            mangle: false // we don't want to mangle vendor names
        }) )
        .pipe( rev() ) // add fingerprint to avoid caching on change
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest( config.distDir ) )
        ;
});

gulp.task('buildVendorCSS', function() {

    var cssStream = streamqueue({ objectMode: true },
            //gulp.src( vendor.ext('css').files ),
            gulp.src( config.vendor.css )
        )
            .pipe( concat('vendor-css.css') )
            .pipe( gulp.dest( './.tmp' ) )
        ;

    var lessStream = streamqueue({ objectMode: true },
            //gulp.src( vendor.ext('less').files ),
            gulp.src( config.vendor.less )
        )
            .pipe( less({
                plugins: [cleancss]
            }) )
            .pipe( concat('vendor-less.css') )
            .pipe( gulp.dest( './.tmp' ) )
        ;

    return merge(lessStream, cssStream)
        .pipe( sourcemaps.init({ loadMaps: true }) )
        .pipe( concat('vendor.css') )
        .pipe( uglifycss() )
        .pipe( rev() )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest( config.distDir ) )
});

gulp.task('buildVendorImages', function() {
    return streamqueue({ objectMode: true },
        //gulp.src( vendor.ext(['gif', 'png', 'jpg', 'jpeg']).files ),
        gulp.src( config.vendor.images ))
        .pipe(changed( config.distDir + '/images' ))
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest( config.distDir + '/images' ));
});

gulp.task('buildVendorFonts', function() {
    return streamqueue({ objectMode: true },
        //gulp.src( vendor.ext(['woff2', 'woff', 'ttf']).files ),
        gulp.src( config.vendor.fonts )
    )
        .pipe( gulp.dest( config.distDir + '/fonts' ) );
});

/*================== App scripts ===============*/
gulp.task('buildJS', function() {

    return gulp.src( config.sourceDir + '/js/**/*.js')
        .pipe(angularFilesort())
        .pipe( sourcemaps.init() )
        .pipe( concat('app.js') )
        .pipe( uglify({ mangle: false }) )
        .pipe( rev() ) // add fingerprint to avoid caching on change
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest( config.distDir ) )
        ;
});

/*=================== App styles ===============*/
gulp.task('buildCSS', function() {

    return gulp.src( config.sourceDir + '/less/app.less' )
        .pipe( sourcemaps.init() )
        .pipe( less({
            plugins: [cleancss]
        }) )
        .pipe( rev() )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest( config.distDir ) )
        ;

});

/*=================== Templates ==================*/
gulp.task('buildTemplates', function() {

    return gulp.src( config.sourceDir + '/html/**/*.html' )
        .pipe( templatecache({
            module: config.module
        }) )
        .pipe( rev() )
        .pipe( gulp.dest(config.distDir) )
        ;
});

/*=================== Watch =====================*/
gulp.task('watch', function() {
    watch( config.sourceDir + '/bower_components/**/*', { name: 'vendor' }, function() { gulp.start('vendor'); } );
    watch( config.sourceDir + '/js/**/*', { name: 'js' }, function() { gulp.start('js'); } );
    //watch( config.sourceDir + '/less/**/*', { name: 'css' }, function() { gulp.start('css'); } );
    watch( config.sourceDir + '/html/**/*', { name: 'template' }, function() { gulp.start('template'); } );
    //watch( config.sourceDir + '/images/**/*', { name: 'images' }, function() { gulp.start('images'); } );
    watch( config.sourceDir + '/index.html', { name: 'index' }, function() { gulp.start('index'); } );
});

/*=================== FTP =====================*/
gulp.task('ftpUpload', function() {
	var conn = ftp.create({
		host: config.ftp.host,
		user: config.ftp.user,
		password: config.ftp.password,
		parallel: 10,
		log: 'gutil.log'
	});

	return gulp.src(config.distDir + '/**', { buffer: false })
		.pipe( conn.newer(config.ftp.dir) )
		.pipe( conn.dest(config.ftp.dir) );
});

/*================ Tasks =======================*/
// single tasks
gulp.task('index', ['buildIndex']);
gulp.task('vendor', function(callback) { sequence('cleanVendor', ['buildVendorJS', 'buildVendorCSS', 'buildVendorFonts', 'buildVendorImages'], 'buildIndex', 'cleanTemp', 'server:restart', callback) } );
gulp.task('js', function(callback) { sequence('cleanJS', 'buildJS', 'buildIndex', 'server:restart', callback) } );
gulp.task('images', function(callback) { sequence('cleanImages', 'buildImages', 'server:restart', callback) } );
gulp.task('css', function(callback) { sequence('cleanCSS', 'buildCSS', 'buildIndex', 'server:restart', callback) } );
gulp.task('template', function(callback) { sequence('cleanTemplates', 'buildTemplates', 'buildIndex', 'server:restart', callback) } );

// build
gulp.task('build', function(callback) { sequence(
    ['cleanVendor', 'cleanJS', 'cleanCSS', 'cleanTemplates', 'cleanImages'],
    ['buildVendorJS', 'buildVendorCSS', 'buildVendorImages', 'buildVendorFonts', 'buildJS', 'buildCSS', 'buildTemplates', 'buildImages'],
    ['buildIndex', 'cleanTemp'],
	callback) } );

gulp.task('ftp', function(callback) { sequence('build', 'ftpUpload', callback) });


// server
gulp.task('server:start', function() {
    gulp.src(config.distDir)
        .pipe(server({
            host: '127.0.0.1',
            port: '8888',
            livereload: true,
            open: true
        }));
});

gulp.task('server:restart', function() {
    livereload.changed();
});

gulp.task('default', function() { sequence('build', 'watch', 'server:start') });