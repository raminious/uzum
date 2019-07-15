import React, {
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
  forwardRef,
  RefObject
} from 'react'

import { injectStyle } from './helpers/inject-style'
import createConfiguration from './configuration'
import createStyles from '../styles'

export interface BuilderRef {
  getDom(): HTMLDocument | null
  resetTemplate(): void
}

export interface Config {
  editableAttribute?: string
  styles?: Object
}

export interface IProps {
  html: string
  builderRef?: RefObject<BuilderRef>
  config?: Config
  onLoad(arg0: HTMLDocument): void
}

function TemplateBuilder(props: IProps) {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [dom, setDom] = useState<HTMLDocument | null>(null)
  const config: Config = createConfiguration(props.config)

  useEffect(() => {
    return () => {}
  }, [])

  const handleFrameLoad = (e: any) => {
    const doc: HTMLDocument = e.target.contentWindow.document

    // set dom state
    setDom(doc)

    // create required styles
    const styles = createStyles(config)

    // inject required styles to the iframe
    injectStyle(doc, styles.toString())

    setupTriggers(doc)

    // onLoad trigger
    props.onLoad(doc)
  }

  const setupTriggers = (doc: HTMLDocument) => {
    doc.querySelectorAll(`[${config.editableAttribute}="true"]`).forEach(el => {
      el.addEventListener('click', handleEditableClick)
    })
  }

  const handleEditableClick = (e: any) => {
    const { target }: { target: HTMLElement } = e

    target.setAttribute('contenteditable', 'true')
    target.focus()

    target.addEventListener('blur', (e: any) =>
      e.target.removeAttribute('contenteditable')
    )
  }

  const resetTemplate = () => {
    const el: HTMLIFrameElement | null = frameRef.current

    el!.setAttribute('srcDoc', props.html)
  }

  useImperativeHandle(props.builderRef, () => ({
    getDom: () => dom,
    resetTemplate
  }))

  return (
    <>
      <iframe
        ref={frameRef}
        srcDoc={props.html}
        title="uzum-frame"
        className="uzum--frame"
        frameBorder="0"
        allowFullScreen
        onLoad={handleFrameLoad}
        style={{
          width: '100%',
          height: '100%'
        }}
      />
    </>
  )
}

export default forwardRef((props: IProps, ref: RefObject<BuilderRef>) => (
  <TemplateBuilder {...props} builderRef={ref} />
))
