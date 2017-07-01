const extend = require('deep-extend')

function addScriptDependencies (files = {}, context) {
  extend(files.pkg, {
    scripts: {
      'subtask:bundlewebpack': 'webpack --config webpack.config.babel.js -p --colors --env.bundle=production --env=production',
      'scripts': 'gulp rebuild:js --env=init'
    },
    devDependencies: {
      'babel-loader': '^6.2.10',
      'babel-eslint': '^7.2.3',
      'babel-plugin-transform-runtime': '^6.22.0',
      'babel-plugin-syntax-dynamic-import': '^6.18.0',
      'babel-preset-env': '^1.2.2',
      'babel-register': '^6.22.0',
      'eslint': '^3.15.0',
      'eslint-config-standard': '^6.2.1',
      'eslint-plugin-promise': '^3.4.1',
      'eslint-plugin-standard': '^2.0.1',
      'eslint-formatter-pretty': '^1.1.0',
      'eslint-friendly-formatter': '^2.0.7',
      'eslint-loader': '^1.6.1',
      'eslint-plugin-html': '^2.0.0',
      'eslint-plugin-import': '^2.2.0',
      'eslint-plugin-jsx-a11y': '^4.0.0',
      'eslint-import-resolver-webpack': '^0.8.1',
      'extract-text-webpack-plugin': '2.1.0',
      'friendly-errors-webpack-plugin': '^1.6.1',
      'webpack': '^3.0.0',
      'webpack-dev-middleware': '^1.10.0',
      'webpack-hot-middleware': '^2.18.0',
      'webpack-merge': '^2.6.1'
    },
    dependencies: {
      'babel-polyfill': '^6.23.0',
      'conditionizr': '^4.5.0',
      'lazysizes': '^3.0.0',
      'pyrsmk-toast': '^2.1.1',
      'svgxuse': '^1.2.1'
    }
  })

  // Container-Queries
  if (context.props.projectcontainerqueries === true) {
    extend(files.pkg, {
      dependencies: {
        'cq-prolyfill': '^0.4.0'
      }
    })
  }

  // React
  if (context.props.projectjsframework === 'react') {
    extend(files.pkg, {
      devDependencies: {
        'eslint-plugin-react': '^6.9.0',
        'babel-preset-react': '^6.24.1'
      },
      dependencies: {
        'react': '^15.5.4',
        'react-dom': '^15.5.4'
      }
    })
  }

  // Vue
  if (context.props.projectjsframework === 'vue') {
    extend(files.pkg, {
      devDependencies: {
        'babel-preset-es2015': '^6.24.1',
        'babel-preset-stage-2': '^6.24.1',
        'eslint-config-vue': '^2.0.2',
        'eslint-plugin-html': '^3.0.0',
        'eslint-plugin-vue': '^2.0.1',
        'css-loader': '^0.26.1',
        'vue-loader': '^12.2.1',
        'sass-loader': '^5.0.1',
        'vue-style-loader': '^2.0.0',
        'vue-template-compiler': '^2.1.10'
      },
      dependencies: {
        'vue': '^2.1.10'
      }
    })
  }

  // Vue Plugins
  if (typeof context.props.projectvueplugins !== 'undefined') {
    if (context.props.projectvueplugins === true) {
      extend(files.pkg, {
        dependencies: {
          'vue-router': '^2.2.0',
          'axios': '^0.15.3',
          'vue-axios': '^1.2.2',
          'vuex': '^2.1.2',
          'vuex-router-sync': '^4.1.2'
        }
      })
    }
  }
}

module.exports = addScriptDependencies