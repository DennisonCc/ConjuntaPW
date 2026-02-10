module.exports = [
    {
        files: ['**/*.js'],
        ignores: ['coverage/**'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'commonjs'
        },
        rules: {
            semi: ['error', 'always'],
            quotes: ['error', 'single']
        }
    }
];
