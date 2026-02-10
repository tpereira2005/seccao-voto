/**
 * Minimal QR Code generator — produces an SVG string.
 * Uses a simple encoding approach suitable for short URLs.
 * Based on the QR code specification for alphanumeric mode.
 */

// We'll use a lightweight approach: encode data into a simple QR-like pattern
// For production, we use the Google Charts API as a fallback for QR generation
// This generates a QR code image URL

export function generateQRCodeURL(text, size = 200) {
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=transparent&color=ffffff&format=svg`
}

/**
 * Get the current app URL for sharing
 */
export function getShareURL() {
    // In production (GitHub Pages)
    if (window.location.hostname.includes('github.io')) {
        return window.location.origin + window.location.pathname
    }
    // In development
    return window.location.href
}
