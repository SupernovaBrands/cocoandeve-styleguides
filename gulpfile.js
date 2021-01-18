const { src, dest, watch, parallel, task, series } = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

const srcDir = 'src';
const buildDir = 'css';

const files = {
	allScss: [`${srcDir}/scss/**/*`],
	scss: [`${srcDir}/scss/*.scss`],
};

function errorHandler(err) {
	console.log(err); // eslint-disable-line
	this.emit('end');
}

const scssFiles = () => src(files.scss)
	.pipe(sass({ outputStyle: 'expanded' }).on('error', errorHandler))
	.pipe(autoprefixer())
	.pipe(dest(buildDir));

const watchFiles = (done) => {
	watch(files.allScss, parallel(scssFiles));
	done();
};

const clean = () => del([buildDir]);

task(clean);
task(scssFiles);
task(
	'build',
	parallel(scssFiles),
);
task('watch', series('build', watchFiles));
task('default', series('clean', 'watch'));
