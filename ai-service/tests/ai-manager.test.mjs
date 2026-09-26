import assert from 'node:assert/strict';
import { AIManager } from '../dist/ai-manager.js';

describe('AIManager.remainingModelTimeoutMs', () => {
    it('returns the full budget when nothing was spent yet', () => {
        assert.equal(AIManager.remainingModelTimeoutMs(120_000, 1_000, 1_000), 120_000);
    });

    it('subtracts the time elapsed since the request started', () => {
        assert.equal(AIManager.remainingModelTimeoutMs(120_000, 1_000, 15_000), 106_000);
    });

    it('reaches zero exactly when the budget is spent', () => {
        assert.equal(AIManager.remainingModelTimeoutMs(120_000, 1_000, 121_000), 0);
    });

    it('goes negative once the gateway deadline has passed', () => {
        assert.ok(AIManager.remainingModelTimeoutMs(120_000, 1_000, 200_000) < 0);
    });

    it('defaults `now` to the current time', () => {
        const startedAt = Date.now() - 5_000;
        const remaining = AIManager.remainingModelTimeoutMs(120_000, startedAt);
        assert.ok(remaining > 110_000 && remaining <= 115_000);
    });
});
