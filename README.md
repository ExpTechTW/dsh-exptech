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

### 1. 透過 GitHub 直接安裝 (推薦)
如果您使用的是支援插件系統的 DSH 環境，直接執行：

```bash
dsh plugin --profile web add -w github:ExpTechTW/dsh-exptech
```

### 2. 透過 Git Clone 與本地連結 (開發者推薦)
如果您希望在本地進行開發或需要手動控制：

```bash
# 1. 克隆儲存庫
git clone https://github.com/ExpTechTW/dsh-exptech.git
cd dsh-exptech

# 2. 安裝依賴 (如有)
pnpm install

# 3. 使用本地路徑安裝至 DSH
# Windows (PowerShell)
dsh plugin --profile web add -w link:$PWD

# macOS / Linux (Bash)
dsh plugin --profile web add -w link:$(pwd)
```

### 3. 透過本地目錄安裝 (手動)
如果您已下載檔案，可使用 `link:` 語法：

```bash
dsh plugin --profile web add -w link:/您的/本地/路徑/dsh-exptech
```

### 4. 其他方式
- **使用 DSH 創造模式**：在 DSH 中執行 `preset_copy("standard", "exptech")` 後手動覆蓋檔案。
- **直接複製**：將本儲存庫的所有檔案複製到您的 DSH 本地模式目錄：
  `${DSH_HOME:-$HOME/.dsh}/.agent-presets/exptech/`

> [!IMPORTANT]
> 安裝完成後，請務必執行下方的 **「重啟」** 步驟以確保模式生效。

---

## 🔄 重啟 (Restart)

> [!IMPORTANT]
> 安裝完成後，**必須**重新啟動 DSH Web Profile 才能在選單中看到新模式。

請執行以下指令：

```bash
dsh --profile web
```

---

## 📂 開啟 (Open)

安裝並重啟後，請在 DSH Web GUI 中透過以下路徑切換模式：

**設定 $\to$ 模式選單 $\to$ 「ExpTechTW 模式」**

---

## ❓ 常見問題 (FAQ)

**Q: 安裝後在模式選單找不到「ExpTechTW 模式」？**
**A:** 請檢查您是否已完成「重啟」步驟。DSH 需要重新啟動後才會讀取新的預設模式配置。

---

## 📁 套件結構 (Structure)

本模式包含以下目錄結構：

```text
├── agent.cordis.yml    # 基於 Cordis 標準的 Agent 配置
├── preset.yml          # 模式顯示名稱與簡介
├── skills/             # 內建技能
│   ├── exptech-org/    # 組織概覽技能 (專案地圖、開發慣例、協作流程)
│   └── exptech-apis/   # API 知識庫技能 (地震、氣象、Tiles 等端點目錄)
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
