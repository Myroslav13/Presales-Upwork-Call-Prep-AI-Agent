import { useState } from 'react'

type Props = {
  mainNeed: string
  hiddenNeeds: string[]
}

export function ClientNeedsTabs({ mainNeed, hiddenNeeds }: Props) {
  const [tab, setTab] = useState<'main' | 'hidden'>('main')

  return (
    <>
      <div className="tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'main'}
          className={tab === 'main' ? 'tab active' : 'tab'}
          onClick={() => setTab('main')}
        >
          Main Need
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'hidden'}
          className={tab === 'hidden' ? 'tab active' : 'tab'}
          onClick={() => setTab('hidden')}
        >
          Possible Hidden Needs
        </button>
      </div>
      {tab === 'main' ? (
        <p className="tab-panel">{mainNeed}</p>
      ) : (
        <ul className="tab-panel list">
          {hiddenNeeds.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  )
}
