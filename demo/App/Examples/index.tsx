import React, { useRef } from 'react'

import { injectStyle } from '../../../src/TemplateBuilder/helpers/inject-style'
import TemplateBuilder, { BuilderRef } from '../../../src/TemplateBuilder'

import template from '../../../public/static/samples/tpl-1'

const Examples: React.FC = () => {
  const builder = useRef<BuilderRef>({} as BuilderRef)

  const handleLoadTemplate = (dom: HTMLDocument) => {
    const css = 'body { margin: 0 auto !important; }'

    injectStyle(dom, css)
  }

  return (
    <div style={{ height: '100vh', margin: '0 auto' }}>
      <div
        style={{
          background: '#eee',
          padding: '0.5rem'
        }}
      >
        <button type="button" onClick={() => builder.current.resetTemplate()}>
          Reset Template
        </button>
      </div>

      <TemplateBuilder
        html={template}
        ref={builder}
        config={{
          editableAttribute: 'editable'
        }}
        onLoad={handleLoadTemplate}
      />
    </div>
  )
}

export default Examples
