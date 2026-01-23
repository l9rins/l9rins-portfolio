import { render, screen } from '@testing-library/react'
import { WhatIBuild } from '@/components/WhatIBuild'

describe('WhatIBuild', () => {
  it('renders the section title', () => {
    render(<WhatIBuild />)
    expect(screen.getByText('What I Build')).toBeInTheDocument()
  })

  it('renders all philosophy cards', () => {
    render(<WhatIBuild />)
    expect(screen.getByText('Performance First')).toBeInTheDocument()
    expect(screen.getByText('Pixel Perfect')).toBeInTheDocument()
    expect(screen.getByText('User Obsessed')).toBeInTheDocument()
  })
})