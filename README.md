# 🚀 dsh-exptech

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
[![Org: ExpTechTW](https://img.shields.io/badge/Org-ExpTechTW-orange)](https://github.com/ExpTechTW)

為 [ExpTechTW (探索科技)](https://github.com/ExpTechTW) 量身打造的 **"ExpTechTW 模式"agent (DeepSeek Harness Agent Preset)**。

這不只是一個插件，它是一個完整的 **「模式 (Mode)」**。當您啟用此模式時，DSH Agent 會立即轉變為專精於 ExpTechTW 組織知識、API 規範與開發慣例的專家。

---

## 🎯 核心價值

透過整合組織內的慣例、API 文檔與專案地圖，此模式能讓 DSH Agent 具備：

- 🗺️ **專案導航**：快速定位組織內的 196+ 個公開倉庫。
- 🛠️ **標準化開發**：遵循組織指定的 `mise` 工具鏈、Commit 格式與文件分工。
- 📡 **API 專家**：內建地震 EEW/RTS、氣象 v5、Tiles 等 API 端點目錄。
- 🤝 **組織意識**：具備 zh-TW 優先的語言偏好與強烈的組織協作意識。

---

## 📥 如何啟用「ExpTechTW 模式」 (推薦方式)

**如果您希望在 DSH Web GUI 的「模式選單」中看到新選項，請使用以下任一方式。**

### 1. 手動複製模式檔案 (最穩定)

這是最直接的方式，將模式定義直接放入 DSH 的預設目錄中：

```bash
# 1. 克隆儲存庫
git clone https://github.com/ExpTechTW/dsh-exptech.git
cd dsh-exptech

# 2. 將檔案複製到您的 DSH 預設目錄
# Windows (PowerShell)
Copy-Item -Path "*" -Destination "$env:USERPROFILE\.dsh\.agent-presets\exptech" -Recurse -Force

# macOS / Linux (Bash)
cp -r . ~/.dsh/.agent-presets/exptech
```

### 2. 使用 DSH 內部指令

如果您已經在 DSH 環境中，可以使用以下步驟：

1. 在 DSH 控制台執行：`preset_copy("standard", "exptech")`
2. 將本儲存庫的內容覆蓋至該目錄。

---

## 🛠️ 進階：作為「插件 (Plugin)」安裝

如果您**不想切換模式**，只想讓目前的 Agent 擁有 ExpTechTW 的能力（例如新增 API 工具或技能），請使用傳統的插件安裝方式：

```bash
dsh plugin --profile web add -w github:ExpTechTW/dsh-exptech
```
> [!NOTE]
> **使用此方式安裝後，模式選單不會出現新選項。** 您只能透過呼叫特定的技能或工具來使用其功能。

---

## 🔄 重啟 (Required)

**無論使用哪種方式安裝，都必須重新啟動 DSH Web Profile 才能生效！**

請執行以下指令：
```bash
dsh --profile web
```

---

## 📂 開啟與切換 (Usage)

重啟後，請在 DSH Web GUI 中切換：

**設定 $\to$ 模式選單 $\to$ 「ExpTechTW 模式」**

---

## ❓ 常見問題 (FAQ)

**Q: 我用 `dsh plugin add` 安裝了，但模式選單沒出現「ExpTechTW 模式」？**
**A:** 因為 `dsh plugin add` 是將其安裝為「插件 (Plugin)」，這只會增加 Agent 的能力，不會改變其「身份」。若要顯示新模式，請參考上方「如何啟用模式」章節。

**Q: 「插件 (Plugin)」與「模式 (Mode)」有什麼差別？**
**A:** 
- **插件**：像是在您的工具箱裡增加了一把新扳手。您可以用它，但您的身份沒變。
- **模式**：像是換了一個專業身份（例如從「一般維修工」變成「ExpTech 專屬工程師」）。換了身份後，您不僅擁有新的工具，還會自動遵循相關的規範與知識。

---

## 📁 套件結構 (Structure)

```text
├── agent.cordis.yml    # 基於 Cordis 標準的 Agent 配置
├── preset.yml          # 模式顯示名稱與簡介
├── skills/             # 內建技能
│   ├── exptech-org/    # 組織概覽技能
│   └── exptech-apis/   # API 知識庫技能
```

---

## 🔗 重要連結

- [DPIP API 文檔](https://github.com/ExpTechTW/DPIP/blob/main/api.md)
- [ExpTech API 技術文件](https://exptechtw.github.io/api-docs/)
- [ExpTechTW GitHub Organization](https://github.com/ExpTechTW)

---

## ⚖️ 授權

本專案採用 [GNU AGPL-3.0](LICENSE) 授權。
