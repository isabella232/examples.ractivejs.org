module.exports = function ( grunt ) {

	'use strict';

	grunt.registerTask( 'build', [
		'clean:build',
		'copy',
		'sass:main',
		'spelunk:examples',
		'render'
	]);

};
