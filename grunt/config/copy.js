module.exports = {
	shared: {
		files: [{
			cwd: 'shared/assets',
			src: '**/*',
			expand: true,
			dest: 'build/assets'
		}]
	},
	root: {
		files: [{
			cwd: 'root',
			src: '**/*',
			expand: true,
			dest: 'build'
		}]
	},
	snippets: {
		files: [{
			cwd: 'shared/js/snippets',
			src: '**/*',
			expand: true,
			dest: 'build/assets'
		}]
	}
};
