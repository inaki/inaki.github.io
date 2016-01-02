module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.initConfig({
    uglify: {
      my_target: {
        files: {
          'assets/js/script.js': ['assets/components/js/*.js']
        } // files
      } // my target
    }, // uglify
    compass: {
      dev: {
        options: {
          config: 'config.rb'
        }
      }
    }, // compass
    watch: {
      options: { livereload: true },
      scripts: {
        files: ['assets/components/js/*.js'],
        tasks: ['uglify']
      }, // scripts
      sass: {
          files: ['assets/components/sass/*.scss'],
          tasks: ['compass:dev']
      }, // sass
      html: {
        files: ['*.html']
      }
    }// watch

  }); // initConfig
  grunt.registerTask('default', 'watch');
} //exports
