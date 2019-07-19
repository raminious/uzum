import React from 'react'

interface IProps {
  className: string
  activePlugin: Plugin.Instance | null
  activeElement: HTMLElement | null
  fixedSidebar?: boolean
  config: Config
  theme: Theme
  styles: Styles
}

export default function InlineEditor({
  theme,
  styles,
  config,
  className,
  activePlugin,
  activeElement,
  fixedSidebar
}: IProps) {
  if (!activeElement || !activePlugin || !activePlugin.panel) {
    return fixedSidebar ? <div className={className} /> : null
  }

  return activePlugin.panel({
    el: activeElement,
    defaultClassName: className,
    state: activePlugin.state,
    config,
    theme,
    styles
  })
}
