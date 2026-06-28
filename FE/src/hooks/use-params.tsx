import { usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"

export const useClearFilters = () => {
    const router = useRouter()
    const pathname = usePathname()

    return useCallback(() => {
        router.push(pathname)
    }, [pathname, router])
}