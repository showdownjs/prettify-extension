module.exports = function (grunt) {
  'use strict';

  require('shelljs/global');

  var config = {
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true
      },
      dist: {
        src: ['src/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    jscs: {
      options: {
        config: '.jscs.json',
        files: [
          'Gruntfile.js',
          'src/**/*.js',
          'test/**/*.js'
        ]
      }
    },
    changelog: {
      options: {}
    },
    //Server-side tests
    simplemocha: {
      test: {
        src: 'test/node.js',
        options: {
          globals:     ['should'],
          timeout:     3000,
          ignoreLeaks: false,
          reporter:    'spec'
        }
      }
    },
    // Client-side tests
    mocha: {
      test: {
        src: ['test/browser.html'],
        options: {
          run: true
        }
      }
    },
    githooks: {
      all: {
        'pre-commit': 'pre-commit'
      }
    }
  };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-conventional-changelog');
  grunt.loadNpmTasks('grunt-githooks');

  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('test', ['lint', 'mocha', 'simplemocha']);
  grunt.registerTask('build', ['test', 'concat', 'uglify']);
  grunt.registerTask('pre-commit', ['build', 'add-compressed-to-git']);

  // Add compressed and minified files before committing
  grunt.registerTask('add-compressed-to-git', function () {
    exec('git add dist/');
  });

  grunt.registerTask('default', []);
};
