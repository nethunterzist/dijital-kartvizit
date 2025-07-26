import React from 'react'
import { render, screen } from '@testing-library/react'
import ErrorBoundary from '@/app/components/ErrorBoundary'

// Mock console.error to avoid noise in test output
const originalError = console.error
beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  console.error = originalError
})

// Test component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error')
  }
  return <div>No error</div>
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    )

    expect(screen.getByText('Test content')).toBeDefined()
  })

  it('should render error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(screen.getByRole('heading', { name: /bir hata oluştu/i })).toBeDefined()
    expect(screen.getByText(/beklenmeyen bir hata oluştu/i)).toBeDefined()
  })

  it('should have retry button', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    const retryButton = screen.getByRole('button', { name: /tekrar dene/i })
    expect(retryButton).toBeDefined()
  })

  it('should log error to console', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    expect(console.error).toHaveBeenCalled()
  })

  it('should handle different types of errors', () => {
    const NetworkError = () => {
      throw new Error('Network request failed')
    }

    render(
      <ErrorBoundary>
        <NetworkError />
      </ErrorBoundary>
    )

    expect(screen.getByText(/bir hata oluştu/i)).toBeDefined()
  })

  it('should render error details in development', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    )

    // Should show error details
    expect(screen.getByText(/hata detayları/i)).toBeDefined()
  })

  it('should handle async components', () => {
    const AsyncComponent = () => {
      React.useEffect(() => {
        // Simulate async operation
      }, [])
      return <div>Async component</div>
    }

    render(
      <ErrorBoundary>
        <AsyncComponent />
      </ErrorBoundary>
    )

    expect(screen.getByText('Async component')).toBeDefined()
  })
})
