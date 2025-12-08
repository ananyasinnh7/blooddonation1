// BloodLink Global Logic
// Mock Initial Data
const initialRequests = [
    { id: 1, bloodGroup: 'O+', location: 'City General Hospital', urgency: 'Urgent', date: '2025-05-12' },
    { id: 2, bloodGroup: 'AB-', location: 'St. Marys Clinic', urgency: 'Critical', date: '2025-05-11' },
    { id: 3, bloodGroup: 'A+', location: 'City General Hospital', urgency: 'Normal', date: '2025-05-10' },
];
// Initialize Storage
if (!localStorage.getItem('bloodRequests')) {
    localStorage.setItem('bloodRequests', JSON.stringify(initialRequests));
}
// 1. Eligibility Logic (90 Days / 3 Months rule)
function checkEligibility(lastDateString) {
    if (!lastDateString) return true; // First time donor
    const lastDate = new Date(lastDateString);
    const today = new Date();
    // Calculate difference in time
    const diffTime = Math.abs(today - lastDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 90;
}
// 2. Data Management
function getRequests() {
    return JSON.parse(localStorage.getItem('bloodRequests')) || [];
}
function addRequest(request) {
    const requests = getRequests();
    requests.unshift(request); // Add to top
    localStorage.setItem('bloodRequests', JSON.stringify(requests));
}
// 3. UI Rendering (Index Page)
function renderRequests(filterGroup = 'all', filterLocation = '') {
    const grid = document.getElementById('requests-grid');
    if (!grid) return; // Not on index page
    const requests = getRequests();
    grid.innerHTML = '';
    const filtered = requests.filter(req => {
        const matchGroup = filterGroup === 'all' || req.bloodGroup === filterGroup;
        const matchLoc = req.location.toLowerCase().includes(filterLocation.toLowerCase());
        return matchGroup && matchLoc;
    });
    if (filtered.length === 0) {
        grid.innerHTML = '<p class="card" style="grid-column: 1/-1; text-align:center; color:var(--secondary)">No requests found matching your criteria.</p>';
        return;
    }
    filtered.forEach(req => {
        const card = document.createElement('div');
        card.className = 'card';
        let badgeColor = '#fee2e2'; // Red (Normal)
        let textColor = '#991b1b';
        if (req.urgency === 'Critical') {
            badgeColor = '#ef4444';
            textColor = '#fff';
        }
        card.innerHTML = `
            <div class="card-header">
                <span class="blood-group-badge">${req.bloodGroup}</span>
                <span style="background:${badgeColor}; color:${textColor}; padding:0.25rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600">${req.urgency}</span>
            </div>
            <div class="info-row">
                <span>Location</span>
                <span class="info-value">${req.location}</span>
            </div>
            <div class="info-row">
                <span>Posted</span>
                <span class="info-value">${req.date}</span>
            </div>
            <button class="btn btn-outline w-full" style="margin-top:1rem" onclick="window.location.href='donor.html'">Donate</button>
        `;
        grid.appendChild(card);
    });
}
// 4. UI Rendering (Hospital Page)
function renderHospitalRequests() {
    const list = document.getElementById('hospital-requests-list');
    const statsActive = document.getElementById('stats-active');
    const statsCritical = document.getElementById('stats-critical');
    if (!list) return;
    const requests = getRequests();
    // Update Stats
    if (statsActive) statsActive.textContent = requests.length;
    if (statsCritical) statsCritical.textContent = requests.filter(r => r.urgency === 'Critical').length;
    list.innerHTML = '';
    requests.forEach(req => {
        const item = document.createElement('div');
        item.className = 'card';
        item.style.marginBottom = '1rem';
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center">
                <div>
                    <span style="font-weight:700; margin-right:1rem">${req.bloodGroup}</span>
                    <span style="color:var(--secondary)">${req.urgency} - ${req.date}</span>
                </div>
                <button class="btn btn-outline" style="font-size:0.75rem; padding:0.4rem">Mark Fulfilled</button>
            </div>
        `;
        list.appendChild(item);
    });
}
// 5. Search Function
function searchBlood() {
    const group = document.getElementById('blood-group').value;
    const location = document.getElementById('location').value;
    renderRequests(group, location);
}
// Init on Index Load
document.addEventListener('DOMContentLoaded', () => {
    // If on index page, render all
    if (document.getElementById('requests-grid')) {
        renderRequests();
    }
});
