# Formation Homes Website Enhancement Plan

## Overview
Implement dwellings.ie-style section layouts with full-width backgrounds and content separation across all pages. The goal is to create visually distinct sections with alternating backgrounds and improved content hierarchy.

## Milestones & Tasks

### 1. Global Section Layout Structure
- [ ] Create reusable section container classes
  - Implement `.section-container` for full-width backgrounds
  - Add `.section-content` for centered, max-width content
  - Define consistent vertical padding and spacing
- [ ] Define color palette for section backgrounds
  - Primary dark blue for hero sections
  - Light gray for alternating sections
  - White for standard sections
  - Accent colors for call-to-action sections

### 2. Homepage Enhancement
- [ ] Hero Section
  - Update hero slider to full viewport width
  - Enhance overlay gradient for better text readability
  - Implement smooth transitions between slides
  - Optimize hero height for mobile (70vh)
- [ ] About Section
  - Add full-width background with subtle pattern
  - Center content with max-width container
  - Improve grid layout for feature items
  - Stack grid items on mobile
- [ ] Sustainability Section
  - Implement parallax background effect (disable on mobile)
  - Add semi-transparent overlay for text contrast
  - Enhance content layout with icon features
  - Adjust text size and spacing for mobile
- [ ] Contact Section
  - Update to full-width design
  - Add background image or pattern
  - Improve form layout and spacing
  - Optimize form inputs for mobile (larger touch targets)

### 3. Developments Page Enhancement
- [ ] Hero Section
  - Implement full-width hero image
  - Add text overlay with improved typography
  - Include breadcrumb navigation
  - Adjust hero height for mobile devices
- [ ] Development Grid Section
  - Create alternating background sections
  - Improve card layout and spacing
  - Add hover effects and transitions
  - Single column layout on mobile
  - Optimize image loading for mobile
- [ ] Gallery Section
  - Enhance modal functionality
  - Improve thumbnail grid layout
  - Add smooth transitions and animations
  - Touch-friendly gallery navigation
  - Swipe gestures for mobile gallery

### 4. Careers Page Enhancement
- [ ] Hero Section
  - Update to match developments page style
  - Add dynamic background image
  - Improve heading and subtext layout
  - Mobile-optimized text scaling
- [ ] Job Listings Section
  - Implement alternating section backgrounds
  - Enhance job card design
  - Add hover effects and transitions
  - Stack cards vertically on mobile
  - Collapsible job details on mobile
- [ ] Application Section
  - Add full-width background
  - Improve form layout and styling
  - Include success/error message styling
  - Mobile-friendly form inputs
  - Touch-optimized button sizes

### 5. Mobile-First Responsive Design
- [ ] Core Mobile Features
  - Implement mobile-first CSS approach
  - Optimize touch targets (min 44px)
  - Adjust font sizes for readability
  - Reduce motion on mobile devices
  - Implement responsive images
- [ ] Navigation System
  - Create slide-out mobile menu
  - Add touch-friendly menu transitions
  - Include visible active states
  - Implement swipe gestures
  - Add mobile search functionality
- [ ] Content Adaptation
  - Stack grid layouts on mobile
  - Adjust section padding for mobile
  - Optimize form elements for touch
  - Enhance mobile typography
  - Implement mobile-specific spacing
- [ ] Performance
  - Lazy load images on mobile
  - Optimize background images
  - Reduce animation complexity
  - Minimize CSS/JS payload
  - Enable content caching

### 6. Performance & Technical Optimization
- [ ] CSS Organization
  - Implement mobile-first media queries
  - Create responsive utility classes
  - Optimize critical CSS path
  - Minimize CSS specificity
  - Use CSS containment where possible
- [ ] JavaScript Enhancement
  - Add touch event handlers
  - Implement passive scroll listeners
  - Optimize mobile animations
  - Add mobile gesture support
  - Enhance mobile form validation

## Technical Specifications

### Section Container Structure
```html
<section class="section-container [section-theme]">
    <div class="section-content">
        <!-- Section content here -->
    </div>
</section>
```

### CSS Variables
```css
:root {
    /* Spacing */
    --section-padding-desktop: 5rem;
    --section-padding-mobile: 3rem;
    --section-content-width: 1200px;
    --mobile-touch-target: 44px;
    
    /* Colors */
    --section-background-dark: #1A2942;
    --section-background-light: #f8f9fa;
    --section-overlay: rgba(0, 0, 0, 0.5);
    
    /* Typography */
    --font-size-mobile-base: 16px;
    --font-size-mobile-h1: 2rem;
    --font-size-mobile-h2: 1.75rem;
    --line-height-mobile: 1.5;
}
```

### Mobile-First Breakpoints
```css
/* Base styles are mobile-first */

/* Tablet: 768px+ */
@media (min-width: 768px) {
    /* Tablet enhancements */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
    /* Desktop enhancements */
}

/* Large Desktop: 1440px+ */
@media (min-width: 1440px) {
    /* Large screen optimizations */
}
```

### Mobile Performance Considerations
```css
/* Reduce motion for mobile devices */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* Mobile touch target sizes */
@media (max-width: 767px) {
    .button, .nav-link, .form-control {
        min-height: var(--mobile-touch-target);
        min-width: var(--mobile-touch-target);
    }
}
```

## Implementation Strategy

1. Start with mobile-first global section container styles
2. Implement responsive navigation system
3. Update one page at a time, beginning with the homepage
4. Test on multiple devices throughout development
5. Optimize performance for mobile networks
6. Conduct touch-device testing
7. Deploy changes incrementally

## Success Criteria

- Consistent section layouts across all pages
- Smooth transitions between sections
- Improved visual hierarchy
- Fast loading times on mobile networks
- Touch-friendly interface
- Responsive design on all devices
- Cross-browser and cross-device compatibility
- PageSpeed score above 90 on mobile
