'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);


    var games = ['sm64', 'mmx'];
    
    var copyOpts = [{expand: true, cwd: 'site/', src: ['**', '!game/**/index.html', '!**/*.styl'], dest: 'dist/'}];
    var replaceFiles = {};
    var replacements = [];

    games.forEach(function (game) {
        copyOpts.push({
            src: ['site/game/index.html'],
            dest: 'dist/game/' + game + '/index.html'
        });
        copyOpts.push({
            src: ['site/submit/index.html'],
            dest: 'dist/game/' + game + '/submit/index.html'
        });
        replaceFiles['dist/game/' + game + '/index.html'] = 'dist/game/' + game + '/index.html';
        replaceFiles['dist/game/' + game + '/submit/index.html'] = 'dist/game/' + game + '/submit/index.html';
        replacements.push({
            pattern: /%%%game%%%/g,
            replacement: game
        });
    });


    var style = 'min'; // 'min', 'responsive'


    grunt.initConfig({
        // Project-wide Grunt settings
        config: {
            app: 'site',
            dist: 'dist'
        },

        copy: {
            games: {
                files: copyOpts
            }
        },

        'string-replace': {
            games: {
                files: replaceFiles,
                options: {
                    replacements: replacements
                }
            }
        },

        stylus: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/style/' + style + '/',
                    src: ['**/*.styl'],
                    dest: '<%= config.app %>/style/',
                    ext: '.css'
                }]
            }
        },

        clean: ['dist'],
        
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            src: {
                files: ['<%= config.app %>/**/*.js', '<%= config.app %>/**/*.html'],
                tasks: ['deploy'],
                options: {
                    interval: 5007,
                    livereload: true
                }
            },
            css: {
                files: ['<%= config.app %>/style/' + style + '/**/*.styl'],
                tasks: ['stylus', 'deploy'],
                options: {
                    interval: 5007,
                    livereload: true
                }
            },
            // gruntfile: {
            //     files: ['Gruntfile.js']
            // },
            livereload: {
                options: {
                    interval: 5007,
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= config.app %>/{,*/}*.html'
                ]
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%= config.dist %>'
                    ]
                }
            }
        },

        bower: {
            target: {
                rjsConfig: '<%= config.app %>/config.js'
            }
        }
    });

    grunt.registerTask('deploy', [
        'copy',
        'string-replace'
    ]);

    grunt.registerTask('build', [
        'clean',
        'stylus'
    ]);

    grunt.registerTask('serve', [
        'build',
        'deploy',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('update', [
        'npm-install',
        'bower-install-simple',
        'bower'
    ]);
};
