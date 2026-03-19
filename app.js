// MilesWeb cPanel Node.js Entry Point
// Disables built-in fetch (undici/WebAssembly) which crashes on CloudLinux shared hosting
// This MUST be set before requiring any other modules

// Fix: CloudLinux restricts WebAssembly — disable Node.js built-in fetch to prevent crash
// (undici's lazyllhttp.wasm fails to allocate on shared hosting memory limits)
if (typeof globalThis.fetch !== 'undefined') {
  delete globalThis.fetch;
}
process.env.NODE_NO_NATIVE_FETCH = '1';

// Load the production build
require('./dist/index.cjs');
