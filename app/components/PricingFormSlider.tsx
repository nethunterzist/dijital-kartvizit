'use client';

import React, { useState, useEffect } from 'react';
import { packageInquiryFormSchema } from '@/app/lib/validations/package-inquiry.schema';
import { ZodError } from 'zod';

interface Package {
  id: number;
  package_key: string;
  name: string;
  description: string;
  price: number;
  card_count: number;
  color: string;
  popular: boolean;
  features: string[];
  active: boolean;
  sira: number;
  created_at: string;
}

interface PricingFormSliderProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: Package | null;
}

interface FormData {
  name: string;
  surname: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name?: string;
  surname?: string;
  phone?: string;
  email?: string;
}

export default function PricingFormSlider({
  isOpen,
  onClose,
  selectedPackage,
}: PricingFormSliderProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', surname: '', phone: '', email: '' });
      setErrors({});
      setShowSuccess(false);
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when slider is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedForm = packageInquiryFormSchema.parse(formData);

      if (!selectedPackage) {
        throw new Error('Paket seçimi yapılmadı');
      }

      // Prepare full request data
      const requestData = {
        ...validatedForm,
        packageKey: selectedPackage.package_key,
        packageName: selectedPackage.name,
        packagePrice: selectedPackage.price,
        packageFeatures: selectedPackage.features,
      };

      // Submit to API
      const response = await fetch('/api/package-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        // Handle API errors
        if (result.errors && Array.isArray(result.errors)) {
          const fieldErrors: FormErrors = {};
          result.errors.forEach((error: { field: string; message: string }) => {
            fieldErrors[error.field as keyof FormErrors] = error.message;
          });
          setErrors(fieldErrors);
        } else {
          throw new Error(result.message || 'Bir hata oluştu');
        }
        return;
      }

      // Show success message
      setShowSuccess(true);

      // Auto-close after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);

      if (error instanceof ZodError) {
        // Handle Zod validation errors
        const fieldErrors: FormErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof FormErrors;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Generic error
        alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedPackage) return null;

  return (
    <>
      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slider Container */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[400px] z-50 transition-all duration-500 ${
          isOpen ? 'translate-x-0 scale-100' : 'translate-x-full scale-95'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="slider-title"
      >
        <div className="h-full w-full bg-white overflow-y-auto shadow-2xl border-l border-gray-200">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
            <h2 id="slider-title" className="text-2xl font-bold text-gray-900">
              Paket Talebi
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label="Formu kapat"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="max-w-2xl mx-auto px-6 py-8">
            {showSuccess ? (
              /* Success Message */
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    className="text-green-600"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  Teşekkürler!
                </h3>
                <p className="text-green-700 text-lg">
                  Talebinizi aldık. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                </p>
                <div className="mt-6 text-sm text-green-600">
                  Bu pencere 3 saniye içinde otomatik olarak kapanacaktır...
                </div>
              </div>
            ) : (
              <>
                {/* Package Info */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-8 border border-blue-200">
                  <h3 className="text-sm uppercase tracking-wide text-blue-600 font-semibold mb-2">
                    Seçtiğiniz Paket
                  </h3>
                  <div className="flex items-baseline justify-between mb-4">
                    <h4 className="text-2xl font-bold text-gray-900">{selectedPackage.name}</h4>
                    <p className="text-3xl font-bold text-blue-600">
                      {selectedPackage.price} <span className="text-lg">TL</span>
                    </p>
                  </div>
                  <p className="text-gray-700 mb-4">{selectedPackage.description}</p>
                  <ul className="space-y-2">
                    {selectedPackage.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-700">
                        <svg
                          className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.name
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Adınızı giriniz"
                      required
                      autoFocus
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-2">
                      Soyad <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.surname
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Soyadınızı giriniz"
                      required
                    />
                    {errors.surname && <p className="mt-1 text-sm text-red-600">{errors.surname}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.phone
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="05XX XXX XX XX"
                      required
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    <p className="mt-1 text-xs text-gray-500">
                      Örnek: 05XX XXX XX XX veya +90 5XX XXX XX XX
                    </p>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta <span className="text-gray-400 text-xs">(İsteğe bağlı)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="ornek@email.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    <p className="mt-1 text-xs text-gray-500">
                      E-posta adresinizi girerek onay mesajı alabilirsiniz
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Gönderiliyor...
                      </span>
                    ) : (
                      'Gönder'
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    Formunu göndererek, ekibimizin sizinle iletişime geçmesine izin vermiş olursunuz.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
