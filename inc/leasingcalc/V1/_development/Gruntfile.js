module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			app: {
				src: ['js/app/*.js'],
				dest: 'js/eur.module.calc.js',
			},
			eur: {
				src: ['js/app/*.js'],
				dest: '../assets/js/eur.module.calc.js',
			},
			standalone: {
				src: ['js/app/*.js'],
				dest: '../export/standalone/assets/js/eur.module.calc.js',
			}
		},

		uglify: {
			app: {
				src: 'js/eur.module.calc.js',
				dest: '../assets/js/eur.module.calc.min.js'
			},
			standalone: {
				src: 'js/eur.module.calc.js',
				dest: '../export/standalone/assets/js/eur.module.calc.min.js'
			}
		},

		sass: {
			expanded: {
				options: {
					style: 'expanded'
				},
				files: {
					'../assets/css/lur.css': 'sass/lur.scss',
				}
			},
			expandedstandalone: {
				options: {
					style: 'expanded'
				},
				files: {
					'../export/standalone/assets/css/lur.css': 'sass/lur.scss',
				}
			},
			compressed: {
				options: {
					style: 'compressed'
				},
				files: {
					'../assets/css/lur.min.css': 'sass/lur.scss',
				}
			},
			compressedstandalone: {
				options: {
					style: 'compressed'
				},
				files: {
					'../export/standalone/assets/css/lur.min.css': 'sass/lur.scss',
				}
			}
		},

		watch: {
			scripts: {
				files: ['js/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				},
			},
			css: {
				files: ['sass/**/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				}
			}
		}

	});

	// 3. Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);

};
