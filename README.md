# 🚀 dsh-exptech

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Org: ExpTechTW](https://img.shields.io/badge/Org-ExpTechTW-orange)](https://github.com/ExpTechTW)

為 [ExpTechTW (探索科技)](https://github.com/ExpTechTW) 公開組織量身打造的 **DeepSeek Harness (DSH) Agent 預設模式 (Preset)**。

我們的目標是：**「讓開發 ExpTech 專案變得更簡單、更高效」**。

---

## ✨ 核心價值

透過整合組織內的慣例、API 文檔與專案地圖，本模式能讓 DSH Agent 具備以下能力：

- 🗺️ **專案導航**：快速定位組織內的 196+ 個公開倉庫（DPIP、TREM、API 等）。
- 🛠️ **標準化開發**：遵循組織指定的 `mise` 工具鏈、Commit 格式與文件分工。
- 📡 **API 專家**：內建整理好的公共 API 端點目錄（地震 EEW/RTS、氣象 v5、Tiles、裝置通知等），無需手動查閱大量文檔。
- 🤝 **組織意識**：具備 zh-TW 優先的語言偏好與強烈的組織協作意識。

---

## 📁 內容結構

本儲存庫包含一個完整的 `exptech/` 模式目錄：

| 路徑 | 說明 |
| :--- | :--- |
| `agent.cordis.yml` | 基於 Cordis 標準的 Agent 配置，強化了 ExpTech 人設與組織技能。 |
| `preset.yml` | 模式的顯示名稱與簡介。 |
| `skills/exptech-org/` | **組織概覽技能**：包含專案地圖、開發慣例（mise、commit 規範）與協作流程。 |
| `skills/exptech-apis/` | **API 知識庫技能**：整合了地震、氣象、Tiles 等公共 API 端點、區域規則與官方文件入口。 |

---

## 📥 安裝指南

您可以選擇以下任一方式安裝：

### 方法 A：直接複製 (推薦)
將 `exptech/` 資料夾整個複製到您的 DSH 本地模式目錄：
`${DSH_HOME:-$HOME/.dsh}/.agent-presets/exptech/`

### 方法 B：使用 DSH 創造模式
1. 在 DSH 中使用「創造模式」啟動。
2. 執行命令：`preset_copy("standard", "exptech")` 建立骨架。
3. 將本儲存庫中的檔案覆蓋至生成的目錄中。

### 方法 C：透過 DSH Plugin 安裝
如果您使用的是支援插件系統的 DSH 環境，可執行以下命令直接安裝：

```bash
dsh plugin --profile web add https://github.com/ExpTechTW/dsh-exptech/archive/refs/heads/main.tar.gz
```

*(註：安裝後，Agent 將以 `dsh-exptech` 名稱載入功能。)*

> [!IMPORTANT]
> 安裝完成後，請從 DSH 模式選單中選擇 **「ExpTechTW 模式」** 來開啟新的對話。

---

## 🚀 使用範例

- **探索專案**：「幫我找一下 ExpTechTW 裡關於地震數據處理的專案有哪些？」(觸發 `exptech-org`)
- **呼叫 API**：「我想用 API 取得最新的地震速報 (EEW)，請告訴我端點與參數。」(觸發 `exptech-apis`)
- **遵循規範**：「幫我寫一個關於修改 API 邏輯的 commit message。」(Agent 會自動遵循組織規範)

---

## 🔗 重要連結

- [DPIP API 文檔](https://github.com/ExpTechTW/DPIP/blob/main/api.md)
- [ExpTech API 技術文件](https://exptechtw.github.io/api-docs/)
- [ExpTechTW GitHub Organization](https://github.com/ExpTechTW)

---

## ⚖️ 授權

本專案採用 [GNU AGPL-3.0](LICENSE) 授權。
