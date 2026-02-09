import React from 'react'
import { Link } from 'react-router-dom'
import schools from '../data/schools.json'
import { Card, Pill } from '../components/UI'

export default function Schools() {
  return (
    <div className="page">
      <div className="hero hero--small">
        <div className="hero__title">派别百科</div>
        <div className="hero__subtitle">每个派别都给出：定义、主张/反对、判断方法、日常态度、学习路径与代表人物。</div>
      </div>

      <div className="grid3">
        {(schools as any[]).map((s) => (
          <Link key={s.id} to={`/schools/${s.id}`} className="nolink">
            <Card>
              <div className="card__title">{s.name}</div>
              <div className="card__text">{s.tagline}</div>
              <div className="card__meta">
                <Pill>人物</Pill><Pill>学习路径</Pill><Pill>日常行动</Pill>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
