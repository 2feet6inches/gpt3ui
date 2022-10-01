import Link from 'next/link'
import clsx from 'clsx'

export function GhostButton({ href, className, disabled, ...props }) {
  className = clsx(
    `inline-flex justify-center rounded-2xl bg-blue-600 p-4 text-base font-semibold text-gray-700 active:text-white/70 ${
      disabled ? 'pointer-events-none' : ''
    }`,
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
