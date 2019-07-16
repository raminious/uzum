import React from 'react'

interface IProps {
  activeElement: HTMLElement | null
}

export default function InlineEditor({ activeElement }: IProps) {
  const bounds: ClientRect | { top: number; left: number } = activeElement
    ? activeElement.getBoundingClientRect()
    : {
        top: 0,
        left: 0
      }

  return (
    <div
      style={{
        display: activeElement ? 'flex' : 'none',
        pointerEvents: 'all',
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: 'RebeccaPurple',
        borderRadius: '3px 3px 0 0',
        color: '#fff',
        width: '120px',
        height: '25px',
        padding: '0 5px',
        top: bounds.top - 25,
        left: bounds.left
      }}
    >
      ----
    </div>
  )
}
