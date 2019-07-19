import { useEffect, useState } from 'react'

interface Size {
  width: number
  height: number
}

interface Target extends EventTarget {
  innerWidth: number
  innerHeight: number
}

export function useIframeResize(el) {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const ref = el.current || el

    const doc: HTMLDocument = ref.contentWindow

    const onResize = (e: Event) => {
      const target: Target = e.target as Target

      setSize({
        width: target!.innerWidth,
        height: target!.innerHeight
      })
    }

    doc.addEventListener('resize', onResize, false)

    return () => {
      doc.removeEventListener('resize', onResize)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return size
}
