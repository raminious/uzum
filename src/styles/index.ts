/* eslint-disable max-len */

import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

export default function createStyles(
  config: Config,
  theme: Theme,
  styles: Styles = {}
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
      '[contenteditable="true"]': {
        border: `${theme.editableBorderWidth}px solid ${theme.editableBorderColor} !important`,
        borderRadius: `0 ${theme.editableBorderRadius}px ${theme.editableBorderRadius}px ${theme.editableBorderRadius}px`,
        cursor: 'pointer',
        '&:hover': {
          border: `${theme.editableBorderWidth}px solid transparent`
        },
        '&:focus': {
          outline: 'none'
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
      backgroundColor: 'gray',
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
