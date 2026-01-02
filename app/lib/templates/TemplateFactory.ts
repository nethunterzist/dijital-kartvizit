/**
 * Template Factory Pattern
 *
 * This factory provides a centralized, type-safe way to create template instances.
 * Benefits:
 * - Single Responsibility: One place for template creation logic
 * - Open/Closed Principle: Easy to add new templates without modifying existing code
 * - Type Safety: Full TypeScript support with compile-time checks
 * - Maintainability: Reduces code duplication across the codebase
 */

import { goldTemplate } from './template1-gold';
import { wavesTemplate } from './template2-waves';
import { goldenEdgeTemplate } from './template3-golden-edge';
import { redFlowTemplate } from './template4-red-flow';
import { luxuryBlackTemplate } from './template5-luxury-black';
import { lineMeshTemplate } from './template6-line-mesh';
import { colorRingsTemplate } from './template7-color-rings';
import { goldenBlocksTemplate } from './template8-golden-blocks';
import { crystalStripesTemplate } from './template9-crystal-stripes';

/**
 * Template identifier type - ensures only valid template IDs are used
 */
export type TemplateId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Template registry mapping IDs to template strings
 */
const TEMPLATE_REGISTRY: Record<TemplateId, string> = {
  1: goldTemplate,
  2: wavesTemplate,
  3: goldenEdgeTemplate,
  4: redFlowTemplate,
  5: luxuryBlackTemplate,
  6: lineMeshTemplate,
  7: colorRingsTemplate,
  8: goldenBlocksTemplate,
  9: crystalStripesTemplate,
} as const;

/**
 * Default template ID
 */
const DEFAULT_TEMPLATE_ID: TemplateId = 1;

/**
 * Template Factory Class
 *
 * Provides methods to create and manage templates
 */
export class TemplateFactory {
  /**
   * Get template by ID
   *
   * @param templateId - Template identifier (1-9)
   * @returns Template string
   *
   * @example
   * const template = TemplateFactory.getTemplate(1); // Gold template
   */
  static getTemplate(templateId: number): string {
    // Type guard: Ensure templateId is valid
    if (!this.isValidTemplateId(templateId)) {
      console.warn(`Invalid template ID: ${templateId}. Using default template.`);
      return TEMPLATE_REGISTRY[DEFAULT_TEMPLATE_ID];
    }

    return TEMPLATE_REGISTRY[templateId];
  }

  /**
   * Get default template
   *
   * @returns Default template string (Gold)
   */
  static getDefaultTemplate(): string {
    return TEMPLATE_REGISTRY[DEFAULT_TEMPLATE_ID];
  }

  /**
   * Check if template ID is valid
   *
   * @param templateId - Template identifier to validate
   * @returns True if valid, false otherwise
   */
  static isValidTemplateId(templateId: number): templateId is TemplateId {
    return templateId >= 1 && templateId <= 9 && Number.isInteger(templateId);
  }

  /**
   * Get all available template IDs
   *
   * @returns Array of valid template IDs
   */
  static getAvailableTemplateIds(): TemplateId[] {
    return Object.keys(TEMPLATE_REGISTRY).map(Number) as TemplateId[];
  }

  /**
   * Get template with fallback handling
   *
   * @param templateId - Template identifier
   * @param fallbackId - Fallback template ID if primary is invalid
   * @returns Template string
   */
  static getTemplateWithFallback(
    templateId: number,
    fallbackId: TemplateId = DEFAULT_TEMPLATE_ID
  ): string {
    if (this.isValidTemplateId(templateId)) {
      return TEMPLATE_REGISTRY[templateId];
    }

    if (this.isValidTemplateId(fallbackId)) {
      return TEMPLATE_REGISTRY[fallbackId];
    }

    return TEMPLATE_REGISTRY[DEFAULT_TEMPLATE_ID];
  }
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use TemplateFactory.getTemplate() instead
 */
export function getTemplateByType(templateId: number = 1): string {
  return TemplateFactory.getTemplate(templateId);
}

/**
 * Export default template for backward compatibility
 * @deprecated Use TemplateFactory.getDefaultTemplate() instead
 */
export const cardTemplate = TemplateFactory.getDefaultTemplate();
