module.exports = function (grunt) {

    grunt.initConfig({
        cucumberjs: {
            options: {
                format: 'html',
                output: './features/report.html',
                theme: 'foundation'
            },
            features: []
        }
    });

    grunt.loadNpmTasks('grunt-cucumberjs');

    grunt.registerTask('default', ['cucumberjs']);
};