import jss from 'jss'
import preset from 'jss-preset-default'

import { Config } from '../TemplateBuilder'

jss.setup(preset())

export default function createStyles(config: Config): any {
  const editableAttribute = `[${config.editableAttribute}]`

  const styles = {
    '@global': {
      [editableAttribute]: {
        border: '1px solid transparent',
        cursor: 'pointer',
        '&:hover': {
          border: '1px solid blue'
        }
      },
      '[contenteditable]': {
        border: '1px dashed transparent',
        cursor: 'pointer',
        '&:hover': {
          border: '1px solid transparent !important'
        }
      }
    },
    ...config.styles
  }

  return jss.createStyleSheet(styles)
}
