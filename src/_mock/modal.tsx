import { ReactNode, useEffect } from "react"

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  footer?: ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const sizeClass =
    size === "sm"
      ? "max-w-sm"
      : size === "lg"
      ? "max-w-3xl"
      : size === "xl"
      ? "max-w-5xl"
      : "max-w-xl"

  return (
    <div className="fixed inset-0 z-99999">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className={`w-full ${sizeClass} rounded-xl bg-white dark:bg-gray-800 shadow-xl`}>
            {title && (
              <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-base font-semibold">{title}</h3>
              </div>
            )}
            <div className="px-5 py-4">{children}</div>
            {footer && (
              <div className="px-5 py-3 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
