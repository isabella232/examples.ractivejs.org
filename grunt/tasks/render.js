module.exports = function ( grunt ) {

	'use strict';

	grunt.registerTask( 'render', function () {
		var Ractive, templates, examples, ractive, rendered;

		Ractive = require( 'ractive' );

		templates = {
			index: grunt.file.read( 'templates/index.html' ),
			example: grunt.file.read( 'templates/example.html' )
		};

		// Gather example data
		examples = grunt.file.readJSON( grunt.config( 'spelunk.examples.dest' ) );

		// Render index.html
		ractive = new Ractive({
			template: grunt.template.process( templates.index ),
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
					template: grunt.template.process( templates.example ),
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

};
