import React, { useRef } from 'react'

import TemplateBuilder, { BuilderRef } from '../../../src/TemplateBuilder'

import template from '../../../public/static/samples/tpl-1'
import editablePlugin from './Plugins/EditablePlugin'

const Examples: React.FC = () => {
  const builder = useRef<BuilderRef>({} as BuilderRef)

  const handleLoadTemplate = (dom: HTMLDocument) => {
    const css = 'body { margin: 0 auto !important; }'

    builder.current.addStyle(css)
  }

  return (
    <div style={{ height: '100vh', margin: '0 auto' }}>
      <div
        style={{
          background: '#eee',
          height: '5vh'
        }}
      >
        <button type="button" onClick={() => builder.current.resetTemplate()}>
          Reset Template
        </button>
      </div>

      <TemplateBuilder
        html={template}
        ref={builder}
        plugins={[
          {
            ...editablePlugin,
            state: { a: 1 }
          }
        ]}
        config={{
          editableAttribute: 'data-editable'
        }}
        theme={{
          editableBorderWidth: 1
        }}
        styles={{
          container: {
            height: '95vh'
          }
        }}
        onLoad={handleLoadTemplate}
      />
    </div>
  )
}

export default Examples
