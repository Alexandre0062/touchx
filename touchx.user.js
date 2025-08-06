// ==UserScript==
// @name  TouchX - Control
// @namespace    https://safezonee.dev
// @version      5.9.1
// @description  Controle de toque para você utilizar seu XCloud Se o seu controle estiver bagunçando, basta resetar ou ajustar o DPI do seu dispositivo.
// @author       Alexandreios
// @license      PROPRIETÁRIO - Não copie ou modifique sem permissão
// @match        https://www.xbox.com/*/play*
// @match        https://www.xbox.com/play*
// @match        https://xbox.com/*/play*
// @match        https://xbox.com/play*
// @exclude      https://www.xbox.com/*/xbox-game-pass/play-day-one
// @grant        none
// @run-at       document-end
// @updateURL    https://safezonee.dev/touchx.meta.js
// @downloadURL  https://safezonee.dev/touchx.user.js
// @icon         https://safezonee.dev/logo.png
// ==/UserScript==

;(() => {
  if (window.xcloudProEnhanced) return
  window.xcloudProEnhanced = true

  console.log("BetterXCloud Pro v5.9.1: DPI Fixed + Analog Scaling iniciando...")

  //  MODERN SVG ICONS //
  
  class ModernIcons {
    static getIcons() {
      return {
        // Toggle button icon
        toggle: `data:image/svg+xml;base64,${btoa(`
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="toggleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#0078D4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#005A9E;stop-opacity:1" />
              </linearGradient>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.3"/>
              </filter>
            </defs>
            <circle cx="30" cy="30" r="26" fill="url(#toggleGrad)" stroke="rgba(255,255,255,0.8)" stroke-width="2" filter="url(#shadow)"/>
            <rect x="16" y="20" width="28" height="20" rx="4" fill="rgba(255,255,255,0.9)"/>
            <circle cx="42" cy="16" r="2" fill="rgba(255,255,255,0.9)"/>
            <circle cx="42" cy="30" r="2" fill="rgba(255,255,255,0.9)"/>
            <circle cx="42" cy="44" r="2" fill="rgba(255,255,255,0.9)"/>
            <circle cx="18" cy="42" r="6" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="2"/>
            <circle cx="18" cy="42" r="2.5" fill="rgba(255,255,255,0.9)"/>
          </svg>
        `)}`,

        // HUD Editor button icon
        hudEdit: `data:image/svg+xml;base64,${btoa(`
          <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hudEditGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#FF6B35;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E55100;stop-opacity:1" />
              </linearGradient>
              <filter id="hudShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.3"/>
              </filter>
            </defs>
            <circle cx="25" cy="25" r="22" fill="url(#hudEditGrad)" stroke="rgba(255,255,255,0.8)" stroke-width="2" filter="url(#hudShadow)"/>
            <path d="M15 30 L20 25 L30 15 L35 20 L25 30 L15 35 Z" fill="white"/>
            <circle cx="32" cy="18" r="2" fill="white"/>
          </svg>
        `)}`,

        // Reset button icon
        reset: `data:image/svg+xml;base64,${btoa(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="resetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#6B6B6B;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#404040;stop-opacity:1" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="18" fill="url(#resetGrad)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
            <path d="M20 8 A12 12 0 0 1 32 20 L28 20 A8 8 0 0 0 20 12 L20 8 Z" fill="white"/>
            <polygon points="16,8 20,4 20,12" fill="white"/>
          </svg>
        `)}`,

        // Edit mode icon
        edit: `data:image/svg+xml;base64,${btoa(`
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="white"/>
          </svg>
        `)}`,

        // Settings icon
        settings: `data:image/svg+xml;base64,${btoa(`
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" fill="white"/>
          </svg>
        `)}`,

        // Credits icon
        credits: `data:image/svg+xml;base64,${btoa(`
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="white"/>
          </svg>
        `)}`,

        // Discord icon
        discord: `data:image/svg+xml;base64,${btoa(`
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="#5865F2"/>
          </svg>
        `)}`,

        // TikTok icon
        tiktok: `data:image/svg+xml;base64,${btoa(`
          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="#FF0050"/>
          </svg>
        `)}`,

        // Xbox button icons with improved scaling
        A: `data:image/svg+xml;base64,${btoa(`
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gradA" cx="30%" cy="30%" r="80%">
                <stop offset="0%" style="stop-color:#4CAF50;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#2E7D32;stop-opacity:1" />
              </radialGradient>
              <filter id="buttonShadow">
                <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/>
              </filter>
            </defs>
            <circle cx="30" cy="30" r="24" fill="url(#gradA)" stroke="rgba(255,255,255,0.9)" stroke-width="2" filter="url(#buttonShadow)"/>
            <text x="30" y="37" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600">A</text>
          </svg>
        `)}`,

        B: `data:image/svg+xml;base64,${btoa(`
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gradB" cx="30%" cy="30%" r="80%">
                <stop offset="0%" style="stop-color:#F44336;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#C62828;stop-opacity:1" />
              </radialGradient>
            </defs>
            <circle cx="30" cy="30" r="24" fill="url(#gradB)" stroke="rgba(255,255,255,0.9)" stroke-width="2"/>
            <text x="30" y="37" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600">B</text>
          </svg>
        `)}`,

        X: `data:image/svg+xml;base64,${btoa(`
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gradX" cx="30%" cy="30%" r="80%">
                <stop offset="0%" style="stop-color:#2196F3;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1565C0;stop-opacity:1" />
              </radialGradient>
            </defs>
            <circle cx="30" cy="30" r="24" fill="url(#gradX)" stroke="rgba(255,255,255,0.9)" stroke-width="2"/>
            <text x="30" y="37" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600">X</text>
          </svg>
        `)}`,

        Y: `data:image/svg+xml;base64,${btoa(`
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gradY" cx="30%" cy="30%" r="80%">
                <stop offset="0%" style="stop-color:#FF9800;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E65100;stop-opacity:1" />
              </radialGradient>
            </defs>
            <circle cx="30" cy="30" r="24" fill="url(#gradY)" stroke="rgba(255,255,255,0.9)" stroke-width="2"/>
            <text x="30" y="37" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600">Y</text>
          </svg>
        `)}`,

        // Modern D-Pad icons
        dpad_up: `data:image/svg+xml;base64,${btoa(`
          <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradDpadUp">
                <stop offset="0%" style="stop-color:#757575"/>
                <stop offset="100%" style="stop-color:#424242"/>
              </linearGradient>
            </defs>
            <rect x="15" y="5" width="15" height="35" rx="4" fill="url(#gradDpadUp)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
            <polygon points="22.5,14 19,22 26,22" fill="white"/>
          </svg>
        `)}`,

        dpad_down: `data:image/svg+xml;base64,${btoa(`
          <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradDpadDown">
                <stop offset="0%" style="stop-color:#757575"/>
                <stop offset="100%" style="stop-color:#424242"/>
              </linearGradient>
            </defs>
            <rect x="15" y="5" width="15" height="35" rx="4" fill="url(#gradDpadDown)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
            <polygon points="22.5,31 19,23 26,23" fill="white"/>
          </svg>
        `)}`,

        dpad_left: `data:image/svg+xml;base64,${btoa(`
          <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradDpadLeft">
                <stop offset="0%" style="stop-color:#757575"/>
                <stop offset="100%" style="stop-color:#424242"/>
              </linearGradient>
            </defs>
            <rect x="5" y="15" width="35" height="15" rx="4" fill="url(#gradDpadLeft)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
            <polygon points="14,22.5 22,19 22,26" fill="white"/>
          </svg>
        `)}`,

        dpad_right: `data:image/svg+xml;base64,${btoa(`
          <svg width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradDpadRight">
                <stop offset="0%" style="stop-color:#757575"/>
                <stop offset="100%" style="stop-color:#424242"/>
              </linearGradient>
            </defs>
            <rect x="5" y="15" width="35" height="15" rx="4" fill="url(#gradDpadRight)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
            <polygon points="31,22.5 23,19 23,26" fill="white"/>
          </svg>
        `)}`,

        // Modern stick buttons
        LS: `data:image/svg+xml;base64,${btoa(`
          <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradLS">
                <stop offset="0%" style="stop-color:#9E9E9E"/>
                <stop offset="100%" style="stop-color:#616161"/>
              </linearGradient>
            </defs>
            <circle cx="25" cy="25" r="20" fill="url(#gradLS)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
            <text x="25" y="30" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600">LS</text>
          </svg>
        `)}`,

        RS: `data:image/svg+xml;base64,${btoa(`
          <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradRS">
                <stop offset="0%" style="stop-color:#9E9E9E"/>
                <stop offset="100%" style="stop-color:#616161"/>
              </linearGradient>
            </defs>
            <circle cx="25" cy="25" r="20" fill="url(#gradRS)" stroke="rgba(255,255,255,0.8)" stroke-width="2"/>
            <text x="25" y="30" text-anchor="middle" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600">RS</text>
          </svg>
        `)}`,

        // Modern shoulder/trigger buttons
        shoulder: `data:image/svg+xml;base64,${btoa(`
          <svg width="80" height="40" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradShoulder">
                <stop offset="0%" style="stop-color:#BDBDBD"/>
                <stop offset="100%" style="stop-color:#757575"/>
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="72" height="32" rx="16" fill="url(#gradShoulder)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
          </svg>
        `)}`,

        trigger: `data:image/svg+xml;base64,${btoa(`
          <svg width="80" height="60" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradTrigger">
                <stop offset="0%" style="stop-color:#E0E0E0"/>
                <stop offset="100%" style="stop-color:#9E9E9E"/>
              </linearGradient>
            </defs>
            <path d="M12 48 Q12 12 40 12 Q68 12 68 48 L68 52 Q68 55 65 55 L15 55 Q12 55 12 52 Z" fill="url(#gradTrigger)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
          </svg>
        `)}`,

        // Modern menu buttons
        select: `data:image/svg+xml;base64,${btoa(`
          <svg width="60" height="30" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradSelect">
                <stop offset="0%" style="stop-color:#9E9E9E"/>
                <stop offset="100%" style="stop-color:#616161"/>
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="52" height="22" rx="11" fill="url(#gradSelect)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
            <rect x="10" y="9" width="8" height="5" rx="1" fill="none" stroke="white" stroke-width="1"/>
            <rect x="12" y="11" width="8" height="5" rx="1" fill="none" stroke="white" stroke-width="1"/>
            <circle cx="36" cy="15" r="1.5" fill="white"/>
            <circle cx="41" cy="15" r="1.5" fill="white"/>
          </svg>
        `)}`,

        start: `data:image/svg+xml;base64,${btoa(`
          <svg width="60" height="30" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradStart">
                <stop offset="0%" style="stop-color:#9E9E9E"/>
                <stop offset="100%" style="stop-color:#616161"/>
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="52" height="22" rx="11" fill="url(#gradStart)" stroke="rgba(255,255,255,0.8)" stroke-width="1.5"/>
            <polygon points="18,9 18,21 28,15" fill="white"/>
            <rect x="34" y="9" width="2.5" height="12" fill="white"/>
            <rect x="39" y="9" width="2.5" height="12" fill="white"/>
          </svg>
        `)}`,

        home: `data:image/svg+xml;base64,${btoa(`
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gradHome" cx="30%" cy="30%" r="80%">
                <stop offset="0%" style="stop-color:#0078D4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#005A9E;stop-opacity:1" />
              </radialGradient>
            </defs>
            <circle cx="30" cy="30" r="24" fill="url(#gradHome)" stroke="rgba(255,255,255,0.9)" stroke-width="2"/>
            <path d="M30 16 L41 25 L38 25 L38 38 L33 38 L33 31 L27 31 L27 38 L22 38 L22 25 L19 25 Z" fill="white"/>
          </svg>
        `)}`,

        // Modern analog stick components
        stick_base: `data:image/svg+xml;base64,${btoa(`
          <svg width="110" height="110" viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gradStickBase" cx="40%" cy="40%" r="80%">
                <stop offset="0%" style="stop-color:#9E9E9E;stop-opacity:0.9" />
                <stop offset="100%" style="stop-color:#424242;stop-opacity:0.9" />
              </radialGradient>
            </defs>
            <circle cx="55" cy="55" r="50" fill="url(#gradStickBase)" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>
            <circle cx="55" cy="55" r="38" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
          </svg>
        `)}`,

        stick_thumb: `data:image/svg+xml;base64,${btoa(`
          <svg width="65" height="65" viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gradStickThumb" cx="30%" cy="30%" r="80%">
                <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#E0E0E0;stop-opacity:1" />
              </radialGradient>
            </defs>
            <circle cx="32.5" cy="32.5" r="28" fill="url(#gradStickThumb)" stroke="rgba(0,0,0,0.1)" stroke-width="2"/>
            <circle cx="32.5" cy="32.5" r="20" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="1"/>
          </svg>
        `)}`,
      }
    }
  }

  // FIXED DEVICE DETECTION //
  
  class FixedDeviceDetector {
    static getDeviceInfo() {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const aspectRatio = vw / vh
      const pixelRatio = window.devicePixelRatio || 1

      // Safe areas mais precisas
      const safeAreaTop = this.getSafeAreaTop()
      const safeAreaBottom = this.getSafeAreaBottom()
      const safeAreaLeft = this.getSafeAreaLeft()
      const safeAreaRight = this.getSafeAreaRight()

      // Detecass de dispositivos
      const isAndroid = /Android/i.test(navigator.userAgent)
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const isSamsung = /Samsung/i.test(navigator.userAgent)
      const isPixel = /Pixel/i.test(navigator.userAgent)
      const isXiaomi = /Xiaomi|Mi |Redmi/i.test(navigator.userAgent)
      const isHuawei = /Huawei|Honor/i.test(navigator.userAgent)
      const isOnePlus = /OnePlus/i.test(navigator.userAgent)

      // Classifica de dispositivo
      let deviceType = "standard"
      let deviceClass = "phone"
      let screenSize = "medium"

      if (vw > 1200 || vh > 1200) {
        deviceClass = "tablet"
        screenSize = "large"
      } else if (vw > 800 || vh > 800) {
        deviceClass = "phablet"
        screenSize = "medium"
      } else {
        deviceClass = "phone"
        screenSize = "small"
      }

      if (aspectRatio > 2.2) {
        deviceType = "ultrawide"
      } else if (aspectRatio > 2.0) {
        deviceType = "tall"
      } else if (aspectRatio > 1.9) {
        deviceType = "modern"
      } else if (aspectRatio > 1.6) {
        deviceType = "standard"
      } else {
        deviceType = "square"
      }

      // SISTEMA DE DPI - Baseado em VW/VH
      const baseVwUnit = Math.min(vw * 0.12, vh * 0.08) // Base em viewport units

      // Ajustes por DPI real
      let dpiMultiplier = 1.0
      if (pixelRatio >= 3.0) {
        dpiMultiplier = 0.85 // Telas muito densas (iPhone Pro, Galaxy S)
      } else if (pixelRatio >= 2.5) {
        dpiMultiplier = 0.9 // Telas densas sei la kk
      } else if (pixelRatio >= 2.0) {
        dpiMultiplier = 0.95 // Telas normais
      } else {
        dpiMultiplier = 1.1 // Telas de baixo DPI 💀
      }

      // Ajustes por marca (baseado em expe real)
      if (isAndroid) {
        if (isSamsung) {
          dpiMultiplier *= 1.05 // Samsung One UI
        } else if (isPixel) {
          dpiMultiplier *= 0.95 // Pixel tem DPI muito alto?
        } else if (isXiaomi) {
          dpiMultiplier *= 1.1 // MIUI precisa de elementos maiores
        } else if (isHuawei) {
          dpiMultiplier *= 1.0 // EMUI/HarmonyOS
        } else if (isOnePlus) {
          dpiMultiplier *= 0.98 // OxygenOS
        }
      } else if (isIOS) {
        // iOS tem DPI mais consistente..
        if (deviceClass === "tablet") {
          dpiMultiplier *= 1.2 // iPads
        } else {
          dpiMultiplier *= 0.9 // iPhones
        }
      }

      const finalBaseSize = baseVwUnit * dpiMultiplier

      return {
        width: vw,
        height: vh,
        aspectRatio,
        pixelRatio,
        deviceType,
        deviceClass,
        screenSize,
        isAndroid,
        isIOS,
        isSamsung,
        isPixel,
        isXiaomi,
        isHuawei,
        isOnePlus,
        baseSize: finalBaseSize, // Tamanho base em pixels reais
        dpiMultiplier,
        safeAreas: {
          top: safeAreaTop,
          bottom: safeAreaBottom,
          left: safeAreaLeft,
          right: safeAreaRight,
        },
        usableArea: {
          width: vw - safeAreaLeft - safeAreaRight,
          height: vh - safeAreaTop - safeAreaBottom,
          left: safeAreaLeft,
          top: safeAreaTop,
        },
      }
    }

    static getSafeAreaTop() {
      const style = getComputedStyle(document.documentElement)
      const safeTop =
        style.getPropertyValue("env(safe-area-inset-top)") || style.getPropertyValue("constant(safe-area-inset-top)")

      if (safeTop && safeTop !== "0px") {
        return Number.parseInt(safeTop) || 0
      }

      const vh = window.innerHeight
      const isAndroid = /Android/i.test(navigator.userAgent)

      if (isAndroid) {
        if (vh > 1000) return Math.max(50, vh * 0.06)
        if (vh > 800) return Math.max(40, vh * 0.05)
        return Math.max(30, vh * 0.04)
      } else {
        if (vh > 900) return Math.max(50, vh * 0.055)
        if (vh > 800) return Math.max(44, vh * 0.05)
        return Math.max(20, vh * 0.025)
      }
    }

    static getSafeAreaBottom() {
      const style = getComputedStyle(document.documentElement)
      const safeBottom =
        style.getPropertyValue("env(safe-area-inset-bottom)") ||
        style.getPropertyValue("constant(safe-area-inset-bottom)")

      if (safeBottom && safeBottom !== "0px") {
        return Number.parseInt(safeBottom) || 0
      }

      const vh = window.innerHeight
      const isAndroid = /Android/i.test(navigator.userAgent)

      if (isAndroid) {
        if (vh > 1000) return Math.max(45, vh * 0.05)
        return Math.max(50, vh * 0.06)
      } else {
        if (vh > 900) return Math.max(40, vh * 0.045)
        if (vh > 800) return Math.max(34, vh * 0.04)
        return vh * 0.02
      }
    }

    static getSafeAreaLeft() {
      const style = getComputedStyle(document.documentElement)
      const safeLeft =
        style.getPropertyValue("env(safe-area-inset-left)") || style.getPropertyValue("constant(safe-area-inset-left)")
      return safeLeft && safeLeft !== "0px" ? Number.parseInt(safeLeft) || 0 : 0
    }

    static getSafeAreaRight() {
      const style = getComputedStyle(document.documentElement)
      const safeRight =
        style.getPropertyValue("env(safe-area-inset-right)") ||
        style.getPropertyValue("constant(safe-area-inset-right)")
      return safeRight && safeRight !== "0px" ? Number.parseInt(safeRight) || 0 : 0
    }
  }

  // FIXED LAYOUT CALCULATOR 
  class FixedLayoutCalculator {
    static getOptimalLayout() {
      const device = FixedDeviceDetector.getDeviceInfo()
      const { usableArea, deviceType, baseSize } = device

      console.log(
        `Device: ${deviceType} ${device.screenSize} (${device.width}x${device.height}, DPI: ${device.pixelRatio}, Base: ${baseSize.toFixed(1)}px)`,
      )

      // Tamanhos baseados no baseSize calculado com DPI
      const buttonSize = baseSize
      const stickSize = baseSize * 1.8 // Sticks sempre maiores que botÃµes
      const shoulderSize = baseSize * 1.3
      const menuSize = baseSize * 0.75

      switch (deviceType) {
        case "ultrawide":
          return this.getUltrawideLayout(device, buttonSize, stickSize, shoulderSize, menuSize)
        case "tall":
          return this.getTallLayout(device, buttonSize, stickSize, shoulderSize, menuSize)
        case "modern":
          return this.getModernLayout(device, buttonSize, stickSize, shoulderSize, menuSize)
        case "square":
          return this.getSquareLayout(device, buttonSize, stickSize, shoulderSize, menuSize)
        default:
          return this.getStandardLayout(device, buttonSize, stickSize, shoulderSize, menuSize)
      }
    }

    static getStandardLayout(device, buttonSize, stickSize, shoulderSize, menuSize) {
      const { usableArea } = device

      return {
        buttons: {
          // ABXY - Correct Xbox layout
          A: {
            x: usableArea.left + usableArea.width * 0.85,
            y: usableArea.top + usableArea.height * 0.82,
            size: buttonSize,
          },
          B: {
            x: usableArea.left + usableArea.width * 0.92,
            y: usableArea.top + usableArea.height * 0.75,
            size: buttonSize,
          },
          X: {
            x: usableArea.left + usableArea.width * 0.78,
            y: usableArea.top + usableArea.height * 0.75,
            size: buttonSize,
          },
          Y: {
            x: usableArea.left + usableArea.width * 0.85,
            y: usableArea.top + usableArea.height * 0.68,
            size: buttonSize,
          },

          DPAD_UP: {
            x: usableArea.left + usableArea.width * 0.15,
            y: usableArea.top + usableArea.height * 0.45,
            size: buttonSize * 0.85,
          },
          DPAD_DOWN: {
            x: usableArea.left + usableArea.width * 0.15,
            y: usableArea.top + usableArea.height * 0.58,
            size: buttonSize * 0.85,
          },
          DPAD_LEFT: {
            x: usableArea.left + usableArea.width * 0.08,
            y: usableArea.top + usableArea.height * 0.515,
            size: buttonSize * 0.85,
          },
          DPAD_RIGHT: {
            x: usableArea.left + usableArea.width * 0.22,
            y: usableArea.top + usableArea.height * 0.515,
            size: buttonSize * 0.85,
          },

          LB: {
            x: usableArea.left + usableArea.width * 0.15,
            y: usableArea.top + usableArea.height * 0.08,
            size: shoulderSize,
          },
          RB: {
            x: usableArea.left + usableArea.width * 0.85,
            y: usableArea.top + usableArea.height * 0.08,
            size: shoulderSize,
          },

          LT: {
            x: usableArea.left + usableArea.width * 0.15,
            y: usableArea.top + usableArea.height * 0.18,
            size: shoulderSize,
          },
          RT: {
            x: usableArea.left + usableArea.width * 0.85,
            y: usableArea.top + usableArea.height * 0.18,
            size: shoulderSize,
          },

          SELECT: {
            x: usableArea.left + usableArea.width * 0.42,
            y: usableArea.top + usableArea.height * 0.12,
            size: menuSize,
          },
          START: {
            x: usableArea.left + usableArea.width * 0.58,
            y: usableArea.top + usableArea.height * 0.12,
            size: menuSize,
          },
          HOME: {
            x: usableArea.left + usableArea.width * 0.5,
            y: usableArea.top + usableArea.height * 0.22,
            size: menuSize,
          },

          LS: {
            x: usableArea.left + usableArea.width * 0.15,
            y: usableArea.top + usableArea.height * 0.32,
            size: buttonSize * 0.65,
          },
          RS: {
            x: usableArea.left + usableArea.width * 0.85,
            y: usableArea.top + usableArea.height * 0.55,
            size: buttonSize * 0.65,
          },
        },
        sticks: {
          LEFT: {
            x: usableArea.left + usableArea.width * 0.25,
            y: usableArea.top + usableArea.height * 0.65,
            size: stickSize,
          },
          RIGHT: {
            x: usableArea.left + usableArea.width * 0.75,
            y: usableArea.top + usableArea.height * 0.45,
            size: stickSize,
          },
        },
      }
    }

    static getTallLayout(device, buttonSize, stickSize, shoulderSize, menuSize) {
      const { usableArea } = device

      return {
        buttons: {
          A: {
            x: usableArea.left + usableArea.width * 0.86,
            y: usableArea.top + usableArea.height * 0.84,
            size: buttonSize,
          },
          B: {
            x: usableArea.left + usableArea.width * 0.93,
            y: usableArea.top + usableArea.height * 0.78,
            size: buttonSize,
          },
          X: {
            x: usableArea.left + usableArea.width * 0.79,
            y: usableArea.top + usableArea.height * 0.78,
            size: buttonSize,
          },
          Y: {
            x: usableArea.left + usableArea.width * 0.86,
            y: usableArea.top + usableArea.height * 0.72,
            size: buttonSize,
          },

          DPAD_UP: {
            x: usableArea.left + usableArea.width * 0.14,
            y: usableArea.top + usableArea.height * 0.48,
            size: buttonSize * 0.85,
          },
          DPAD_DOWN: {
            x: usableArea.left + usableArea.width * 0.14,
            y: usableArea.top + usableArea.height * 0.58,
            size: buttonSize * 0.85,
          },
          DPAD_LEFT: {
            x: usableArea.left + usableArea.width * 0.07,
            y: usableArea.top + usableArea.height * 0.53,
            size: buttonSize * 0.85,
          },
          DPAD_RIGHT: {
            x: usableArea.left + usableArea.width * 0.21,
            y: usableArea.top + usableArea.height * 0.53,
            size: buttonSize * 0.85,
          },

          LB: {
            x: usableArea.left + usableArea.width * 0.14,
            y: usableArea.top + usableArea.height * 0.06,
            size: shoulderSize * 0.9,
          },
          RB: {
            x: usableArea.left + usableArea.width * 0.86,
            y: usableArea.top + usableArea.height * 0.06,
            size: shoulderSize * 0.9,
          },

          LT: {
            x: usableArea.left + usableArea.width * 0.14,
            y: usableArea.top + usableArea.height * 0.14,
            size: shoulderSize * 0.9,
          },
          RT: {
            x: usableArea.left + usableArea.width * 0.86,
            y: usableArea.top + usableArea.height * 0.14,
            size: shoulderSize * 0.9,
          },

          SELECT: {
            x: usableArea.left + usableArea.width * 0.43,
            y: usableArea.top + usableArea.height * 0.1,
            size: menuSize * 0.9,
          },
          START: {
            x: usableArea.left + usableArea.width * 0.57,
            y: usableArea.top + usableArea.height * 0.1,
            size: menuSize * 0.9,
          },
          HOME: {
            x: usableArea.left + usableArea.width * 0.5,
            y: usableArea.top + usableArea.height * 0.18,
            size: menuSize * 0.9,
          },

          LS: {
            x: usableArea.left + usableArea.width * 0.14,
            y: usableArea.top + usableArea.height * 0.35,
            size: buttonSize * 0.6,
          },
          RS: {
            x: usableArea.left + usableArea.width * 0.86,
            y: usableArea.top + usableArea.height * 0.58,
            size: buttonSize * 0.6,
          },
        },
        sticks: {
          LEFT: {
            x: usableArea.left + usableArea.width * 0.26,
            y: usableArea.top + usableArea.height * 0.68,
            size: stickSize * 0.9,
          },
          RIGHT: {
            x: usableArea.left + usableArea.width * 0.74,
            y: usableArea.top + usableArea.height * 0.48,
            size: stickSize * 0.9,
          },
        },
      }
    }

    static getModernLayout(device, buttonSize, stickSize, shoulderSize, menuSize) {
      const { usableArea } = device

      return {
        buttons: {
          A: {
            x: usableArea.left + usableArea.width * 0.85,
            y: usableArea.top + usableArea.height * 0.83,
            size: buttonSize,
          },
          B: {
            x: usableArea.left + usableArea.width * 0.92,
            y: usableArea.top + usableArea.height * 0.76,
            size: buttonSize,
          },
          X: {
            x: usableArea.left + usableArea.width * 0.78,
            y: usableArea.top + usableArea.height * 0.76,
            size: buttonSize,
          },
          Y: {
            x: usableArea.left + usableArea.width * 0.85,
            y: usableArea.top + usableArea.height * 0.69,
            size: buttonSize,
          },

          DPAD_UP: {
            x: usableArea.left + usableArea.width * 0.15,
            y: usableArea.top + usableArea.height * 0.46,
            size: buttonSize * 0.85,
          },
          DPAD_DOWN: {
            x: usableArea.left + usableArea.width * 0.15,
            y: usableArea.top + usableArea.height * 0.57,
            size: buttonSize * 0.85,
          },
          DPAD_LEFT: {
            x: usableArea.left + usableArea.width * 0.08,
            y: usableArea.top + usableArea.height * 0.515,
            size: buttonSize * 0.85,
          },
          DPAD_RIGHT: {
            x: usableArea.left + usableArea.width * 0.22,
            y: usableArea.top + usableArea.height * 0.515,
            size: buttonSize * 0.85,
          },

          LB: {
            x: usableArea.left + usableArea.width * 0.15,
            y: usableArea.top + usableArea.height * 0.07,
            size: shoulderSize * 0.95,
          },
          RB: {
            x: usableArea.left + usableArea.width * 0.85,
            y: usableArea.top + usableArea.height * 0.07,
            size: shoulderSize * 0.95,
          },

          LT: {
            x: usableArea.left + usableArea.width * 0.15,
            y: usableArea.top + usableArea.height * 0.16,
            size: shoulderSize * 0.95,
          },
          RT: {
            x: usableArea.left + usableArea.width * 0.85,
            y: usableArea.top + usableArea.height * 0.16,
            size: shoulderSize * 0.95,
          },

          SELECT: {
            x: usableArea.left + usableArea.width * 0.42,
            y: usableArea.top + usableArea.height * 0.11,
            size: menuSize * 0.95,
          },
          START: {
            x: usableArea.left + usableArea.width * 0.58,
            y: usableArea.top + usableArea.height * 0.11,
            size: menuSize * 0.95,
          },
          HOME: {
            x: usableArea.left + usableArea.width * 0.5,
            y: usableArea.top + usableArea.height * 0.2,
            size: menuSize * 0.95,
          },

          LS: {
            x: usableArea.left + usableArea.width * 0.15,
            y: usableArea.top + usableArea.height * 0.33,
            size: buttonSize * 0.62,
          },
          RS: {
            x: usableArea.left + usableArea.width * 0.85,
            y: usableArea.top + usableArea.height * 0.56,
            size: buttonSize * 0.62,
          },
        },
        sticks: {
          LEFT: {
            x: usableArea.left + usableArea.width * 0.25,
            y: usableArea.top + usableArea.height * 0.66,
            size: stickSize * 0.95,
          },
          RIGHT: {
            x: usableArea.left + usableArea.width * 0.75,
            y: usableArea.top + usableArea.height * 0.46,
            size: stickSize * 0.95,
          },
        },
      }
    }

    static getUltrawideLayout(device, buttonSize, stickSize, shoulderSize, menuSize) {
      const { usableArea } = device

      return {
        buttons: {
          A: {
            x: usableArea.left + usableArea.width * 0.88,
            y: usableArea.top + usableArea.height * 0.82,
            size: buttonSize,
          },
          B: {
            x: usableArea.left + usableArea.width * 0.94,
            y: usableArea.top + usableArea.height * 0.75,
            size: buttonSize,
          },
          X: {
            x: usableArea.left + usableArea.width * 0.82,
            y: usableArea.top + usableArea.height * 0.75,
            size: buttonSize,
          },
          Y: {
            x: usableArea.left + usableArea.width * 0.88,
            y: usableArea.top + usableArea.height * 0.68,
            size: buttonSize,
          },

          DPAD_UP: {
            x: usableArea.left + usableArea.width * 0.12,
            y: usableArea.top + usableArea.height * 0.45,
            size: buttonSize * 0.85,
          },
          DPAD_DOWN: {
            x: usableArea.left + usableArea.width * 0.12,
            y: usableArea.top + usableArea.height * 0.58,
            size: buttonSize * 0.85,
          },
          DPAD_LEFT: {
            x: usableArea.left + usableArea.width * 0.06,
            y: usableArea.top + usableArea.height * 0.515,
            size: buttonSize * 0.85,
          },
          DPAD_RIGHT: {
            x: usableArea.left + usableArea.width * 0.18,
            y: usableArea.top + usableArea.height * 0.515,
            size: buttonSize * 0.85,
          },

          LB: {
            x: usableArea.left + usableArea.width * 0.12,
            y: usableArea.top + usableArea.height * 0.08,
            size: shoulderSize * 0.85,
          },
          RB: {
            x: usableArea.left + usableArea.width * 0.88,
            y: usableArea.top + usableArea.height * 0.08,
            size: shoulderSize * 0.85,
          },

          LT: {
            x: usableArea.left + usableArea.width * 0.12,
            y: usableArea.top + usableArea.height * 0.18,
            size: shoulderSize * 0.85,
          },
          RT: {
            x: usableArea.left + usableArea.width * 0.88,
            y: usableArea.top + usableArea.height * 0.18,
            size: shoulderSize * 0.85,
          },

          SELECT: {
            x: usableArea.left + usableArea.width * 0.45,
            y: usableArea.top + usableArea.height * 0.12,
            size: menuSize * 0.8,
          },
          START: {
            x: usableArea.left + usableArea.width * 0.55,
            y: usableArea.top + usableArea.height * 0.12,
            size: menuSize * 0.8,
          },
          HOME: {
            x: usableArea.left + usableArea.width * 0.5,
            y: usableArea.top + usableArea.height * 0.22,
            size: menuSize * 0.8,
          },

          LS: {
            x: usableArea.left + usableArea.width * 0.12,
            y: usableArea.top + usableArea.height * 0.32,
            size: buttonSize * 0.55,
          },
          RS: {
            x: usableArea.left + usableArea.width * 0.88,
            y: usableArea.top + usableArea.height * 0.55,
            size: buttonSize * 0.55,
          },
        },
        sticks: {
          LEFT: {
            x: usableArea.left + usableArea.width * 0.22,
            y: usableArea.top + usableArea.height * 0.65,
            size: stickSize * 0.85,
          },
          RIGHT: {
            x: usableArea.left + usableArea.width * 0.78,
            y: usableArea.top + usableArea.height * 0.45,
            size: stickSize * 0.85,
          },
        },
      }
    }

    static getSquareLayout(device, buttonSize, stickSize, shoulderSize, menuSize) {
      const { usableArea } = device

      return {
        buttons: {
          A: {
            x: usableArea.left + usableArea.width * 0.82,
            y: usableArea.top + usableArea.height * 0.78,
            size: buttonSize,
          },
          B: {
            x: usableArea.left + usableArea.width * 0.9,
            y: usableArea.top + usableArea.height * 0.7,
            size: buttonSize,
          },
          X: {
            x: usableArea.left + usableArea.width * 0.74,
            y: usableArea.top + usableArea.height * 0.7,
            size: buttonSize,
          },
          Y: {
            x: usableArea.left + usableArea.width * 0.82,
            y: usableArea.top + usableArea.height * 0.62,
            size: buttonSize,
          },

          DPAD_UP: {
            x: usableArea.left + usableArea.width * 0.18,
            y: usableArea.top + usableArea.height * 0.5,
            size: buttonSize * 0.85,
          },
          DPAD_DOWN: {
            x: usableArea.left + usableArea.width * 0.18,
            y: usableArea.top + usableArea.height * 0.62,
            size: buttonSize * 0.85,
          },
          DPAD_LEFT: {
            x: usableArea.left + usableArea.width * 0.1,
            y: usableArea.top + usableArea.height * 0.56,
            size: buttonSize * 0.85,
          },
          DPAD_RIGHT: {
            x: usableArea.left + usableArea.width * 0.26,
            y: usableArea.top + usableArea.height * 0.56,
            size: buttonSize * 0.85,
          },

          LB: {
            x: usableArea.left + usableArea.width * 0.18,
            y: usableArea.top + usableArea.height * 0.1,
            size: shoulderSize * 1.1,
          },
          RB: {
            x: usableArea.left + usableArea.width * 0.82,
            y: usableArea.top + usableArea.height * 0.1,
            size: shoulderSize * 1.1,
          },

          LT: {
            x: usableArea.left + usableArea.width * 0.18,
            y: usableArea.top + usableArea.height * 0.2,
            size: shoulderSize * 1.1,
          },
          RT: {
            x: usableArea.left + usableArea.width * 0.82,
            y: usableArea.top + usableArea.height * 0.2,
            size: shoulderSize * 1.1,
          },

          SELECT: {
            x: usableArea.left + usableArea.width * 0.4,
            y: usableArea.top + usableArea.height * 0.15,
            size: menuSize * 1.05,
          },
          START: {
            x: usableArea.left + usableArea.width * 0.6,
            y: usableArea.top + usableArea.height * 0.15,
            size: menuSize * 1.05,
          },
          HOME: {
            x: usableArea.left + usableArea.width * 0.5,
            y: usableArea.top + usableArea.height * 0.25,
            size: menuSize * 1.05,
          },

          LS: {
            x: usableArea.left + usableArea.width * 0.18,
            y: usableArea.top + usableArea.height * 0.37,
            size: buttonSize * 0.7,
          },
          RS: {
            x: usableArea.left + usableArea.width * 0.82,
            y: usableArea.top + usableArea.height * 0.49,
            size: buttonSize * 0.7,
          },
        },
        sticks: {
          LEFT: {
            x: usableArea.left + usableArea.width * 0.3,
            y: usableArea.top + usableArea.height * 0.7,
            size: stickSize * 1.1,
          },
          RIGHT: {
            x: usableArea.left + usableArea.width * 0.7,
            y: usableArea.top + usableArea.height * 0.5,
            size: stickSize * 1.1,
          },
        },
      }
    }
  }

  // ==================== CONFIG MANAGER ====================
  class ConfigManager {
    constructor() {
      this.storageKey = "xcloud_pro_config_v591"

      this.defaultConfig = {
        enabled: false,
        antiAFK: true,
        touchControls: true,
        hapticFeedback: true,
        showAnalogTrails: true,
        buttonOpacity: 0.9,
        analogSensitivity: 1.2,
        buttonScale: 1.0, // SLIDER DE TAMANHO FUNCIONANDO
        layout: null,
        version: "5.9.1",
        hasCustomLayout: false,
        savedAspectRatio: null,
        savedDeviceType: null,
        savedIsAndroid: null,
      }

      this.config = this.loadConfig()
      this.updateLayout()
    }

    updateLayout() {
      const device = FixedDeviceDetector.getDeviceInfo()
      const newLayout = FixedLayoutCalculator.getOptimalLayout()

      const aspectRatioChanged =
        !this.config.savedAspectRatio || Math.abs(this.config.savedAspectRatio - device.aspectRatio) > 0.1

      const deviceTypeChanged = this.config.savedDeviceType !== device.deviceType
      const platformChanged = this.config.savedIsAndroid !== device.isAndroid

      if (!this.config.hasCustomLayout || aspectRatioChanged || deviceTypeChanged || platformChanged) {
        this.config.layout = newLayout
        this.config.savedAspectRatio = device.aspectRatio
        this.config.savedDeviceType = device.deviceType
        this.config.savedIsAndroid = device.isAndroid

        if (aspectRatioChanged || deviceTypeChanged || platformChanged) {
          console.log(`Device changed: Applying ${device.deviceType} layout (Android: ${device.isAndroid})`)
          this.config.hasCustomLayout = false
        }
      }

      this.saveConfig()
    }

    loadConfig() {
      try {
        const saved = localStorage.getItem(this.storageKey)
        if (saved) {
          const parsed = JSON.parse(saved)
          return { ...this.defaultConfig, ...parsed }
        }
        return { ...this.defaultConfig }
      } catch (e) {
        console.warn("Error loading config:", e)
        return { ...this.defaultConfig }
      }
    }

    saveConfig() {
      try {
        if (this.config.layout) {
          this.config.hasCustomLayout = true
        }
        localStorage.setItem(this.storageKey, JSON.stringify(this.config))
        console.log("Config saved")
      } catch (e) {
        console.error("Error saving config:", e)
      }
    }

    get(key) {
      return this.config[key]
    }

    set(key, value) {
      this.config[key] = value
      this.saveConfig()
    }

    updateLayout(type, id, properties) {
      if (!this.config.layout) {
        this.config.layout = FixedLayoutCalculator.getOptimalLayout()
      }

      if (!this.config.layout[type]) {
        this.config.layout[type] = {}
      }

      this.config.layout[type][id] = { ...this.config.layout[type][id], ...properties }
      this.config.hasCustomLayout = true
      this.saveConfig()
      return true
    }

    resetToDefault() {
      this.config.layout = FixedLayoutCalculator.getOptimalLayout()
      this.config.hasCustomLayout = false

      const device = FixedDeviceDetector.getDeviceInfo()
      this.config.savedAspectRatio = device.aspectRatio
      this.config.savedDeviceType = device.deviceType
      this.config.savedIsAndroid = device.isAndroid

      this.saveConfig()
    }
  }

  // ==================== FIXED HUD EDITOR ====================
  class FixedHUDEditor {
    constructor(configManager, touchControlsSystem) {
      this.config = configManager
      this.touchControls = touchControlsSystem
      this.isActive = false

      this.editClones = new Map()
      this.editContainer = null
      this.dragElement = null
      this.dragOffset = { x: 0, y: 0 }
      this.editOverlay = null
      this.editPanel = null

      this.handleDragMoveBound = this.handleDragMove.bind(this)
      this.handleDragEndBound = this.handleDragEnd.bind(this)
      this.handleDragStartBound = this.handleDragStart.bind(this)
    }

    activate() {
      if (this.isActive) return

      this.isActive = true

      this.touchControls.sticks.forEach((stick) => {
        stick.forceRelease()
      })

      this.touchControls.hide()
      this.createEditClones()
      this.createEditInterface()
      this.enableDragMode()

      console.log("HUD Editor v5.9.1: Activated with fixed scaling")
    }

    deactivate() {
      if (!this.isActive) return

      this.isActive = false

      const finalPositions = this.captureClonePositions()
      this.destroyEditClones()
      this.removeEditInterface()
      this.applyFinalPositions(finalPositions)
      this.touchControls.recreateFromScratch()
      this.touchControls.show()

      console.log("HUD Editor v5.9.1: Deactivated - Layout saved!")
    }

    createEditClones() {
      this.editContainer = document.createElement("div")
      this.editContainer.id = "xcloud-edit-clones"
      this.editContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 1000010;
        display: block;
      `
      document.body.appendChild(this.editContainer)

      const layout = this.config.get("layout")

      Object.keys(this.touchControls.buttonConfigs).forEach((buttonId) => {
        const buttonLayout = layout.buttons[buttonId]
        if (buttonLayout) {
          const clone = this.createButtonClone(buttonId, buttonLayout)
          this.editClones.set(`button_${buttonId}`, clone)
          this.editContainer.appendChild(clone)
        }
      })
      ;["LEFT", "RIGHT"].forEach((side) => {
        const stickLayout = layout.sticks[side]
        if (stickLayout) {
          const clone = this.createStickClone(side, stickLayout)
          this.editClones.set(`stick_${side}`, clone)
          this.editContainer.appendChild(clone)
        }
      })

      console.log("Edit Clones v5.9.1: Created", this.editClones.size, "clones with fixed scaling")
    }

    createButtonClone(buttonId, layout) {
      const clone = document.createElement("div")
      clone.className = `xcloud-edit-clone xcloud-edit-button xcloud-edit-button-${buttonId.toLowerCase()}`
      clone.setAttribute("data-original-type", "button")
      clone.setAttribute("data-original-id", buttonId)

      const buttonConfig = this.touchControls.buttonConfigs[buttonId]
      clone.innerHTML = `<img src="${buttonConfig.image}" style="width: 100%; height: 100%; display: block;">`

      // SISTEMA CORRIGIDO - Usar tamanho real baseado no DPI
      const userScale = this.config.get("buttonScale")
      const finalSize = layout.size * userScale

      clone.style.cssText = `
        position: absolute;
        left: ${layout.x - finalSize / 2}px;
        top: ${layout.y - finalSize / 2}px;
        width: ${finalSize}px;
        height: ${finalSize}px;
        pointer-events: auto;
        user-select: none;
        z-index: 1000011;
        opacity: ${this.config.get("buttonOpacity")};
        border-radius: ${buttonId.includes("DPAD") ? "12px" : "50%"};
        cursor: move;
        border: 3px solid rgba(255, 107, 53, 0.8);
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.4);
        transition: all 0.2s ease;
      `

      return clone
    }

    createStickClone(side, layout) {
      const clone = document.createElement("div")
      clone.className = `xcloud-edit-clone xcloud-edit-stick xcloud-edit-stick-${side.toLowerCase()}`
      clone.setAttribute("data-original-type", "stick")
      clone.setAttribute("data-original-id", side)

      const icons = ModernIcons.getIcons()
      clone.innerHTML = `<img src="${icons.stick_base}" style="width: 100%; height: 100%; display: block;">`

      // SISTEMA CORRIGIDO - Sticks tambÃ©m respeitam o slider de tamanho
      const userScale = this.config.get("buttonScale")
      const finalSize = layout.size * userScale

      clone.style.cssText = `
        position: absolute;
        left: ${layout.x - finalSize / 2}px;
        top: ${layout.y - finalSize / 2}px;
        width: ${finalSize}px;
        height: ${finalSize}px;
        pointer-events: auto;
        user-select: none;
        z-index: 1000011;
        opacity: ${this.config.get("buttonOpacity")};
        border-radius: 50%;
        cursor: move;
        border: 3px solid rgba(255, 107, 53, 0.8);
        box-shadow: 0 0 20px rgba(255, 107, 53, 0.4);
        transition: all 0.2s ease;
      `

      return clone
    }

    captureClonePositions() {
      const positions = {
        buttons: {},
        sticks: {},
      }

      this.editClones.forEach((clone, key) => {
        const rect = clone.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const type = clone.getAttribute("data-original-type")
        const id = clone.getAttribute("data-original-id")

        if (type === "button") {
          const originalLayout = this.config.get("layout").buttons[id]

          positions.buttons[id] = {
            x: centerX,
            y: centerY,
            size: originalLayout.size, // Manter tamanho base original
          }
        } else if (type === "stick") {
          const originalLayout = this.config.get("layout").sticks[id]

          positions.sticks[id] = {
            x: centerX,
            y: centerY,
            size: originalLayout.size, // Manter tamanho base original
          }
        }
      })

      return positions
    }

    applyFinalPositions(positions) {
      Object.keys(positions.buttons).forEach((buttonId) => {
        const pos = positions.buttons[buttonId]
        this.config.updateLayout("buttons", buttonId, pos)
      })

      Object.keys(positions.sticks).forEach((stickId) => {
        const pos = positions.sticks[stickId]
        this.config.updateLayout("sticks", stickId, pos)
      })

      this.config.saveConfig()
    }

    destroyEditClones() {
      this.editClones.clear()

      if (this.editContainer && this.editContainer.parentNode) {
        this.editContainer.parentNode.removeChild(this.editContainer)
        this.editContainer = null
      }
    }

    createEditInterface() {
      const device = FixedDeviceDetector.getDeviceInfo()
      const icons = ModernIcons.getIcons()

      this.editOverlay = document.createElement("div")
      this.editOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        z-index: 999998;
        pointer-events: none;
        backdrop-filter: blur(3px);
      `

      this.editPanel = document.createElement("div")
      this.editPanel.innerHTML = `
        <div style="
          position: absolute;
          top: ${device.safeAreas.top + 15}px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, rgba(30, 30, 30, 0.95), rgba(20, 20, 20, 0.95));
          color: white;
          padding: 20px 25px;
          border-radius: 16px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 14px;
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          pointer-events: auto;
          display: flex;
          gap: 20px;
          align-items: center;
          max-width: 90vw;
          flex-wrap: wrap;
          justify-content: center;
        ">
          <button id="confirmBtn" style="
            background: linear-gradient(135deg, #0078D4, #005A9E);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(0, 120, 212, 0.3);
            display: flex;
            align-items: center;
            gap: 8px;
          ">
            <img src="${icons.credits}" style="width: 16px; height: 16px;">
            Confirm
          </button>
          
          <button id="resetBtn" style="
            background: linear-gradient(135deg, #6B6B6B, #404040);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 10px;
            font-size: 13px;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            gap: 8px;
          ">
            <img src="${icons.reset}" style="width: 16px; height: 16px;">
            Reset
          </button>
          
          <div style="display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.05); padding: 8px 16px; border-radius: 10px;">
            <img src="${icons.settings}" style="width: 16px; height: 16px;">
            <span style="font-size: 12px; opacity: 0.9;">Size:</span>
            <input type="range" id="sizeSlider" min="0.5" max="2.5" step="0.1" value="${this.config.get("buttonScale")}" style="
              width: 100px;
              height: 6px;
              background: linear-gradient(to right, #FF6B35, #E55100);
              border-radius: 3px;
              outline: none;
              cursor: pointer;
              -webkit-appearance: none;
            ">
            <span id="sizeValue" style="font-size: 11px; opacity: 0.8; min-width: 35px; font-weight: 600;">${Math.round(this.config.get("buttonScale") * 100)}%</span>
          </div>
          
          <div style="font-size: 10px; opacity: 0.7; border-left: 1px solid rgba(255,255,255,0.1); padding-left: 15px; display: flex; align-items: center; gap: 8px;">
            <img src="${icons.edit}" style="width: 14px; height: 14px;">
            <div>
              <div style="font-weight: 600;">HUD EDITOR v5.9.1</div>
              <div>DPI FIXED + ANALOG SCALING</div>
            </div>
          </div>
        </div>
      `

      this.editOverlay.appendChild(this.editPanel)
      document.body.appendChild(this.editOverlay)

      this.setupPanelEventListeners()
    }

    setupPanelEventListeners() {
      const confirmBtn = this.editPanel.querySelector("#confirmBtn")
      const resetBtn = this.editPanel.querySelector("#resetBtn")
      const sizeSlider = this.editPanel.querySelector("#sizeSlider")
      const sizeValue = this.editPanel.querySelector("#sizeValue")

      confirmBtn.addEventListener("click", () => {
        this.deactivate()
        this.showNotification("Layout saved successfully!", "#0078D4")
      })

      resetBtn.addEventListener("click", () => {
        const device = FixedDeviceDetector.getDeviceInfo()
        if (confirm(`Reset to default ${device.deviceType} layout?\n\nAll custom positions will be lost.`)) {
          this.resetClonesLayout()
          this.showNotification(`${device.deviceType} layout applied!`, "#0078D4")
        }
      })

      // SLIDER FUNCIONANDO CORRETAMENTE AGORA
      sizeSlider.addEventListener("input", (e) => {
        const newScale = Number.parseFloat(e.target.value)
        sizeValue.textContent = `${Math.round(newScale * 100)}%`
        this.config.set("buttonScale", newScale)
        this.updateClonesScale(newScale)
      })

      // Add hover effects
      confirmBtn.addEventListener("mouseenter", () => {
        confirmBtn.style.transform = "translateY(-2px)"
        confirmBtn.style.boxShadow = "0 6px 16px rgba(0, 120, 212, 0.4)"
      })
      confirmBtn.addEventListener("mouseleave", () => {
        confirmBtn.style.transform = "translateY(0)"
        confirmBtn.style.boxShadow = "0 4px 12px rgba(0, 120, 212, 0.3)"
      })

      resetBtn.addEventListener("mouseenter", () => {
        resetBtn.style.transform = "translateY(-2px)"
        resetBtn.style.boxShadow = "0 6px 16px rgba(0,0,0,0.4)"
      })
      resetBtn.addEventListener("mouseleave", () => {
        resetBtn.style.transform = "translateY(0)"
        resetBtn.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)"
      })
    }

    resetClonesLayout() {
      const defaultLayout = FixedLayoutCalculator.getOptimalLayout()

      this.editClones.forEach((clone, key) => {
        const type = clone.getAttribute("data-original-type")
        const id = clone.getAttribute("data-original-id")

        let newLayout
        if (type === "button") {
          newLayout = defaultLayout.buttons[id]
        } else if (type === "stick") {
          newLayout = defaultLayout.sticks[id]
        }

        if (newLayout) {
          const userScale = this.config.get("buttonScale")
          const finalSize = newLayout.size * userScale

          clone.style.left = `${newLayout.x - finalSize / 2}px`
          clone.style.top = `${newLayout.y - finalSize / 2}px`
          clone.style.width = `${finalSize}px`
          clone.style.height = `${finalSize}px`
        }
      })
    }

    // FUNÃ‡ÃƒO CORRIGIDA - Agora atualiza TODOS os elementos incluindo sticks
    updateClonesScale(newScale) {
      this.editClones.forEach((clone, key) => {
        const type = clone.getAttribute("data-original-type")
        const id = clone.getAttribute("data-original-id")

        let originalLayout
        if (type === "button") {
          originalLayout = this.config.get("layout").buttons[id]
        } else if (type === "stick") {
          originalLayout = this.config.get("layout").sticks[id]
        }

        if (originalLayout) {
          const finalSize = originalLayout.size * newScale
          const rect = clone.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2

          clone.style.width = `${finalSize}px`
          clone.style.height = `${finalSize}px`
          clone.style.left = `${centerX - finalSize / 2}px`
          clone.style.top = `${centerY - finalSize / 2}px`
        }
      })
    }

    removeEditInterface() {
      if (this.editOverlay && this.editOverlay.parentNode) {
        this.editOverlay.parentNode.removeChild(this.editOverlay)
        this.editOverlay = null
        this.editPanel = null
      }
    }

    enableDragMode() {
      this.editClones.forEach((clone) => {
        clone.addEventListener("touchstart", this.handleDragStartBound, { passive: false })
        clone.addEventListener("mousedown", this.handleDragStartBound)
      })

      document.addEventListener("touchmove", this.handleDragMoveBound, { passive: false })
      document.addEventListener("mousemove", this.handleDragMoveBound)
      document.addEventListener("touchend", this.handleDragEndBound, { passive: false })
      document.addEventListener("mouseup", this.handleDragEndBound)
    }

    handleDragStart(e) {
      e.preventDefault()
      e.stopPropagation()

      this.dragElement = e.currentTarget
      const rect = this.dragElement.getBoundingClientRect()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY

      this.dragOffset.x = clientX - rect.left - rect.width / 2
      this.dragOffset.y = clientY - rect.top - rect.height / 2

      this.dragElement.style.zIndex = "1000020"
      this.dragElement.style.opacity = "0.8"
      this.dragElement.style.border = "3px solid rgba(0, 255, 127, 0.8)"
      this.dragElement.style.boxShadow = "0 0 25px rgba(0, 255, 127, 0.6)"
      this.dragElement.style.transform = "scale(1.05)"
    }

    handleDragMove(e) {
      if (!this.dragElement) return

      e.preventDefault()
      e.stopPropagation()

      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY

      let newX = clientX - this.dragOffset.x
      let newY = clientY - this.dragOffset.y

      const device = FixedDeviceDetector.getDeviceInfo()
      const maxX = device.width - this.dragElement.offsetWidth / 2
      const maxY = device.height - this.dragElement.offsetHeight / 2
      const minX = this.dragElement.offsetWidth / 2
      const minY = this.dragElement.offsetHeight / 2

      newX = Math.max(minX, Math.min(maxX, newX))
      newY = Math.max(minY, Math.min(maxY, newY))

      this.dragElement.style.left = `${newX - this.dragElement.offsetWidth / 2}px`
      this.dragElement.style.top = `${newY - this.dragElement.offsetHeight / 2}px`
    }

    handleDragEnd(e) {
      if (!this.dragElement) return

      e.preventDefault()
      e.stopPropagation()

      this.dragElement.style.zIndex = "1000011"
      this.dragElement.style.opacity = this.config.get("buttonOpacity")
      this.dragElement.style.border = "3px solid rgba(255, 107, 53, 0.8)"
      this.dragElement.style.boxShadow = "0 0 20px rgba(255, 107, 53, 0.4)"
      this.dragElement.style.transform = "scale(1)"

      this.dragElement = null

      if (navigator.vibrate) {
        navigator.vibrate(25)
      }
    }

    showNotification(message, color = "#0078D4") {
      const device = FixedDeviceDetector.getDeviceInfo()
      const icons = ModernIcons.getIcons()

      const notification = document.createElement("div")
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: ${device.safeAreas.top + 100}px;
          right: 20px;
          background: linear-gradient(135deg, ${color}, ${color}dd);
          color: white;
          padding: 16px 20px;
          border-radius: 12px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 13px;
          z-index: 9999998;
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
          animation: slideInRight 0.5s ease-out;
          max-width: 280px;
          display: flex;
          align-items: center;
          gap: 12px;
          backdrop-filter: blur(10px);
        ">
          <img src="${icons.credits}" style="width: 18px; height: 18px;">
          ${message}
        </div>
        <style>
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        </style>
      `

      document.body.appendChild(notification)
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 3500)
    }
  }

  // ==================== FIXED TOUCH BUTTON ====================
  class FixedTouchButton {
    constructor(container, config, buttonId, buttonConfig, gamepadEmulator) {
      this.container = container
      this.config = config
      this.buttonId = buttonId
      this.buttonConfig = buttonConfig
      this.gamepadEmulator = gamepadEmulator
      this.element = null
      this.isPressed = false
      this.touchId = null
      this.pointerId = null

      this.releaseTimeout = null
      this.forceReleaseTimeout = null
      this.pressTimeout = null

      // Double tap detection for HUD editor
      this.lastTapTime = 0
      this.tapTimeout = null

      this.create()
    }

    create() {
      const layout = this.config.get("layout").buttons[this.buttonId]

      this.element = document.createElement("div")
      this.element.className = `xcloud-button xcloud-button-${this.buttonId.toLowerCase()}`
      this.element.innerHTML = `<img src="${this.buttonConfig.image}" style="width: 100%; height: 100%; display: block;">`

      // SISTEMA CORRIGIDO - Usar tamanho real baseado no DPI + slider
      const userScale = this.config.get("buttonScale")
      const finalSize = layout.size * userScale

      this.element.style.cssText = `
        position: absolute;
        left: ${layout.x - finalSize / 2}px;
        top: ${layout.y - finalSize / 2}px;
        width: ${finalSize}px;
        height: ${finalSize}px;
        pointer-events: auto;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        z-index: 1000001;
        opacity: ${this.config.get("buttonOpacity")};
        transition: transform 0.08s ease, filter 0.08s ease;
        touch-action: none;
        border-radius: ${this.buttonId.includes("DPAD") ? "12px" : "50%"};
        will-change: transform;
      `

      this.setupEventListeners()
      this.container.appendChild(this.element)
    }

    setupEventListeners() {
      this.element.addEventListener("pointerdown", this.handlePress.bind(this), { passive: false, capture: true })
      this.element.addEventListener("touchstart", this.handlePress.bind(this), { passive: false, capture: true })

      this.element.addEventListener("pointerup", this.handleRelease.bind(this), { passive: false, capture: true })
      this.element.addEventListener("pointercancel", this.handleRelease.bind(this), { passive: false, capture: true })
      this.element.addEventListener("pointerleave", this.handleRelease.bind(this), { passive: false, capture: true })
      this.element.addEventListener("touchend", this.handleRelease.bind(this), { passive: false, capture: true })
      this.element.addEventListener("touchcancel", this.handleRelease.bind(this), { passive: false, capture: true })

      this.element.addEventListener("mousedown", this.handlePress.bind(this))
      this.element.addEventListener("mouseup", this.handleRelease.bind(this))
      this.element.addEventListener("mouseleave", this.handleRelease.bind(this))

      this.element.addEventListener("contextmenu", (e) => e.preventDefault())
    }

    handlePress(e) {
      e.preventDefault()
      e.stopPropagation()

      // Double tap detection for HUD editor
      const currentTime = Date.now()
      const timeDiff = currentTime - this.lastTapTime

      if (timeDiff < 500 && timeDiff > 0) {
        // Double tap detected - activate HUD editor
        if (this.container.parentElement && this.container.parentElement.hudEditor) {
          this.container.parentElement.hudEditor.activate()
          return
        }
      }

      this.lastTapTime = currentTime

      if (this.isPressed) return

      this.clearTimeouts()

      if (e.pointerId !== undefined) {
        this.pointerId = e.pointerId
      } else if (e.touches) {
        this.touchId = e.touches[0].identifier
      }

      this.isPressed = true

      // Aplicar escala de pressionamento
      this.element.style.transform = "scale(0.92)"
      this.element.style.filter = "brightness(0.8)"

      this.pressTimeout = setTimeout(() => {
        if (this.isPressed) {
          this.gamepadEmulator.updateButton(this.buttonConfig.gamepadIndex, true)
        }
      }, 1)

      if (this.config.get("hapticFeedback") && navigator.vibrate) {
        navigator.vibrate(15)
      }

      console.log(`Button ${this.buttonId}: Pressed`)
    }

    handleRelease(e) {
      e.preventDefault()
      e.stopPropagation()

      if (!this.isPressed) return

      let shouldRelease = false

      if (e.pointerId !== undefined && e.pointerId === this.pointerId) {
        shouldRelease = true
      } else if (e.changedTouches && this.touchId !== null) {
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === this.touchId) {
            shouldRelease = true
            break
          }
        }
      } else if (!e.pointerId && !e.changedTouches) {
        shouldRelease = true
      }

      if (!shouldRelease) return

      this.performRelease()
    }

    performRelease() {
      if (!this.isPressed) return

      // Restaurar escala normal
      this.element.style.transform = "scale(1)"
      this.element.style.filter = "brightness(1)"

      this.isPressed = false
      this.touchId = null
      this.pointerId = null

      this.clearTimeouts()

      this.gamepadEmulator.updateButton(this.buttonConfig.gamepadIndex, false)

      this.releaseTimeout = setTimeout(() => {
        this.forceRelease()
      }, 5)

      this.forceReleaseTimeout = setTimeout(() => {
        this.forceRelease()
      }, 50)

      console.log(`Button ${this.buttonId}: Released`)
    }

    forceRelease() {
      this.clearTimeouts()

      this.isPressed = false
      this.touchId = null
      this.pointerId = null

      this.element.style.transform = "scale(1)"
      this.element.style.filter = "brightness(1)"
      this.gamepadEmulator.updateButton(this.buttonConfig.gamepadIndex, false)

      console.log(`Button ${this.buttonId}: Force release`)
    }

    clearTimeouts() {
      if (this.releaseTimeout) {
        clearTimeout(this.releaseTimeout)
        this.releaseTimeout = null
      }
      if (this.forceReleaseTimeout) {
        clearTimeout(this.forceReleaseTimeout)
        this.forceReleaseTimeout = null
      }
      if (this.pressTimeout) {
        clearTimeout(this.pressTimeout)
        this.pressTimeout = null
      }
    }

    updateLayout(newLayout) {
      // SISTEMA CORRIGIDO - Aplicar escala do usuÃ¡rio
      const userScale = this.config.get("buttonScale")
      const finalSize = newLayout.size * userScale

      this.element.style.left = `${newLayout.x - finalSize / 2}px`
      this.element.style.top = `${newLayout.y - finalSize / 2}px`
      this.element.style.width = `${finalSize}px`
      this.element.style.height = `${finalSize}px`
    }

    destroy() {
      this.clearTimeouts()
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element)
      }
    }
  }

  // ==================== FIXED ANALOG STICK ====================
  class FixedAnalogStick {
    constructor(container, config, side, gamepadEmulator) {
      this.container = container
      this.config = config
      this.side = side
      this.gamepadEmulator = gamepadEmulator

      this.isActive = false
      this.isDragging = false
      this.touchId = null
      this.pointerId = null
      this.currentX = 0
      this.currentY = 0

      this.centerX = 0
      this.centerY = 0
      this.maxDistance = 50

      this.baseElement = null
      this.thumbElement = null
      this.trailCanvas = null

      this.releaseTimeout = null
      this.forceReleaseTimeout = null

      // Double tap detection for HUD editor
      this.lastTapTime = 0
      this.tapTimeout = null

      this.create()
    }

    create() {
      const layout = this.config.get("layout").sticks[this.side]
      const icons = ModernIcons.getIcons()

      this.baseElement = document.createElement("div")
      this.baseElement.className = `xcloud-stick-base xcloud-stick-${this.side.toLowerCase()}`
      this.baseElement.innerHTML = `<img src="${icons.stick_base}" style="width: 100%; height: 100%; display: block;">`

      // SISTEMA CORRIGIDO - Sticks agora respeitam o slider de tamanho
      const userScale = this.config.get("buttonScale")
      const finalSize = layout.size * userScale

      this.baseElement.style.cssText = `
        position: absolute;
        left: ${layout.x - finalSize / 2}px;
        top: ${layout.y - finalSize / 2}px;
        width: ${finalSize}px;
        height: ${finalSize}px;
        pointer-events: auto;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        z-index: 1000001;
        opacity: ${this.config.get("buttonOpacity")};
        border-radius: 50%;
        transition: transform 0.1s ease;
        will-change: transform;
      `

      this.thumbElement = document.createElement("div")
      this.thumbElement.className = `xcloud-stick-thumb`
      this.thumbElement.innerHTML = `<img src="${icons.stick_thumb}" style="width: 100%; height: 100%; display: block;">`
      this.thumbElement.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: ${finalSize * 0.6}px;
        height: ${finalSize * 0.6}px;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 1000002;
        transition: none;
        border-radius: 50%;
        will-change: transform;
      `

      if (this.config.get("showAnalogTrails")) {
        this.trailCanvas = document.createElement("canvas")
        this.trailCanvas.width = finalSize
        this.trailCanvas.height = finalSize
        this.trailCanvas.style.cssText = `
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000000;
          border-radius: 50%;
        `
        this.baseElement.appendChild(this.trailCanvas)
      }

      this.baseElement.appendChild(this.thumbElement)
      this.container.appendChild(this.baseElement)

      this.setupEventListeners()
      this.updateCenter()
    }

    updateCenter() {
      const rect = this.baseElement.getBoundingClientRect()
      this.centerX = rect.left + rect.width / 2
      this.centerY = rect.top + rect.height / 2
    }

    setupEventListeners() {
      this.baseElement.addEventListener("pointerdown", this.handleStart.bind(this), { passive: false })
      this.baseElement.addEventListener("touchstart", this.handleStart.bind(this), { passive: false })

      document.addEventListener("pointermove", this.handleMove.bind(this), { passive: false })
      document.addEventListener("touchmove", this.handleMove.bind(this), { passive: false })

      document.addEventListener("pointerup", this.handleEnd.bind(this), { passive: false })
      document.addEventListener("pointercancel", this.handleEnd.bind(this), { passive: false })
      document.addEventListener("touchend", this.handleEnd.bind(this), { passive: false })
      document.addEventListener("touchcancel", this.handleEnd.bind(this), { passive: false })
      document.addEventListener("pointerleave", this.handleEnd.bind(this), { passive: false })

      this.baseElement.addEventListener("contextmenu", (e) => e.preventDefault())
    }

    handleStart(e) {
      e.preventDefault()
      e.stopPropagation()

      // Double tap detection for HUD editor
      const currentTime = Date.now()
      const timeDiff = currentTime - this.lastTapTime

      if (timeDiff < 500 && timeDiff > 0) {
        // Double tap detected - activate HUD editor
        if (this.container.parentElement && this.container.parentElement.hudEditor) {
          this.container.parentElement.hudEditor.activate()
          return
        }
      }

      this.lastTapTime = currentTime

      this.clearTimeouts()

      const rect = this.baseElement.getBoundingClientRect()
      const clientX = e.clientX || (e.touches && e.touches[0].clientX)
      const clientY = e.clientY || (e.touches && e.touches[0].clientY)

      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
        return
      }

      if (e.pointerId !== undefined) {
        this.pointerId = e.pointerId
      } else if (e.touches) {
        this.touchId = e.touches[0].identifier
      }

      this.isActive = true
      this.isDragging = true
      this.updateCenter()

      this.baseElement.style.transform = "scale(0.95)"
      this.updatePosition(clientX, clientY)

      if (this.config.get("hapticFeedback") && navigator.vibrate) {
        navigator.vibrate(12)
      }

      console.log(`Analog ${this.side}: Started`)
    }

    handleMove(e) {
      if (!this.isActive || !this.isDragging) return

      let clientX, clientY
      let isValidTouch = false

      if (e.pointerId !== undefined && e.pointerId === this.pointerId) {
        clientX = e.clientX
        clientY = e.clientY
        isValidTouch = true
      } else if (e.touches && this.touchId !== null) {
        for (let i = 0; i < e.touches.length; i++) {
          if (e.touches[i].identifier === this.touchId) {
            clientX = e.touches[i].clientX
            clientY = e.touches[i].clientY
            isValidTouch = true
            break
          }
        }
      }

      if (!isValidTouch) return

      e.preventDefault()
      e.stopPropagation()

      this.updatePosition(clientX, clientY)
    }

    handleEnd(e) {
      if (!this.isActive) return

      let shouldEnd = false

      if (e.pointerId !== undefined && e.pointerId === this.pointerId) {
        shouldEnd = true
      } else if (e.changedTouches && this.touchId !== null) {
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === this.touchId) {
            shouldEnd = true
            break
          }
        }
      } else if (!e.pointerId && !e.changedTouches) {
        shouldEnd = true
      }

      if (!shouldEnd) return

      e.preventDefault()
      e.stopPropagation()

      this.performRelease()
    }

    performRelease() {
      this.baseElement.style.transform = "scale(1)"

      this.isActive = false
      this.isDragging = false
      this.touchId = null
      this.pointerId = null

      this.releaseTimeout = setTimeout(() => {
        this.forceRelease()
      }, 5)

      this.forceReleaseTimeout = setTimeout(() => {
        this.forceRelease()
      }, 50)

      this.returnToCenter()
    }

    forceRelease() {
      this.clearTimeouts()

      this.isActive = false
      this.isDragging = false
      this.touchId = null
      this.pointerId = null

      if (this.side === "LEFT") {
        this.gamepadEmulator.updateAxis(0, 0)
        this.gamepadEmulator.updateAxis(1, 0)
      } else {
        this.gamepadEmulator.updateAxis(2, 0)
        this.gamepadEmulator.updateAxis(3, 0)
      }

      this.thumbElement.style.transform = "translate(-50%, -50%)"
      this.currentX = 0
      this.currentY = 0

      if (this.trailCanvas) {
        const ctx = this.trailCanvas.getContext("2d")
        ctx.clearRect(0, 0, this.trailCanvas.width, this.trailCanvas.height)
      }

      console.log(`Analog ${this.side}: Force release executed`)
    }

    clearTimeouts() {
      if (this.releaseTimeout) {
        clearTimeout(this.releaseTimeout)
        this.releaseTimeout = null
      }
      if (this.forceReleaseTimeout) {
        clearTimeout(this.forceReleaseTimeout)
        this.forceReleaseTimeout = null
      }
    }

    updatePosition(clientX, clientY) {
      const deltaX = clientX - this.centerX
      const deltaY = clientY - this.centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

      if (distance > this.maxDistance) {
        const angle = Math.atan2(deltaY, deltaX)
        this.currentX = Math.cos(angle) * this.maxDistance
        this.currentY = Math.sin(angle) * this.maxDistance
      } else {
        this.currentX = deltaX
        this.currentY = deltaY
      }

      this.thumbElement.style.transform = `translate(calc(-50% + ${this.currentX}px), calc(-50% + ${this.currentY}px))`

      const sensitivity = this.config.get("analogSensitivity")
      let normalizedX = (this.currentX / this.maxDistance) * sensitivity
      let normalizedY = (this.currentY / this.maxDistance) * sensitivity

      const deadzone = 0.04
      if (Math.abs(normalizedX) < deadzone) normalizedX = 0
      if (Math.abs(normalizedY) < deadzone) normalizedY = 0

      normalizedX = Math.max(-1, Math.min(1, normalizedX))
      normalizedY = Math.max(-1, Math.min(1, normalizedY))

      if (this.side === "LEFT") {
        this.gamepadEmulator.updateAxis(0, normalizedX)
        this.gamepadEmulator.updateAxis(1, normalizedY)
      } else {
        this.gamepadEmulator.updateAxis(2, normalizedX)
        this.gamepadEmulator.updateAxis(3, normalizedY)
      }

      this.drawTrail()
    }

    returnToCenter() {
      const animate = () => {
        this.currentX *= 0.88
        this.currentY *= 0.88

        if (Math.abs(this.currentX) < 0.5 && Math.abs(this.currentY) < 0.5) {
          this.currentX = 0
          this.currentY = 0
          this.thumbElement.style.transform = "translate(-50%, -50%)"

          if (this.side === "LEFT") {
            this.gamepadEmulator.updateAxis(0, 0)
            this.gamepadEmulator.updateAxis(1, 0)
          } else {
            this.gamepadEmulator.updateAxis(2, 0)
            this.gamepadEmulator.updateAxis(3, 0)
          }
          return
        }

        this.thumbElement.style.transform = `translate(calc(-50% + ${this.currentX}px), calc(-50% + ${this.currentY}px))`

        const sensitivity = this.config.get("analogSensitivity")
        const normalizedX = (this.currentX / this.maxDistance) * sensitivity
        const normalizedY = (this.currentY / this.maxDistance) * sensitivity

        if (this.side === "LEFT") {
          this.gamepadEmulator.updateAxis(0, normalizedX)
          this.gamepadEmulator.updateAxis(1, normalizedY)
        } else {
          this.gamepadEmulator.updateAxis(2, normalizedX)
          this.gamepadEmulator.updateAxis(3, normalizedY)
        }

        requestAnimationFrame(animate)
      }

      animate()
    }

    drawTrail() {
      if (!this.trailCanvas || !this.config.get("showAnalogTrails")) return

      const ctx = this.trailCanvas.getContext("2d")
      const size = this.trailCanvas.width
      const center = size / 2

      ctx.clearRect(0, 0, size, size)

      if (this.currentX !== 0 || this.currentY !== 0) {
        ctx.beginPath()
        ctx.moveTo(center, center)
        ctx.lineTo(center + this.currentX, center + this.currentY)
        ctx.strokeStyle = this.side === "LEFT" ? "rgba(33, 150, 243, 0.8)" : "rgba(244, 67, 54, 0.8)"
        ctx.lineWidth = 4
        ctx.lineCap = "round"
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(center + this.currentX, center + this.currentY, 5, 0, 2 * Math.PI)
        ctx.fillStyle = this.side === "LEFT" ? "rgba(33, 150, 243, 1)" : "rgba(244, 67, 54, 1)"
        ctx.fill()
      }
    }

    updateLayout(newLayout) {
      // SISTEMA CORRIGIDO - Sticks agora respeitam o slider de tamanho
      const userScale = this.config.get("buttonScale")
      const finalSize = newLayout.size * userScale

      this.baseElement.style.left = `${newLayout.x - finalSize / 2}px`
      this.baseElement.style.top = `${newLayout.y - finalSize / 2}px`
      this.baseElement.style.width = `${finalSize}px`
      this.baseElement.style.height = `${finalSize}px`

      this.thumbElement.style.width = `${finalSize * 0.6}px`
      this.thumbElement.style.height = `${finalSize * 0.6}px`

      if (this.trailCanvas) {
        this.trailCanvas.width = finalSize
        this.trailCanvas.height = finalSize
      }

      this.updateCenter()
    }

    destroy() {
      this.forceRelease()
      this.clearTimeouts()

      if (this.baseElement && this.baseElement.parentNode) {
        this.baseElement.parentNode.removeChild(this.baseElement)
      }
    }
  }

  // ==================== ANTI-AFK SYSTEM ====================
  class AntiAFKSystem {
    constructor() {
      this.interval = null
      this.isActive = false
      this.selectors = [
        '[data-testid="idle-warning-dialog"]',
        '[class*="IdleWarning"]',
        '[class*="idle-warning"]',
        ".IdleWarningScreen-module__container",
        '[aria-label*="idle"]',
        'button[class*="continue"]',
        'button[class*="keep-playing"]',
      ]
    }

    start() {
      if (this.interval) return
      this.isActive = true
      this.interval = setInterval(() => this.checkForIdleWarning(), 1500)
      console.log("Anti-AFK: Activated")
    }

    stop() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
      this.isActive = false
      console.log("Anti-AFK: Deactivated")
    }

    checkForIdleWarning() {
      for (const selector of this.selectors) {
        const element = document.querySelector(selector)
        if (element && element.offsetParent !== null) {
          this.handleIdleWarning(element)
          return
        }
      }
    }

    handleIdleWarning(element) {
      const buttonSelectors = [
        'button[class*="continue"]',
        'button[class*="keep"]',
        'button[class*="stay"]',
        'button[type="button"]',
      ]

      for (const selector of buttonSelectors) {
        const button = element.querySelector(selector) || document.querySelector(selector)
        if (button && button.offsetParent !== null) {
          try {
            button.click()
            console.log("Anti-AFK: Continued automatically")
            return
          } catch (e) {
            console.warn("Anti-AFK: Error:", e)
          }
        }
      }
    }
  }

  // ==================== GAMEPAD EMULATOR ====================
  class GamepadEmulator {
    constructor() {
      this.gamepad = {
        id: "Xbox 360 Controller (XInput STANDARD GAMEPAD)",
        index: 0,
        connected: true,
        timestamp: 0,
        mapping: "standard",
        axes: [0, 0, 0, 0],
        buttons: Array(17)
          .fill()
          .map(() => ({
            pressed: false,
            touched: false,
            value: 0,
          })),
      }
      this.startTime = performance.now()
      this.injected = false
    }

    updateButton(index, pressed, value = pressed ? 1 : 0) {
      if (index >= 0 && index < this.gamepad.buttons.length) {
        this.gamepad.buttons[index].pressed = pressed
        this.gamepad.buttons[index].touched = pressed
        this.gamepad.buttons[index].value = value
        this.gamepad.timestamp = performance.now() - this.startTime

        if (window.xcloudEmulatedGamepad) {
          window.xcloudEmulatedGamepad.buttons[index] = { ...this.gamepad.buttons[index] }
          window.xcloudEmulatedGamepad.timestamp = this.gamepad.timestamp
        }
      }
    }

    updateAxis(index, value) {
      if (index >= 0 && index < this.gamepad.axes.length) {
        this.gamepad.axes[index] = Math.max(-1, Math.min(1, value))
        this.gamepad.timestamp = performance.now() - this.startTime

        if (window.xcloudEmulatedGamepad) {
          window.xcloudEmulatedGamepad.axes[index] = this.gamepad.axes[index]
          window.xcloudEmulatedGamepad.timestamp = this.gamepad.timestamp
        }
      }
    }

    injectAPI() {
      if (this.injected) return

      const script = document.createElement("script")
      script.textContent = `
        (function() {
          const originalGetGamepads = navigator.getGamepads.bind(navigator);
          const emulatedGamepad = ${JSON.stringify(this.gamepad)};
          
          window.xcloudEmulatedGamepad = emulatedGamepad;
          
          navigator.getGamepads = function() {
            const originalGamepads = originalGetGamepads();
            const result = [window.xcloudEmulatedGamepad, null, null, null];
            
            let slot = 1;
            for (let i = 0; i < originalGamepads.length && slot < 4; i++) {
              if (originalGamepads[i] && originalGamepads[i].connected) {
                result[slot] = originalGamepads[i];
                result[slot].index = slot;
                slot++;
              }
            }
            
            return result;
          };
          
          console.log('Gamepad API: Injected');
        })();
      `

      document.head.appendChild(script)
      script.remove()
      this.injected = true
      window.xcloudEmulatedGamepad = this.gamepad
    }
  }

  // ==================== FIXED TOUCH CONTROLS SYSTEM ====================
  class FixedTouchControlsSystem {
    constructor(configManager, gamepadEmulator) {
      this.config = configManager
      this.gamepadEmulator = gamepadEmulator
      this.container = null
      this.buttons = new Map()
      this.sticks = new Map()
      this.hudEditor = null

      const icons = ModernIcons.getIcons()
      this.buttonConfigs = {
        A: { image: icons.A, gamepadIndex: 0 },
        B: { image: icons.B, gamepadIndex: 1 },
        X: { image: icons.X, gamepadIndex: 2 },
        Y: { image: icons.Y, gamepadIndex: 3 },
        LB: { image: icons.shoulder, gamepadIndex: 4 },
        RB: { image: icons.shoulder, gamepadIndex: 5 },
        LT: { image: icons.trigger, gamepadIndex: 6 },
        RT: { image: icons.trigger, gamepadIndex: 7 },
        SELECT: { image: icons.select, gamepadIndex: 8 },
        START: { image: icons.start, gamepadIndex: 9 },
        HOME: { image: icons.home, gamepadIndex: 16 },
        DPAD_UP: { image: icons.dpad_up, gamepadIndex: 12 },
        DPAD_DOWN: { image: icons.dpad_down, gamepadIndex: 13 },
        DPAD_LEFT: { image: icons.dpad_left, gamepadIndex: 14 },
        DPAD_RIGHT: { image: icons.dpad_right, gamepadIndex: 15 },
        LS: { image: icons.LS, gamepadIndex: 10 },
        RS: { image: icons.RS, gamepadIndex: 11 },
      }
    }

    create() {
      this.container = document.createElement("div")
      this.container.id = "xcloud-touch-controls"
      this.container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 1000000;
        display: none;
      `

      // Add reference to HUD editor
      this.container.hudEditor = new FixedHUDEditor(this.config, this)
      this.hudEditor = this.container.hudEditor

      document.body.appendChild(this.container)

      this.createButtons()
      this.createSticks()

      const device = FixedDeviceDetector.getDeviceInfo()
      console.log(
        `Touch Controls v5.9.1: System created for ${device.deviceType} ${device.screenSize} (DPI: ${device.pixelRatio}, Base: ${device.baseSize.toFixed(1)}px)`,
      )
    }

    createButtons() {
      Object.keys(this.buttonConfigs).forEach((buttonId) => {
        const button = new FixedTouchButton(
          this.container,
          this.config,
          buttonId,
          this.buttonConfigs[buttonId],
          this.gamepadEmulator,
        )
        this.buttons.set(buttonId, button)
      })
    }

    createSticks() {
      ;["LEFT", "RIGHT"].forEach((side) => {
        const stick = new FixedAnalogStick(this.container, this.config, side, this.gamepadEmulator)
        this.sticks.set(side, stick)
      })
    }

    recreateFromScratch() {
      console.log("TouchControls v5.9.1: Recreating with fixed DPI scaling...")

      this.buttons.forEach((button) => button.destroy())
      this.buttons.clear()

      this.sticks.forEach((stick) => stick.destroy())
      this.sticks.clear()

      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container)
        this.container = null
      }

      setTimeout(() => {
        this.container = document.createElement("div")
        this.container.id = "xcloud-touch-controls"
        this.container.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 1000000;
          display: block;
        `

        // Re-add reference to HUD editor
        this.container.hudEditor = this.hudEditor

        document.body.appendChild(this.container)

        this.createButtons()
        this.createSticks()

        console.log("TouchControls v5.9.1: Recreation completed with fixed scaling!")
      }, 10)
    }

    show() {
      if (this.container) {
        this.container.style.display = "block"
        console.log("Touch Controls v5.9.1: Visible")
      }
    }

    hide() {
      if (this.container) {
        this.container.style.display = "none"
        this.sticks.forEach((stick) => {
          stick.forceRelease()
        })
        console.log("Touch Controls v5.9.1: Hidden")
      }
    }

    resetLayout() {
      this.config.resetToDefault()
      this.updateLayout()
      const device = FixedDeviceDetector.getDeviceInfo()
      console.log(`Layout reset to ${device.deviceType} ${device.screenSize} with fixed DPI`)
    }

    updateLayout() {
      this.config.updateLayout()

      this.buttons.forEach((button, buttonId) => {
        const layout = this.config.get("layout").buttons[buttonId]
        if (layout) {
          button.updateLayout(layout)
        }
      })

      this.sticks.forEach((stick, side) => {
        const layout = this.config.get("layout").sticks[side]
        if (layout) {
          stick.updateLayout(layout)
        }
      })
    }

    destroy() {
      this.buttons.forEach((button) => button.destroy())
      this.buttons.clear()

      this.sticks.forEach((stick) => stick.destroy())
      this.sticks.clear()

      if (this.container && this.container.parentNode) {
        this.container.parentNode.removeChild(this.container)
      }

      console.log("Touch Controls v5.9.1: System destroyed")
    }
  }

  // ==================== CREDITS SYSTEM ====================
  class CreditsSystem {
    constructor() {
      this.creditsPanel = null
      this.isVisible = false
    }

    show() {
      if (this.isVisible) return

      const device = FixedDeviceDetector.getDeviceInfo()
      const icons = ModernIcons.getIcons()

      this.creditsPanel = document.createElement("div")
      this.creditsPanel.innerHTML = `
        <div style="
          position: fixed;
          bottom: ${device.safeAreas.bottom + 20}px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.95));
          color: white;
          padding: 20px 25px;
          border-radius: 16px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 13px;
          z-index: 9999997;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          backdrop-filter: blur(20px);
          animation: slideInUp 0.5s ease-out;
          max-width: 90vw;
          text-align: center;
        ">
          <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px;">
            <img src="${icons.credits}" style="width: 24px; height: 24px;">
            <div style="font-size: 16px; font-weight: 600; color: #0078D4;">BetterXCloud Pro v5.9.1</div>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 15px;">
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
              <img src="${icons.settings}" style="width: 18px; height: 18px;">
              <span style="font-weight: 600;">Created by:</span>
              <span style="color: #0078D4; font-weight: 600;">Alexandreios</span>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
              <img src="${icons.discord}" style="width: 18px; height: 18px;">
              <span style="font-weight: 600;">Community:</span>
              <a href="https://discord.gg/safezonee" target="_blank" style="color: #5865F2; text-decoration: none; font-weight: 600;">discord.gg/safezonee</a>
            </div>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
              <img src="${icons.tiktok}" style="width: 18px; height: 18px;">
              <span style="font-weight: 600;">TikTok:</span>
              <span style="color: #FF0050; font-weight: 600;">@Alexandreios</span>
            </div>
          </div>
          
          <div style="font-size: 11px; opacity: 0.7; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 12px;">
            DPI Fixed + Analog Scaling + Slider Working
          </div>
        </div>
        
        <style>
          @keyframes slideInUp {
            from { transform: translateX(-50%) translateY(100%); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
          }
        </style>
      `

      document.body.appendChild(this.creditsPanel)
      this.isVisible = true

      // Auto hide after 8 seconds
      setTimeout(() => {
        this.hide()
      }, 8000)
    }

    hide() {
      if (!this.isVisible || !this.creditsPanel) return

      this.creditsPanel.style.animation = "slideOutDown 0.5s ease-in forwards"

      setTimeout(() => {
        if (this.creditsPanel && this.creditsPanel.parentNode) {
          this.creditsPanel.parentNode.removeChild(this.creditsPanel)
        }
        this.creditsPanel = null
        this.isVisible = false
      }, 500)

      // Add slideOutDown animation
      const style = document.createElement("style")
      style.textContent = `
        @keyframes slideOutDown {
          from { transform: translateX(-50%) translateY(0); opacity: 1; }
          to { transform: translateX(-50%) translateY(100%); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }
  }

  // ==================== FIXED TOGGLE BUTTON ====================
  class FixedToggleButton {
    constructor(configManager, antiAFK, touchControls, gamepadEmulator) {
      this.config = configManager
      this.antiAFK = antiAFK
      this.touchControls = touchControls
      this.gamepadEmulator = gamepadEmulator
      this.creditsSystem = new CreditsSystem()
      this.button = null
      this.resetButton = null
      this.hudEditButton = null

      this.create()
    }

    create() {
      const icons = ModernIcons.getIcons()
      const device = FixedDeviceDetector.getDeviceInfo()

      // Main toggle button
      this.button = document.createElement("div")
      this.button.innerHTML = `
        <img src="${icons.toggle}" style="width: 60px; height: 60px; display: block;">
        <div class="status-indicator" style="
          position: absolute;
          top: -5px;
          right: -5px;
          width: 22px;
          height: 22px;
          background: ${this.config.get("enabled") ? "linear-gradient(135deg, #4CAF50, #2E7D32)" : "linear-gradient(135deg, #F44336, #C62828)"};
          border: 2px solid white;
          border-radius: 50%;
          font-size: 10px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          box-shadow: 0 3px 6px rgba(0,0,0,0.3);
          font-family: system-ui, -apple-system, sans-serif;
        ">${this.config.get("enabled") ? "âœ“" : "âœ—"}</div>
      `

      this.button.style.cssText = `
        position: fixed;
        top: ${device.safeAreas.top + 15}px;
        right: ${device.safeAreas.right + 15}px;
        width: 60px;
        height: 60px;
        cursor: pointer;
        z-index: 9999999;
        user-select: none;
        transition: all 0.3s ease;
        filter: drop-shadow(0 6px 12px rgba(0,0,0,0.3));
        border-radius: 50%;
      `

      // HUD Edit button
      this.hudEditButton = document.createElement("div")
      this.hudEditButton.innerHTML = `<img src="${icons.hudEdit}" style="width: 50px; height: 50px; display: block;">`
      this.hudEditButton.style.cssText = `
        position: fixed;
        top: ${device.safeAreas.top + 85}px;
        right: ${device.safeAreas.right + 20}px;
        width: 50px;
        height: 50px;
        cursor: pointer;
        z-index: 9999999;
        user-select: none;
        transition: all 0.3s ease;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        display: none;
        border-radius: 50%;
      `

      // Reset button
      this.resetButton = document.createElement("div")
      this.resetButton.innerHTML = `<img src="${icons.reset}" style="width: 40px; height: 40px; display: block;">`
      this.resetButton.style.cssText = `
        position: fixed;
        top: ${device.safeAreas.top + 145}px;
        right: ${device.safeAreas.right + 25}px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        z-index: 9999999;
        user-select: none;
        transition: all 0.3s ease;
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
        display: none;
        border-radius: 50%;
      `

      this.setupEventListeners()
      document.body.appendChild(this.button)
      document.body.appendChild(this.hudEditButton)
      document.body.appendChild(this.resetButton)

      console.log("Fixed Toggle Button v5.9.1: Created with working HUD Edit button")
    }

    setupEventListeners() {
      // Main toggle button
      this.button.addEventListener("click", this.toggle.bind(this))
      this.button.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault()
          this.toggle()
        },
        { passive: false },
      )

      // HUD Edit button
      this.hudEditButton.addEventListener("click", this.activateHUDEditor.bind(this))
      this.hudEditButton.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault()
          this.activateHUDEditor()
        },
        { passive: false },
      )

      // Reset button
      this.resetButton.addEventListener("click", this.resetLayout.bind(this))
      this.resetButton.addEventListener(
        "touchstart",
        (e) => {
          e.preventDefault()
          this.resetLayout()
        },
        { passive: false },
      )

      // Hover effects
      this.button.addEventListener("mouseenter", () => {
        this.button.style.transform = "scale(1.05)"
        this.button.style.filter = "drop-shadow(0 8px 16px rgba(0,0,0,0.4))"
      })
      this.button.addEventListener("mouseleave", () => {
        this.button.style.transform = "scale(1)"
        this.button.style.filter = "drop-shadow(0 6px 12px rgba(0,0,0,0.3))"
      })

      this.hudEditButton.addEventListener("mouseenter", () => {
        this.hudEditButton.style.transform = "scale(1.05)"
        this.hudEditButton.style.filter = "drop-shadow(0 6px 12px rgba(255, 107, 53, 0.4))"
      })
      this.hudEditButton.addEventListener("mouseleave", () => {
        this.hudEditButton.style.transform = "scale(1)"
        this.hudEditButton.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
      })

      this.resetButton.addEventListener("mouseenter", () => {
        this.resetButton.style.transform = "scale(1.05)"
        this.resetButton.style.filter = "drop-shadow(0 6px 12px rgba(0,0,0,0.4))"
      })
      this.resetButton.addEventListener("mouseleave", () => {
        this.resetButton.style.transform = "scale(1)"
        this.resetButton.style.filter = "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
      })
    }

    toggle() {
      const newState = !this.config.get("enabled")
      this.config.set("enabled", newState)

      if (newState) {
        this.activate()
      } else {
        this.deactivate()
      }

      this.updateButtonAppearance()
      console.log(`XCloud Pro v5.9.1: ${newState ? "ACTIVATED" : "DEACTIVATED"}`)
    }

    activate() {
      if (this.config.get("antiAFK")) {
        this.antiAFK.start()
      }

      if (this.config.get("touchControls")) {
        this.touchControls.show()
      }

      this.gamepadEmulator.injectAPI()
      this.hudEditButton.style.display = "block"
      this.resetButton.style.display = "block"

      // Show credits on first activation
      setTimeout(() => {
        this.creditsSystem.show()
      }, 1000)
    }

    deactivate() {
      this.antiAFK.stop()
      this.touchControls.hide()
      this.hudEditButton.style.display = "none"
      this.resetButton.style.display = "none"

      if (this.touchControls.hudEditor && this.touchControls.hudEditor.isActive) {
        this.touchControls.hudEditor.deactivate()
      }
    }

    // HUD Editor activation with fixed scaling
    activateHUDEditor() {
      if (this.config.get("enabled") && this.touchControls.hudEditor) {
        this.touchControls.hudEditor.activate()
        this.showNotification(
          "HUD Editor activated! Drag controls to reposition. Slider now works for ALL elements!",
          "#FF6B35",
        )

        if (navigator.vibrate) {
          navigator.vibrate([30, 50, 30])
        }
      }
    }

    resetLayout() {
      const device = FixedDeviceDetector.getDeviceInfo()
      const confirmed = confirm(
        `Reset to default ${device.deviceType} ${device.screenSize} layout?\n\nAll custom positions will be lost.`,
      )

      if (confirmed) {
        this.touchControls.resetLayout()
        this.showNotification(`${device.deviceType} ${device.screenSize} layout applied with fixed DPI!`, "#0078D4")

        if (navigator.vibrate) {
          navigator.vibrate([50, 100, 50])
        }
      }
    }

    showNotification(message, color = "#0078D4") {
      const device = FixedDeviceDetector.getDeviceInfo()
      const icons = ModernIcons.getIcons()

      const notification = document.createElement("div")
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: ${device.safeAreas.top + 200}px;
          right: ${device.safeAreas.right + 15}px;
          background: linear-gradient(135deg, ${color}, ${color}dd);
          color: white;
          padding: 16px 20px;
          border-radius: 12px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 13px;
          z-index: 9999998;
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
          animation: slideInRight 0.5s ease-out;
          max-width: 280px;
          display: flex;
          align-items: center;
          gap: 12px;
          backdrop-filter: blur(10px);
        ">
          <img src="${icons.credits}" style="width: 18px; height: 18px;">
          ${message}
        </div>
        <style>
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        </style>
      `

      document.body.appendChild(notification)
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 4500)
    }

    updateButtonAppearance() {
      const indicator = this.button.querySelector(".status-indicator")
      const enabled = this.config.get("enabled")

      indicator.style.background = enabled
        ? "linear-gradient(135deg, #4CAF50, #2E7D32)"
        : "linear-gradient(135deg, #F44336, #C62828)"
      indicator.textContent = enabled ? "âœ“" : "âœ—"

      this.hudEditButton.style.display = enabled ? "block" : "none"
      this.resetButton.style.display = enabled ? "block" : "none"
    }

    updatePosition() {
      const device = FixedDeviceDetector.getDeviceInfo()

      this.button.style.right = `${device.safeAreas.right + 15}px`
      this.button.style.top = `${device.safeAreas.top + 15}px`

      this.hudEditButton.style.right = `${device.safeAreas.right + 20}px`
      this.hudEditButton.style.top = `${device.safeAreas.top + 85}px`

      this.resetButton.style.right = `${device.safeAreas.right + 25}px`
      this.resetButton.style.top = `${device.safeAreas.top + 145}px`
    }
  }

  // ==================== GAME DETECTION SYSTEM ====================
  class GameDetectionSystem {
    constructor(toggleButton) {
      this.toggleButton = toggleButton
      this.isInGame = false
      this.checkInterval = null

      this.gameSelectors = [
        '[data-testid="game-stream"]',
        'canvas[data-testid="game-canvas"]',
        '[class*="GameStream"]',
        '[class*="game-stream"]',
        'video[class*="game"]',
        "#game-stream",
        ".game-container canvas",
        '[id*="gameContainer"]',
        '[class*="streaming"]',
        "canvas[width][height]",
      ]

      this.gameUrlPatterns = ["/launch/", "/play/", "/streaming/", "gamepass", "/games/"]
    }

    start() {
      this.checkInterval = setInterval(() => {
        this.checkGameState()
      }, 2000)

      this.checkGameState()
      console.log("Game Detection: System started")
    }

    stop() {
      if (this.checkInterval) {
        clearInterval(this.checkInterval)
        this.checkInterval = null
      }
      console.log("Game Detection: System stopped")
    }

    checkGameState() {
      const wasInGame = this.isInGame
      this.isInGame = this.detectGame()

      if (this.isInGame && !wasInGame) {
        this.onGameStart()
      } else if (!this.isInGame && wasInGame) {
        this.onGameEnd()
      }
    }

    detectGame() {
      const currentUrl = window.location.href.toLowerCase()
      const hasGameUrl = this.gameUrlPatterns.some((pattern) => currentUrl.includes(pattern))

      const hasGameElement = this.gameSelectors.some((selector) => {
        const element = document.querySelector(selector)
        return element !== null && element.offsetParent !== null
      })

      const hasStreamingIndicators =
        document.querySelector('[class*="streaming"]') !== null ||
        document.querySelector('[data-testid*="stream"]') !== null ||
        (document.querySelector("canvas") !== null &&
          document.querySelector("canvas").width > 100 &&
          document.querySelector("canvas").height > 100)

      return hasGameUrl || hasGameElement || hasStreamingIndicators
    }

    onGameStart() {
      const device = FixedDeviceDetector.getDeviceInfo()
      console.log(
        `Game Detection: Game detected! Auto-activating ${device.deviceType} ${device.screenSize} controls v5.9.1...`,
      )

      if (!this.toggleButton.config.get("enabled")) {
        setTimeout(() => {
          this.toggleButton.toggle()
          this.toggleButton.showNotification(
            `${device.deviceType} ${device.screenSize} controls v5.9.1 activated with fixed DPI!`,
            "#0078D4",
          )
        }, 2000)
      }
    }

    onGameEnd() {
      console.log("Game Detection: Game ended")
    }
  }

  // ==================== MAIN INITIALIZATION ====================
  function initializeXCloudProEnhancedFixed() {
    console.log("BetterXCloud Pro Enhanced v5.9.1: DPI Fixed + Analog Scaling initializing...")

    try {
      const configManager = new ConfigManager()
      const antiAFK = new AntiAFKSystem()
      const gamepadEmulator = new GamepadEmulator()
      const touchControls = new FixedTouchControlsSystem(configManager, gamepadEmulator)
      const toggleButton = new FixedToggleButton(configManager, antiAFK, touchControls, gamepadEmulator)
      const gameDetection = new GameDetectionSystem(toggleButton)

      touchControls.create()
      gameDetection.start()

      let resizeTimeout
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
          console.log("Resize detected: Recalculating fixed DPI layout...")

          toggleButton.updatePosition()
          configManager.updateLayout()
          touchControls.updateLayout()

          const device = FixedDeviceDetector.getDeviceInfo()
          console.log(`Layout ${device.deviceType} ${device.screenSize} updated with fixed DPI`)
        }, 250)
      })

      window.addEventListener("orientationchange", () => {
        setTimeout(() => {
          console.log("Orientation changed: Recalculating fixed DPI layout...")
          configManager.updateLayout()
          touchControls.updateLayout()
          toggleButton.updatePosition()
        }, 500)
      })

      let lastUrl = location.href
      const urlObserver = new MutationObserver(() => {
        const url = location.href
        if (url !== lastUrl) {
          lastUrl = url
          setTimeout(() => gameDetection.checkGameState(), 1000)
        }
      })
      urlObserver.observe(document, { subtree: true, childList: true })

      window.addEventListener("error", (e) => {
        console.warn("XCloud Pro Enhanced v5.9.1: Error captured:", e.error)
      })

      window.addEventListener("beforeunload", () => {
        gameDetection.stop()
        touchControls.destroy()
      })

      console.log("BetterXCloud Pro Enhanced v5.9.1: System initialized successfully with fixed DPI!")

      const device = FixedDeviceDetector.getDeviceInfo()
      const icons = ModernIcons.getIcons()

      const notification = document.createElement("div")
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: ${device.safeAreas.top + 80}px;
          right: ${device.safeAreas.right + 15}px;
          background: linear-gradient(135deg, rgba(0, 120, 212, 0.95), rgba(0, 90, 158, 0.95));
          color: white;
          padding: 20px 25px;
          border-radius: 16px;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 14px;
          z-index: 9999998;
          box-shadow: 0 8px 25px rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.2);
          animation: slideInBounce 0.6s ease-out;
          max-width: 320px;
          backdrop-filter: blur(15px);
        ">
          <div style="display: flex; align-items: center; margin-bottom: 12px;">
            <img src="${icons.toggle}" style="width: 24px; height: 24px; margin-right: 12px;">
            <strong style="font-size: 16px;">BetterXCloud Pro v5.9.1</strong>
          </div>
          <div style="font-size: 12px; opacity: 0.95; line-height: 1.4; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <img src="${icons.settings}" style="width: 14px; height: 14px;">
              <strong>DPI FIXED - Real pixel scaling</strong>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <img src="${icons.hudEdit}" style="width: 14px; height: 14px;">
              <strong>ANALOG SCALING - Sticks respect slider</strong>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
              <img src="${icons.credits}" style="width: 14px; height: 14px;">
              <strong>SLIDER WORKING - 0.5x to 2.5x range</strong>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <img src="${icons.reset}" style="width: 14px; height: 14px;">
              <strong>Perfect for ${device.deviceType.toUpperCase()} ${device.screenSize.toUpperCase()}</strong>
            </div>
          </div>
          <div style="margin-top: 12px; font-size: 11px; opacity: 0.8; border-top: 1px solid rgba(255,255,255,0.2); padding-top: 8px;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <img src="${icons.toggle}" style="width: 12px; height: 12px;">
              <span>Click blue button to activate</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
              <img src="${icons.hudEdit}" style="width: 12px; height: 12px;">
              <span>Orange button = HUD Editor (slider works!)</span>
            </div>
          </div>
        </div>
        <style>
          @keyframes slideInBounce {
            0% { transform: translateX(100%) scale(0.8); opacity: 0; }
            60% { transform: translateX(-10px) scale(1.02); opacity: 1; }
            100% { transform: translateX(0) scale(1); opacity: 1; }
          }
        </style>
      `

      document.body.appendChild(notification)
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.animation = "slideOutRight 0.5s ease-in forwards"
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification)
            }
          }, 500)
        }
      }, 15000)

      const style = document.createElement("style")
      style.textContent = `
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    } catch (error) {
      console.error("BetterXCloud Pro Enhanced v5.9.1: Initialization error:", error)
    }
  }

  // ==================== STARTUP SEQUENCE ====================
  function waitForPageReady() {
    if (document.body && document.readyState !== "loading") {
      setTimeout(initializeXCloudProEnhancedFixed, 1000)
    } else {
      setTimeout(waitForPageReady, 100)
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitForPageReady)
  } else {
    waitForPageReady()
  }
})()