/* eslint-disable max-len */
import React from 'react'

import Panel from './Panel'

const editablePlugin: Plugin.Instance = {
  hook(target: HTMLElement, config: Config): boolean {
    return target.getAttribute(config.editableAttribute as string) !== null
  },
  load(target) {
    target.setAttribute('contenteditable', 'true')
    target.focus()
  },
  unload(target) {
    target.setAttribute('contenteditable', 'false')
  },
  styles(config: Config, theme: Theme): Styles {
    const editableAttribute: string = `[${config.editableAttribute}]`

    return {
      global: {
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
        }
      }
    }
  },
  inline({ bounds }: Plugin.Inline) {
    return (
      <div
        style={{
          display: 'flex',
          pointerEvents: 'all',
          position: 'absolute',
          alignItems: 'center',
          backgroundColor: 'RebeccaPurple',
          borderRadius: '3px 3px 0 0',
          color: '#fff',
          width: '120px',
          height: '25px',
          padding: '0 5px',
          top: bounds.top - 25,
          left: bounds.left
        }}
      >
        Hello
      </div>
    )
  },
  panel: Panel
}

export default editablePlugin
