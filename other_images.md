# Other Images Inventory

This document lists all non-product images (excluding logo and icons) that need to be replaced with actual images.

## Hero & Branding Images

### 1. Hero Banner Image
- **File:** `hero.jpg`
- **Location:** index.html (line 75)
- **Current Status:** Local file (334KB)
- **Dimensions:** Full-width banner, approximately 16:9 aspect ratio
- **Suggested Description:** 
  - A dramatic, high-tech warehouse or retail space interior with blue/cyan accent lighting
  - Should feature modern technology displays, sleek shelving with laptops and gadgets
  - Dark, moody atmosphere with neon blue highlights matching the site's #02bbf3 accent color
  - Could show silhouettes of customers browsing or a futuristic tech environment
  - Resolution: 1920x1080 or higher for full-width display

---

## About Page Images

### 2. Our Story Image
- **Current URL:** `https://picsum.photos/seed/bytestory/600/400`
- **Location:** about.html (line 103)
- **Dimensions:** 600x400 pixels (3:2 ratio)
- **Suggested Description:**
  - The ByteShop team in an early garage/workspace setting showing the company's humble beginnings
  - OR: A modern, bustling ByteShop warehouse/fulfillment center showing growth
  - Should convey startup-to-success narrative
  - Warm, authentic feel with the tech company aesthetic
  - Resolution: 1200x800 (2x for retina)

---

## Team Member Photos

All team photos should be:
- **Dimensions:** 150x150 pixels (1:1 square, displayed as circle)
- **Style:** Professional headshots with consistent background
- **Format:** JPEG
- **Recommended Resolution:** 300x300 (2x for retina displays)

### 3. CEO Photo
- **Current URL:** `https://picsum.photos/seed/ceo/150/150`
- **Location:** about.html (line 142)
- **Suggested Description:**
  - Professional headshot of the Chief Executive Officer
  - Confident, approachable expression
  - Business casual or smart casual attire
  - Neutral or subtly branded background
  - Good lighting, high quality portrait photography

### 4. CTO Photo
- **Current URL:** `https://picsum.photos/seed/cto/150/150`
- **Location:** about.html (line 153)
- **Suggested Description:**
  - Professional headshot of the Chief Technology Officer
  - Tech-savvy, innovative appearance
  - Could feature subtle tech elements (glasses, modern attire)
  - Same background style as other team photos for consistency
  - Professional lighting and composition

### 5. Operations Manager Photo
- **Current URL:** `https://picsum.photos/seed/manager/150/150`
- **Location:** about.html (line 164)
- **Suggested Description:**
  - Professional headshot of the Operations Manager
  - Organized, efficient appearance
  - Professional business attire
  - Consistent background with other team photos
  - Friendly, professional expression

### 6. Lead Designer Photo
- **Current URL:** `https://picsum.photos/seed/designer/150/150`
- **Location:** about.html (line 175)
- **Suggested Description:**
  - Professional headshot of the Lead Designer
  - Creative, modern aesthetic
  - Contemporary, stylish appearance
  - Same background style as rest of team
  - Expression showing creativity and professionalism

---

## Image Specifications Summary

| Image | Current Source | Recommended Size | Aspect Ratio | Format |
|-------|---------------|------------------|--------------|---------|
| Hero Banner | hero.jpg (local) | 1920x1080+ | 16:9 | JPG/WebP |
| Our Story | Picsum URL | 1200x800 | 3:2 | JPG |
| CEO Photo | Picsum URL | 300x300 | 1:1 | JPG |
| CTO Photo | Picsum URL | 300x300 | 1:1 | JPG |
| Manager Photo | Picsum URL | 300x300 | 1:1 | JPG |
| Designer Photo | Picsum URL | 300x300 | 1:1 | JPG |

## Notes

- Team photos should have consistent styling (same photographer, similar lighting, same background)
- Hero image should be optimized for web (< 500KB) while maintaining quality
- Consider using WebP format with JPEG fallback for better performance
- All images should match the dark, tech-focused aesthetic of the website
- Team photos are displayed as circles using CSS `rounded-circle` class
- Hero image has a parallax scroll effect - ensure high resolution for zoom
