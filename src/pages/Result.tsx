import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Pill } from '../components/UI'
import { AXES, computeScores, getSchool, getNeighborDiff } from '../lib/scoring'
import ideals from '../data/ideals.json'
import { RadarChart, BarTop } from '../components/Charts'

function loadFinal() {
  try {
    const raw = localStorage.getItem('ethics_answers_final') || localStorage.getItem('ethics_answers')
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

export default function Result() {
  const ans = useMemo(() => loadFinal(), [])
  const res = useMemo(() => computeScores(ans), [ans])
  const mainSchool = getSchool(res.main.id)
  const neighbor = getSchool(res.neighborId)
  const diff = getNeighborDiff(res.main.id, res.neighborId)

  const top6 = res.sims.slice(0,6).map(s=>({ name: s.name, score: Math.round(s.score) }))

  if (!mainSchool) {
    return (
      <div className="page">
        <Card>
          <div className="card__title">未找到结果</div>
          <div className="card__text">请先完成测试。</div>
          <Link to="/test"><Button>去测试</Button></Link>
        </Card>
      </div>
    )
  }

  const second = res.second ? getSchool(res.second.id) : null

  return (
    <div className="page">
      <div className="resulthead">
        <div>
          <div className="resulthead__title">你的伦理学派别结果</div>
          <div className="resulthead__sub">先给定义，再给叙述、人物、学习与行动方式。</div>
        </div>
        <div className="resulthead__badge">
          <Pill>主派别：{mainSchool.name}</Pill>
          {second ? <Pill>混合倾向：{second.name}</Pill> : <Pill>混合倾向：无</Pill>}
        </div>
      </div>

      <Card className="card--padded">
        <div className="section__kicker">理论谱系结果</div>
        <div className="section__title">{mainSchool.name}</div>
        <div className="section__text">{mainSchool.definition}</div>

        <div className="split2">
          <div>
            <div className="mini__title">主张什么</div>
            <ul className="list">
              {mainSchool.claims.map((x:string, i:number)=><li key={i}>{x}</li>)}
            </ul>
          </div>
          <div>
            <div className="mini__title">通常反对</div>
            <ul className="list">
              {mainSchool.opposes.map((x:string, i:number)=><li key={i}>{x}</li>)}
            </ul>
          </div>
        </div>

        <div className="mini__title">你如何做道德判断（叙述）</div>
        <div className="section__text">
          你的结果更接近这条路径，通常意味着你面对道德问题时，会优先使用这些判断动作：
          {mainSchool.methods.slice(0,3).map((m:string, i:number)=>(
            <div key={i} className="bulletline">• {m}</div>
          ))}
        </div>

        <div className="split2">
          <div>
            <div className="mini__title">代表人物与贡献</div>
            <div className="people">
              {mainSchool.figures.slice(0,3).map((p:any, i:number)=>(
                <div key={i} className="person">
                  <div className="person__name">{p.name}</div>
                  <div className="person__idea">{p.idea}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mini__title">如果想继续学习</div>
            <div className="learn">
              {mainSchool.learn.map((lv:any, i:number)=>(
                <div key={i} className="learn__block">
                  <div className="learn__level">{lv.level}</div>
                  <ul className="list">
                    {lv.items.map((it:string, j:number)=><li key={j}>{it}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mini__title">面对日常生活的态度与行动方式</div>
        <div className="dailygrid">
          {mainSchool.daily.map((d:any, i:number)=>(
            <div key={i} className="dailycard">
              <div className="dailycard__topic">{d.topic}</div>
              <div className="dailycard__text">{d.text}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid2">
        <Card className="card--padded">
          <div className="section__kicker">派别分布</div>
          <div className="section__title">你与各派别的接近程度</div>
          <BarTop items={top6} />
        </Card>

        <Card className="card--padded">
          <div className="section__kicker">判断方式图谱</div>
          <div className="section__title">你的理解路径（雷达图）</div>
          <RadarChart
            axes={AXES}
            user={res.userVec}
            ideal={(ideals as any)[res.main.id]}
            second={neighbor ? { name: neighbor.name, vec: (ideals as any)[neighbor.id] } : null}
          />
        </Card>
      </div>

      {neighbor && diff && (
        <Card className="card--padded">
          <div className="section__kicker">临近派别</div>
          <div className="section__title">你也接近：{neighbor.name}</div>
          <div className="section__text">
            下方用“主张与做法”来描述差异，而不是用维度分数。
          </div>

          <div className="split2">
            <div>
              <div className="mini__title">{diff.mainName}更常强调</div>
              <ul className="list">
                {diff.mainFocus.map((x:string, i:number)=><li key={i}>{x}</li>)}
              </ul>
            </div>
            <div>
              <div className="mini__title">{diff.neighborName}更常强调</div>
              <ul className="list">
                {diff.neighborFocus.map((x:string, i:number)=><li key={i}>{x}</li>)}
              </ul>
            </div>
          </div>

          <div className="section__text">
            想进一步区分两者：回看你在“是否可为了好结果突破底线”“个人权利与公共善冲突时怎么选”等题上的直觉。
          </div>
        </Card>
      )}

      <Card className="card--padded">
        <div className="section__kicker">现实取向补充</div>
        <div className="section__title">你在日常议题里更可能倾向于</div>
        <ul className="list">
          <li>当“原则/权利/关系/后果”发生冲突时，你更倾向先固定你最在意的那一项，再做权衡。</li>
          <li>对强烈道德化语言更敏感：你会在“具体伤害”与“道德标签”之间做区分。</li>
          <li>更愿意把争论落到可执行的边界、规则或修复方案上。</li>
        </ul>
      </Card>

      <div className="actions">
        <Link to="/test"><Button variant="ghost">再测一次</Button></Link>
        <Link to="/schools"><Button>查看派别百科</Button></Link>
      </div>
    </div>
  )
}
