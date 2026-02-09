import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export function RadarChart({ axes, user, ideal, second }: {
  axes: string[]
  user: number[]
  ideal: number[]
  second?: { name: string, vec: number[] } | null
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const chart = echarts.init(ref.current)
    const indicator = axes.map(a => ({ name: a, max: 100 }))
    const seriesData:any[] = [
      { value: user, name: '你', areaStyle: { opacity: 0.08 }, lineStyle: { width: 2 } },
      { value: ideal, name: '核心派别', lineStyle: { type: 'dashed', width: 2 }, areaStyle: { opacity: 0 } },
    ]
    if (second) {
      seriesData.push({ value: second.vec, name: `临近：${second.name}`, lineStyle: { type: 'dotted', width: 2 }, areaStyle: { opacity: 0 } })
    }

    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      radar: {
        indicator,
        splitNumber: 4,
        axisName: { color: '#334155', fontSize: 12 },
        splitLine: { lineStyle: { color: '#e2e8f0' } },
        splitArea: { areaStyle: { color: ['#ffffff', '#fbfdff'] } },
        axisLine: { lineStyle: { color: '#e2e8f0' } },
      },
      series: [
        {
          type: 'radar',
          data: seriesData,
          symbol: 'circle',
          symbolSize: 5,
        },
      ],
      color: ['#0ea5e9', '#6366f1', '#14b8a6'],
    } as any)

    const onResize = () => chart.resize()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      chart.dispose()
    }
  }, [axes.join('|'), user.join(','), ideal.join(','), second?.name])

  return <div ref={ref} style={{ width: '100%', height: 360 }} />
}

export function BarTop({ items }: { items: { name: string, score: number }[] }) {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!ref.current) return
    const chart = echarts.init(ref.current)
    chart.setOption({
      grid: { left: 0, right: 12, top: 10, bottom: 0, containLabel: true },
      xAxis: { type: 'value', max: 100, axisLabel: { color: '#64748b' }, splitLine: { lineStyle: { color: '#eef2f7' } } },
      yAxis: { type: 'category', data: items.map(i=>i.name), axisLabel: { color: '#334155' }, axisTick: { show: false } },
      series: [{
        type: 'bar',
        data: items.map(i=>i.score),
        barWidth: 14,
        itemStyle: { borderRadius: 8 },
      }],
      tooltip: { trigger: 'axis' },
      color: ['#6366f1'],
    } as any)
    const onResize = () => chart.resize()
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); chart.dispose() }
  }, [JSON.stringify(items)])

  return <div ref={ref} style={{ width: '100%', height: 240 }} />
}
