import { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

export function useIframeScroll(el, debounceTimer: number = 50) {
  const [rect, setRect] = useState<ClientRect>({
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  })

  useEffect(() => {
    const ref = el.current || el

    const doc: HTMLDocument = ref.contentDocument

    const onScroll = (e: any) => setRect(e.target.body.getBoundingClientRect())

    const debouncedOnScroll =
      debounceTimer > 0 ? debounce(onScroll, debounceTimer) : onScroll

    doc.addEventListener('scroll', debouncedOnScroll, false)

    return () => {
      doc.removeEventListener('scroll', debouncedOnScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return rect
}
