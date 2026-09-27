import { useState } from 'react'
import type { ClientNeeds } from '../types'

type Props = {
  clientNeeds: ClientNeeds
}

export function ClientNeedsTabs({ clientNeeds }: Props) {
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
        <p className="tab-panel">{clientNeeds.main}</p>
      ) : (
        <ul className="tab-panel list">
          {clientNeeds.hidden.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  )
}
