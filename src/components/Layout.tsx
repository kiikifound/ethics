import React from 'react'

export function Container({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>
}

export function Nav({ children }: { children: React.ReactNode }) {
  return <div className="nav">{children}</div>
}
