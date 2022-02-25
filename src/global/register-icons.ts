import * as ElIcons from '@element-plus/icons-vue'

import { App } from 'vue'

export default function (app: App): void {
  for (const iconName in ElIcons) {
    app.component(iconName, ElIcons[iconName])
  }
}
