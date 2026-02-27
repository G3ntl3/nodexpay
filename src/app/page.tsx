'use client'

import './page.css'
import { useEffect, useRef, useState, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  phase: number
  spd: number
  update: (W: number, H: number) => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

interface Flash {
  a: Particle
  b: Particle
  life: number
}

// ─── Waitlist Hook ─────────────────────────────────────────────────────────────
function useWaitlist() {
  const [state, setState] = useState<FormState>({ status: 'idle', message: '' })
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  const submit = useCallback(async (email: string, onSuccess?: () => void) => {
    if (!email.trim()) return
    setState({ status: 'loading', message: '' })
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setState({ status: 'success', message: "You're on the list — we'll be in touch!" })
        onSuccess?.()
      } else {
        setState({ status: 'error', message: data.error || 'Something went wrong.' })
      }
    } catch {
      setState({ status: 'error', message: 'Network error. Please try again.' })
    }
  }, [])

  const reset = useCallback(() => {
    setState({ status: 'idle', message: '' })
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
  }, [])

  return { state, submit, reset, toastTimeoutRef }
}

// ─── Success Toast Component ───────────────────────────────────────────────────
function SuccessToast({ message, visible }: {
  message: string
  visible: boolean
}) {
  return (
    <div className={`success-toast ${visible ? 'visible' : ''}`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="9" fill="#2563eb" />
        <path d="M6 10l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{message}</span>
    </div>
  )
}

// ─── Party Popper Component ────────────────────────────────────────────────────
function PartyPopper({ trigger }: { trigger: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trigger || !containerRef.current) return

    const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5']
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = `confetti-particle ${colors[Math.floor(Math.random() * colors.length)]}`
      
      const angle = (Math.random() * Math.PI * 2)
      const velocity = 4 + Math.random() * 8
      const tx = Math.cos(angle) * velocity * (60 + Math.random() * 40)
      const ty = Math.sin(angle) * velocity * (60 + Math.random() * 40) - 100
      
      particle.style.setProperty('--tx', `${tx}px`)
      particle.style.setProperty('--ty', `${ty}px`)
      particle.style.left = '0'
      particle.style.top = '0'
      
      containerRef.current.appendChild(particle)

      setTimeout(() => particle.remove(), 3000)
    }
  }, [trigger])

  return <div ref={containerRef} className="party-popper" />
}// ─── EmailForm Component ───────────────────────────────────────────────────────
function EmailForm({ source, btnLabel = 'Join the waitlist', wide = false, onSuccess }: {
  source: string
  btnLabel?: string
  wide?: boolean
  onSuccess?: () => void
}) {
  const [email, setEmail] = useState('')
  const { state, submit } = useWaitlist()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submit(email, onSuccess)
  }

  return (
    <form onSubmit={handleSubmit} className={wide ? 'input-wrap-wide' : 'input-wrap'}>
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="email-input"
        required
        aria-label="Email address"
        data-source={source}
        disabled={state.status === 'loading'}
      />
      <button
        type="submit"
        disabled={state.status === 'loading'}
        className="btn-primary"
      >
        {state.status === 'loading' ? 'Joining…' : btnLabel}
      </button>
      {state.status === 'error' && (
        <p className="form-error">{state.message}</p>
      )}
    </form>
  )
}

// ─── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
        else e.target.classList.remove('visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// ─── Theme Toggle Hook ────────────────────────────────────────────────────────
function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get theme from localStorage
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null
    const initial = saved || 'dark'
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggle = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      document.documentElement.setAttribute('data-theme', next)
      return next
    })
  }, [])

  return { theme, toggle, mounted }
}

// ─── Theme Toggle Component ────────────────────────────────────────────────────
function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme()
  
  if (!mounted) return null
  
  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  )
}

// ─── Icon Components ──────────────────────────────────────────────────────────
const IconClock = () => <img src="/error.png" alt="" />
const IconDollar = () => <img src="/high.png" alt="" />
const IconXMark = () => <img src="/block.png" alt="" />
const IconBank = () => <img src="/exchange.png" alt="" />
const IconBolt = () => <img src="/dollar.png" alt="" />
const IconLink = () => <img src="/wallet.png" alt="" />
const IconShield = () => (
  <img src="/shield.png" alt="" />

)

function useCounterAnimation(target: number, duration = 1500) {
  const [value, setValue] = useState(10)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        const t0 = performance.now()
        const start = 10
        const tick = (now: number) => {
          const prog = Math.min((now - t0) / duration, 1)
          setValue(Math.round(start + (target - start) * prog))
          if (prog < 1) requestAnimationFrame(tick)
          else setValue(target)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [target, duration, started])

  return { value, ref }
}

// ─── Typewriter Hook ───────────────────────────────────────────────────────────
function useTypewriter(text: string) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true)
        let i = 0
        const tick = () => {
          if (i <= text.length) {
            setDisplayed(text.slice(0, i))
            i++
            setTimeout(tick, 45)
          } else {
            setDone(true)
          }
        }
        tick()
      }
    }, { threshold: 0.5 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [text, started])

  return { displayed, done, ref }
}

// ─── Canvas Nodes Hook ─────────────────────────────────────────────────────────
function useNodesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = 0, H = 0
    let particles: Particle[] = []
    let flashes: Flash[] = []
    let animId: number

    const makeParticle = (): Particle => {
      const p: Particle = {
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.7,
        r: Math.random() * 2.5 + 1.5, phase: Math.random() * Math.PI * 2,
        spd: 0.025 + Math.random() * 0.04,
        update(W: number, H: number) {
          this.x += this.vx; this.y += this.vy; this.phase += this.spd
          if (this.x < 0 || this.x > W) this.vx *= -1
          if (this.y < 0 || this.y > H) this.vy *= -1
        },
        draw(ctx: CanvasRenderingContext2D) {
          const a = 0.45 + 0.55 * Math.abs(Math.sin(this.phase))
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(59,130,246,${a})`
          ctx.fill()
          const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 6)
          g.addColorStop(0, `rgba(59,130,246,${a * 0.32})`)
          g.addColorStop(1, 'rgba(59,130,246,0)')
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2)
          ctx.fillStyle = g; ctx.fill()
        }
      }
      return p
    }

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      particles = Array.from({ length: 30 }, makeParticle)
    }

    const drawBolt = (ax: number, ay: number, bx: number, by: number, life: number) => {
      const pts: [number, number][] = [[ax, ay]]
      for (let i = 1; i < 7; i++) {
        const t = i / 7
        pts.push([ax + (bx - ax) * t + (Math.random() - 0.5) * 22,
                  ay + (by - ay) * t + (Math.random() - 0.5) * 22])
      }
      pts.push([bx, by])
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1])
      pts.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
      ctx.strokeStyle = `rgba(120,220,255,${life * 0.9})`
      ctx.lineWidth = 1.4; ctx.shadowColor = 'rgba(100,200,255,0.95)'
      ctx.shadowBlur = 12; ctx.stroke(); ctx.shadowBlur = 0
    }

    const loop = () => {
      animId = requestAnimationFrame(loop)
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 95) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(37,99,235,${(1 - d / 95) * 0.38})`
            ctx.lineWidth = 0.9; ctx.stroke()
          }
        }
      }
      if (Math.random() < 0.035 && particles.length > 1) {
        const a = particles[Math.floor(Math.random() * particles.length)]
        const b = particles[Math.floor(Math.random() * particles.length)]
        if (a !== b) flashes.push({ a, b, life: 1 })
      }
      flashes = flashes.filter(f => f.life > 0)
      flashes.forEach(f => { drawBolt(f.a.x, f.a.y, f.b.x, f.b.y, f.life); f.life -= 0.07 })
      particles.forEach(p => { p.update(W, H); p.draw(ctx) })
    }

    resize()
    loop()

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return canvasRef
}

// ─── Dev Popup Hook ────────────────────────────────────────────────────────────
function useDevPopup() {
  const [open, setOpen] = useState(false)
  const [notified, setNotified] = useState(false)

  const trigger = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(true)
    setNotified(false)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  const notify = useCallback(() => {
    setNotified(true)
    setTimeout(() => setOpen(false), 1400)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return { open, trigger, close, notify, notified }
}

// ─── DevPopup Component ────────────────────────────────────────────────────────
function DevPopup({ open, onClose, onNotify, notified }: {
  open: boolean
  onClose: () => void
  onNotify: () => void
  notified: boolean
}) {
  if (!open) return null
  return (
    <div className="dev-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="dev-popup">
        <div className="dev-popup-glow" />
        <button className="dev-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="dev-icon">
          <div className="dev-icon-ring" />
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M6 10l10-6 10 6v12l-10 6-10-6V10z" stroke="url(#pg)" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M6 10l10 6m0 0l10-6m-10 6v12" stroke="url(#pg2)" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="3" fill="url(#pg3)" opacity="0.9" />
            <defs>
              <linearGradient id="pg" x1="6" y1="10" x2="26" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" /><stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="pg2" x1="6" y1="10" x2="26" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3b82f6" stopOpacity="0.5" /><stop offset="1" stopColor="#06b6d4" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="pg3" cx="50%" cy="50%" r="50%">
                <stop stopColor="#60a5fa" /><stop offset="1" stopColor="#06b6d4" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="dev-tag">
          <span className="dev-tag-dot" />
          In Development
        </div>
        <h3 className="dev-title">We&apos;re building<br />something <em>great</em></h3>
        <p className="dev-body">
          This feature isn&apos;t live just yet — our team is working hard to bring it to life.
          Join the waitlist and be the first to know when it drops.
        </p>
        <div className="dev-dots">
          <span /><span /><span />
        </div>
        <button
          className="dev-cta"
          onClick={onNotify}
          style={notified ? { background: 'linear-gradient(135deg,#059669,#10b981)', boxShadow: '0 0 24px rgba(16,185,129,0.4)' } : {}}
        >
          {notified ? '✓ You\'re on the list!' : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1a5 5 0 015 5c0 3 1 4 2 5H1c1-1 2-2 2-5a5 5 0 015-5zM6 13a2 2 0 004 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Notify me when it&apos;s ready
            </>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Main Page Component ───────────────────────────────────────────────────────
export default function Page() {
  const [showToast, setShowToast] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [partyTrigger, setPartyTrigger] = useState(false)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

  useScrollReveal()
  const canvasRef = useNodesCanvas()
  const { open: devOpen, trigger: devTrigger, close: devClose, notify: devNotify, notified } = useDevPopup()

  const typeText = 'With Nodexpay, users can move seamlessly between banks and crypto, pay bills, and manage digital assets — all in one simple app designed for real-world use.'
  const { displayed: typeDisplayed, done: typeDone, ref: typeRef } = useTypewriter(typeText)
  const { value: waitlistCount, ref: statsRef } = useCounterAnimation(1000, 1500)
  const { value: frictionVal, ref: frictionRef } = useCounterAnimation(100, 800)

  const handleFormSuccess = useCallback(() => {
    setShowToast(true)
    setShowImage(true)
    setPartyTrigger(prev => !prev)
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => setShowToast(false), 4000)
  }, [])

  // Feat card spotlight
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <a className="logo-mark" href="#">
          <img src="/logo.png" className="logo-img" alt="Nodex Pay" />
          {/* <span className="logo-text">NODEX PAY</span> */}
        </a>
        <div className="nav-right">
          <span className="waitlist-badge">
            <span className="badge-dot" />
            Waitlist is Live
          </span>
          <ThemeToggle />
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

       <div className="hero-stats reveal " ref={statsRef as React.RefObject<HTMLDivElement>}>
          <div className="stat-item">
            <div className="stat-num">{waitlistCount.toLocaleString()}+</div>
            <div className="stat-label">Waitlist Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-num" ref={frictionRef as React.RefObject<HTMLDivElement>}>{frictionVal}%</div>
            <div className="stat-label">Zero Friction</div>
          </div>
        </div>

        <h1 className="hero-h1 reveal d1 lg:text-5xl text-3xl">
          Finance without borders.<br />
          <em>Crypto that works</em> <br /> in real life.
        </h1>
        <p className="hero-desc reveal d2">
          Nodexpay is an African first multi-chain crypto utility app — buy, send, and spend
          crypto directly from your bank. No exchanges. No friction.
        </p>

        <div className="reveal d3">
          <EmailForm source="Hero Waitlist" onSuccess={handleFormSuccess} />
        </div>
 
        <div className="social-proof reveal d4">
          <div className="avatars">
            {/* <span className="avatar av1">JK</span>
            <span className="avatar av2">AM</span>
            <span className="avatar av3">TF</span> */}
            { <img src="/join.png" alt="" />}
          </div>

          Join 1000 others already on the waitlist
        </div>

        
      
</section>
      {/* PROBLEM */}
      <section className="problem">
        <p className="section-label reveal">The Problem</p>
        <h2 className="section-title reveal">Crypto access in Africa is broken.</h2>
        <p className="section-sub reveal">Existing platforms make it painful to buy, swap, and use crypto in everyday life.</p>

        <div className="problem-cards">
          {[
            { icon: IconClock, title: 'Hard to buy crypto without exchanges', desc: 'Most platforms rely on exchanges and unreliable P2P systems that slow you down.' },
            { icon: IconDollar, title: 'High fees & friction', desc: 'Multiple steps, swaps, and delays make simple transactions stressful and expensive.' },
            { icon: IconXMark, title: 'No real-world utility', desc: 'Crypto is hard to spend on everyday needs. It stays locked in wallets, unused.' },
          ].map((c, i) => (
            <div key={i} className={`problem-card reveal d${i + 1}`}>
              <div className="card-icon"><c.icon /></div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="problem-cta-text reveal">
          <strong>Nodexpay turns crypto into everyday spending power.</strong>
          <p
            ref={typeRef}
            className={`typewriter${typeDone ? ' done' : ''}`}
          >
            {typeDisplayed}
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <p className="section-label reveal">Features</p>
        <h2 className="section-title reveal">Everything you need in one powerful app</h2>

        <div className="features-arena">
          {/* Orbit */}
          <div className="orbit-system">
            <div className="orbit-ring r1"><div className="orbit-dot od-blue" /></div>
            <div className="orbit-ring r2"><div className="orbit-dot od-cyan" /></div>
            <div className="orbit-ring r3"><div className="orbit-dot od-white" /></div>
            <div className="orbit-center">
              <img src="/logo.png" alt="Nodex Pay" className="orbit-logo" />
            </div>
          </div>

          {[
            { pos: 'fc-tl', icon: IconBank, title: 'Bank to Crypto Instantly', desc: 'Buy and sell crypto directly from your bank without complicated exchanges.' },
            { pos: 'fc-tr', icon: IconBolt, title: 'Pay Bills with Crypto', desc: 'Airtime, data, subscriptions, and utilities — all in one place.' },
            { pos: 'fc-bl', icon: IconLink, title: 'Multi-chain Wallet', desc: 'Manage assets across networks with a unified wallet experience.' },
            { pos: 'fc-br', icon: IconShield, title: 'Secure Identity Integration', desc: 'Built-in compliance and decentralized identity for safe transactions.' },
          ].map((f, i) => (
            <div key={i} className={`feat-card ${f.pos} reveal d${i + 1}`} onMouseMove={onMouseMove}>
              <div className="feat-icon-wrap"><f.icon /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GET STARTED */}
    

      {/* CANVAS NODES SECTION */}
      <section className="nodes-section">
        <div className="nodes-wrapper">
          <div className="nodes-left reveal-left">
            <h2>Built for the<br />real world</h2>
            <canvas ref={canvasRef} className="nodes-canvas" />
          </div>
          <div className="nodes-right">
            {[
              { num: '01', title: 'Create your account', desc: 'Sign up and verify your identity securely in minutes.' },
              { num: '02', title: 'Connect your bank', desc: 'Link your bank for seamless, instant transactions.' },
              { num: '03', title: 'Buy or receive crypto', desc: 'Move funds instantly across multiple chains.' },
              { num: '04', title: 'Spend anywhere', desc: 'Pay bills and use crypto as real-world cash.' },
            ].map((s, i) => (
              <div key={i} className={`step-item reveal d${i + 1}`}>
                <div className="step-num">{s.num}</div>
                {i < 3 && <div className="step-line" />}
                <div className="step-content">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          {/* CTA Band */}
          <div className="footer-cta-band reveal">
            <div className="footer-cta-glow" />
            <h2>Ready to bank without borders?</h2>
            <p>Join thousands across Africa waiting for a smarter way to use crypto.</p>
            <EmailForm source="Footer Early Access" btnLabel="Get Early Access" wide onSuccess={handleFormSuccess} />
          </div>

          {/* Footer top */}
          <div className="footer-top">
            <div className="footer-brand">
              <a className="logo-mark" href="#">
                <img src="/logo.png" className="logo-img" alt="Nodex Pay" />
                <span className="logo-text">NODEX PAY</span>
              </a>
              <p className="footer-brand-desc lg:text-2xl">
                Africa&apos;s first multi-chain crypto utility app. Finance without borders, crypto that works in real life.
              </p>
              <span className="footer-chip">Coming Soon</span>
            </div>

            {[
              { heading: 'Product', links: ['Features', 'Roadmap', 'Pricing', 'Changelog'] },
              { heading: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { heading: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Compliance'] },
            ].map(col => (
              <div key={col.heading} className="footer-col">
                <h5>{col.heading}</h5>
                {col.links.map(l => (
                  <a key={l} href="#" onClick={devTrigger}>{l}</a>
                ))}
              </div>
            ))}
          </div>

          <div className="footer-bottom">
            <p>© 2026 Nodex Pay. Built for Africa. 🌍</p>
            <div className="social-links">
              {['𝕏', '✈', 'in', '◎'].map((s, i) => (
                <a key={i} href="#" onClick={devTrigger}>{s}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* DEV POPUP */}
      <DevPopup open={devOpen} onClose={devClose} onNotify={devNotify} notified={notified} />

      {/* SUCCESS TOAST & PARTY POPPER */}
      <SuccessToast message="Welcome to the waitlist! 🎉" visible={showToast} />
      <PartyPopper trigger={partyTrigger} />
    </>
  )
}