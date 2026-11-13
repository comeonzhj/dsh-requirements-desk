/**
 * Host half of the Requirements Desk bundle.
 * The Client half owns all rendering; this half only serves the Feishu data
 * bridge and exposes no Agent tools.
 */
import { applyRequirementsDesk } from './server.mjs'

export const name = 'requirements-desk'

export function apply(ctx, config = {}) {
  return applyRequirementsDesk(ctx, config)
}
