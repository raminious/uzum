import React, {
  useImperativeHandle,
  useState,
  useRef,
  forwardRef,
  RefObject,
  SyntheticEvent,
  useEffect
} from 'react'

// @ts-ignore TODO: https://github.com/cssinjs/jss/pull/1155
import { createUseStyles, ThemeProvider, jss } from 'react-jss'

// import { resetEditableElements } from '../utils/reset-editable-elements'

import createTheme from '../theme'
import createStyles from '../styles'

import { injectStyle } from './helpers/inject-style'

import createConfiguration from './configuration'

import ToolbarContainer from './components/ToolbarContainer'
import InlineEditor from './components/InlineEditor'
import SidePanel from './components/SidePanel'

export interface BuilderRef {
  getDom(): HTMLDocument | null
  resetTemplate(): void
  addStyle(styles: string): void
}

export interface IProps {
  html: string
  builderRef?: RefObject<BuilderRef>
  config?: Config
  theme?: Theme
  styles?: Styles
  children?: React.ReactNode
  plugins?: Plugin.Instance[]
  fixedSidebar?: boolean
  onLoad?(doc: HTMLDocument): void
  onSelectComponent?(component: HTMLElement): void
}

const defaultProps = {
  plugins: [],
  config: {},
  theme: {},
  fixedSidebar: true,
  onLoad: () => null,
  onSelectComponent: () => null
}

function TemplateBuilder(props: IProps) {
  const config: Config = createConfiguration(props.config)
  const frameRef = useRef<HTMLIFrameElement>(null)

  const [dom, setDom] = useState<HTMLDocument | null>(null)

  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null)
  const [activePlugin, setActivePlugin] = useState<Plugin.Instance | null>(null)

  const theme: Theme = createTheme(props.theme as Theme)
  const styles: Styles = createStyles(config, theme, props.styles, activePlugin)

  const usedStyles = createUseStyles(styles)()

  console.log('...', usedStyles, styles)

  useEffect(() => {
    const handleElementClick = (event: MouseEvent): void => {
      const target: HTMLElement = event.target as HTMLElement

      if (activePlugin && activePlugin.unload) {
        activePlugin.unload(activeElement as HTMLElement)
      }

      const nextActivePlugin = props.plugins!.find(
        (plugin: Plugin.Instance) =>
          plugin.hook && plugin.hook(target, config) === true
      )

      if (!nextActivePlugin) {
        setActiveElement(null)
        setActivePlugin(null)

        return
      }

      // trigger load event of plugin
      nextActivePlugin.load && nextActivePlugin.load(target)

      // set new active plugin
      setActivePlugin(nextActivePlugin)

      // set new active element
      setActiveElement(target as HTMLElement)

      // trigger onSelectComponent
      props.onSelectComponent!(target)
    }

    dom && dom.addEventListener('click', handleElementClick)

    return () => {
      dom && dom.removeEventListener('click', handleElementClick)
    }
  }, [
    dom,
    config,
    activePlugin,
    activeElement,
    props.plugins,
    props.onSelectComponent
  ])

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

    // onLoad trigger, used setTimeout to requeue the rendering flow,
    // then the ref object would have access to the dom object
    setTimeout(() => props.onLoad!(doc), 0)
  }

  /**
   * resets the content in iframe
   */
  const resetTemplate = () => {
    const frame: HTMLIFrameElement | null = frameRef.current

    setActiveElement(null)

    frame!.setAttribute('srcDoc', props.html)
  }

  /**
   * exposes some methods to the outside of the components
   */
  useImperativeHandle(props.builderRef, () => ({
    getDom: () => dom,
    addStyle: (styles: string) => injectStyle(dom as HTMLDocument, styles),
    resetTemplate
  }))

  return (
    <ThemeProvider theme={theme}>
      <div className={usedStyles.container}>
        <iframe
          className={usedStyles.iframe}
          title="uzum-frame"
          ref={frameRef}
          srcDoc={props.html}
          frameBorder="0"
          allowFullScreen
          onLoad={handleFrameLoad}
        />

        <ToolbarContainer frameRef={frameRef}>
          {() => (
            <InlineEditor
              activePlugin={activePlugin}
              activeElement={activeElement}
              config={config}
              theme={theme}
              styles={styles}
            />
          )}
        </ToolbarContainer>

        <SidePanel
          className={usedStyles.sidebar}
          fixedSidebar={props.fixedSidebar}
          activePlugin={activePlugin}
          activeElement={activeElement}
          config={config}
          theme={theme}
          styles={styles}
        />
      </div>
    </ThemeProvider>
  )
}

TemplateBuilder.defaultProps = defaultProps

export default forwardRef((props: IProps, ref: RefObject<BuilderRef>) => (
  <TemplateBuilder {...props} builderRef={ref} />
))
