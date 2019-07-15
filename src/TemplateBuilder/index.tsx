import React, {
  useImperativeHandle,
  useState,
  useRef,
  forwardRef,
  RefObject
} from 'react'

// @ts-ignore TODO: https://github.com/cssinjs/jss/pull/1155
import { createUseStyles, ThemeProvider, jss } from 'react-jss'

import createTheme, { ITheme } from '../theme'
import createStyles, { IStyles } from '../styles'

import { injectStyle } from './helpers/inject-style'
import createConfiguration from './configuration'

export interface BuilderRef {
  getDom(): HTMLDocument | null
  resetTemplate(): void
}

export interface Config {
  editableAttribute?: string
}

export interface IProps {
  html: string
  builderRef?: RefObject<BuilderRef>
  config?: Config
  theme?: ITheme
  styles?: IStyles
  onLoad(arg0: HTMLDocument): void
}

function TemplateBuilder(props: IProps) {
  const config: Config = createConfiguration(props.config)
  const frameRef = useRef<HTMLIFrameElement>(null)

  const [dom, setDom] = useState<HTMLDocument | null>(null)

  const theme: ITheme = createTheme(props.theme as ITheme)
  const styles: IStyles = createStyles(config, theme, props.styles)

  const usedStyles = createUseStyles(styles)()

  const handleFrameLoad = (e: any) => {
    const doc: HTMLDocument = e.target.contentWindow.document

    // set dom state
    setDom(doc)

    // inject required styles to the iframe
    injectStyle(doc, jss.createStyleSheet(styles).toString())

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
    <ThemeProvider theme={theme}>
      <div className={usedStyles.container}>
        <iframe
          className={usedStyles.iframe}
          ref={frameRef}
          srcDoc={props.html}
          title="uzum-frame"
          frameBorder="0"
          allowFullScreen
          onLoad={handleFrameLoad}
        />

        <div className={usedStyles.sidebar}>00</div>
      </div>
    </ThemeProvider>
  )
}

export default forwardRef((props: IProps, ref: RefObject<BuilderRef>) => (
  <TemplateBuilder {...props} builderRef={ref} />
))
