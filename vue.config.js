module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    name: 'Shortcutter',
    themeColor: '#1d2671',
    msTileColor: '#c33764',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#c33764',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/sw.js',
      // ...other Workbox options...
    }
  }
}
