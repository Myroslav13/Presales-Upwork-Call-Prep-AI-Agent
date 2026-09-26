import { useState } from "react"

type Props = {
    text: string
}

export function CopyButton({ text }: Props) {
    const [copied, setCopied] = useState(false)
  
    async function handleCopy() {
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
      } catch {
        /* clipboard may be blocked */
      }
    }
  
    return (
      <button type="button" className="btn-copy" onClick={handleCopy}>
        {copied ? 'Copied' : 'Copy all'}
      </button>
    )
}
