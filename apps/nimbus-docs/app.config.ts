export default defineAppConfig({
  docus: {
    title: 'Nimbus',
    description: 'An Open Source project by VLALG that aims to share JavaScript libs, VS Code extensions, Browser extensions and Vue.js 3 components',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
    socials: {
      twitter: 'SantosTonhao',
      github: 'VemLavarALoucaGamers/vlalg-nimbus',
      social: {
        label: 'npm',
        icon: 'simple-icons:npm',
        href: 'https://www.npmjs.com/org/vlalg-nimbus',
        target: '_blank',
        rel: 'noopener noreferrer external'
      }
    },
    github: {
      dir: '.starters/default/content',
      branch: 'main',
      repo: 'docus',
      owner: 'nuxt-themes',
      edit: true
    },
    aside: {
      level: 0,
      collapsed: true,
      exclude: []
    },
    main: {
      padded: false,
      fluid: true
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: false,
    },
    footer: {
      fluid: false,
      credits: {
        icon: '',
        text: '© 2023 VLALG - MIT License',
        href: 'https://vemlavaralouca.com.br'
      },
      textLinks: [
        {
          text: 'Apoie (em construção)',
          href: '#',
          target: '_blank',
          rel: 'noopener noreferrer external'
        }
      ],
      iconLinks: []
    }
  }
})
