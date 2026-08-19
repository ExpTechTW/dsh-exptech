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

## 📥 安裝 (Installation)

您可以選擇以下任一方式安裝：

### 透過 GitHub 安裝 (推薦)
如果您使用的是支援插件系統的 DSH 環境，可執行以下簡化指令：

```bash
dsh plugin --profile web add -w github:ExpTechTW/dsh-exptech
```

### 透過本地目錄安裝
如果您已將本儲存庫下載至本地，可使用 `link:` 語法安裝：

```bash
dsh plugin --profile web add -w link:/您的/本地/路徑/dsh-exptech
```

### 其他方式
- **使用 DSH 創造模式**：在 DSH 中執行 `preset_copy("standard", "exptech")` 後手動覆蓋檔案。
- **直接複製**：將 `exptech/` 資料夾複製到您的 DSH 本地模式目錄：
  `${DSH_HOME:-$HOME/.dsh}/.agent-presets/exptech/`

> [!IMPORTANT]
> 安裝完成後，請務必執行下方的 **「重啟」** 步驟以確保模式生效。

---

## 🔄 重啟 (Restart)

安裝完成後，請重新啟動 DSH Web Profile 以載入新模式：

```bash
dsh --profile web
```

---

## 📂 開啟 (Open)

安裝並重啟後，您可以在 GUI 中透過以下路徑開啟：

**設定 $\to$ 模式選單 $\to$ 「ExpTechTW 模式」**

---

## 📁 套件結構 (Structure)

本模式包含以下目錄結構：

```text
exptech/
├── agent.cordis.yml    # 基於 Cordis 標準的 Agent 配置
├── preset.yml          # 模式顯示名稱與簡介
└── skills/
    ├── exptech-org/    # 組織概覽技能 (專案地圖、開發慣例、協作流程)
    └── exptech-apis/   # API 知識庫技能 (地震、氣象、Tiles 等端點目錄)
```

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
