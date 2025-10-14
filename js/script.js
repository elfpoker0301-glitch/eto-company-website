// オープニングアニメーション
window.addEventListener('DOMContentLoaded', () => {
    // スクロールを無効化
    document.body.classList.add('no-scroll');
    
    const openingAnimation = document.getElementById('openingAnimation');
    
    // 3.3秒後にアニメーションを削除してスクロールを有効化
    setTimeout(() => {
        document.body.classList.remove('no-scroll');
        // アニメーション終了後に要素を削除（パフォーマンス向上）
        setTimeout(() => {
            if (openingAnimation) {
                openingAnimation.remove();
            }
        }, 800);
    }, 3300);
});

// メニュートグル機能
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // ハンバーガーメニューのアニメーション
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (nav.classList.contains('active')) {
            if (index === 0) {
                span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            } else if (index === 1) {
                span.style.opacity = '0';
            } else {
                span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
});

// ナビゲーションリンクをクリックした時にメニューを閉じる
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// スクロール時のヘッダー背景変更
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// スクロールアニメーション（要素が表示されたらフェードイン）
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素を設定
window.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.business-card, .strength-item, .philosophy-item, .news-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ページトップへ戻るボタン（オプション）
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-top-btn';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary-color);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
};

// ページトップボタンを作成
createScrollTopButton();

// 言語切り替え機能
class LanguageSwitcher {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'ja';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setLanguage(this.currentLang);
    }

    setupEventListeners() {
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);

        // ボタンの状態更新
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });

        // HTML要素の言語属性を更新
        document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';

        // 多言語対応テキストの更新
        const elements = document.querySelectorAll('[data-ja][data-en]');
        elements.forEach(element => {
            const text = lang === 'ja' ? element.dataset.ja : element.dataset.en;
            if (text) {
                element.textContent = text;
            }
        });

        // 外部リンクのURL更新
        const externalLinks = document.querySelectorAll('.external-link[data-ja-url][data-en-url]');
        externalLinks.forEach(link => {
            const url = lang === 'ja' ? link.dataset.jaUrl : link.dataset.enUrl;
            if (url) {
                link.href = url;
            }
        });

        // ページタイトルの更新
        const titles = {
            ja: '株式会社エトウ | 人と環境にやさしい住環境を提案します',
            en: 'ETO CO., LTD. | Proposing living environments friendly to people and the environment'
        };
        document.title = titles[lang];

        // 特定要素の内容更新（HTMLを含む場合）
        this.updateSpecialElements(lang);
    }

    updateSpecialElements(lang) {
        // About セクションのリード文（改行を含む）
        const aboutLead = document.querySelector('.about-section .section-lead');
        if (aboutLead) {
            const leadTexts = {
                ja: '約480年前から栄える家具のまち、福岡県大川市で<br>1920年（大正9年）に製材業として創業。',
                en: 'Founded as a lumber business in 1920 in Okawa City, Fukuoka,<br>a furniture town that has flourished for about 480 years.'
            };
            aboutLead.innerHTML = leadTexts[lang];
        }

        // Contact セクションのリード文（改行を含む）
        const contactLead = document.querySelector('.contact-section .section-lead');
        if (contactLead) {
            const contactTexts = {
                ja: 'エトウへのご相談・ご質問、お見積もりのご依頼など、<br>お気軽にお問い合わせください。',
                en: 'Please feel free to contact us for consultations, questions,<br>quotation requests, and more.'
            };
            contactLead.innerHTML = contactTexts[lang];
        }

        // 会社情報テーブルの特別処理（HTMLを含む）
        const companyTableCells = document.querySelectorAll('.company-table td[data-ja][data-en]');
        companyTableCells.forEach(cell => {
            const text = lang === 'ja' ? cell.dataset.ja : cell.dataset.en;
            if (text) {
                cell.innerHTML = text;
            }
        });

        // フッター住所の特別処理（改行を含む）
        const footerAddress = document.querySelector('.footer-info p[data-ja][data-en]');
        if (footerAddress) {
            const addressTexts = {
                ja: '〒831-0008<br>福岡県大川市大字鐘ヶ江 227-2',
                en: '227-2 Kanegae, Okawa City,<br>Fukuoka 831-0008, Japan'
            };
            footerAddress.innerHTML = addressTexts[lang];
        }

        // セクションタイトルの英語部分は常に表示
        const sectionTitleJa = document.querySelectorAll('.section-title-ja');
        sectionTitleJa.forEach(element => {
            if (element.dataset.ja && element.dataset.en) {
                element.textContent = lang === 'ja' ? element.dataset.ja : element.dataset.en;
            }
        });

        // スクロール文字の更新
        const scrollText = document.querySelector('.hero-scroll span');
        if (scrollText) {
            scrollText.textContent = lang === 'ja' ? 'SCROLL' : 'SCROLL';
        }
    }
}

// 言語切り替え機能を初期化
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
    loadDynamicNews();
});

// 動的ニュース読み込み機能
function loadDynamicNews() {
    const publishedNews = JSON.parse(localStorage.getItem('eto_published_news') || '[]');
    
    if (publishedNews.length > 0) {
        updateNewsSection(publishedNews);
    }
}

function updateNewsSection(newsItems) {
    const newsList = document.querySelector('.news-list');
    if (!newsList) return;

    // 最新3件を表示
    const latestNews = newsItems.slice(0, 3);
    
    newsList.innerHTML = latestNews.map(news => `
        <div class="news-item">
            <time class="news-date">${formatNewsDate(news.date)}</time>
            <p class="news-content" data-ja="${escapeHtml(news.titleJa)}" data-en="${escapeHtml(news.titleEn)}">${escapeHtml(news.titleJa)}</p>
        </div>
    `).join('');

    // 言語切り替えを再適用
    const currentLang = localStorage.getItem('language') || 'ja';
    const newsContents = document.querySelectorAll('.news-content[data-ja][data-en]');
    newsContents.forEach(element => {
        const text = currentLang === 'ja' ? element.dataset.ja : element.dataset.en;
        if (text) {
            element.textContent = text;
        }
    });
}

function formatNewsDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\//g, '.');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===================================
// Services Slider 機能
// ===================================
class ServicesSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.slidesWrapper = document.getElementById('slidesWrapper');
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5秒間隔
        
        this.init();
    }

    init() {
        if (this.totalSlides === 0) return;
        
        this.createDots();
        this.setupEventListeners();
        this.updateSlider();
        this.startAutoplay();
    }

    createDots() {
        const dotsContainer = document.getElementById('dotsContainer');
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    setupEventListeners() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevSlide());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // キーボード操作
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });

        // タッチイベント（スワイプ対応）
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        this.slidesWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            this.pauseAutoplay();
        });

        this.slidesWrapper.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        this.slidesWrapper.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // 縦方向のスワイプは無視
            if (Math.abs(diffY) > Math.abs(diffX)) {
                this.startAutoplay();
                return;
            }

            // 50px以上のスワイプで反応
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }

            this.startAutoplay();
        });

        // マウスホバーでオートプレイ停止
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => {
                this.pauseAutoplay();
            });

            sliderContainer.addEventListener('mouseleave', () => {
                this.startAutoplay();
            });
        }
    }

    updateSlider() {
        if (!this.slidesWrapper) return;

        // スライド位置を更新
        const translateX = -this.currentSlide * 100;
        this.slidesWrapper.style.transform = `translateX(${translateX}%)`;

        // アクティブなスライドを更新
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        // ドットを更新
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
        this.resetAutoplay();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
        this.resetAutoplay();
    }

    goToSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.currentSlide = index;
            this.updateSlider();
            this.resetAutoplay();
        }
    }

    startAutoplay() {
        this.pauseAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    resetAutoplay() {
        this.pauseAutoplay();
        this.startAutoplay();
    }
}

// ヒーロー背景画像切り替えクラス
class HeroBackgroundSlider {
    constructor() {
        this.heroSection = document.querySelector('.hero');
        this.imageIndex = 0;
        this.imageInterval = null;
        this.images = [];
        this.switchDuration = 5000; // 5秒間隔
        
        this.init();
    }

    async init() {
        // 利用可能な画像をチェック
        await this.loadAvailableImages();
        
        if (this.images.length > 0) {
            this.createImageElements();
            this.startSlideshow();
        }
    }

    async loadAvailableImages() {
        // hero-1.jpg から hero-10.jpg まで確認
        for (let i = 1; i <= 10; i++) {
            const imagePath = `images/hero/hero-${i}.jpg`;
            const exists = await this.checkImageExists(imagePath);
            
            if (exists) {
                this.images.push(imagePath);
            }
        }
        
        console.log(`Found ${this.images.length} hero background images`);
    }

    checkImageExists(imagePath) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imagePath;
        });
    }

    createImageElements() {
        // 各画像のbackground要素を作成
        this.images.forEach((imagePath, index) => {
            const bgElement = document.createElement('div');
            bgElement.className = 'hero-bg';
            bgElement.style.backgroundImage = `url('${imagePath}')`;
            
            // 最初の画像をアクティブに
            if (index === 0) {
                bgElement.classList.add('active');
            }
            
            this.heroSection.appendChild(bgElement);
        });

        this.bgElements = this.heroSection.querySelectorAll('.hero-bg');
    }

    startSlideshow() {
        if (this.images.length <= 1) return;

        this.imageInterval = setInterval(() => {
            this.nextImage();
        }, this.switchDuration);
    }

    nextImage() {
        if (this.bgElements.length === 0) return;

        // 現在のアクティブな画像を非アクティブに
        this.bgElements[this.imageIndex].classList.remove('active');
        
        // 次の画像インデックスを計算
        this.imageIndex = (this.imageIndex + 1) % this.images.length;
        
        // 次の画像をアクティブに
        this.bgElements[this.imageIndex].classList.add('active');
    }

    pauseSlideshow() {
        if (this.imageInterval) {
            clearInterval(this.imageInterval);
            this.imageInterval = null;
        }
    }

    resumeSlideshow() {
        if (!this.imageInterval && this.images.length > 1) {
            this.startSlideshow();
        }
    }
}

// スライダーを初期化
document.addEventListener('DOMContentLoaded', () => {
    new ServicesSlider();
    new HeroBackgroundSlider();
    new LanguageSwitcher();
});