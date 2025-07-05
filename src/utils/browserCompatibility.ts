/**
 * Browser compatibility utilities
 */

/**
 * Check if the browser supports a specific CSS feature
 */
export function supportsCSS(property: string, value: string): boolean {
  if (typeof window === 'undefined' || !window.CSS || !window.CSS.supports) {
    return false;
  }
  
  return window.CSS.supports(property, value);
}

/**
 * Check if the device is iOS
 */
export function isIOS(): boolean {
  if (typeof window === 'undefined' || !window.navigator) {
    return false;
  }
  
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && 
    !('MSStream' in window);
}

/**
 * Check if the browser is Safari
 */
export function isSafari(): boolean {
  if (typeof window === 'undefined' || !window.navigator) {
    return false;
  }
  
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

/**
 * Check if the browser is Internet Explorer
 */
export function isIE(): boolean {
  if (typeof window === 'undefined' || !window.navigator) {
    return false;
  }
  
  return /MSIE|Trident/.test(navigator.userAgent);
}

/**
 * Check if backdrop-filter is supported
 */
export function supportsBackdropFilter(): boolean {
  return supportsCSS('backdrop-filter', 'blur(10px)') || 
         supportsCSS('-webkit-backdrop-filter', 'blur(10px)');
}

/**
 * Apply browser-specific fixes
 */
export function applyBrowserFixes(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const html = document.documentElement;
  
  if (isIOS()) {
    html.classList.add('ios');
  }
  
  if (isSafari()) {
    html.classList.add('safari');
  }
  
  if (isIE()) {
    html.classList.add('ie');
  }
  
  if (!supportsBackdropFilter()) {
    html.classList.add('no-backdrop-filter');
  }
} 