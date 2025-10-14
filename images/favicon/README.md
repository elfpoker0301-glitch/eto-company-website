# Favicon Images

このフォルダにはファビコン用の画像ファイルを保存します。

## フォルダ構成

- `16x16/` - 16x16px のファビコン用画像
- `32x32/` - 32x32px のファビコン用画像  
- `apple-touch/` - Apple Touch Icon用画像（180x180px推奨）
- `android/` - Android用アイコン画像（192x192px推奨）

## 推奨ファイル形式

- **ICO形式**: `favicon.ico` - 従来ブラウザ対応
- **PNG形式**: 高品質な画像、モバイル対応
- **SVG形式**: ベクター画像、スケーラブル

## 使用方法

1. 各サイズの画像をそれぞれのフォルダに保存
2. HTMLファイルのhead部分でパスを更新
3. ブラウザキャッシュをクリアして確認

## ファイル名の推奨事項

### 基本的なファビコン
- `favicon.ico` - ルートディレクトリ用（16x16, 32x32のマルチサイズ）
- `favicon.svg` - モダンブラウザ用ベクター画像

### サイズ別PNG画像
- `favicon-16x16.png` - 16x16フォルダ用
- `favicon-32x32.png` - 32x32フォルダ用
- `favicon-48x48.png` - 32x32フォルダ用（高解像度）

### Apple/iOS用
- `apple-touch-icon.png` - 180x180px（apple-touchフォルダ用）
- `apple-touch-icon-120x120.png` - iPhone用
- `apple-touch-icon-152x152.png` - iPad用
- `apple-touch-icon-167x167.png` - iPad Pro用

### Android/PWA用
- `android-chrome-192x192.png` - Android標準
- `android-chrome-512x512.png` - 高解像度Android用
- `maskable-icon-192x192.png` - マスカブルアイコン用

### Windows用
- `mstile-150x150.png` - Windows 10 タイル用

## 保存場所と命名例

```
images/favicon/
├── favicon.ico                    # ルート用
├── favicon.svg                    # ベクター版
├── 16x16/favicon-16x16.png       # 16pxサイズ
├── 32x32/favicon-32x32.png       # 32pxサイズ
├── apple-touch/
│   ├── apple-touch-icon.png      # 180x180px
│   └── apple-touch-icon-120x120.png
└── android/
    ├── android-chrome-192x192.png
    └── android-chrome-512x512.png
```