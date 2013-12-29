module.exports = function ( grunt ) {

	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),

		watch: {
			examples: {
				files: [ 'examples/**/*', 'root/**/*', 'templates/**/*' ],
				tasks: 'build'
			},
			sass: {
				files: [ 'scss/**/*.scss' ],
				tasks: 'sass:main'
			}
		},

		clean: {
			build: [ 'build' ]
		},

		copy: {
			root: {
				files: [{
					cwd: 'root',
					src: '**/*',
					expand: true,
					dest: 'build'
				}]
			}
		},

		dir2json: {
			examples: {
				root: 'examples',
				dest: 'tmp/examples.json'
			}
		},

		sass: {
			main: {
				files: {
					'build/examples.css': 'scss/example/example.scss',
					'build/index.css': 'scss/index/index.scss'
				}
			}
		}
	});



	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-clean' );
	grunt.loadNpmTasks( 'grunt-contrib-copy' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-dir2json' );

	grunt.registerTask( 'render', function () {
		var Ractive, templates, examples, ractive, rendered;

		Ractive = require( 'ractive' );

		templates = {
			index: grunt.file.read( 'templates/index.html' ),
			example: grunt.file.read( 'templates/example.html' )
		};

		// Gather example data
		examples = grunt.file.readJSON( grunt.config( 'dir2json.examples.dest' ) );

		// Render index.html
		ractive = new Ractive({
			template: templates.index,
			data: {
				examples: examples
			},
			preserveWhitespace: true
		});

		rendered = ractive.toHTML();
		grunt.file.write( 'build/index.html', rendered );


		// Render example pages
		examples.forEach( function ( example ) {
			var ractive, rendered;

			try {
				ractive = new Ractive({
					template: templates.example,
					data: {
						example: example,
						clean: function ( str ) {
							return str.replace( /\t/g, '  ' );
						}
					},
					preserveWhitespace: true,
					delimiters: [ '[[', ']]' ],
					tripleDelimiters: [ '[[[', ']]]' ]
				});
			} catch ( err ) {
				console.error( err.message || err );
			}


			rendered = ractive.toHTML();
			grunt.file.write( 'build/' + example.meta.slug + '.html', rendered );
		});
	});

	grunt.registerTask( 'build', [
		'clean:build',
		'copy:root',
		'sass:main',
		'dir2json:examples',
		'render'
	]);

	grunt.registerTask( 'default', [
		'build',
		'watch'
	]);

};