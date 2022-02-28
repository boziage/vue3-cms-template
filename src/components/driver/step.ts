export const steps = (i18n: any) => [
  {
    element: '#guide',
    popover: {
      title: i18n('driver.guideBtn'),
      description: i18n('driver.guideContent'),
      position: 'left'
    }
  },
  {
    element: '#hamburger',
    popover: {
      title: i18n('driver.hamburgerBtn'),
      description: i18n('driver.hamburgerContent'),
      position: 'bottom'
    }
  },
  {
    element: '#screenfull',
    popover: {
      title: i18n('driver.fullScreen'),
      description: i18n('driver.fullScreenContent'),
      position: 'left'
    }
  },
  {
    element: '#language',
    popover: {
      title: i18n('driver.langBtn'),
      description: i18n('driver.langContent'),
      position: 'left'
    }
  }
]
