module.exports = function (grunt) {

    var assets = grunt.file.readJSON('web/assets.json');

    var imageCopies = {},
        imageLinks = {},
        lessSrc = {},
        javascripts = [],
        themes = Object.keys(assets.themes)
    ;

    themes.forEach(function(theme) {
        if (assets.themes[theme].images) {
            imageCopies[theme] = {
                expand: true,
                cwd: 'web/themes/' + theme,
                src: 'images/*',
                dest: 'www/themes/' + theme
            };

            imageLinks[theme] = {
                dest: 'www/themes/' + theme + '/images',
                relativeSrc: '../../../web/themes/' + theme + '/images',
                options: {
                    type: 'dir'
                }
            }
        }

        if (assets.themes[theme].less) {
            lessSrc[theme] = {
                expand: true,
                cwd: 'web/themes/' + theme + '/less',
                src: assets.themes[theme].less,
                dest: 'www/themes/' + theme,
                ext: '.css'
            };
        }

        if (assets.javascripts && Array.isArray(assets.javascripts)) {
            assets.javascripts.forEach(function(js) {
                javascripts.push('web/javascripts/' + js);
            });
        }
    });

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        symlink: imageLinks,
        copy: imageCopies,
        less: lessSrc,

        concat: {
            css: {
                src: ['www/themes/**/*.css'],
                dest: 'www/css/<%= pkg.name %>-<%= pkg.version %>.css'
            },

            js: {
                src: javascripts,
                dest: 'www/js/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
//
//        uglify: {
//            options: {
//                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
//            },
//            dist: {
//                src: '<%= concat.dev.dest %>',
//                dest: 'web/js/cit.min.js'
//            }
//        },

        watch: {
            files: javascripts.concat(['web/themes/**/*.less']),
            tasks: ['less', 'concat']
        }
    });

    grunt.loadNpmTasks('grunt-symlink');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // task(s).
    grunt.registerTask('images', '"Images" task.', function() {
        // images
        if (grunt.option('no-symlink')) {
            grunt.task.run('copy');
        } else {
            grunt.task.run('symlink');
        }
    });

    grunt.registerTask('dev', ['images', 'less', 'concat']);
//    grunt.registerTask('prod', ['less', 'concat', 'uglify']);

};
