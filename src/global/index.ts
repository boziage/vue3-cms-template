import type { App } from 'vue'
import registerProperties from './register-properties'
import registerIcons from './register-icons'

export function globalRegister(app: App): void {
  app.use(registerProperties)
  app.use(registerIcons)
}
