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
