/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import SvgIcon from '@/components/svg-icon'

const svgRequired = require.context('./svg', false, /\.svg$/)
svgRequired.keys().forEach((item) => svgRequired(item))

export default (app) => {
  app.component('svg-icon', SvgIcon)
}
