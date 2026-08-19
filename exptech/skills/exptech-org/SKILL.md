---
name: exptech-org
description: ExpTechTW（探索科技）GitHub 組織的專案地圖、開發慣例與協作流程；處理其任一公開倉庫、加入開發或討論 ExpTech 專案時使用。
---

# ExpTechTW 組織速覽

- **組織**：[ExpTechTW（探索科技 / ExpTech Studio）](https://github.com/ExpTechTW)，臺灣本土開源團隊。官網 [exptech.com.tw](https://exptech.com.tw/)（[exptech.dev](https://exptech.dev/) 為 DPIP 官網），Discord 社群 [ExpTech Studio](https://discord.gg/exptech-studio)。
- **規模**：約 196 個公開儲存庫；多數採用 **AGPL-3.0**（例外：DPIP 使用自家 *DPIP Public License*，source-available 授權，禁止商業使用與競爭產品）。
- **文件語言**：README／文件一律**繁體中文**；程式碼、commit 用英文。
- **儲存庫模板**：`ExpTechTW/Example`（is_template），開新專案以此為底。
- **命名**：`<平台>-<功能>`（如 `Nukkit-PingTag`、`Spigot-PingTag`）與 `TREM-*` 系列。

# 專案地圖（代表性，非窮舉）

以 `https://api.github.com/orgs/ExpTechTW/repos` 為最新完整清單來源；下列是主要專案：

| 專案 | 說明 | 技術棧 | 狀態 |
|---|---|---|---|
| [DPIP](https://github.com/ExpTechTW/DPIP) | 防災資訊整合平台（旗艦）：地震速報、即時震度、天氣、颱風、災害示警 | Flutter / Dart，`main` 每次 commit 出快照版 | 活躍，250+ stars，商店版才穩定 |
| [TREM-tauri](https://github.com/ExpTechTW/TREM-tauri) | 臺灣即時地震監測（TREM），Tauri 桌面版 | Vue 3 + Rust/Tauri | **archived**（154 stars） |
| [TREM-electron](https://github.com/ExpTechTW/TREM-electron) | TREM Electron 版 | JavaScript/Electron | archived |
| [TREM-Lite / TREM-Lite-v2](https://github.com/ExpTechTW/TREM-Lite-v2) | TREM 輕量版 | JavaScript/Electron | archived |
| [API](https://github.com/ExpTechTW/API) | 舊多用途 API 接口（api-1）原始碼 | Python（aiohttp 系） | 文件在 `docs/main.md`（master），逐步淘汰 |
| [Discord-Bot-Public](https://github.com/ExpTechTW/Discord-Bot-Public) | Discord 機器人公共模板 | Python（discord.py 系） | 模板 |
| [aiohttp-route-dec](https://github.com/ExpTechTW/aiohttp-route-dec) | aiohttp 路由解碼工具函式庫 | Python | 工具庫 |
| Minecraft 插件群 | `Nukkit-*`、`Spigot-*`、`BDS-AntiCheat`、`API-AntiCheat`（Python 服務）等 | Java / JavaScript / Python | 早期（2021–2022） |
| [Rocket](https://github.com/ExpTechTW/Rocket) | 火箭計畫原始碼 | C++ / Arduino | 早期 |
| TREM-Net | 自建測站網路（SE-Net 強震 + MS-Net 微震），非 GitHub 專案 | 硬體 + 雲端 | 自 2022-06 營運 |

核心資料來源：交通部中央氣象署（CWA）、日本氣象廳（JMA）、國家災害防救科技中心（NCDR）、政府開放資料；App 內「即時震度」是 TREM-Net 實測。

# 開發慣例（以 DPIP 為準，其他 repo 先讀其 README）

- **工具鏈**：DPIP 用 [mise](https://mise.jdx.dev/) 釘選 Flutter 版本；**一定要用 `tool/run.sh` / `tool/run.ps1` 啟動**（`tool/dev/` 下是建置／測試／格式化等腳本），CI 會擋裸 `flutter` / `dart` / `mise exec`；debug 版會拒絕非腳本啟動。
  - 建置：`tool/dev/build.sh android|bundle|ios`；測試 `tool/dev/test.sh`；推送前跑 `tool/check.sh`（= CI 全關卡）。
- **Commit**：先讀 `commit.md`（該 repo）——commit 訊息會直接變成更新日誌，格式不合 CI 擋下。**不要自創格式。**
- **PR 流程**：Fork → 新分支 → PR；模板與慣例見各 repo README 的「參與方式」。
- **文件分工（不重複）**：`AGENTS.md`（工具鏈、推送前驗證清單、版本規則）、`ARCHITECTURE.md`（結構與契約）、`DESIGN.md`（設計 token）、`api.md`（API 端點對照）、`commit.md`。改文件前先看是哪一份的職責。
- **授權提醒**：DPIP 是 source-available；其他多為 AGPL-3.0。引用或改寫程式碼時先確認目標 repo 的 LICENSE。

# 協作守則

1. 涉及具體 repo 時，先 clone 或抓官方文件（`raw.githubusercontent.com/ExpTechTW/<repo>/<branch>/...`），以實際內容為準，不要憑記憶。
2. 需要最新資料（倉庫清單、release、端點可用性）時，直接呼叫 GitHub API（`api.github.com`）或官方文件；不要在對話中假設。
3. 公共 API 的端點目錄、主機與串流格式見 **`exptech-apis`** 技能。
4. TREM／DPIP 的資料僅供參考，最終以中央氣象署為主；使用 TREM 服務需遵守官方規範（可能列黑名單）。
