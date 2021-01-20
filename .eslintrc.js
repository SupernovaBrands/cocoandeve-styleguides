module.exports = {
	root: true,
	env: {
		browser: true,
		jquery: true,
	},
	extends: ['airbnb-base'],
	globals: {
		__DEV__: true,
	},
	parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		ecmaFeatures: {
			legacyDecorators: true,
		},
	},
	rules: {
		indent: [
			1,
			'tab',
			{
				SwitchCase: 1,
				VariableDeclarator: 1,
			},
		],
		'no-tabs': 0,
		'max-len': [
			2,
			{
				code: 120,
				tabWidth: 1,
				ignoreComments: true,
				ignoreTrailingComments: true,
				ignoreUrls: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
			},
		],
		quotes: [2, 'single', 'avoid-escape'],
		'prefer-arrow-callback': 0,
	},
};
