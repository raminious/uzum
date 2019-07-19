interface IProps {
  activePlugin: Plugin.Instance | null
  activeElement: HTMLElement | null
  config: Config
  theme: Theme
  styles: Styles
}

export default function InlineEditor({
  activePlugin,
  activeElement,
  config,
  theme,
  styles
}: IProps) {
  if (!activePlugin || !activeElement) {
    return null
  }

  if (activePlugin.inline) {
    const bounds: ClientRect = activeElement.getBoundingClientRect()

    return activePlugin.inline({
      el: activeElement,
      state: activePlugin.state,
      bounds,
      config,
      theme,
      styles
    })
  }

  return null
}
