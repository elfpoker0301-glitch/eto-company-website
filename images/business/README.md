# 事業案内画像ディレクトリ

このディレクトリには、事業案内セクション用の横長画像を保存します。

## 推奨画像仕様

### 事業案内画像

- **推奨サイズ**: 600x250px（横長 2.4:1の比率）
- **ファイル形式**: JPEGまたはPNG
- **ファイルサイズ**: 300KB以下推奨
- **品質**: 高解像度で鮮明な画像

## 必要なファイル名

### 1. OEM家具

- **ファイル名**: `business-oem.jpg`
- **内容例**:
  - OEM製造工場の様子
  - 製造ラインの写真
  - 完成した家具製品
  - 品質検査の風景

### 2. コントラクト家具

- **ファイル名**: `business-contract.jpg`
- **内容例**:
  - ホテルや病院の家具設置例
  - 百貨店什器の設置風景
  - 施設用家具の製造現場
  - プロジェクト完成品

### 3. 家具デザイン

- **ファイル名**: `business-design.jpg`
- **内容例**:
  - デザイナーの作業風景
  - 設計図面や3Dモデル
  - デザインプロセスの様子
  - プロトタイプ製作風景

### 4. 品質管理

- **ファイル名**: `business-quality.jpg`
- **内容例**:
  - 品質検査の様子
  - 測定機器を使った検査
  - 海外工場での品質管理
  - 検査スタッフの作業風景

## 画像の要件

### 構図とデザイン

- 横長（2.4:1）の比率を厳守
- 暗めの画像推奨（白いテキストが映えるため）
- 中央に重要な要素を配置
- 右下にボタンが表示されることを考慮

### 色調とスタイル

- プロフェッショナルな印象
- 落ち着いた色調
- コントラストがはっきりした画像
- 事業の特徴を表現する内容

### 技術要件

- RGB色空間
- sRGBプロファイル推奨
- 適切な圧縮レベル
- ウェブ表示に最適化

## CSS適用方法

画像を保存後、以下の手順でCSSクラスに`has-image`を追加：

```css
.business-img-1.has-image { background-image: url('../images/business/business-oem.jpg'); }
.business-img-2.has-image { background-image: url('../images/business/business-contract.jpg'); }
.business-img-3.has-image { background-image: url('../images/business/business-design.jpg'); }
.business-img-4.has-image { background-image: url('../images/business/business-quality.jpg'); }
```

HTMLでクラス名に`has-image`を追加：

```html
<div class="image-placeholder business-img-1 has-image">
```

## ホバーアニメーション

- 画像は1.1倍にズームイン
- 右下から詳細ボタンがスライドイン
- スムーズなアニメーション効果

## 注意事項

- ファイル名は正確に指定してください
- 横長比率（2.4:1）を必ず守ってください
- 暗めの画像を使用してテキストの視認性を確保
- モバイル表示も考慮した画像選択をお願いします
- 著作権に問題のない画像を使用してください
