import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // 初始检查
    checkMobile()
    
    // 添加事件监听
    window.addEventListener('resize', checkMobile)
    
    // 清理
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}
