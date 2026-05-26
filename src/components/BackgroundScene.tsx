import React, { useMemo, useEffect, useRef, useCallback } from 'react'
import type { CSSProperties } from 'react'

export interface BackgroundSceneProps {
  /** Number of animated light beams */
  beamCount?: number
}

const BACKGROUND_BEAM_COUNT = 60

const BackgroundScene: React.FC<BackgroundSceneProps> = ({
  beamCount = BACKGROUND_BEAM_COUNT,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current
    const scene = sceneRef.current
    if (!canvas || !scene) return
    const dpr = window.devicePixelRatio || 1
    const W = scene.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, W, H)
    const vx = W / 2
    const vy = 0
    const baseY = H
    const colSpacing = 80
    const colCount = Math.ceil(W / colSpacing) + 4
    for (let i = -colCount; i <= colCount; i++) {
      const bx = vx + i * colSpacing
      const g = ctx.createLinearGradient(bx, baseY, vx, vy)
      g.addColorStop(0, 'rgba(129,215,19,0.55)')
      g.addColorStop(0.5, 'rgba(129,215,19,0.18)')
      g.addColorStop(1, 'rgba(129,215,19,0)')
      ctx.beginPath()
      ctx.moveTo(bx, baseY)
      ctx.lineTo(vx, vy)
      ctx.strokeStyle = g
      ctx.lineWidth = 1
      ctx.stroke()
    }
    const rowCount = 14
    for (let i = 1; i <= rowCount; i++) {
      const t = Math.pow(i / rowCount, 1.8)
      const y = baseY - (baseY - vy) * t
      const scale = (y - vy) / (baseY - vy)
      const halfW = W * 1.4 * scale
      const alpha = Math.min(scale * 0.55, 0.45)
      ctx.beginPath()
      ctx.moveTo(vx - halfW, y)
      ctx.lineTo(vx + halfW, y)
      ctx.strokeStyle = `rgba(129,215,19,${alpha.toFixed(3)})`
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }, [])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(drawGrid)
    })
    ro.observe(scene)
    return () => ro.disconnect()
  }, [drawGrid])

  const beams = useMemo(() =>
    Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 2 + 4
      const fadeDur = riseDur
      const dropDur = Math.random() * 3 + 3
      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 3) + 1}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s, ${dropDur}s`,
        } as CSSProperties,
      }
    }),
  [beamCount])

  return (
    <div className="scene" ref={sceneRef} role="img" aria-label="Animated digital data background">
      <canvas className="floor" ref={canvasRef} />
      <div className="main-column" />
      <div className="light-stream-container">
        {beams.map((beam) => (
          <div key={beam.id} className="light-beam" style={beam.style} />
        ))}
      </div>
    </div>
  )
}

export default BackgroundScene
