import { useEffect, useState } from 'react'
import debounce from 'lodash/debounce'

export function useIframeScroll(el, debounceTimer: number = 50) {
  const [rect, setRect] = useState({
    top: 0,
    left: 0,
    x: 0,
    y: 0
  })

  useEffect(() => {
    const ref = el.current || el

    const doc = ref.contentDocument

    const onScroll = e => setRect(e.target.body.getBoundingClientRect())
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
