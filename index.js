const path = require('node:path');

module.exports = {
  apply(ctx) {
    return ctx.effect(async () => {
      const presetId = 'dsh-exptech';
      const displayName = 'ExpTechTW 模式';
      const sourceDir = __dirname;

      console.log(`[ExpTechTW] Attempting to install preset '${presetId}' from '${sourceDir}'...`);

      try {
        await ctx.agentPresets.copy(sourceDir, presetId, displayName);
        console.log(`[ExpTechTW] Successfully installed preset: ${displayName}`);
      } catch (error) {
        console.error(`[ExpTechTW] Failed to install preset '${presetId}':`, error);
        throw error;
      }
    }, 'Installing ExpTechTW 模式 preset');
  }
};
