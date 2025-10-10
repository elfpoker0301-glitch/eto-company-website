# 株式会社エトウ ホームページ

株式会社エトウのコーポレートウェブサイトです。

## 概要

- 創業: 1920年（大正9年）
- 事業内容: 製材業、家具製造・輸入・輸出、インテリア事業
- 本社: 福岡県大川市

## 特徴

- レスポンシブデザイン対応
- モダンでクリーンなコーポレートデザイン
- スムーススクロール機能
- アニメーション効果

## ファイル構成

```
eto-website/
├── index.html          # メインページ
├── css/
│   └── style.css      # スタイルシート
├── js/
│   └── script.js      # JavaScript
└── README.md          # このファイル
```

## 使用方法

1. `index.html` をブラウザで開く
2. または、ローカルサーバーを起動:
   ```bash
   # Python 3の場合
   python -m http.server 8000
   
   # または、VS Code の Live Server 拡張機能を使用
   ```

## カスタマイズ

### 色の変更
`css/style.css` の `:root` セクションで色を変更できます:

```css
:root {
    --primary-color: #2c5f2d;    /* メインカラー */
    --secondary-color: #8b6914;  /* セカンダリーカラー */
    --accent-color: #d4a574;     /* アクセントカラー */
}
```

### コンテンツの編集
`index.html` を直接編集してテキストや画像を変更してください。

## ブラウザサポート

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 今後の拡張予定

- お問い合わせフォームの実装
- 製品ギャラリーページ
- 多言語対応（英語、中国語）
- CMSとの連携

---

© 2025 ETO CO., LTD. All rights reserved.