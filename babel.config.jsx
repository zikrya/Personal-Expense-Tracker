module.exports = {
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        // any other presets you are using
      ],
      plugins: [
        ['@babel/plugin-proposal-decorators', { "decoratorsBeforeExport": true }],
        '@babel/plugin-proposal-class-properties',
        // any other plugins you are using
      ],
    };
    