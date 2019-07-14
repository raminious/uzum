const path = require('path')
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')

module.exports = {
  webpack: function(config, env) {
    // enable scoping from outside of src/ dir
    config.resolve.plugins = config.resolve.plugins.filter(
      plugin => !(plugin instanceof ModuleScopePlugin)
    )

    config = rewireReactHotLoader(config, env)

    // return config
  },
  paths: function (paths) {        
    paths.appIndexJs = path.resolve(__dirname, 'demo/index.tsx')
    paths.appSrc = path.resolve(__dirname, 'demo')

    return paths
  }
}