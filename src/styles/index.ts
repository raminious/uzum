import jss from 'jss'
import preset from 'jss-preset-default'

import { ITheme } from '../theme'
import { Config } from '../TemplateBuilder'

jss.setup(preset())

export interface IStyles {
  global?: React.CSSProperties
  container?: React.CSSProperties
  sidebar?: React.CSSProperties
  iframe?: React.CSSProperties
  extended?: React.CSSProperties
}

export default function createStyles(
  config: Config,
  theme: ITheme,
  styles: IStyles = {}
): object {
  const editableAttribute: string = `[${config.editableAttribute}]`

  const defaultStyles = {
    '@global': {
      [editableAttribute]: {
        border: `${theme.editableBorderWidth}px solid transparent`,
        cursor: 'pointer',
        '&:hover': {
          border: `${theme.editableBorderWidth}px solid ${theme.editableBorderColor}`
        }
      },
      '[contenteditable]': {
        border: `${theme.editableBorderWidth}px dashed transparent`,
        cursor: 'pointer',
        '&:hover': {
          border: `${theme.editableBorderWidth}px solid transparent !important`
        }
      },
      ...styles.global
    },
    container: {
      display: 'flex',
      ...styles.container
    },
    sidebar: {
      width: '30%',
      ...styles.sidebar
    },
    iframe: {
      width: '100%',
      height: '100%',
      ...styles.iframe
    },
    ...styles.extended
  }

  return defaultStyles
}
