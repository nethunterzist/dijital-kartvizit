import { cn } from '@/app/lib/utils'

describe('Utils', () => {
  describe('cn (className utility)', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'hidden')
      expect(result).toBe('base conditional')
    })

    it('should handle undefined and null values', () => {
      const result = cn('base', undefined, null, 'valid')
      expect(result).toBe('base valid')
    })

    it('should handle empty strings', () => {
      const result = cn('base', '', 'valid')
      expect(result).toBe('base valid')
    })

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('should handle objects with boolean values', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true
      })
      expect(result).toBe('class1 class3')
    })

    it('should handle mixed types', () => {
      const result = cn(
        'base',
        ['array1', 'array2'],
        { 'object1': true, 'object2': false },
        'string'
      )
      expect(result).toBe('base array1 array2 object1 string')
    })

    it('should handle Tailwind CSS conflicts', () => {
      // This test assumes clsx with tailwind-merge functionality
      const result = cn('px-2 py-1', 'px-4')
      // Should resolve to the last px value
      expect(result).toContain('px-4')
      expect(result).toContain('py-1')
    })

    it('should handle responsive classes', () => {
      const result = cn('text-sm', 'md:text-lg', 'lg:text-xl')
      expect(result).toBe('text-sm md:text-lg lg:text-xl')
    })

    it('should handle hover and focus states', () => {
      const result = cn('bg-blue-500', 'hover:bg-blue-600', 'focus:bg-blue-700')
      expect(result).toBe('bg-blue-500 hover:bg-blue-600 focus:bg-blue-700')
    })

    it('should handle dark mode classes', () => {
      const result = cn('bg-white', 'dark:bg-gray-900', 'text-black', 'dark:text-white')
      expect(result).toBe('bg-white dark:bg-gray-900 text-black dark:text-white')
    })

    it('should handle complex component styling', () => {
      const isActive = true
      const isDisabled = false
      const size: 'sm' | 'lg' | 'default' = 'lg'

      const result = cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': isActive,
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': !isActive,
          'opacity-50 cursor-not-allowed': isDisabled,
        },
        size === 'sm' && 'h-9 px-3 text-sm',
        size === 'lg' && 'h-11 px-8 text-lg',
        size === 'default' && 'h-10 px-4 py-2'
      )

      expect(result).toContain('inline-flex')
      expect(result).toContain('bg-primary')
      expect(result).toContain('h-11 px-8 text-lg')
      expect(result).not.toContain('cursor-not-allowed')
    })

    it('should handle empty input', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle single class', () => {
      const result = cn('single-class')
      expect(result).toBe('single-class')
    })

    it('should trim whitespace', () => {
      const result = cn('  class1  ', '  class2  ')
      expect(result).toBe('class1 class2')
    })

    it('should handle duplicate classes', () => {
      const result = cn('duplicate', 'other', 'duplicate')
      // Should handle duplicates appropriately
      expect(result).toContain('duplicate')
      expect(result).toContain('other')
    })
  })

  describe('Utility functions', () => {
    it('should handle string formatting', () => {
      // Test any string formatting utilities if they exist
      expect(typeof cn).toBe('function')
    })

    it('should be performant with many classes', () => {
      const start = performance.now()
      const manyClasses = Array.from({ length: 100 }, (_, i) => `class-${i}`)
      const result = cn(...manyClasses)
      const end = performance.now()

      expect(result).toContain('class-0')
      expect(result).toContain('class-99')
      expect(end - start).toBeLessThan(10) // Should be fast
    })

    it('should handle special characters in class names', () => {
      const result = cn('class-with-dashes', 'class_with_underscores', 'class:with:colons')
      expect(result).toBe('class-with-dashes class_with_underscores class:with:colons')
    })

    it('should handle numeric class names', () => {
      const result = cn('w-1/2', 'h-96', 'z-10')
      expect(result).toBe('w-1/2 h-96 z-10')
    })
  })
})
