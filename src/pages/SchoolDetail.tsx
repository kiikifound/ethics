import React from 'react'
import { useParams, Link } from 'react-router-dom'
import encyclopedia from '../data/encyclopedia.json'
import { Card, Button, Pill } from '../components/UI'

export default function SchoolDetail() {
  const { id } = useParams()
  const s = (encyclopedia as any[]).find(x=>x.id===id)

  if (!s) {
    return (
      <div className="page">
        <Card className="card--padded">
          <div className="section__title">未找到派别</div>
          <Link to="/schools"><Button>返回百科</Button></Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="crumbs">
        <Link to="/schools" className="crumbs__link">派别百科</Link>
        <span className="crumbs__sep">/</span>
        <span>{s.name}</span>
      </div>

      <Card className="card--padded">
        <div className="section__title">{s.name}</div>
        <div className="section__text">{s.definition}</div>
        <div className="pillrow">
          <Pill>{s.tagline}</Pill>
        </div>

        <div className="split2">
          <div>
            <div className="mini__title">核心主张</div>
            <ul className="list">{s.core_claims.map((x:string,i:number)=><li key={i}>{x}</li>)}</ul>
          </div>
          <div>
            <div className="mini__title">主要反对</div>
            <ul className="list">{s.core_opposes.map((x:string,i:number)=><li key={i}>{x}</li>)}</ul>
          </div>
        </div>

        <div className="mini__title">常用判断方法</div>
        <ul className="list">{s.typical_methods.map((x:string,i:number)=><li key={i}>{x}</li>)}</ul>

        <div className="mini__title">常见日常态度</div>
        <ul className="list">{s.daily_attitude.map((x:string,i:number)=><li key={i}>{x}</li>)}</ul>

        <div className="mini__title">继续学习路径</div>
        <div className="learn">
          {s.learn_path.map((lv:any, i:number)=>(
            <div key={i} className="learn__block">
              <div className="learn__level">{lv.level}</div>
              <ul className="list">
                {lv.items.map((it:string, j:number)=><li key={j}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="mini__title">代表人物与贡献</div>
        <div className="people">
          {s.figures.map((p:any, i:number)=>(
            <div key={i} className="person">
              <div className="person__name">{p.name}</div>
              <div className="person__idea">{p.idea}</div>
            </div>
          ))}
        </div>

        <div className="mini__title">临近派别</div>
        <div className="pillrow">
          {(s.neighbor_ids || []).map((nid:string)=>(
            <Link key={nid} to={`/schools/${nid}`} className="nolink">
              <Pill>{nid}</Pill>
            </Link>
          ))}
        </div>
      </Card>

      <div className="actions">
        <Link to="/test"><Button>去做测试</Button></Link>
        <Link to="/schools"><Button variant="ghost">返回百科</Button></Link>
      </div>
    </div>
  )
}
