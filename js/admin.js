// ===================================
// 管理画面 - お知らせ管理システム
// ===================================

class NewsManager {
    constructor() {
        this.news = JSON.parse(localStorage.getItem('eto_news') || '[]');
        this.currentEditingId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderNews();
        this.updateStats();
        this.setDefaultDate();
    }

    // イベントリスナーの設定
    setupEventListeners() {
        // 新規追加ボタン
        document.getElementById('addNewsBtn').addEventListener('click', () => {
            this.openModal();
        });

        // モーダル関連
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeModal();
        });

        // モーダル背景クリックで閉じる
        document.getElementById('newsModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('newsModal')) {
                this.closeModal();
            }
        });

        // フォーム送信
        document.getElementById('newsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveNews();
        });

        // 検索機能
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterNews(e.target.value);
        });

        // ESCキーでモーダルを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                this.closeDeleteModal();
            }
        });
    }

    // デフォルトの日付を設定
    setDefaultDate() {
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        document.getElementById('newsDate').value = dateString;
    }

    // モーダルを開く
    openModal(news = null) {
        const modal = document.getElementById('newsModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('newsForm');

        if (news) {
            // 編集モード
            modalTitle.textContent = 'お知らせを編集';
            this.currentEditingId = news.id;
            document.getElementById('newsDate').value = news.date;
            document.getElementById('newsTitleJa').value = news.titleJa;
            document.getElementById('newsTitleEn').value = news.titleEn;
            document.getElementById('newsStatus').value = news.status;
        } else {
            // 新規作成モード
            modalTitle.textContent = 'お知らせを追加';
            this.currentEditingId = null;
            form.reset();
            this.setDefaultDate();
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // モーダルを閉じる
    closeModal() {
        const modal = document.getElementById('newsModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentEditingId = null;
        document.getElementById('newsForm').reset();
    }

    // お知らせを保存
    saveNews() {
        const date = document.getElementById('newsDate').value;
        const titleJa = document.getElementById('newsTitleJa').value.trim();
        const titleEn = document.getElementById('newsTitleEn').value.trim();
        const status = document.getElementById('newsStatus').value;

        if (!date || !titleJa || !titleEn) {
            this.showNotification('すべての必須項目を入力してください', 'error');
            return;
        }

        const newsItem = {
            id: this.currentEditingId || this.generateId(),
            date: date,
            titleJa: titleJa,
            titleEn: titleEn,
            status: status,
            createdAt: this.currentEditingId ? 
                this.news.find(n => n.id === this.currentEditingId).createdAt : 
                new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (this.currentEditingId) {
            // 編集
            const index = this.news.findIndex(n => n.id === this.currentEditingId);
            this.news[index] = newsItem;
            this.showNotification('お知らせを更新しました');
        } else {
            // 新規追加
            this.news.unshift(newsItem);
            this.showNotification('お知らせを追加しました');
        }

        this.saveToStorage();
        this.renderNews();
        this.updateStats();
        this.closeModal();
        this.updateMainSite();
    }

    // お知らせを削除
    deleteNews(id) {
        this.news = this.news.filter(n => n.id !== id);
        this.saveToStorage();
        this.renderNews();
        this.updateStats();
        this.showNotification('お知らせを削除しました');
        this.updateMainSite();
    }

    // お知らせ一覧を表示
    renderNews() {
        const tbody = document.getElementById('newsTableBody');
        const emptyState = document.getElementById('emptyState');

        if (this.news.length === 0) {
            tbody.innerHTML = '';
            emptyState.classList.add('show');
            return;
        }

        emptyState.classList.remove('show');

        tbody.innerHTML = this.news.map(news => `
            <tr>
                <td>${this.formatDate(news.date)}</td>
                <td>${this.escapeHtml(news.titleJa)}</td>
                <td>${this.escapeHtml(news.titleEn)}</td>
                <td><span class="status-badge status-${news.status}">${this.getStatusText(news.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-outline btn-sm" onclick="newsManager.editNews('${news.id}')">編集</button>
                        <button class="btn btn-danger btn-sm" onclick="newsManager.confirmDelete('${news.id}')">削除</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // お知らせを編集
    editNews(id) {
        const news = this.news.find(n => n.id === id);
        if (news) {
            this.openModal(news);
        }
    }

    // 削除確認
    confirmDelete(id) {
        const modal = document.getElementById('deleteModal');
        document.getElementById('confirmDeleteBtn').onclick = () => {
            this.deleteNews(id);
            this.closeDeleteModal();
        };
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 削除モーダルを閉じる
    closeDeleteModal() {
        const modal = document.getElementById('deleteModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 検索・フィルタリング
    filterNews(query) {
        const tbody = document.getElementById('newsTableBody');
        const rows = tbody.querySelectorAll('tr');

        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            const matches = text.includes(query.toLowerCase());
            row.style.display = matches ? '' : 'none';
        });
    }

    // 統計情報を更新
    updateStats() {
        const totalNews = this.news.length;
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyNews = this.news.filter(news => {
            const newsDate = new Date(news.date);
            return newsDate.getMonth() === currentMonth && newsDate.getFullYear() === currentYear;
        }).length;

        const lastUpdate = this.news.length > 0 ? 
            this.formatDate(this.news[0].updatedAt.split('T')[0]) : 
            '-';

        document.getElementById('totalNews').textContent = totalNews;
        document.getElementById('monthlyNews').textContent = monthlyNews;
        document.getElementById('lastUpdate').textContent = lastUpdate;
    }

    // メインサイトを更新
    updateMainSite() {
        // 公開されているお知らせのみを取得
        const publishedNews = this.news
            .filter(news => news.status === 'published')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3); // 最新3件のみ

        // メインサイト用のデータとして保存
        localStorage.setItem('eto_published_news', JSON.stringify(publishedNews));
        
        // メインサイトのお知らせが更新されました
    }

    // ユーティリティ関数
    generateId() {
        return 'news_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\//g, '.');
    }

    getStatusText(status) {
        return status === 'published' ? '公開' : '下書き';
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveToStorage() {
        localStorage.setItem('eto_news', JSON.stringify(this.news));
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const messageElement = document.getElementById('notificationMessage');
        
        messageElement.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// グローバル関数（HTMLから呼び出し用）
function closeDeleteModal() {
    if (window.newsManager) {
        window.newsManager.closeDeleteModal();
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
    window.newsManager = new NewsManager();

    // サンプルデータを追加（初回のみ）
    if (!localStorage.getItem('eto_news')) {
        const sampleNews = [
            {
                id: 'news_sample_1',
                date: '2025-10-10',
                titleJa: '新しいホームページを公開しました。',
                titleEn: 'We launched our new website.',
                status: 'published',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'news_sample_2',
                date: '2025-09-15',
                titleJa: '海外展開の新拠点をマレーシアに開設しました。',
                titleEn: 'We opened a new overseas base in Malaysia.',
                status: 'published',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'news_sample_3',
                date: '2025-08-01',
                titleJa: '創業100周年に向けた記念プロジェクトを始動しました。',
                titleEn: 'We launched a commemorative project for our 100th anniversary.',
                status: 'published',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
        
        localStorage.setItem('eto_news', JSON.stringify(sampleNews));
        window.newsManager = new NewsManager();
    }
});