import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
    // Globbed rather than root-anchored: git worktrees live under .claude/,
    // so nested build output would otherwise get linted as source.
    { ignores: ['**/dist/**', '**/node_modules/**', '.claude/**'] },

    // App source: React 18 + Vite, runs in the browser
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 2022,
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        settings: {
            react: { version: 'detect' },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.flat.recommended.rules,
            // Vite's React plugin uses the automatic JSX runtime, so React
            // doesn't need to be in scope for JSX.
            ...react.configs.flat['jsx-runtime'].rules,
            ...reactHooks.configs['recommended-latest'].rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            // This is a plain-JS project with no `prop-types` dependency and no
            // PropTypes declarations anywhere, so the rule can only ever report
            // the absence of a pattern the project doesn't use.
            'react/prop-types': 'off',
            'no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^[A-Z_]',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },

    // Vercel serverless functions run in Node
    {
        files: ['api/**/*.js'],
        languageOptions: {
            globals: globals.node,
        },
    },

    // Build/tooling config files run in Node
    {
        files: ['*.config.js'],
        languageOptions: {
            globals: globals.node,
        },
    },
]
