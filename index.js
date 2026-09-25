// Legacy preset-install plugin — superseded.
//
// This file used to call `ctx.agentPresets.copy(sourceDir, 'dsh-exptech', ...)` to
// install the preset into the old `~/.dsh/.agent-presets/exptech/` directory
// mechanism, which DSH no longer reads. The `exptech` agent preset is now
// declared by the bundle patch `agent.cordis.yml` (`dsh.bundle.patch`) and is
// installed/activated through `plugin_manager install_bundle` — nothing mounts
// this entry point anymore, so it is kept only as documentation.
