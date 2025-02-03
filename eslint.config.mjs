import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'no-unexpected-multiline': 'error',
			'no-template-curly-in-string': 'error',
			'no-lone-blocks': 'error',
			camelcase: 'off',
			quotes: ['error', 'single'],
			'comma-dangle': ['error', 'never'],
			'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			semi: ['error', 'never']
		}
	},
	{
		ignores: ['**/node_modules/', '.git/']
	},
	pluginJs.configs.recommended
]
