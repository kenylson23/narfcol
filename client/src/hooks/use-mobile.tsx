import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Check if window exists (SSR safety)
    if (typeof window === 'undefined') return;
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
    }
    
    try {
      mql.addEventListener("change", onChange)
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      
      return () => {
        try {
          mql.removeEventListener("change", onChange)
        } catch (error) {
          // Silently fail during cleanup
        }
      }
    } catch (error) {
      // Fallback if matchMedia is not supported
      setIsMobile(false)
    }
  }, [])

  return !!isMobile
}
