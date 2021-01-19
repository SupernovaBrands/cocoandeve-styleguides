const { src, dest, watch, parallel, task, series } = require('gulp');
const connect = require('gulp-connect');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const cssDir = 'docs/css';

const files = {
	html: [`docs/**/*`],
	allScss: [`src/scss/**/*`],
	scss: [`src/scss/*.scss`],
};

function errorHandler(err) {
	console.log(err); // eslint-disable-line
	this.emit('end');
}

const htmlFiles = () => src(files.html)
	.pipe(connect.reload());

const scssFiles = () => src(files.scss)
	.pipe(sass({ outputStyle: 'expanded' }).on('error', errorHandler))
	.pipe(autoprefixer())
	.pipe(dest(cssDir))
	.pipe(connect.reload());

const watchFiles = (done) => {
	watch(files.allScss, parallel(scssFiles));
	watch(files.html, parallel(htmlFiles));
	done();
};

const server = (done) => {
	connect.server({
		root: 'docs',
		port: 8080,
		livereload: true
	});
	done();
}

const clean = () => del([cssDir]);

task(clean);
task(scssFiles);
task(server);
task(
	'build',
	parallel(scssFiles),
);
task('watch', series('build', watchFiles));
task('default', series('clean', 'watch', 'server'));
