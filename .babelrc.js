module.exports = {
	presets: [
		['@babel/preset-env', { targets: 'defaults' }],
		'@babel/preset-react'
	],
	plugins: [
		'@babel/plugin-transform-runtime',
		['@babel/plugin-proposal-class-properties', { loose: true }],
		'@babel/plugin-syntax-dynamic-import',
		[
			'module-resolver',
			{
				cwd: 'babelrc',
				extensions: [
					'.js',
					'.jsx',
					'.js.liquid',
				],
				alias: {
					'~vendor': './scripts/vendor',
					'~mod': './scripts/modules',
					'~comp': './scripts/components',
					'~rt': './scripts/templates',
					'testHelpers': './__tests__/testHelpers'
				}
			}
		],
	]
};
