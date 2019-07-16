import React from 'react'

import { useIframeScroll } from '../../../hooks/use-iframe-scroll'

interface IProps {
  frameRef: React.RefObject<HTMLIFrameElement>
  children: any
}

export default function ToolbarContainer(props: IProps) {
  const containerPosition = useIframeScroll(props.frameRef, 0)

  return (
    <div style={{ position: 'absolute' }}>
      {props.children({
        containerPosition
      })}
    </div>
  )
}
