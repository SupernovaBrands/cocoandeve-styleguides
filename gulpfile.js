const { src, dest, watch, parallel, task, series } = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const cssDir = 'css';

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
	.pipe(browserSync.stream());

const scssFiles = () => src(files.scss)
	.pipe(sass({ outputStyle: 'expanded' }).on('error', errorHandler))
	.pipe(autoprefixer())
	.pipe(dest(cssDir))
	.pipe(browserSync.stream());

const watchFiles = (done) => {
	watch(files.allScss, parallel(scssFiles));
	watch(files.html, parallel(htmlFiles));
	done();
};

const initServer = (done) => {
	browserSync.init({
		server: true,
		port: 8080,
		middleware: [
			function(req, res, next) {
				// Handling URL for CSS files
				if (req.url.indexOf('/cocoandeve-styleguides') == 0) {
					req.url = req.url.replace(/^(\/cocoandeve-styleguides)/, '');
				}
				next();
			},
		],
	});
	done();
}

const clean = () => del([cssDir]);

task(clean);
task(scssFiles);
task(initServer);
task(
	'build',
	parallel(scssFiles),
);
task('watch', series('build', watchFiles));
task('default', series('clean', 'watch', 'initServer'));
