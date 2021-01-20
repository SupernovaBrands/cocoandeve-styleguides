module.exports = {
	name: 'supernova-icon',
	inputDir: './fonts/svgs', // (required)
	outputDir: './fonts', // (required)
	fontTypes: ['svg', 'ttf', 'woff', 'woff2'],
	fontsUrl: '/cocoandeve-styleguides/fonts',
	assetTypes: ['scss', 'html'],
	normalize: true,
	selector: '.sni',
	prefix: 'sni',
	templates: {
		scss: './fonts/templates/scss.hbs',
		html: './fonts/templates/html.hbs',
	},
	pathOptions: {
		scss: './scss/components/_supernova-icon.scss',
		html: './docs/components/supernova-icon.html',
	}
};
