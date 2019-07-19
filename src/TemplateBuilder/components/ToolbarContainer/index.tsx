import React from 'react'

import { useIframeScroll } from '../../../hooks/use-iframe-scroll'
import { useIframeResize } from '../../../hooks/use-iframe-resize'

interface IProps {
  frameRef: React.RefObject<HTMLIFrameElement>
  children: any
}

export default function ToolbarContainer(props: IProps) {
  const position = useIframeScroll(props.frameRef, 0)
  const size = useIframeResize(props.frameRef)

  return (
    <div style={{ position: 'absolute' }}>
      {props.children({
        position,
        size
      })}
    </div>
  )
}
