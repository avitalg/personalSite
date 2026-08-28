import type { PortfolioCase } from './cases';
import { siteUrl } from '../routing';

/** Absolute URL for Open Graph / structured data preview images. */
export function portfolioCaseOgImage(caseStudy: PortfolioCase): string {
  if (caseStudy.ogImage) {
    return caseStudy.ogImage.startsWith('http') ? caseStudy.ogImage : `${siteUrl}${caseStudy.ogImage}`;
  }
  if (caseStudy.tableau?.staticImageUrl) {
    return caseStudy.tableau.staticImageUrl;
  }
  return `${siteUrl}/logo-512.png`;
}
