import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import questions from '../data/questions.json'
import { Card, Button, Likert7 } from '../components/UI'

type AnswerMap = Record<string, number>

function loadDraft(): AnswerMap {
  try {
    const raw = localStorage.getItem('ethics_answers')
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export default function Test() {
  const nav = useNavigate()
  const all = questions as any[]
  const total = all.length
  const perPage = 6
  const pages = Math.ceil(total / perPage)

  const [answers, setAnswers] = useState<AnswerMap>(() => loadDraft())
  const [page, setPage] = useState(1)

  useEffect(() => {
    localStorage.setItem('ethics_answers', JSON.stringify(answers))
  }, [answers])

  const slice = useMemo(() => {
    const start = (page-1)*perPage
    return all.slice(start, start+perPage)
  }, [page, all])

  const answeredCount = Object.keys(answers).length
  const progress = Math.round((answeredCount/total)*100)

  function setAns(qid: string, v: number) {
    setAnswers(prev => ({ ...prev, [qid]: v }))
  }

  function next() {
    if (page < pages) setPage(p => p+1)
  }
  function prev() {
    if (page > 1) setPage(p => p-1)
  }
  function submit() {
    if (answeredCount < total) return
    localStorage.setItem('ethics_answers_final', JSON.stringify(answers))
    nav('/result')
  }

  return (
    <div className="page">
      <div className="testhead">
        <div>
          <div className="testhead__title">完成测试</div>
          <div className="testhead__sub">进度：{progress}%（已答 {answeredCount}/{total}）</div>
        </div>
        <div className="testhead__pager">第 {page}/{pages} 页</div>
      </div>

      <div className="stack">
        {slice.map((q) => (
          <Card key={q.id}>
            {q.type === 'bipolar' ? (
              <>
                <div className="q__title">{q.id}</div>
                <div className="q__stem">{q.stem}</div>
                <div className="q__choices">
                  <div className="q__choice q__choice--left">{q.a}</div>
                  <div className="q__choice q__choice--right">{q.b}</div>
                </div>
                <Likert7
                  value={answers[q.id] ?? null}
                  onChange={(v)=>setAns(q.id, v)}
                  leftLabel="更接近A"
                  rightLabel="更接近B"
                />
              </>
            ) : (
              <>
                <div className="q__title">{q.id}</div>
                <div className="q__stem">{q.text}</div>
                <Likert7
                  value={answers[q.id] ?? null}
                  onChange={(v)=>setAns(q.id, v)}
                  leftLabel="不同意"
                  rightLabel="同意"
                />
              </>
            )}
          </Card>
        ))}
      </div>

      <div className="actions">
        <Button variant="ghost" onClick={prev} disabled={page===1}>上一页</Button>
        {page < pages ? (
          <Button onClick={next}>下一页</Button>
        ) : (
          <Button onClick={submit} disabled={answeredCount < total}>查看结果</Button>
        )}
      </div>

      {answeredCount < total && page===pages && (
        <div className="hint">还差 {total-answeredCount} 题未作答。完成后才能生成结果。</div>
      )}
    </div>
  )
}
