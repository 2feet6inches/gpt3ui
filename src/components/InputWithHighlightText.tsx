import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import convertToText from '@/libs/convertToText';
import convertToMarkup from '@/libs/convertToMarkup';

interface IInputWithHighlightTextProp {
  source: string
  highlightText?: string
  placeholder?: string
  onChange: (value: string) => void
  isLocked?: boolean
}

const InputWithHighlightText = ({
  source,
  highlightText,
  placeholder,
  onChange,
  isLocked
}: IInputWithHighlightTextProp) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isShowPlaceholder, setIsShowPlaceholder] = useState(true)

  const autoOnOffPlaceholder = useCallback((newContent: string) => {
    if (newContent) {
      setIsShowPlaceholder(false)
    } else {
      setIsShowPlaceholder(true)
    }
  }, [])

  const onInput = useCallback(
    (event: FormEvent<HTMLDivElement>) => {
      const newContent = event.currentTarget.innerHTML || ''
      onChange(convertToText(newContent))
      autoOnOffPlaceholder(newContent)
    },
    [autoOnOffPlaceholder, onChange]
  )

  const onFocus = useCallback(() => {
    if (!isLocked) {
      if (divRef.current && source && highlightText) {
        const newContent = `${source}${highlightText}`
        onChange(`${source}${highlightText}`)
        divRef.current.innerHTML = newContent
        autoOnOffPlaceholder(newContent)
      }
    }
  }, [source, highlightText, onChange, autoOnOffPlaceholder, isLocked])

  useEffect(() => {
    if (divRef.current) {
      const newContent = `${source}${highlightText}`
      if (newContent) {
        divRef.current.innerHTML = convertToMarkup(newContent)
        autoOnOffPlaceholder(newContent)
      }
    }
  }, [autoOnOffPlaceholder, source, highlightText])

  const className =
    'block w-full p-2 text-lg shadow-sm focus:border-green-500 whitespace-pre-wrap focus:ring-green-500 sm:text-xl'

  return (
    <div className="relative mt-5 opacity-90 border-sky-500 border-2 bg-white rounded-md">
      <div
        ref={divRef}
        contentEditable
        className={className}
        onInput={onInput}
        onClick={onFocus}
      />
      {isShowPlaceholder && placeholder && (
        <div className={`${className} text-gray-400 absolute top-0 -z-10 text-ellipsis`}>
          {placeholder}
        </div>
      )}
      <div className={`${className} absolute top-0 -z-10 text-transparent text-ellipsis`}>
        {source}
        {highlightText && <span className="bg-teal-500">{highlightText}</span>}
      </div>
    </div>
  )
}

export default InputWithHighlightText
