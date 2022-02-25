import type { App } from 'vue'
// import registerElement from './register-element'
import registerProperties from './register-properties'
import registerIcons from './register-icons'

export function globalRegister(app: App): void {
  // app.use(registerElement)
  app.use(registerProperties)
  app.use(registerIcons)
}
