import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Stepper, Pill } from '../components/UI'

export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <div className="hero__title">伦理学派别测试</div>
        <div className="hero__subtitle">
          通过日常判断题，呈现你更常用的道德判断路径，并映射到常见伦理学谱系。
        </div>
        <div className="hero__cta">
          <Link to="/test"><Button>开始测试</Button></Link>
          <Link to="/schools"><Button variant="ghost">先看派别百科</Button></Link>
        </div>
        <div className="hero__meta">
          <Pill>24 题</Pill>
          <Pill>约 5–7 分钟</Pill>
          <Pill>支持混合型结果</Pill>
        </div>
      </div>

      <Stepper step={1} />

      <div className="grid3">
        <Card>
          <div className="card__kicker">STEP 1</div>
          <div className="card__title">完成测试</div>
          <div className="card__text">按直觉选择更接近的一侧，不需要懂伦理学术语。</div>
        </Card>
        <Card>
          <div className="card__kicker">STEP 2</div>
          <div className="card__title">查看详细结果</div>
          <div className="card__text">先给定义与代表人物，再给你的判断方式图谱。</div>
        </Card>
        <Card>
          <div className="card__kicker">STEP 3</div>
          <div className="card__title">继续探索</div>
          <div className="card__text">查看临近派别差异、学习路径与日常行动方式。</div>
        </Card>
      </div>
    </div>
  )
}
