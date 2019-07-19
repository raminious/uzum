import React from 'react'

export default function Panel(props: Plugin.Panel) {
  const randomColor = () => {
    let o = Math.round
    let r = Math.random
    let s = 255

    return `rgba(${o(r() * s)},${o(r() * s)},${o(r() * s)},${r().toFixed(1)})`
  }

  const updateColor = () => {
    props.el!.style.color = randomColor()
  }

  const updateText = () => {
    props.el!.innerText = 'Hello!!!!'
  }

  const updateSize = () => {
    const currentSize = parseInt(props.el!.style!.fontSize as string, 10)

    props.el!.style.fontSize = `${Math.max(16, currentSize || 0) + 2}px`
  }

  return (
    <div className={props.defaultClassName}>
      <button type="button" onClick={updateColor}>
        Change Color
      </button>
      <div />
      <button type="button" onClick={updateText}>
        Change Text
      </button>

      <button type="button" onClick={updateSize}>
        Increase Size
      </button>
    </div>
  )
}
