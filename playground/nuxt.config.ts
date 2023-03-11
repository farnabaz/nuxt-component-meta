import nuxtMetaModule from '../src/module'

export default defineNuxtConfig({
  components: {
    dirs: [
      {
        path: '~/components/global',
        prefix: '',
        global: true
      },
      {
        path: '~/components/pinceau',
        prefix: '',
        global: true
      },
      '~/components'
    ]
  },

  modules: [
    '@nuxt/content',
    'pinceau/nuxt',
    nuxtMetaModule as any
  ],

  componentMeta: {
    debug: 2,
    exclude: [/test/i, (component: any) => {
      return component.global
    }]
  },

  pinceau: {
    followSymbolicLinks: false,
    componentMetaSupport: true
  },

  typescript: {
    includeWorkspace: true
  }
})
