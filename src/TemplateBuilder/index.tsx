import React, {
  useImperativeHandle,
  useState,
  useRef,
  forwardRef,
  RefObject,
  SyntheticEvent
} from 'react'

// @ts-ignore TODO: https://github.com/cssinjs/jss/pull/1155
import { createUseStyles, ThemeProvider, jss } from 'react-jss'

import { resetEditableElements } from '../utils/reset-editable-elements'

import createTheme, { ITheme } from '../theme'
import createStyles, { IStyles } from '../styles'

import { injectStyle } from './helpers/inject-style'

import createConfiguration from './configuration'

import ToolbarContainer from './components/ToolbarContainer'
import InlineEditor from './components/InlineEditor'

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

  // eslint-disable-next-line
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null)

  const theme: ITheme = createTheme(props.theme as ITheme)
  const styles: IStyles = createStyles(config, theme, props.styles)

  const usedStyles = createUseStyles(styles)()

  /**
   * trigger when Iframe loads the html content
   * @param e - the event
   */
  const handleFrameLoad = (e: SyntheticEvent<HTMLIFrameElement, Event>) => {
    const doc: HTMLDocument = (e.target as HTMLIFrameElement)!.contentWindow!
      .document

    // set dom state
    setDom(doc)

    // inject required styles to the iframe
    injectStyle(doc, jss.createStyleSheet(styles).toString())

    doc.addEventListener('click', (event: MouseEvent) =>
      handleElementClick(event, doc)
    )

    // onLoad trigger
    props.onLoad(doc)
  }

  /**
   * triggers when user clicks on an element in the template
   * @param event - the click event
   * @param doc - the html document
   */
  const handleElementClick = (event: MouseEvent, doc: HTMLDocument): void => {
    const target: HTMLElement = event.target as HTMLElement
    const isTargetEditable: boolean =
      target.getAttribute(config.editableAttribute as string) !== null

    if (!isTargetEditable) {
      return
    }

    resetEditableElements(doc)

    setActiveElement(target as HTMLElement)

    target.setAttribute('contenteditable', 'true')
    target.focus()
  }

  /**
   * resets the content in iframe
   */
  const resetTemplate = () => {
    const el: HTMLIFrameElement | null = frameRef.current

    setActiveElement(null)

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

        <ToolbarContainer frameRef={frameRef}>
          {() => <InlineEditor activeElement={activeElement} />}
        </ToolbarContainer>

        <div className={usedStyles.sidebar}>-- sidebar --</div>
      </div>
    </ThemeProvider>
  )
}

export default forwardRef((props: IProps, ref: RefObject<BuilderRef>) => (
  <TemplateBuilder {...props} builderRef={ref} />
))
