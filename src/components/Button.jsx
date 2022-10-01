import Link from 'next/link'
import clsx from 'clsx'

export function Button({ href, className, disabled, ...props }) {
  className = clsx(
    `inline-flex justify-center rounded-2xl p-4 text-base font-semibold text-white bg-sky-500 shadow-md shadow-sky-700/50 hover:bg-sky-700 active:text-white/70 ${
      disabled ? 'pointer-events-none bg-gray-300 shadow-none' : ''
    }`,
    className
  )

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button className={className} {...props} />
  )
}
