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
		scss: './src/scss/components/_icons.scss',
		html: './src/docs/components/icons.hbs',
	}
};
