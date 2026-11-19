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

## 🚀 安裝方式：模式 (Mode) vs. 插件 (Plugin)

根據您的需求，您可以選擇將 ExpTechTW 的能力以「模式」或「插件」的形式加入 DSH。

| 特性 | **模式 (Mode / Agent Preset)** | **插件 (Plugin)** |
| :--- | :--- | :--- |
| **主要用途** | 改變 Agent 的**身份**與核心設定 (Persona, Instructions) | 增加 Agent 的**能力** (Tools, Skills) |
| **GUI 表現** | 出現在「模式選單」中可直接切換 | 不會改變選單，僅增加可用工具 |
| **安裝難度** | 低 (用插件管理器安裝本 bundle) | 極低 (單行指令) |
| **推薦情境** | 您想要完全體驗 ExpTechTW 的開發體驗 | 您只想在現有任務中偶爾使用其 API 或知識 |

---

### 📥 方式 1：啟用「ExpTechTW 模式」 (推薦)

本儲存庫是一個 **Agent Preset bundle**：`package.json` 的 `dsh.bundle.patch` 指向 `agent.cordis.yml`，其中以 Loader patch 的 `insert` 宣告了 `preset-exptech` 列（`@deepseek-ai/dsh-agent-preset`），並把全部子插件行內建在該宣告的 `plugins` 清單中。安裝後，DSH 的模式選單就會出現「ExpTechTW 模式」。

#### A. 透過 DSH 插件管理器安裝（推薦）

在 DSH Web GUI 的「設定 → 插件」頁，或由 Agent 執行 `plugin_manager` 工具 `install_bundle`，以本儲存庫的絕對路徑（bundle 目錄）安裝：

```text
plugin_manager install_bundle, target = 本儲存庫的絕對路徑（例如 <工作區>/dsh-exptech）
```

安裝會把 bundle 加入 profile 並啟用 `preset-exptech` 宣告列；宣告啟用後，模式選單即可選擇「ExpTechTW 模式」。若宣告啟動失敗，插件頁會顯示診斷，可修正後重裝。

> [!NOTE]
> 舊版的「手動部署」方式（複製到 `~/.dsh/.agent-presets/exptech/` 目錄，或 `preset_copy("standard", "exptech")` 指令）是 **legacy preset-directory** 機制，DSH 已不再讀取該目錄；本 bundle 即為其現代替代，安裝請走 bundle 流程。

---

### 🛠️ 方式 2：只在現有 Agent 中使用 ExpTechTW 能力

如果不切換模式，只想讓目前的 Agent 擁有 ExpTechTW 的能力（例如呼叫 `exptech-org` / `exptech-apis` 技能或相關工具），可以：

1. 以同一 bundle 安裝後，在新會話的模式選單切換到「ExpTechTW 模式」使用；或
2. 手動啟用本儲存庫 `skills/exptech-org` 與 `skills/exptech-apis` 的 `SKILL.md`（將其目錄加入 `skill-filesystem` 的 `customSkillDirs`，或直接引用其內容）。

> [!NOTE]
> 使用方式 2 時，Agent 的身份與工具集不變，只有 ExpTechTW 的知識/技能被加入。

---

## 🔄 生效方式 (Required)

**安裝後需要讓 profile 重新載入組合才能生效。** 本 profile 啟用了 HMR，`install_bundle` 會即時套用（回報 `application: applied`）；若模式選單沒有出現新選項，**請重新啟動 DSH Web Profile**：

```bash
dsh --profile web
```

新開的會話會使用更新後的定義；已經開啟的舊會話保留它啟動時使用的組合。

> [!TIP]
> 若安裝後看到 `application: restart-required` 或 `restartReason: "package-moved"` 的提示（例如 bundle 從系統內建位置改為指向本儲存庫目錄），這代表 DSH 核心依賴已變更，**必須重啟 DSH** 才能載入新的模式定義；重啟後模式選單才會出現「ExpTechTW 模式」。

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
├── package.json        # dsh.bundle.patch → agent.cordis.yml（bundle 宣告）
├── dsh.bundle          # bundle manifest（與 package.json 的 dsh.bundle 同步）
├── agent.cordis.yml    # Loader patch：INSERT preset-exptech 宣告 + 子插件行
├── preset.yml          # 模式顯示名稱與簡介（文件用途；顯示現由宣告內 name/description 提供）
├── index.js            # legacy 安裝插件（已棄用，僅留說明）
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
