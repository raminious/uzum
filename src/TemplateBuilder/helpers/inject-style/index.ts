interface IStyleElement extends HTMLStyleElement {
  styleSheet?: {
    cssText: string
  }
}

export function injectStyle(dom: HTMLDocument, css: string): void {
  if (!dom) {
    return
  }

  const style: IStyleElement = document.createElement('style')

  style.type = 'text/css'

  if (style.styleSheet) {
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }

  dom.head.appendChild(style)
}
