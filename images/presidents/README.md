# 歴代代表者 画像フォルダ

このフォルダには歴代代表者の写真ファイルを格納します。

## 使用場面
- 会社情報ページの歴代代表者セクション
- 代表者プロフィール写真の表示

## ファイル形式
- JPG形式を推奨
- 正方形の画像（1:1の比率）推奨
- 画像サイズ: 300x300px以上推奨
- 人物の顔が中央に配置された写真

## ファイル命名規則
- president-01.jpg: 初代 江藤 米作
- president-02.jpg: 2代目 江藤 展吉
- president-03.jpg: 3代目 江藤 義行
- president-04.jpg: 4代目 山﨑 彩

## 現在の画像ファイル
- president-01.jpg: 初代 江藤 米作（追加済み）
- president-02.jpg: 2代目 江藤 展吉（追加済み）
- president-03.jpg: 3代目 江藤 義行（追加済み）
- president-04.jpg: 4代目 山﨑 彩（追加済み）

## 使用方法
写真を追加する際は、HTMLファイルの以下の部分を更新してください：

```html
<!-- プレースホルダーの場合 -->
<div class="photo-placeholder">
    <p data-ja="写真準備中" data-en="Photo Coming Soon">写真準備中</p>
</div>

<!-- 写真がある場合 -->
<img src="../images/presidents/president-01.jpg" alt="初代 江藤 米作" class="president-image">
```

## 使用ページ
- /company/index.html の歴代代表者セクション