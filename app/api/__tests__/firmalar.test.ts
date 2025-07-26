import { NextRequest } from 'next/server'
import { GET, POST, PUT, DELETE } from '@/app/api/firmalar/route'

// Mock dependencies
jest.mock('@/app/lib/db', () => ({
  prisma: {
    firmalar: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  },
}))

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(),
}))

import { prisma } from '@/app/lib/db'
import { getServerSession } from 'next-auth/next'

// Mock NextRequest properly
const createMockRequest = (url: string, options: any = {}) => {
  const mockRequest = {
    url,
    method: options.method || 'GET',
    headers: new Map(Object.entries(options.headers || {})),
    json: jest.fn().mockResolvedValue(options.body ? JSON.parse(options.body) : {}),
    text: jest.fn().mockResolvedValue(options.body || ''),
    nextUrl: new URL(url),
  }
  return mockRequest as any
}

describe('/api/firmalar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/firmalar', () => {
    it('should return all firmalar successfully', async () => {
      const mockFirmalar = [
        {
          id: 1,
          firma_adi: 'Test Firma 1',
          slug: 'test-firma-1',
          email: 'test1@example.com',
          created_at: new Date(),
        },
        {
          id: 2,
          firma_adi: 'Test Firma 2',
          slug: 'test-firma-2',
          email: 'test2@example.com',
          created_at: new Date(),
        },
      ]

      ;(prisma.firmalar.findMany as jest.Mock).mockResolvedValue(mockFirmalar)

      const request = createMockRequest('http://localhost:3000/api/firmalar')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockFirmalar)
      expect(prisma.firmalar.findMany).toHaveBeenCalledTimes(1)
    })

    it('should handle database errors', async () => {
      const error = new Error('Database connection failed')
      ;(prisma.firmalar.findMany as jest.Mock).mockRejectedValue(error)

      const request = createMockRequest('http://localhost:3000/api/firmalar')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Internal server error')
    })

    it('should handle search queries', async () => {
      const mockFirmalar = [
        {
          id: 1,
          firma_adi: 'Test Firma',
          slug: 'test-firma',
          email: 'test@example.com',
          created_at: new Date(),
        },
      ]

      ;(prisma.firmalar.findMany as jest.Mock).mockResolvedValue(mockFirmalar)

      const request = createMockRequest('http://localhost:3000/api/firmalar?search=test')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(prisma.firmalar.findMany).toHaveBeenCalled()
    })
  })

  describe('POST /api/firmalar', () => {
    it('should require authentication', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue(null)

      const request = createMockRequest('http://localhost:3000/api/firmalar', {
        method: 'POST',
        body: JSON.stringify({
          firma_adi: 'Test Firma',
          slug: 'test-firma',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Unauthorized')
    })

    it('should create new firma when authenticated', async () => {
      const newFirma = {
        firma_adi: 'New Firma',
        slug: 'new-firma',
        email: 'new@example.com',
      }

      const createdFirma = {
        id: 1,
        ...newFirma,
        created_at: new Date(),
      }

      ;(getServerSession as jest.Mock).mockResolvedValue({ user: { id: 1 } })
      ;(prisma.firmalar.create as jest.Mock).mockResolvedValue(createdFirma)

      const request = createMockRequest('http://localhost:3000/api/firmalar', {
        method: 'POST',
        body: JSON.stringify(newFirma),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(createdFirma)
    })
  })

  describe('PUT /api/firmalar', () => {
    it('should require authentication for updates', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue(null)

      const request = createMockRequest('http://localhost:3000/api/firmalar', {
        method: 'PUT',
        body: JSON.stringify({ id: 1, firma_adi: 'Updated' }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Unauthorized')
    })

    it('should update firma when authenticated', async () => {
      const updateData = {
        id: 1,
        firma_adi: 'Updated Firma',
      }

      const updatedFirma = {
        id: 1,
        firma_adi: 'Updated Firma',
        slug: 'test-firma',
        email: 'test@example.com',
        created_at: new Date(),
      }

      ;(getServerSession as jest.Mock).mockResolvedValue({ user: { id: 1 } })
      ;(prisma.firmalar.update as jest.Mock).mockResolvedValue(updatedFirma)

      const request = createMockRequest('http://localhost:3000/api/firmalar', {
        method: 'PUT',
        body: JSON.stringify(updateData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(updatedFirma)
    })
  })

  describe('DELETE /api/firmalar', () => {
    it('should require authentication for deletion', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue(null)

      const request = createMockRequest('http://localhost:3000/api/firmalar?id=1', {
        method: 'DELETE',
      })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Unauthorized')
    })

    it('should delete firma when authenticated', async () => {
      const deletedFirma = {
        id: 1,
        firma_adi: 'Deleted Firma',
        slug: 'deleted-firma',
        email: 'deleted@example.com',
        created_at: new Date(),
      }

      ;(getServerSession as jest.Mock).mockResolvedValue({ user: { id: 1 } })
      ;(prisma.firmalar.delete as jest.Mock).mockResolvedValue(deletedFirma)

      const request = createMockRequest('http://localhost:3000/api/firmalar?id=1', {
        method: 'DELETE',
      })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe('Firma deleted successfully')
    })

    it('should require id parameter', async () => {
      ;(getServerSession as jest.Mock).mockResolvedValue({ user: { id: 1 } })

      const request = createMockRequest('http://localhost:3000/api/firmalar', {
        method: 'DELETE',
      })

      const response = await DELETE(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('ID is required')
    })
  })
})
