# dsh-exptech

為 [ExpTechTW（探索科技）](https://github.com/ExpTechTW) 公開組織打造的 **DeepSeek Harness（DSH）Agent preset／模式**，目標是「讓開發 ExpTech 更簡單」。

## 內容

本儲存庫是一份可安裝的 Agent 模式（`exptech/`）：

- `exptech/agent.cordis.yml` — 以 DSH 標準模式（功能完整的編碼 Agent）為底的 Cordis 組成，加入 ExpTechTW 人設（zh-TW 優先、組織意識）與組織技能。
- `exptech/preset.yml` — 模式顯示名稱與說明。
- `exptech/skills/exptech-org/` — 組織速覽：專案地圖（DPIP／TREM／API 等 196+ 公開倉庫）、開發慣例（mise 工具鏈、commit 格式、文件分工）、協作流程。
- `exptech/skills/exptech-apis/` — **已整理的可用公共 API 端點目錄**：主機／區域規則（lb / core / static / api-1）、地震 EEW／RTS（含 SSE + gzip）、tiles、氣象 v5、裝置通知、舊 api-1 端點、外部端點，以及官方文件位置（DPIP `api.md`、`api-docs` 入口、`ExpTechTW/API` docs）。

## 安裝

把 `exptech/` 資料夾複製到 DSH 的本地模式根目錄（即 `${DSH_HOME:-$HOME/.dsh}/.agent-presets/exptech/`），或在本機 DSH 的「創造模式」中用 `preset_copy("standard", "exptech")` 建骨架後覆蓋上述檔案。安裝後從模式選單選擇「ExpTechTW 模式」開新對話。

> 注意：模式根目錄在工作區之外，寫入時若遇到沙箱限制，需要授權寫入 `.agent-presets/`。

## 使用

- 處理 ExpTechTW 任一公開倉庫時，Agent 會自動載入 `exptech-org`（慣例與地圖）。
- 開發／呼叫公共 API（地震速報、氣象、tiles、通知、舊端點）時，載入 `exptech-apis` 查端點目錄，再以官方文件與 curl 實測驗證。
- 新端點或清單一律以官方文件（[DPIP `api.md`](https://github.com/ExpTechTW/DPIP/blob/main/api.md)、[ExpTech API 技術文件](https://exptechtw.github.io/api-docs/)）與 GitHub API 為準。

## 授權

本儲存庫採用 [GNU AGPL-3.0](LICENSE)，與組織多數專案一致。
