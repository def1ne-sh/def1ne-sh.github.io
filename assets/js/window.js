document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.main-window');
    const header = modal ? modal.querySelector('.top-app-bar') : null;

    const nullObject = document.querySelector('.null-object');
    if (nullObject) {
        nullObject.style.pointerEvents = 'none';
    }

    const navButtons = document.querySelectorAll('.nav-button');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
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
    
    if (modal && header) {
        let isDragging = false;
        let startX = 0, startY = 0;

        header.style.cursor = 'default';

        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('button') || e.target.closest('.navigation')) {
                return;
            }

            isDragging = true;
            const rect = modal.getBoundingClientRect();

            startX = e.clientX - rect.left;
            startY = e.clientY - rect.top;

            modal.style.transform = 'none';
            modal.style.left = `${rect.left}px`;
            modal.style.top = `${rect.top}px`;
            modal.style.margin = '0';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const newLeft = e.clientX - startX;
            const newTop = e.clientY - startY;

            modal.style.left = `${newLeft}px`;
            modal.style.top = `${newTop}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

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

    const bgIframe = document.getElementById('bg-iframe');
    const wallpaperBtn = document.getElementById('wallpaper-menu-btn');
    const wallpaperMenu = document.getElementById('wallpaper-dropdown-menu');
    const wallpaperDropdown = document.querySelector('.wallpaper-dropdown');
    const wallpaperOptions = document.querySelectorAll('.wallpaper-option');

    const savedWall = localStorage.getItem('selectedWallpaper');
    if (savedWall && bgIframe) {
        bgIframe.src = savedWall;
        wallpaperOptions.forEach(opt => {
            if (opt.getAttribute('data-wall') === savedWall) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    if (wallpaperBtn && wallpaperMenu) {
        wallpaperBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (appleMenu) appleMenu.classList.remove('show');
            if (appleDropdown) appleDropdown.classList.remove('active');

            wallpaperMenu.classList.toggle('show');
            wallpaperDropdown.classList.toggle('active');
        });

        wallpaperOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const wallSrc = option.getAttribute('data-wall');
                
                if (bgIframe && wallSrc) {
                    bgIframe.src = wallSrc;
                    localStorage.setItem('selectedWallpaper', wallSrc);
                }

                wallpaperOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');

                wallpaperMenu.classList.remove('show');
                wallpaperDropdown.classList.remove('active');
            });
        });
    }

    const appleBtn = document.getElementById('apple-menu-btn');
    const appleMenu = document.getElementById('apple-dropdown-menu');
    const appleDropdown = document.querySelector('.apple-dropdown');

    if (appleBtn && appleMenu) {
        appleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (wallpaperMenu) wallpaperMenu.classList.remove('show');
            if (wallpaperDropdown) wallpaperDropdown.classList.remove('active');

            appleMenu.classList.toggle('show');
            appleDropdown.classList.toggle('active');
        });
    }

    document.addEventListener('click', () => {
        if (appleMenu) appleMenu.classList.remove('show');
        if (appleDropdown) appleDropdown.classList.remove('active');
        if (wallpaperMenu) wallpaperMenu.classList.remove('show');
        if (wallpaperDropdown) wallpaperDropdown.classList.remove('active');
    });
});
