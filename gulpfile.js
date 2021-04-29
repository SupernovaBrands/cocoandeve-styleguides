const {
	src, dest, watch, parallel, task, series,
} = require('gulp');
const browserSync = require('browser-sync');
const del = require('del');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const cssDir = 'dist/css';
const jsDir = 'dist/js';
const imagesDir = 'dist/images';
const fontsDir = 'dist/fonts';

const files = {
	index: ['src/docs/index.hbs'],
	hbs: ['src/docs/**/*.hbs', '!src/docs/index.hbs'],
	partials: ['src/partials/**/*.hbs'],
	js: ['dist/js/**/*'],
	vendorJs: ['src/js/vendor/*'],
	allScss: ['src/scss/**/*'],
	scss: ['src/scss/*.scss'],
	fonts: ['fonts/*.svg', 'fonts/*.ttf', 'fonts/*.woff', 'fonts/*.woff2'],
	images: ['images/*'],
};

function errorHandler(err) {
	console.log(err); // eslint-disable-line
	this.emit('end');
}

const titleCase = (str) => {
	const split = str.toLowerCase().split('-');
	for (let i = 0; i < split.length; i += 1) {
		split[i] = split[i].charAt(0).toUpperCase() + split[i].slice(1);
	}
	return split.join(' ');
};

const hbsHelpers = {
	titleCase,
	eq: (a, b) => a === b,
	gt: (a, b) => a > b,
	times: (n, block) => {
		let accum = '';
		for (let i = 1; i <= n; i += 1) {
			block.data.index = i; // eslint-disable-line no-param-reassign
			block.data.first = i === 1; // eslint-disable-line no-param-reassign
			block.data.last = i === n; // eslint-disable-line no-param-reassign
			accum += block.fn(i);
		}
		return accum;
	},
};

const indexFile = () => {
	const base = 'src/docs';
	const folders = ['core', 'components', 'compounds', 'sections', 'templates'];
	const filenames = {};
	folders.forEach((f) => {
		const names = fs.readdirSync(`${base}/${f}`)
			.filter((file) => path.extname(file) === '.hbs')
			.map((file) => {
				const name = file.replace('.hbs', '');
				return { name: titleCase(name), path: `${f}/${name}.html` };
			});
		filenames[f] = names;
	});
	const core = 'Core & Components';
	folders.splice(0, 2, core);
	const result = {
		folders,
		filenames: { [core]: [...filenames.core, ...filenames.components], ...filenames },
	};
	return src(files.index)
		.pipe(handlebars(result, { helpers: hbsHelpers }))
		.pipe(rename({ extname: '.html' }))
		.pipe(dest('dist'))
		.pipe(browserSync.stream());
};

const hbsFiles = () => src(files.hbs)
	.pipe(handlebars({}, { batch: ['src/partials'], helpers: hbsHelpers }))
	.pipe(rename({ extname: '.html' }))
	.pipe(dest('dist'))
	.pipe(browserSync.stream());

const jsFiles = () => src(files.js)
	.pipe(browserSync.stream());

const vendorJsFiles = () => src(files.vendorJs)
	.pipe(dest(jsDir))
	.pipe(browserSync.stream());

const scssFiles = () => src(files.scss)
	.pipe(sourcemaps.init())
	.pipe(sass({ outputStyle: 'expanded' }).on('error', errorHandler))
	.pipe(autoprefixer())
	.pipe(sourcemaps.write('.'))
	.pipe(dest(cssDir))
	.pipe(browserSync.stream());

const fontsFiles = () => src(files.fonts)
	.pipe(dest(fontsDir))
	.pipe(browserSync.stream());

const imagesFiles = () => src(files.images)
	.pipe(dest(imagesDir))
	.pipe(browserSync.stream());

const webpackBuild = (isWatch = false) => () => new Promise((resolve, reject) => {
	webpack({ ...webpackConfig, watch: isWatch }, (err, stats) => {
		if (err) {
			return reject(err);
		}
		if (stats.hasErrors()) {
			return reject(new Error(stats.compilation.errors.join('\n')));
		}
		return resolve();
	});
});

const watchFiles = (done) => {
	watch(files.allScss, parallel(scssFiles));
	watch(files.index, parallel(indexFile));
	watch(files.hbs, parallel(hbsFiles))
		.on('add', indexFile)
		.on('unlink', indexFile);
	watch(files.partials, parallel(hbsFiles));
	watch(files.js, parallel(jsFiles));
	watch(files.vendorJs, parallel(vendorJsFiles));
	watch(files.fonts, parallel(fontsFiles));
	watch(files.images, parallel(imagesFiles));
	done();
};

const initServer = (done) => {
	browserSync.init({
		server: './dist',
		port: 8080,
		middleware: [
			function (req, res, next) {
				// Handling URL for CSS files
				if (req.url.indexOf('/cocoandeve-styleguides') === 0) {
					req.url = req.url.replace(/^(\/cocoandeve-styleguides)/, '');
				}
				next();
			},
		],
	});
	done();
};

const clean = () => del(['dist']);

task(clean);
task(indexFile);
task(scssFiles);
task(initServer);
task('webpack', webpackBuild());
task('webpackWatch', webpackBuild(true));
task(
	'build',
	parallel(indexFile, hbsFiles, vendorJsFiles, scssFiles, fontsFiles, imagesFiles, 'webpack'),
);
task('watch', series(
	parallel(indexFile, hbsFiles, vendorJsFiles, scssFiles, fontsFiles, imagesFiles, 'webpackWatch'),
	watchFiles,
));
task('default', series('clean', 'watch', 'initServer'));
