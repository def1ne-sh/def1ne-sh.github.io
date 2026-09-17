document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.main-window');
    const header = modal ? modal.querySelector('.top-app-bar') : null;

    // --- 1. ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ ---
    const navButtons = document.querySelectorAll('.nav-button');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTabId = button.getAttribute('data-tab');
            if (!targetTabId) return;

            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            button.classList.add('active');
            const activeTab = document.getElementById(targetTabId);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        });
    });

    // --- 2. ПЕРЕТАСКИВАНИЕ ОКНА ---
    if (modal && header) {
        let isDragging = false;
        let startX = 0, startY = 0;
        let newLeft = 0, newTop = 0;
        let animationFrameId = null;

        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('button')) return;

            isDragging = true;
            const rect = modal.getBoundingClientRect();

            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;

            modal.style.transform = 'none';
            modal.style.left = `${rect.left}px`;
            modal.style.top = `${rect.top}px`;
            modal.style.margin = '0';

            header.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            newLeft = e.clientX - startX;
            newTop = e.clientY - startY;

            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(() => {
                    modal.style.left = `${newLeft}px`;
                    modal.style.top = `${newTop}px`;
                    animationFrameId = null;
                });
            }
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            header.style.cursor = 'grab';
        });
    }

    // --- 3. ЧАСЫ И ДАТА (MAC OS MENUBAR) ---
    function updateDateTime() {
        const dtElement = document.getElementById('datetime');
        if (!dtElement) return;

        const now = new Date();
        const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        const months = ['янв', 'февр', 'мар', 'апр', 'мая', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек'];

        const dayName = days[now.getDay()];
        const dayNum = now.getDate();
        const monthName = months[now.getMonth()];

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        dtElement.textContent = `${dayName} ${dayNum} ${monthName} ${hours}:${minutes}`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// --- 4. ВЫПАДАЮЩЕЕ МЕНЮ APPLE ---
    const appleBtn = document.getElementById('apple-menu-btn');
    const appleMenu = document.getElementById('apple-dropdown-menu');
    const appleDropdown = document.querySelector('.apple-dropdown');

    if (appleBtn && appleMenu) {
        appleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            appleMenu.classList.toggle('show');
            appleDropdown.classList.toggle('active');
        });

        // Закрытие меню при клике в любую другую точку экрана
        document.addEventListener('click', () => {
            appleMenu.classList.remove('show');
            appleDropdown.classList.remove('active');
        });
    }