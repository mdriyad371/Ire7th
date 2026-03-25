// ============================================
// IRE DEPARTMENT WEBSITE - DATA STORAGE
// All data is stored in localStorage for persistence
// ============================================

// Default Data
let coursesData = [
    { code: "PROG 111", title: "Object Oriented Programming Language", credit: "3.0", teacher: "Md. Ashiqussalehin (MAS)" },
    { code: "PROG 112", title: "Object Oriented Programming Language Sessional", credit: "1.0", teacher: "Md. Ashiqussalehin (MAS)" },
    { code: "CSE 113", title: "Data Structure and Algorithms", credit: "3.0", teacher: "Md Toukir Ahmed (MTA)" },
    { code: "CSE 114", title: "Data Structure and Algorithms Sessional", credit: "1.0", teacher: "Md Toukir Ahmed (MTA)" },
    { code: "CSE 115", title: "Discrete Mathematics and Graph Theory", credit: "1.0", teacher: "Suman Saha (SS)" },
    { code: "SEC 105", title: "Basic Principles of Cyber Security", credit: "3.0", teacher: "Fahmida Ahmed Antara (FAA)" },
    { code: "IRE 117", title: "Engineering Mechanics and Materials", credit: "3.0", teacher: "Sadia Enam (SE)" },
    { code: "IRE 118", title: "Engineering Drawing", credit: "3.0", teacher: "Md. Ashiqussalehin (MAS)" }
];

let eventsData = [
    { title: "ইফতার মাহফিল ২০২৬", date: "March 07, 2026", desc: "Department of IRE organizes Iftar Mahfil. All teachers and students are cordially invited.", icon: "🌙", image: "iftar.jpg" },
    { title: "Orientation Program", date: "August 11, 2025", desc: "Welcome ceremony for new students. Meet the faculty and get to know the department.", icon: "🎓", image: "orientation.jpg" },
    { title: "International Conference on Intelligent Robotics", date: "April 15, 2026", desc: "Organized with Korean Technology Partnership, Robotics research paper submission.", icon: "🤖", image: "conference.jpg" },
    { title: "Project Showcase - IRE Summer Fest", date: "June 12, 2026", desc: "Senior projects, robotics competition, and IoT exhibition.", icon: "🚀", image: "showcase.jpg" }
];

let noticesData = [
    { title: "Midterm Exam Routine Published", date: "March 10, 2026", desc: "Midterm exams will start from March 20. Check notice board for details.", icon: "📢" },
    { title: "Robotics Workshop Registration Open", date: "March 15, 2026", desc: "3-day hands-on workshop. Registration ends March 25.", icon: "🔧" },
    { title: "Final Project Defense Schedule", date: "March 20, 2026", desc: "Final project defense for 7th batch students on April 10.", icon: "📄" },
    { title: "New Semester Classes Begin", date: "March 25, 2026", desc: "L2T1 semester classes will start from April 1.", icon: "📅" }
];

// Load saved data from localStorage
function loadSavedData() {
    const savedCourses = localStorage.getItem('ire_courses');
    const savedEvents = localStorage.getItem('ire_events');
    const savedNotices = localStorage.getItem('ire_notices');
    
    if (savedCourses) coursesData = JSON.parse(savedCourses);
    if (savedEvents) eventsData = JSON.parse(savedEvents);
    if (savedNotices) noticesData = JSON.parse(savedNotices);
}

// Save data to localStorage
function saveAllData() {
    localStorage.setItem('ire_courses', JSON.stringify(coursesData));
    localStorage.setItem('ire_events', JSON.stringify(eventsData));
    localStorage.setItem('ire_notices', JSON.stringify(noticesData));
}

// Auto load on page load
loadSavedData();

// Make data available globally
window.coursesData = coursesData;
window.eventsData = eventsData;
window.noticesData = noticesData;
window.saveAllData = saveAllData;
// =============== NOTIFICATION SYSTEM - ONLY FOR NOTICES ===============

// Request notification permission
let notificationPermission = false;

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            notificationPermission = permission === 'granted';
        });
    }
}

// Send notification for new notice
function sendNoticeNotification(notice) {
    if (!notificationPermission) return;
    
    const notification = new Notification('📢 New Notice Published!', {
        body: `${notice.title}\n📅 ${notice.date}\n${notice.desc.substring(0, 80)}...`,
        icon: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
        requireInteraction: true
    });
    
    notification.onclick = function() {
        window.focus();
        window.location.href = 'notices.html';
        this.close();
    };
}

// Toast notification on page
function showPageToast(notice) {
    const toast = document.createElement('div');
    toast.className = 'notice-toast';
    toast.innerHTML = `
        <div class="toast-icon">📢</div>
        <div class="toast-content">
            <div class="toast-title">New Notice!</div>
            <div class="toast-message">${notice.title}</div>
            <div class="toast-date">${notice.date}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px;
        background: linear-gradient(135deg, #00f2ff, #00b8c4);
        color: #050510; padding: 15px 20px; border-radius: 16px;
        display: flex; align-items: center; gap: 15px;
        z-index: 10000; box-shadow: 0 0 30px rgba(0,242,255,0.5);
        animation: slideIn 0.5s ease; max-width: 350px; cursor: pointer;
    `;
    
    toast.onclick = function(e) {
        if (!e.target.classList.contains('toast-close')) {
            window.location.href = 'notices.html';
        }
        this.remove();
    };
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 8000);
}

// Add CSS
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .toast-title { font-weight: bold; font-size: 0.9rem; }
    .toast-message { font-size: 0.85rem; font-weight: 500; }
    .toast-date { font-size: 0.7rem; opacity: 0.7; margin-top: 4px; }
    .toast-icon { font-size: 2rem; }
    .toast-close { background: none; border: none; font-size: 20px; cursor: pointer; padding: 0 5px; }
`;
document.head.appendChild(toastStyle);

// Check for new notices
let lastNoticeCount = noticesData ? noticesData.length : 0;

function checkForNewNotices() {
    if (!noticesData) return;
    const currentCount = noticesData.length;
    if (currentCount > lastNoticeCount) {
        const newNotice = noticesData[currentCount - 1];
        sendNoticeNotification(newNotice);
        showPageToast(newNotice);
    }
    lastNoticeCount = currentCount;
}

// Initialize
function initNoticeNotification() {
    requestNotificationPermission();
    setInterval(checkForNewNotices, 5000);
}

// Start when page loads
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initNoticeNotification);
                                          }
