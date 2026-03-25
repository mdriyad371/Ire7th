// ============================================
// IRE DEPARTMENT WEBSITE - RENDER FUNCTIONS
// ============================================

// Load University Logo
function loadUniversityLogo() {
    const logoContainer = document.getElementById('universityLogo');
    if (!logoContainer) return;
    
    const img = new Image();
    img.onload = function() {
        logoContainer.innerHTML = `<img src="images/logo.png" alt="University Logo">`;
    };
    img.onerror = function() {
        logoContainer.innerHTML = `<i class="fas fa-university"></i>`;
    };
    img.src = "images/logo.png";
}

// Load Routine Image
function loadRoutineImage() {
    const routineContainer = document.getElementById('routineImageContainer');
    if (!routineContainer) return;
    
    const img = new Image();
    img.onload = function() {
        routineContainer.innerHTML = `<img src="routine.jpg" alt="Class Routine" class="routine-img">`;
    };
    img.onerror = function() {
        const imgPng = new Image();
        imgPng.onload = function() {
            routineContainer.innerHTML = `<img src="routine.png" alt="Class Routine" class="routine-img">`;
        };
        imgPng.onerror = function() {
            routineContainer.innerHTML = `
                <div class="image-placeholder">
                    <i class="fas fa-image"></i>
                    <p>📸 No routine image found</p>
                    <p class="hint-text">Save your image as "routine.jpg" in the same folder</p>
                </div>
            `;
        };
        imgPng.src = "routine.png";
    };
    img.src = "routine.jpg";
}

// Render Courses
function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = coursesData.map(course => `
        <div class="glass-card course-card">
            <span class="course-code-badge">${course.code}</span>
            <div class="course-title">${course.title}</div>
            <div class="credit"><i class="fas fa-clock"></i> Credit: ${course.credit}</div>
            <div class="course-teacher"><i class="fas fa-chalkboard-user"></i> ${course.teacher}</div>
        </div>
    `).join('');
}

// Render Events
function renderEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;
    
    eventsGrid.innerHTML = eventsData.map(event => `
        <div class="glass-card event-card">
            <div class="event-image" id="event-img-${event.title.replace(/\s/g, '')}">
                <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#2a2a4a,#1a1a3a);">
                    <i class="fas fa-calendar-alt" style="font-size:3rem; color:var(--primary);"></i>
                </div>
            </div>
            <div class="event-header">
                <div class="event-icon">${event.icon}</div>
                <div class="event-date"><i class="far fa-calendar-check"></i> ${event.date}</div>
                <div class="event-title">${event.title}</div>
            </div>
            <div class="event-desc">
                <p>${event.desc}</p>
            </div>
        </div>
    `).join('');
    
    // Load event images
    eventsData.forEach(event => {
        if (event.image) {
            const img = new Image();
            img.onload = function() {
                const container = document.getElementById(`event-img-${event.title.replace(/\s/g, '')}`);
                if (container) {
                    container.innerHTML = `<img src="images/${event.image}" alt="${event.title}">`;
                }
            };
            img.src = `images/${event.image}`;
        }
    });
}

// Render Notices
function renderNotices() {
    const noticesGrid = document.getElementById('noticesGrid');
    if (!noticesGrid) return;
    
    noticesGrid.innerHTML = noticesData.map(notice => `
        <div class="glass-card notice-card">
            <div class="notice-header">
                <div class="notice-icon">${notice.icon}</div>
                <div class="notice-date"><i class="far fa-calendar-alt"></i> ${notice.date}</div>
                <div class="notice-title">${notice.title}</div>
            </div>
            <div class="notice-desc">
                <p>${notice.desc}</p>
            </div>
        </div>
    `).join('');
}

// Initialize all functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadUniversityLogo();
    if (document.getElementById('routineImageContainer')) loadRoutineImage();
    if (document.getElementById('coursesGrid')) renderCourses();
    if (document.getElementById('eventsGrid')) renderEvents();
    if (document.getElementById('noticesGrid')) renderNotices();
});

console.log("%c🤖 IRE Department Website | Developer: Md Riyad Hossen (IRE 7th Batch)", "color: #00f2ff; font-size: 14px; font-weight: bold;");
console.log("%c📌 Admin Panel: Open admin.html to manage content", "color: #ffaa44; font-size: 12px;");
// =============== NOTIFICATION CHECKER ===============

function checkForNewNoticeNotification() {
    const notificationData = localStorage.getItem('new_notice_notification');
    if (notificationData) {
        const notice = JSON.parse(notificationData);
        const now = new Date().getTime();
        if (now - notice.timestamp < 60000) {
            showNoticeAlert(notice);
        }
        localStorage.removeItem('new_notice_notification');
    }
}

function showNoticeAlert(notice) {
    if (Notification.permission === 'granted') {
        const notification = new Notification('📢 New Notice!', {
            body: `${notice.title}\n📅 ${notice.date}`,
            icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png'
        });
        notification.onclick = () => { window.location.href = 'notices.html'; };
    }
    showToastAlert(notice);
}

function showToastAlert(notice) {
    const toast = document.createElement('div');
    toast.innerHTML = `
        <div style="font-size:2rem;">📢</div>
        <div><strong>New Notice!</strong><br>${notice.title}<br><small>${notice.date}</small></div>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;font-size:1.2rem;">×</button>
    `;
    toast.style.cssText = `
        position:fixed; top:20px; right:20px; background:#00f2ff; color:#050510;
        padding:15px; border-radius:16px; display:flex; align-items:center; gap:12px;
        z-index:10000; box-shadow:0 0 20px #00f2ff; cursor:pointer;
    `;
    toast.onclick = (e) => { if(!e.target.tagName==='BUTTON') window.location.href='notices.html'; };
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 8000);
}

function requestNoticePerm() {
    if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    requestNoticePerm();
    checkForNewNoticeNotification();
    setInterval(checkForNewNoticeNotification, 3000);
});
