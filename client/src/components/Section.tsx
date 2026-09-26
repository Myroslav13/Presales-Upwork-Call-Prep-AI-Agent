import type { ReactNode } from "react"

type Props = {
    title: string
    tone?: 'default' | 'success' | 'danger' | 'accent'
    children: ReactNode
    action?: ReactNode
}

export function Section({
    title,
    tone,
    children,
    action,
  }: Props) {
    return (
      <div className={`result-section tone-${tone ?? 'default'}`}>
        <div className="result-section-head">
          <h3>{title}</h3>
          {action}
        </div>
        <div className="result-section-body">{children}</div>
      </div>
    )
}
