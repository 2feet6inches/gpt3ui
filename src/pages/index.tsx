import Head from 'next/head'

import { Button } from '@/components/Button'
import { GhostButton } from '@/components/GhostButton'
import { Container } from '@/components/Container'
import InputWithHighlightText from '@/components/InputWithHighlightText'
import { SetStateAction, useCallback, useState } from 'react'
import Spinner from '@/components/Spinner'
import { generate } from '@/data/data'

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

const innitialText = ''

export default function Home() {
  const options = [
    { value: 'SQLを作成してください。', text: 'SQL' },
    { value: 'Pythonのコードを作成してください。', text: 'Python' },
    { value: 'Javascriptのコードを作成してください。', text: 'Javascript' },
    { value: 'HTML&CSSのコードを作成してください。', text: 'HTML & CSS' },
    { value: 'Ethereumスマートコントラクトのコードを作成してください。', text: 'スマートコントラクト' },
    { value: 'C++のコードを作成してください。', text: 'C++' },
    { value: '', text: '汎用' },
  ]

  const [isLoading, setIsLoading] = useState(false)
  const [inputText, setInputText] = useState<string>(innitialText)
  const [sourceText, setSourceText] = useState<string>(innitialText)
  const [recommendedText, setRecommendedText] = useState<string>('')
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false)
  // For reset HighlightInputText state to default
  const [isShowHighLightInput, setIsShowHighLightInput] = useState(true)
  const [category, setCategory] = useState(options[0].value)

  const onUpdateRecommendedTextWithAnimation = useCallback(
    async (text: string) => {
      setIsPlayingAnimation(true)
      const arrText = text.split('')
      const showedText = []
      for (let i = 0; i < arrText.length; i++) {
        showedText.push(arrText[i])
        setRecommendedText(showedText.join(''))
        await sleep(20 + Math.random() * 5)
      }
      setIsPlayingAnimation(false)
    },
    []
  )

  const onClear = useCallback(() => {
    setInputText('')
    setSourceText('')
    setRecommendedText('')
    setIsShowHighLightInput(false)
    setTimeout(() => {
      setIsShowHighLightInput(true)
    })
  }, [])

  const htmlEscape = (str: string) => {
    if (!str) return;
    return str.replace(/[<>&"'`]/g, (match) => {
      const escape: any = {
        '<': '&lt;',
        '>': '&gt;',
        '&': '&amp;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#x60;'
      };
      return escape[match]
    });
  }

  const onSend = useCallback(async () => {
    setIsLoading(true)
    try {
      const question = `${category}\n${inputText}`
      console.log('InputText:', inputText)
      console.log('Question:', question)

      const res = await generate({ question: question })
      const outputOfRecommended = htmlEscape(res.data.choices[0].text)

      console.log('Recommended:', outputOfRecommended)

      setInputText(`${inputText}`)
      setSourceText(inputText)
      onUpdateRecommendedTextWithAnimation(`${outputOfRecommended}`)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [inputText, category, onUpdateRecommendedTextWithAnimation])

  const onChangeInput = useCallback((newValue: string) => {
    setInputText(newValue)
    setSourceText('')
    setRecommendedText('')
  }, [])

  const onChangeSelect = useCallback((newValue: SetStateAction<any>) => {
    setCategory(newValue.target.value)
    setInputText('')
    setSourceText('')
    setRecommendedText('')
    setIsShowHighLightInput(false)
    setTimeout(() => {
      setIsShowHighLightInput(true)
    })
  }, [])

  const isDisabledAction = isLoading || !inputText || isPlayingAnimation

  return (
    <>
      <Head>
        <title>GPT3 UI</title>
      </Head>
      <main>
        <div className="relative overflow-hidden py-20 sm:py-32">
          <Container className="relative">
            <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
              <div className="space-y-6 font-display tracking-tight">
                <div
                  className={[
                    'text-lg font-semibold leading-[1.6] underline decoration-sky-600 decoration-4 drop-shadow-[0_35px_35px_rgba(255,255,255,0.6)] sm:text-3xl sm:leading-[1.7] text-center',
                  ].join(' ')}
                >
                  GPT3 UI
                </div>
              </div>
              <div className="flex flex-row">
                <div className="mt-10 flex-1">
                  <select
                    autoComplete="off"
                    name="questionCategory"
                    id="questionCategory"
                    className="block w-full whitespace-pre-wrap rounded-md bg-white h-10 p-2 text-sm border-sky-500 border-2 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-lg "
                    placeholder="Category"
                    disabled={isPlayingAnimation}
                    value={category}
                    onChange={onChangeSelect}
                  >
                    {options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                {isShowHighLightInput ? (
                  <InputWithHighlightText
                    source={sourceText}
                    highlightText={recommendedText}
                    placeholder="Question"
                    onChange={onChangeInput}
                    isLocked={isPlayingAnimation}
                  />
                ) : (
                  <div />
                )}
              </div>
              <Button
                className={[
                  'mt-5 w-full',
                  isLoading ? 'loading' : '',
                ].join(' ')}
                disabled={isDisabledAction}
                onClick={onSend} href={undefined}              >
                {isLoading && <Spinner />}
                {!isLoading && 'Go'}
              </Button>
              <GhostButton
                href={undefined}
                className="mt-2 w-full bg-transparent"
                disabled={isDisabledAction}
                onClick={onClear}
              >
                Clear
              </GhostButton>
            </div>
          </Container>
        </div>
      </main>
    </>
  )
}
