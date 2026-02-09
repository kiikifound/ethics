import React from 'react'

export function Card({ children, className='' }: { children: React.ReactNode, className?: string }) {
  return <div className={`card ${className}`}>{children}</div>
}

export function Button({ children, onClick, variant='primary', disabled=false }: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  disabled?: boolean
}) {
  return (
    <button className={`btn btn--${variant}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export function Pill({ children }: { children: React.ReactNode }) {
  return <span className="pill">{children}</span>
}

export function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const items = [
    { n: 1, title: '完成测试', desc: '按直觉选择更接近的一侧' },
    { n: 2, title: '查看结果', desc: '先给定义，再给叙述与行动建议' },
    { n: 3, title: '继续探索', desc: '百科 + 临近派别差异 + 学习路径' },
  ] as const
  return (
    <div className="stepper">
      {items.map((it) => (
        <div key={it.n} className={`step ${step === it.n ? 'step--active' : ''}`}>
          <div className="step__badge">STEP {it.n}</div>
          <div className="step__title">{it.title}</div>
          <div className="step__desc">{it.desc}</div>
        </div>
      ))}
    </div>
  )
}

export function Likert7({ value, onChange, leftLabel='更接近A', rightLabel='更接近B' }: {
  value: number | null
  onChange: (v: number) => void
  leftLabel?: string
  rightLabel?: string
}) {
  const pts = [1,2,3,4,5,6,7]
  return (
    <div className="likert">
      <div className="likert__side likert__side--left">{leftLabel}</div>
      <div className="likert__dots">
        {pts.map((p) => (
          <button
            key={p}
            type="button"
            className={`dot dot--${p} ${value===p?'dot--active':''}`}
            aria-label={`选择 ${p}`}
            onClick={() => onChange(p)}
          />
        ))}
      </div>
      <div className="likert__side likert__side--right">{rightLabel}</div>
    </div>
  )
}
