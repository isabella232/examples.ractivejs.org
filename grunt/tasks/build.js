module.exports = function ( grunt ) {

	'use strict';

	grunt.registerTask( 'build', [
		'clean:build',
		'copy:root',
		'sass:main',
		'spelunk:examples',
		'render'
	]);

};
