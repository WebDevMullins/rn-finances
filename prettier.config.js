module.exports = {
	arrowParens: 'always',
	bracketSpacing: true,
	bracketSameLine: true,
	embeddedLanguageFormatting: 'auto',
	endOfLine: 'lf',
	htmlWhitespaceSensitivity: 'css',
	jsxSingleQuote: true,
	printWidth: 80,
	proseWrap: 'preserve',
	quoteProps: 'as-needed',
	semi: false,
	singleAttributePerLine: true,
	singleQuote: true,
	tabWidth: 2,
	trailingComma: 'none',
	useTabs: true,

	plugins: [require.resolve('prettier-plugin-tailwindcss')],
	tailwindAttributes: ['className']
}
