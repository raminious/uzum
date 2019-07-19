interface BaseRendererMethodsProps {
  el?: HTMLElement
  config?: Config
  theme?: Theme
  styles?: Styles
  state: any
}

declare namespace Plugin {
  interface Panel extends BaseRendererMethodsProps {
    defaultClassName: string
  }

  interface Inline extends BaseRendererMethodsProps {
    bounds: ClientRect
  }

  interface Instance {
    state?: any
    hook(target: HTMLElement, config: Config): boolean
    load?(target: HTMLElement): void
    unload?(target: HTMLElement): void
    styles?(config: Config, theme: Theme): Styles
    panel?({
      el,
      defaultClassName,
      config,
      theme,
      styles
    }: Panel): React.ReactElement
    inline?({ el, bounds, config, theme, styles }: Inline): React.ReactElement
  }
}
