module.exports = {
	examples: {
		files: [ 'examples/**/*', 'root/**/*', 'templates/**/*' ],
		tasks: 'build'
	},
	sass: {
		files: [ 'scss/**/*.scss' ],
		tasks: 'sass:main'
	}
};
