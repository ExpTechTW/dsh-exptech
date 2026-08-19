---
name: exptech-apis
description: ExpTechTW 公共 API 的可用端點目錄、主機／區域規則、串流與編碼格式，以及官方文件位置；開發或呼叫 ExpTech API 時使用。
---

# ExpTechTW 公共 API 端點目錄

以官方文件與 curl 實測（2026-08）為準。端點可能隨時變動；**先用本技能查表，再以官方文件／實測驗證**，不要憑記憶。

## 官方文件位置（權威來源）

| 文件 | 位置 |
|---|---|
| **DPIP `api.md`**（最完整的端點對照） | `https://raw.githubusercontent.com/ExpTechTW/DPIP/main/api.md` |
| 技術文件入口（GitHub Pages） | `https://exptechtw.github.io/api-docs/`（頁面如 `/docs/api/api/earthquake/`） |
| 舊 API 伺服器文件 | `ExpTechTW/API` 的 `docs/main.md`、`docs/earthquake.md`（branch `master`），raw：`https://raw.githubusercontent.com/ExpTechTW/API/master/docs/...` |
| DPIP 網路層契約 | `ARCHITECTURE.md` § Networking（ApiClient、tier、failover、RealtimeSource) |
| 衛星產品目錄 | `satellite-tiles-go/docs.md`（channel 名稱如 `btd_wvirw`、`cloudtop`） |

## 主機與區域規則

路徑一律 `/api/...`。多活主機經 DNS 負載平衡；**裸主機不給用**，要照 tier 選：

| 層級 | 主機 | 用途 |
|---|---|---|
| `lbApi`（多活） | `api.lb-tpe1.exptech.dev`（台北）、`api.lb-khh1.exptech.dev`（高雄） | EEW／RTS 即時，**SSE 只在這裡生效** |
| `coreApi`（多活） | `api.core-tyo1.exptech.dev`（東京）、`api.core-tnn1.exptech.dev`（台南） | 歷史、list、快照 |
| `coreExclusiveApi` | `api.core-tnn1.exptech.dev` | 台南專屬（氣象、tiles 時間清單、裝置通知） |
| `coreStaticExclusive` | `static.core-tnn1.exptech.dev` | tile／歷史快照（WebP／MVT，MapLibre 直抓） |
| 全域 static | `static.lb.exptech.dev` | basemap / terrain（全區域共用） |
| `legacyApi`（淘汰中） | `api-1.exptech.dev` | 舊端點（trem station、dpip history/realtime、rts-at） |

別名：`api.exptech.dev`（新）、`api.exptech.com.tw`（舊文件用）。

## 可用端點表（已實測）

### 地震 EEW／RTS

| 方法 | 路徑 | 層級 |
|---|---|---|
| openEewSse | `/api/v2/eq/eew?sse=1&compress=1` | lbApi |
| openRtsSse | `/api/v2/trem/rts?sse=1&compress=1` | lbApi |
| getEewRealtime | `/api/v2/eq/eew` | lbApi |
| getRtsRealtime | `/api/v2/trem/rts` | lbApi |
| getEewAt（歷史回放） | `/api/v2/eq/eew/{sec}` | coreApi |
| getReportList | `/api/v2/eq/report` | coreApi |
| getReport | `/api/v2/eq/report/{id}` | coreApi |

地震報告 list（v2）query：`limit`/`page`、`sort`/`order`（`time|intensity|magnitude|depth` × `asc|desc`）、震度／規模／深度區間、`startTime`/`endTime`（`YYYY-MM-DD`，Asia/Taipei 當日）、可選 `city`/`cityMinInt`/`cityMaxInt`；伺服器會 302 到 canonical query 以利 ETag。`getEewAt` 是時間軸回放（coreApi）。

### tiles（basemap／雷達／衛星／QPESUMS／DPM／風場）

| 用途 | 路徑 | 主機 |
|---|---|---|
| basemap | `/api/v1/map/tiles/{z}/{x}/{y}.pbf` | static.lb |
| terrain（mapbox terrain-RGB） | `/api/v1/map/terrain/{z}/{x}/{y}.png` | static.lb |
| 雷達時間清單 | `/api/v2/tiles/radar/list` | coreExclusiveApi |
| 雷達 tile | `/api/v2/tiles/radar/{sec}/{z}/{x}/{y}.webp` | static.core-tnn1 |
| 衛星清單 | `/api/v2/tiles/satellite/list[?channel=…]` | coreExclusiveApi |
| 衛星 tile | `/api/v2/tiles/satellite/{sec}/{z}/{x}/{y}.webp[?channel=…]` | static.core-tnn1 |
| QPESUMS 清單 | `/api/v2/tiles/qpesums/list` | coreExclusiveApi |
| QPESUMS tile | `/api/v2/tiles/qpesums/{ms}/{z}/{x}/{y}.webp` | static.core-tnn1 |
| DPM tile | `/api/v2/tiles/dpm/{layer}/{z}/{x}/{y}.mvt` | static.core-tnn1 |
| DPM 詳情 | `/api/v2/tiles/dpm/{layer}/{id}`（aed/restroom/shelter） | static.core-tnn1 |
| 風場清單 | `/api/v2/tiles/wind/list[?model=…]` | coreExclusiveApi |
| 風場 tile | `/api/v2/tiles/wind/{ts}/{z}/{x}/{y}.webp[?model=…]` | static.core-tnn1 |
| 風場向量 | `/api/v1/wind/{model}/{frame}.bin`（WND1 格式，`gfs`/`ecmwf`） | static.core-tnn1 |

時間清單是差量編碼（Unix 秒或毫秒 `[base, Δ, …]`，QPESUMS 是毫秒），tile 帶 ETag/304；DPM 的 source-layer = `{layer}`，單點用內部 `id`（不是 `aed_id`），低 zoom cluster 帶 `point_count`。Terrain 是 Mapbox terrain-RGB，MapLibre `raster-dem` `encoding: 'mapbox'` 原生可讀，不需轉換。

### 氣象家族（v5，台南專屬）

四家族共用形狀：`/api/v5/meteor/{family}`（最新快照）、`/list`（時間清單）、`/{sec}`（歷史快照，static 主機）。

| 方法 | 路徑 |
|---|---|
| getWeatherStations / Latest / List | `/api/v5/meteor/weather/station`、`/api/v5/meteor/weather`、`/api/v5/meteor/weather/list` |
| getWeatherAt | `/api/v5/meteor/weather/{sec}`（static） |
| getWeatherTrend | `/api/v5/meteor/weather/trend/{id}?range=24h\|7d` |
| getWeatherRealtime | `/api/v5/meteor/weather/realtime/{lat},{lng}` |
| getWeatherForecast | `/api/v5/meteor/weather/forecast/{code}` |
| getRain… | `/api/v5/meteor/rain(/station|/list|/{sec}|trend/{id}…)` |
| getLightningLatest / List / At | `/api/v5/meteor/lightning(/list|/{sec})` |
| getTyphoonLatest | `/api/v5/meteor/typhoon` |
| getTyphoonTrack / Potential / Probability / Warning | `/api/v5/meteor/typhoon/{track|potential|probability|warning}` |
| getTyphoonKindList / At | `/api/v5/meteor/typhoon/{kind}/list`、`/api/v5/meteor/typhoon/{kind}/{sec}` |

颱風多颱：`/`、`/track`、`/potential`、`/probability`、`/warning` 一律回 `{ updated, cyclones: [...] }`，唯一識別是 `tdNo`（CWA CwaTdNo）；`/warning` 的 CAP 通常一報（cyclones 長度 0–1）。⚠️ `?range` 目前伺服器忽略——trend 一律 24 筆逐時（實測 2026-08）。時間軸／數值差量編碼，`-99` = null（缺值）。舊 `/api/v2/meteor/*`、`/api/v3/weather/*` 在 api-1 仍活著但 App 不再呼叫。

### 裝置與通知（core-tnn1）

| 方法 | 路徑 |
|---|---|
| updateDeviceLocation | `/api/v2/location/{platform}/{token}/{version}/{lat},{lng}` |
| getNotify | `/api/v2/notify/{token}` |
| setNotify | `/api/v2/notify/{token}/{channel}/{status}` |

### 舊 server `api-1`（逐步淘汰中；App 仍用）

| 方法 | 路徑 | 用途 |
|---|---|---|
| getStations | `/api/v1/trem/station` | 強震監視器測站 |
| getHistoryList | `/api/v1/dpip/history/list` | 事件頁（全國） |
| getHistoryRegion | `/api/v1/dpip/history/{region}` | 事件頁（鄉鎮） |
| getRealtimeList | `/api/v1/dpip/realtime/list` | 拖盤（全國生效中） |
| getRealtimeRegion | `/api/v1/dpip/realtime/{region}` | 拖盤（鄉鎮生效中） |
| getRtsAt | `/api/v2/trem/rts/{sec}` | 強震波形回放（時間軸） |
| getEvent | `/api/v1/dpip/event/{id}` | 尚未接上，端點存在 |

### 外部／第三方

| 方法 | URL |
|---|---|
| DPIP releases | `https://api.github.com/repos/ExpTechTW/DPIP/releases`（ETag，`per_page=30`） |
| 降雨逐時預報 | `https://exptech.dingbot.tw/api/weather/rainforecast/{code}`（`{code}` = 鄉鎮 3 碼；回 `{"<系列名>": [{"start": 秒, "rain": [60 × mm]}]}`，空 series `[]` = 該小時無雨） |

### 舊版地震 API（`ExpTechTW/API` 文件，`api.exptech.com.tw`）

- `GET https://api.exptech.com.tw/api/v1/earthquake`（Earthquake List v1）：回震度／規模／深度／發震時間列表；欄位含 `identifier`（如 `CWA-EQ112000-2023-0920-224526`）、`earthquakeNo`（末三碼 `000` = 小區域有感）、`epicenterLon/Lat`、`location`、`originTime`、`data[].areaIntensity`、`eqStation[]`（stationName/stationIntensity/distance）、`trem`、`timestamp`（ms）。更多端點見 `docs/earthquake.md`（Earthquake Event v1 等）。
- 舊 v1 `GET https://api.exptech.dev/api/v1/eq/report`：危險，不推薦，建議遷移 v2。

## 串流與格式重點

- **即時串流走 SSE，不是輪詢**：`?sse=1` → `text/event-stream`；`&compress=1` → `event: g` 事件，其 `data:` 是 base64 的 gzip，解開後與純 GET 同一個 JSON model。EEW 是突發型（靜默於地震之間，存活 = 連線開著）；RTS 是連續型（約 1 Hz，存活 = 最近有事件）。只有 `lb-tpe1`/`lb-khh1` 對 `?sse=1` 回真正的 SS`text/event-stream`；core-tyo1（eew）、api-1（rts）會回 HTTP 200 但 `application/json`（旗標被忽略）；core-tnn1 回 401。**SSE 固定用 lbApi。**
- **對時不是 HTTP 端點**：App 用真正 SNTP（`flutter_ntp`，UDP/123）對 `time.exptech.com.tw`（主）/ `time.apple.com`（備）。
- tiles 由 MapLibre 直接抓（URL 為鍵快取）；tile 格式 WebP / MVT（gzip）/ PBF。
- ETag/304 快取：非正規 query 會被 302 到 canonical（參數字母序、去掉預設值）。

## curl 可用性（2026-08 實測摘要，完整表見 DPIP `api.md`）

| 端點 | lb-tpe1 | lb-khh1 | core-tyo1 | core-tnn1 | api-1 |
|---|---|:--:|:--:|:--:|:--:|:--:|
| `/api/v2/trem/rts` | 200 | 200 | 404 | 401 | 200 |
| `/api/v2/eq/eew` | 200 | 200 | 200 | 200 | 404 |
| `/api/v2/eq/report` | 404 | 404 | 200 | 200 | 404 |
| `/api/v1/trem/station` | 404 | 404 | 404 | 404 | 200 |
| `/api/v5/meteor/*/list` | 404 | 404 | 404 | **200** | 404 |
| `/api/v2/meteor/*/list`（舊） | 404 | 404 | 404 | 404 | 200 |
| `/api/v1/dpip/history|realtime/list` | 404 | 404 | 404 | 404 | 200 |
| `/api/v2/notify/{token}` | 404 | 404 | 404 | 401 | 429 |

**規則**：EEW/RTS → lb；report/歷史 → core；v5 氣象／tiles 清單 → core-tnn1（static 快照在 static.core-tnn1）；trem/dpip 舊端點 → api-1。挑錯 host 就是 404/401。

## 使用守則

1. TREM／地震資料僅供參考，**最終以中央氣象署（CWA）為主**；「此軟體僅供研究、學術及教育用途（不得營利）」，違規行為可能被列入伺服器黑名單。
2. 端點可能變動：呼叫前先用官方文件（上面三份）確認，並用 curl 實測。
3. 本目錄是「端點目錄」不是程式碼對照：DPIP 的每支 datasource 各自帶 `ApiTier`，路徑集中於 `core/network/api_paths.dart`；要改 App 端網路層先讀 `ARCHITECTURE.md` § Networking。
