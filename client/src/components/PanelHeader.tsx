type Props = {
  kicker: string
  title: string
  description?: string
}

export function PanelHeader({ kicker, title, description }: Props) {
  return (
    <header className="panel-header">
      <p className="panel-kicker">{kicker}</p>
      <h2>{title}</h2>
      {description ? <p className="panel-desc">{description}</p> : null}
    </header>
  )
}
