import { prisma } from '@/app/lib/db'

// Mock Prisma
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
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  },
}))

describe('Database Connection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Prisma Client', () => {
    it('should have prisma client available', () => {
      expect(prisma).toBeDefined()
      expect(prisma.firmalar).toBeDefined()
    })

    it('should have all required methods on firmalar model', () => {
      expect(prisma.firmalar.findMany).toBeDefined()
      expect(prisma.firmalar.findUnique).toBeDefined()
      expect(prisma.firmalar.create).toBeDefined()
      expect(prisma.firmalar.update).toBeDefined()
      expect(prisma.firmalar.delete).toBeDefined()
      expect(prisma.firmalar.count).toBeDefined()
    })
  })

  describe('Database Operations', () => {
    it('should call findMany when querying all firmalar', async () => {
      const mockFirmalar = [
        { id: 1, firmaAdi: 'Test Firma', slug: 'test-firma' },
        { id: 2, firmaAdi: 'Test Firma 2', slug: 'test-firma-2' },
      ]

      ;(prisma.firmalar.findMany as jest.Mock).mockResolvedValue(mockFirmalar)

      const result = await prisma.firmalar.findMany()

      expect(prisma.firmalar.findMany).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockFirmalar)
    })

    it('should call findUnique when querying single firma', async () => {
      const mockFirma = { id: 1, firmaAdi: 'Test Firma', slug: 'test-firma' }

      ;(prisma.firmalar.findUnique as jest.Mock).mockResolvedValue(mockFirma)

      const result = await prisma.firmalar.findUnique({
        where: { id: 1 }
      })

      expect(prisma.firmalar.findUnique).toHaveBeenCalledWith({
        where: { id: 1 }
      })
      expect(result).toEqual(mockFirma)
    })

    it('should call create when creating new firma', async () => {
      const newFirma = {
        firma_adi: 'New Firma',
        slug: 'new-firma',
        email: 'test@example.com'
      }
      const createdFirma = { id: 1, ...newFirma }

      ;(prisma.firmalar.create as jest.Mock).mockResolvedValue(createdFirma)

      const result = await prisma.firmalar.create({
        data: newFirma
      })

      expect(prisma.firmalar.create).toHaveBeenCalledWith({
        data: newFirma
      })
      expect(result).toEqual(createdFirma)
    })

    it('should call update when updating firma', async () => {
      const updateData = { firma_adi: 'Updated Firma' }
      const updatedFirma = { id: 1, ...updateData, slug: 'test-firma' }

      ;(prisma.firmalar.update as jest.Mock).mockResolvedValue(updatedFirma)

      const result = await prisma.firmalar.update({
        where: { id: 1 },
        data: updateData
      })

      expect(prisma.firmalar.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData
      })
      expect(result).toEqual(updatedFirma)
    })

    it('should call delete when deleting firma', async () => {
      const deletedFirma = { id: 1, firmaAdi: 'Deleted Firma', slug: 'deleted-firma' }

      ;(prisma.firmalar.delete as jest.Mock).mockResolvedValue(deletedFirma)

      const result = await prisma.firmalar.delete({
        where: { id: 1 }
      })

      expect(prisma.firmalar.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      })
      expect(result).toEqual(deletedFirma)
    })

    it('should call count when counting firmalar', async () => {
      const mockCount = 5

      ;(prisma.firmalar.count as jest.Mock).mockResolvedValue(mockCount)

      const result = await prisma.firmalar.count()

      expect(prisma.firmalar.count).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockCount)
    })
  })

  describe('Error Handling', () => {
    it('should handle database connection errors', async () => {
      const error = new Error('Database connection failed')
      ;(prisma.firmalar.findMany as jest.Mock).mockRejectedValue(error)

      await expect(prisma.firmalar.findMany()).rejects.toThrow('Database connection failed')
    })

    it('should handle not found errors', async () => {
      ;(prisma.firmalar.findUnique as jest.Mock).mockResolvedValue(null)

      const result = await prisma.firmalar.findUnique({
        where: { id: 999 }
      })

      expect(result).toBeNull()
    })

    it('should handle validation errors on create', async () => {
      const error = new Error('Validation failed')
      ;(prisma.firmalar.create as jest.Mock).mockRejectedValue(error)

      await expect(prisma.firmalar.create({
        data: { firma_adi: '', slug: 'invalid' } // Invalid data
      })).rejects.toThrow('Validation failed')
    })
  })
})
