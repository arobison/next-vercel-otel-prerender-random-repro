import { registerOTel } from '@vercel/otel';

export function register() {
  // Default config: instrumentations: ['auto'] includes @vercel/otel's
  // fetch/http instrumentation.
  registerOTel({ serviceName: 'repro' });
}
