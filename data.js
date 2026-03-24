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
    { title: "ইফতার মাহফিল ২০২৬", date: "March 25, 2026", desc: "Department of IRE organizes Iftar Mahfil. All teachers and students are cordially invited.", icon: "🌙", image: "iftar.jpg" },
    { title: "Orientation Program", date: "April 05, 2026", desc: "Welcome ceremony for new students. Meet the faculty and get to know the department.", icon: "🎓", image: "orientation.jpg" },
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