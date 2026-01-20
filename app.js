// ===== ROBO-I Liquor Intelligence - Main Application =====

// ===============================
// Camera Data
// ===============================

const cameraData = {
    'cam-01': { name: 'CAM-01 | Entrance/Exit', persons: 12, detections: 847, status: 'online', zone: 'entrance' },
    'cam-02': { name: 'CAM-02 | Spirits Section', persons: 8, detections: 523, status: 'online', zone: 'spirits' },
    'cam-03': { name: 'CAM-03 | Wine Section', persons: 5, detections: 312, status: 'online', zone: 'wine' },
    'cam-04': { name: 'CAM-04 | Beer & Cooler', persons: 6, detections: 287, status: 'online', zone: 'beer' },
    'cam-05': { name: 'CAM-05 | Checkout Counter', persons: 4, detections: 1024, status: 'alert', zone: 'checkout' },
    'cam-06': { name: 'CAM-06 | Storage/Backroom', persons: 1, detections: 89, status: 'online', zone: 'storage' }
};

// ===============================
// Mock Data
// ===============================

const mockAlerts = [
    {
        title: 'Suspicious Loitering Detected',
        meta: 'CAM-02 | Spirits Section | 7+ min dwell time',
        time: '2 min ago',
        severity: 'high',
        icon: '👀'
    },
    {
        title: 'Age Verification Missed',
        meta: 'CAM-05 | Checkout | Customer appeared under 30',
        time: '15 min ago',
        severity: 'critical',
        icon: '🎂'
    },
    {
        title: 'Cooler Door Open Alert',
        meta: 'CAM-04 | Beer Section | Door open > 45 sec',
        time: '28 min ago',
        severity: 'medium',
        icon: '❄️'
    },
    {
        title: 'Low Stock Alert - Craft Beer',
        meta: 'Inventory | Cooler Section | 78% stock level',
        time: '1 hr ago',
        severity: 'medium',
        icon: '🍺'
    }
];

const mockInventory = [
    { id: 'SPR-01', name: 'Johnnie Walker Black', icon: '🥃', status: 'ok', category: 'spirits', stock: 24 },
    { id: 'SPR-02', name: 'Grey Goose Vodka', icon: '🥃', status: 'ok', category: 'spirits', stock: 18 },
    { id: 'SPR-03', name: 'Patron Silver', icon: '🥃', status: 'ok', category: 'spirits', stock: 12 },
    { id: 'SPR-04', name: 'Jack Daniels', icon: '🥃', status: 'ok', category: 'spirits', stock: 32 },
    { id: 'WIN-01', name: 'Caymus Cabernet', icon: '🍷', status: 'ok', category: 'wine', stock: 8 },
    { id: 'WIN-02', name: 'Kim Crawford Sauv Blanc', icon: '🍷', status: 'ok', category: 'wine', stock: 15 },
    { id: 'WIN-03', name: 'Moet Chandon', icon: '🍾', status: 'ok', category: 'wine', stock: 6 },
    { id: 'BER-01', name: 'Craft IPA Selection', icon: '🍺', status: 'warning', category: 'beer', stock: 12 },
    { id: 'BER-02', name: 'Imported Lagers', icon: '🍺', status: 'ok', category: 'beer', stock: 48 },
    { id: 'BER-03', name: 'Domestic 12-packs', icon: '🍺', status: 'ok', category: 'beer', stock: 36 }
];

const mockStaff = [
    { id: 'EMP001', name: 'Sarah Johnson', initials: 'SJ', role: 'Store Manager', status: 'compliant', zone: 'Floor' },
    { id: 'EMP002', name: 'Mike Chen', initials: 'MC', role: 'Cashier', status: 'compliant', zone: 'Checkout 1' },
    { id: 'EMP003', name: 'Lisa Williams', initials: 'LW', role: 'Cashier', status: 'compliant', zone: 'Checkout 2' },
    { id: 'EMP004', name: 'James Brown', initials: 'JB', role: 'Stock Associate', status: 'compliant', zone: 'Spirits' },
    { id: 'EMP005', name: 'Emily Davis', initials: 'ED', role: 'Floor Associate', status: 'compliant', zone: 'Wine' },
    { id: 'EMP006', name: 'Robert Wilson', initials: 'RW', role: 'Floor Associate', status: 'compliant', zone: 'Entrance' }
];

const mockQueueLanes = [
    { id: 'Counter 1', queue: 2, wait: 2.1, status: 'ok' },
    { id: 'Counter 2', queue: 1, wait: 1.4, status: 'ok' }
];

const verificationLog = [
    { time: '2:42 PM', customer: 'Male, ~25', result: 'verified', staff: 'Mike C.' },
    { time: '2:38 PM', customer: 'Female, ~22', result: 'verified', staff: 'Lisa W.' },
    { time: '2:35 PM', customer: 'Male, ~19', result: 'refused', staff: 'Mike C.' },
    { time: '2:31 PM', customer: 'Female, ~28', result: 'verified', staff: 'Lisa W.' },
    { time: '2:28 PM', customer: 'Male, ~35', result: 'verified', staff: 'Mike C.' },
    { time: '2:24 PM', customer: 'Male, ~17', result: 'refused', staff: 'Mike C.' },
    { time: '2:20 PM', customer: 'Female, ~30', result: 'verified', staff: 'Lisa W.' },
    { time: '2:15 PM', customer: 'Male, ~24', result: 'missed', staff: 'Mike C.' },
    { time: '2:12 PM', customer: 'Female, ~26', result: 'verified', staff: 'Lisa W.' },
    { time: '2:08 PM', customer: 'Male, ~18', result: 'refused', staff: 'Mike C.' }
];

// Live Analysis Data
let isLiveAnalysisRunning = true;
const analysisHistory = [
    { time: '2:44 PM', event: 'ID verification completed successfully', type: 'success', camera: 'CAM-05' },
    { time: '2:42 PM', event: 'Customer entered store, age estimate: 35-40', type: 'info', camera: 'CAM-01' },
    { time: '2:40 PM', event: 'Staff confirmed in uniform with badge', type: 'success', camera: 'CAM-05' },
    { time: '2:38 PM', event: 'Suspicious loitering detected in spirits section', type: 'warning', camera: 'CAM-02' },
    { time: '2:35 PM', event: 'Minor refused service - ID check successful', type: 'success', camera: 'CAM-05' },
    { time: '2:32 PM', event: 'Cooler door opened by customer', type: 'info', camera: 'CAM-04' },
    { time: '2:30 PM', event: 'Queue cleared, no wait time', type: 'success', camera: 'CAM-05' },
    { time: '2:28 PM', event: 'Customer browsing wine section', type: 'info', camera: 'CAM-03' }
];

// ===============================
// DOM Ready
// ===============================

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeDashboard();
    initializeTabNavigation();
    initializeCameraSelector();
    initializeCharts();
    initializeLiveAnalysis();
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// ===============================
// Theme Toggle
// ===============================

function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('roboiLiquorTheme') || 'dark';

    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            if (newTheme === 'light') {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }

            localStorage.setItem('roboiLiquorTheme', newTheme);
            updateChartsForTheme(newTheme);
        });
    }
}

function updateChartsForTheme(theme) {
    const textColor = theme === 'light' ? '#475569' : '#94a3b8';
    const gridColor = theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';

    Chart.defaults.color = textColor;
    Chart.defaults.borderColor = gridColor;
}

// ===============================
// Dashboard Initialization
// ===============================

function initializeDashboard() {
    renderAlerts();
    renderInventoryGrid();
    renderStaffGrid();
    renderQueueStatus();
    renderVerificationLog();
    renderAnalysisHistory();
}

// ===============================
// Tab Navigation
// ===============================

function initializeTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `tab-${tabId}`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// ===============================
// Camera Selector
// ===============================

function initializeCameraSelector() {
    const cameraSelect = document.getElementById('cameraSelect');
    if (cameraSelect) {
        cameraSelect.addEventListener('change', (e) => {
            updateCameraView(e.target.value, 'main');
        });
    }

    const cameraButtons = document.querySelectorAll('.camera-select-btn');
    cameraButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            cameraButtons.forEach(b => b.style.background = 'var(--bg-glass)');
            btn.style.background = 'var(--bg-glass-hover)';
            updateCameraView(btn.dataset.camera, 'tab');
        });
    });
}

function updateCameraView(cameraId, viewType) {
    const data = cameraData[cameraId];
    if (!data) return;

    if (viewType === 'main') {
        document.getElementById('cameraName').textContent = data.name;
        document.getElementById('cameraPersons').textContent = data.persons;
        document.getElementById('cameraDetections').textContent = data.detections;

        const view = document.getElementById('cameraView');
        if (data.status === 'alert') {
            view.style.border = '2px solid var(--critical)';
            view.style.boxShadow = '0 0 30px var(--critical-glow)';
        } else {
            view.style.border = '1px solid var(--border-glass)';
            view.style.boxShadow = 'none';
        }
    } else {
        document.getElementById('cameraTabName').textContent = data.name;
        document.getElementById('cameraTabPersons').textContent = data.persons;

        const view = document.getElementById('cameraTabView');
        if (data.status === 'alert') {
            view.style.border = '2px solid var(--critical)';
            view.style.boxShadow = '0 0 30px var(--critical-glow)';
        } else {
            view.style.border = '1px solid var(--border-glass)';
            view.style.boxShadow = 'none';
        }
    }
}

// ===============================
// Date/Time Update
// ===============================

function updateDateTime() {
    const now = new Date();

    const timeEl = document.getElementById('currentTime');
    const dateEl = document.getElementById('currentDate');

    if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
}

// ===============================
// Render Functions
// ===============================

function renderAlerts() {
    const list = document.getElementById('alertsList');
    if (!list) return;

    list.innerHTML = mockAlerts.map(alert => `
        <div class="alert-item ${alert.severity}">
            <span class="alert-icon">${alert.icon}</span>
            <div class="alert-content">
                <span class="alert-title">${alert.title}</span>
                <span class="alert-meta">${alert.meta}</span>
            </div>
            <span class="alert-time">${alert.time}</span>
        </div>
    `).join('');
}

function renderInventoryGrid() {
    const grid = document.getElementById('inventoryGrid');
    if (!grid) return;

    grid.innerHTML = mockInventory.map(item => `
        <div class="equipment-item ${item.status}">
            <div class="equipment-icon">${item.icon}</div>
            <div class="equipment-name">${item.name}</div>
            <div class="equipment-status">${item.status === 'ok' ? `✓ ${item.stock} units` : `⚠ ${item.stock} units`}</div>
        </div>
    `).join('');
}

function renderStaffGrid() {
    const grid = document.getElementById('staffGrid');
    if (!grid) return;

    grid.innerHTML = mockStaff.map(staff => `
        <div class="staff-card ${staff.status}">
            <div class="staff-avatar">${staff.initials}</div>
            <div class="staff-info">
                <div class="staff-name">${staff.name}</div>
                <div class="staff-role">${staff.role} | ${staff.zone}</div>
                <div class="staff-status">${staff.status === 'compliant' ? '✓ Compliant' : `⚠ ${staff.issue}`}</div>
            </div>
        </div>
    `).join('');
}

function renderQueueStatus() {
    const container = document.getElementById('queueStatus');
    if (!container) return;

    container.innerHTML = mockQueueLanes.map(lane => {
        const statusClass = lane.status === 'critical' ? 'critical' : lane.status === 'warning' ? 'warning' : '';
        const fillPercent = Math.min((lane.queue / 6) * 100, 100);
        return `
            <div class="queue-lane ${statusClass}">
                <span class="queue-lane-name">${lane.id}</span>
                <div class="queue-bar">
                    <div class="queue-bar-fill" style="width: ${fillPercent}%;"></div>
                </div>
                <span class="queue-info">${lane.queue} ppl • ${lane.wait}m</span>
            </div>
        `;
    }).join('');
}

function renderVerificationLog() {
    const container = document.getElementById('verificationLog');
    if (!container) return;

    container.innerHTML = verificationLog.map(entry => {
        const statusColor = entry.result === 'verified' ? 'var(--success)' :
            entry.result === 'refused' ? 'var(--high)' : 'var(--critical)';
        const statusIcon = entry.result === 'verified' ? '✓' :
            entry.result === 'refused' ? '🚫' : '⚠️';
        return `
            <div style="display: flex; justify-content: space-between; padding: 0.5rem; border-bottom: 1px solid var(--border-glass); font-size: 0.8rem;">
                <span style="color: var(--text-muted);">${entry.time}</span>
                <span>${entry.customer}</span>
                <span style="color: ${statusColor};">${statusIcon} ${entry.result}</span>
                <span style="color: var(--text-muted);">${entry.staff}</span>
            </div>
        `;
    }).join('');
}

function renderAnalysisHistory() {
    const container = document.getElementById('analysisHistory');
    if (!container) return;

    container.innerHTML = analysisHistory.map(entry => {
        const typeClass = entry.type === 'success' ? 'success' :
            entry.type === 'warning' ? 'warning' : 'info';
        const typeIcon = entry.type === 'success' ? '✓' :
            entry.type === 'warning' ? '⚠️' : 'ℹ️';
        return `
            <div class="detection-item ${typeClass}" style="display: flex; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid var(--border-glass);">
                <span style="width: 25px;">${typeIcon}</span>
                <span style="flex: 1; font-size: 0.85rem;">${entry.event}</span>
                <span style="color: var(--text-muted); font-size: 0.75rem;">${entry.camera}</span>
                <span style="color: var(--text-muted); font-size: 0.75rem; width: 70px; text-align: right;">${entry.time}</span>
            </div>
        `;
    }).join('');
}

// ===============================
// Live Analysis Functions
// ===============================

function initializeLiveAnalysis() {
    // Initialize live analysis camera selector
    const liveCamera = document.getElementById('liveAnalysisCamera');
    if (liveCamera) {
        liveCamera.addEventListener('change', (e) => {
            updateLiveAnalysisView(e.target.value);
        });
    }

    // Initialize model selector
    const modelSelect = document.getElementById('aiModelSelect');
    if (modelSelect) {
        modelSelect.addEventListener('change', (e) => {
            updateModelSelection(e.target.value);
        });
    }

    // Start simulated live updates
    setInterval(simulateLiveDetections, 5000);
}

function updateLiveAnalysisView(cameraId) {
    const data = cameraData[cameraId];
    if (!data) return;

    // Update scene description based on camera zone
    const sceneDescriptions = {
        'cam-01': 'Entrance area with security checkpoint. 2 customers entering, age verification zone active.',
        'cam-02': 'Premium spirits section. 1 customer browsing whiskey selection, no suspicious activity.',
        'cam-03': 'Wine wall display. 2 customers comparing wines, staff member nearby for assistance.',
        'cam-04': 'Beer cooler area. 1 customer at cooler, door currently closed, temperature optimal.',
        'cam-05': 'Checkout counter with 1 customer and 1 staff member. ID verification in progress.',
        'cam-06': 'Storage/backroom. 1 staff member organizing inventory, area secured.'
    };

    const sceneEl = document.getElementById('sceneDescription');
    if (sceneEl) {
        sceneEl.innerHTML = `<p style="font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary);">
            <strong style="color: var(--accent-primary);">Current Scene:</strong> ${sceneDescriptions[cameraId] || 'Analyzing...'}
        </p>`;
    }
}

function updateModelSelection(model) {
    const modelNames = {
        'gpt4v': 'GPT-4 Vision',
        'gemini': 'Gemini Pro Vision',
        'llama': 'LLaMA 3.2 Vision',
        'claude': 'Claude 3.5 Sonnet'
    };
    console.log(`Switched to ${modelNames[model]} model`);

    // Update timestamp
    const timestamp = document.getElementById('analysisTimestamp');
    if (timestamp) {
        timestamp.textContent = `Model: ${modelNames[model]} | Updated: Just now`;
    }
}

function analyzeFrame() {
    // Simulate frame analysis
    const sceneEl = document.getElementById('sceneDescription');
    if (sceneEl) {
        sceneEl.innerHTML = `<p style="font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary);">
            <strong style="color: var(--accent-primary);">🔄 Analyzing...</strong>
        </p>`;
    }

    setTimeout(() => {
        const analyses = [
            'Checkout counter active. Customer (male, estimated age 28-32) completing purchase. Staff member verified ID - valid license detected. Transaction in progress.',
            'Single customer at checkout. Age estimation: 40-45. No ID check required based on appearance. Staff properly uniformed, badge visible.',
            'Queue forming at checkout - 3 customers waiting. Average wait time: 2.5 minutes. Staff actively processing transactions.',
            'Customer approaching with multiple bottles. Staff preparing for ID verification. Queue clear.'
        ];

        const randomAnalysis = analyses[Math.floor(Math.random() * analyses.length)];

        if (sceneEl) {
            sceneEl.innerHTML = `<p style="font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary);">
                <strong style="color: var(--accent-primary);">Current Scene:</strong> ${randomAnalysis}
            </p>`;
        }

        // Update timestamp
        const timestamp = document.getElementById('analysisTimestamp');
        if (timestamp) {
            timestamp.textContent = `Updated: Just now`;
        }

        // Add to detection list
        addDetection('Frame analyzed - ' + randomAnalysis.substring(0, 50) + '...', 'info');
    }, 1500);
}

function toggleLiveAnalysis() {
    isLiveAnalysisRunning = !isLiveAnalysisRunning;
    const btn = document.getElementById('toggleLiveBtn');
    if (btn) {
        btn.innerHTML = isLiveAnalysisRunning ? '⏸️ Pause' : '▶️ Resume';
    }
}

function exportAnalysis() {
    alert('📊 Analysis report exported successfully!\n\nFile: liquor_analysis_' + new Date().toISOString().slice(0, 10) + '.pdf');
}

function simulateLiveDetections() {
    if (!isLiveAnalysisRunning) return;

    const events = [
        { event: 'Customer entered store', type: 'info' },
        { event: 'ID check completed successfully', type: 'success' },
        { event: 'Staff position verified', type: 'success' },
        { event: 'Queue length optimal', type: 'success' },
        { event: 'Cooler temperature checked: 38°F', type: 'info' }
    ];

    const randomEvent = events[Math.floor(Math.random() * events.length)];
    addDetection(randomEvent.event, randomEvent.type);
}

function addDetection(message, type) {
    const list = document.getElementById('detectionsList');
    if (!list) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const icon = type === 'success' ? '✓' : type === 'warning' ? '⚠️' : 'ℹ️';

    const newItem = document.createElement('div');
    newItem.className = `detection-item ${type}`;
    newItem.innerHTML = `
        <span>${icon}</span>
        <span>${message}</span>
        <span style="color: var(--text-muted);">Just now</span>
    `;

    list.insertBefore(newItem, list.firstChild);

    // Keep only last 4 items
    while (list.children.length > 4) {
        list.removeChild(list.lastChild);
    }
}

// ===============================
// Charts
// ===============================

Chart.defaults.color = '#94a3b8';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.08)';

function initializeCharts() {
    initFootfallChart();
    initAgeCheckChart();
    initVerificationChart();
    initHourlyTrafficChart();
    initSalesChart();
    initSecurityChart();
}

function initFootfallChart() {
    const ctx = document.getElementById('footfallChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Customers',
                data: [456, 523, 489, 567, 798, 1024, 847],
                borderColor: '#8B0000',
                backgroundColor: 'rgba(139, 0, 0, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8B0000',
                pointBorderColor: '#8B0000',
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Purchases',
                data: [356, 412, 378, 445, 623, 798, 662],
                borderColor: '#DAA520',
                backgroundColor: 'rgba(218, 165, 32, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#DAA520',
                pointBorderColor: '#DAA520',
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { usePointStyle: true, padding: 20, font: { size: 11 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#64748b' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b' }
                }
            }
        }
    });
}

function initAgeCheckChart() {
    const ctx = document.getElementById('ageCheckChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm'],
            datasets: [{
                label: 'Verified',
                data: [8, 12, 18, 24, 28, 32, 20],
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderRadius: 6
            }, {
                label: 'Refused',
                data: [0, 1, 0, 1, 0, 1, 0],
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { usePointStyle: true, padding: 15, font: { size: 10 } }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    stacked: true,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#64748b' }
                },
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { color: '#64748b' }
                }
            }
        }
    });
}

function initVerificationChart() {
    const ctx = document.getElementById('verificationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm'],
            datasets: [{
                label: 'Compliance %',
                data: [100, 100, 97, 100, 100, 98, 100],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    min: 90,
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#64748b', callback: v => v + '%' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#64748b' }
                }
            }
        }
    });
}

function initHourlyTrafficChart() {
    const ctx = document.getElementById('hourlyTrafficChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'],
            datasets: [{
                label: 'Customers',
                data: [24, 45, 67, 89, 78, 92, 105, 118, 134, 98],
                borderColor: '#8B0000',
                backgroundColor: 'rgba(139, 0, 0, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#64748b' } },
                x: { grid: { display: false }, ticks: { color: '#64748b' } }
            }
        }
    });
}

function initSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Spirits', 'Wine', 'Beer', 'Mixers', 'Accessories'],
            datasets: [{
                data: [42, 28, 18, 8, 4],
                backgroundColor: [
                    'rgba(139, 0, 0, 0.8)',
                    'rgba(114, 47, 55, 0.8)',
                    'rgba(218, 165, 32, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(100, 116, 139, 0.8)'
                ],
                borderColor: ['#8B0000', '#722F37', '#DAA520', '#10b981', '#64748b'],
                borderWidth: 2,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: { usePointStyle: true, padding: 15, font: { size: 11 }, color: '#94a3b8' }
                }
            }
        }
    });
}

function initSecurityChart() {
    const ctx = document.getElementById('securityChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Incidents',
                data: [3, 2, 4, 1],
                backgroundColor: [
                    'rgba(249, 115, 22, 0.7)',
                    'rgba(234, 179, 8, 0.7)',
                    'rgba(249, 115, 22, 0.7)',
                    'rgba(16, 185, 129, 0.7)'
                ],
                borderColor: ['#f97316', '#eab308', '#f97316', '#10b981'],
                borderWidth: 2,
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#64748b' } },
                x: { grid: { display: false }, ticks: { color: '#64748b' } }
            }
        }
    });
}

// ===============================
// LIQUOR-GPT Chat
// ===============================

const chatResponses = {
    "Show age verification status": `<strong style="color: var(--success);">🎂 Age Verification Status</strong>

<div style="margin-top: 0.75rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
<div style="padding: 0.75rem; background: var(--bg-glass); border-radius: 8px; text-align: center;">
<div style="font-size: 1.5rem; font-weight: 800; color: var(--success);">98.5%</div>
<div style="font-size: 0.7rem; color: var(--text-muted);">ID Check Rate</div>
</div>
<div style="padding: 0.75rem; background: var(--bg-glass); border-radius: 8px; text-align: center;">
<div style="font-size: 1.5rem; font-weight: 800; color: var(--success);">142</div>
<div style="font-size: 0.7rem; color: var(--text-muted);">Verified Today</div>
</div>
</div>

<div style="margin-top: 0.5rem; padding: 0.5rem; background: var(--high-bg); border-radius: 6px;">
⚠️ <strong>1 missed verification</strong> at 2:15 PM - Review recommended
</div>

<div style="margin-top: 0.5rem; padding: 0.5rem; background: var(--success-bg); border-radius: 6px;">
✅ 3 minors successfully refused service today
</div>`,

    "What are today's alerts?": `<strong style="color: var(--critical);">🚨 Today's Alerts</strong>

<div style="margin-top: 0.75rem; display: grid; gap: 0.5rem;">
<div style="padding: 0.75rem; background: var(--high-bg); border-left: 3px solid var(--high); border-radius: 6px;">
<strong>1. Suspicious Loitering</strong> - Spirits Section<br>
<span style="font-size: 0.8rem; color: var(--text-muted);">CAM-02 | 2 min ago | 7+ min dwell time</span>
</div>
<div style="padding: 0.75rem; background: var(--critical-bg); border-left: 3px solid var(--critical); border-radius: 6px;">
<strong>2. Age Verification Missed</strong> - Checkout<br>
<span style="font-size: 0.8rem; color: var(--text-muted);">CAM-05 | 15 min ago | Under 30 appearance</span>
</div>
<div style="padding: 0.75rem; background: var(--medium-bg); border-left: 3px solid var(--medium); border-radius: 6px;">
<strong>3. Cooler Door Alert</strong> - Beer Section<br>
<span style="font-size: 0.8rem; color: var(--text-muted);">CAM-04 | 28 min ago | Open > 45 sec</span>
</div>
</div>

<div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--accent-primary);">💡 Recommendation: Review checkout footage for missed ID check</div>`,

    'Show inventory status': `<strong style="color: var(--accent-primary);">🍷 Inventory Status</strong>

<div style="margin-top: 0.75rem; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem;">
<div style="padding: 0.75rem; background: var(--success-bg); border-radius: 8px; text-align: center;">
<div style="font-size: 1.25rem;">🥃</div>
<div style="font-weight: 600;">Spirits</div>
<div style="color: var(--success);">98% stocked</div>
</div>
<div style="padding: 0.75rem; background: var(--success-bg); border-radius: 8px; text-align: center;">
<div style="font-size: 1.25rem;">🍷</div>
<div style="font-weight: 600;">Wine</div>
<div style="color: var(--success);">96% stocked</div>
</div>
<div style="padding: 0.75rem; background: var(--medium-bg); border-radius: 8px; text-align: center;">
<div style="font-size: 1.25rem;">🍺</div>
<div style="font-weight: 600;">Beer</div>
<div style="color: var(--medium);">78% stocked ⚠️</div>
</div>
</div>

<div style="margin-top: 0.5rem; padding: 0.5rem; background: var(--medium-bg); border-radius: 6px;">
⚠️ <strong>Low Stock:</strong> Craft IPA Selection - Consider reorder
</div>

<div style="margin-top: 0.5rem; padding: 0.5rem; background: var(--success-bg); border-radius: 6px;">
✅ Cooler temperature: 38°F - Optimal
</div>`,

    'Staff compliance summary': `<strong style="color: var(--success);">👔 Staff Compliance Summary</strong>

<div style="margin-top: 0.75rem; padding: 0.75rem; background: var(--success-bg); border-radius: 8px;">
✅ <strong>All 6 staff members fully compliant</strong>
</div>

<div style="margin-top: 0.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
<div style="padding: 0.5rem; background: var(--bg-glass); border-radius: 6px;">
<span style="color: var(--text-muted);">Uniform:</span> <strong style="color: var(--success);">100%</strong>
</div>
<div style="padding: 0.5rem; background: var(--bg-glass); border-radius: 6px;">
<span style="color: var(--text-muted);">Zone Coverage:</span> <strong style="color: var(--success);">100%</strong>
</div>
<div style="padding: 0.5rem; background: var(--bg-glass); border-radius: 6px;">
<span style="color: var(--text-muted);">Phone Usage:</span> <strong style="color: var(--success);">0 violations</strong>
</div>
<div style="padding: 0.5rem; background: var(--bg-glass); border-radius: 6px;">
<span style="color: var(--text-muted);">ID Check Rate:</span> <strong style="color: var(--success);">98%</strong>
</div>
</div>`,

    'Generate compliance report': `<strong style="color: var(--accent-primary);">📋 COMPLIANCE REPORT</strong>
<span style="color: var(--text-muted); font-size: 0.75rem;">Generated by LIQUOR-GPT AI • January 20, 2026</span>

<div style="margin-top: 1rem; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
<div style="padding: 0.75rem; background: var(--bg-glass); border-radius: 8px; text-align: center;">
<div style="font-size: 1.5rem; font-weight: 800; color: var(--success);">94%</div>
<div style="font-size: 0.7rem; color: var(--text-muted);">Store Health</div>
</div>
<div style="padding: 0.75rem; background: var(--bg-glass); border-radius: 8px; text-align: center;">
<div style="font-size: 1.5rem; font-weight: 800; color: var(--success);">98.5%</div>
<div style="font-size: 0.7rem; color: var(--text-muted);">Age Verification</div>
</div>
<div style="padding: 0.75rem; background: var(--bg-glass); border-radius: 8px; text-align: center;">
<div style="font-size: 1.5rem; font-weight: 800; color: var(--success);">96%</div>
<div style="font-size: 0.7rem; color: var(--text-muted);">Overall Compliance</div>
</div>
</div>

<div style="margin-top: 1rem; padding: 0.75rem; background: var(--high-bg); border-left: 3px solid var(--high); border-radius: 6px;">
<strong>⚠️ Areas Needing Attention:</strong><br>
• 1 missed age verification at 2:15 PM<br>
• Low stock on Craft IPA Selection<br>
• Suspicious loitering in spirits section
</div>

<div style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--accent-primary);">📥 Click to export as PDF</div>`,

    'Security status': `<strong style="color: var(--success);">🛡️ Security Status</strong>

<div style="margin-top: 0.75rem; display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
<div style="padding: 0.75rem; background: var(--success-bg); border-radius: 8px; text-align: center;">
<div style="font-size: 1.25rem;">✓</div>
<div style="font-weight: 600;">Theft Attempts</div>
<div style="color: var(--success);">0 today</div>
</div>
<div style="padding: 0.75rem; background: var(--success-bg); border-radius: 8px; text-align: center;">
<div style="font-size: 1.25rem;">✓</div>
<div style="font-weight: 600;">Cash Drawer</div>
<div style="color: var(--success);">Secured</div>
</div>
</div>

<div style="margin-top: 0.5rem; padding: 0.5rem; background: var(--high-bg); border-radius: 6px;">
⚠️ <strong>Active Alert:</strong> Suspicious loitering in spirits section (CAM-02)
</div>

<div style="margin-top: 0.5rem; display: flex; justify-content: space-between; padding: 0.5rem; font-size: 0.8rem;">
<span>Backroom Access:</span>
<span style="color: var(--success);">✓ Secured</span>
</div>
<div style="display: flex; justify-content: space-between; padding: 0.5rem; font-size: 0.8rem;">
<span>After-Hours Alerts:</span>
<span style="color: var(--success);">✓ None</span>
</div>`
};

function askGPT(question) {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');

    chatMessages.innerHTML += `
        <div class="chat-message user">
            <div class="chat-avatar">👤</div>
            <div class="chat-bubble">${question}</div>
        </div>
    `;

    if (chatInput) chatInput.value = '';

    setTimeout(() => {
        const response = chatResponses[question] ||
            `I understand your query about "<strong>${question}</strong>". Let me analyze the store data and provide insights. Is there anything specific you'd like me to focus on?`;

        chatMessages.innerHTML += `
            <div class="chat-message">
                <div class="chat-avatar">🤖</div>
                <div class="chat-bubble">${response}</div>
            </div>
        `;

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 600);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Chat input handler
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    if (chatInput && chatSend) {
        chatSend.addEventListener('click', () => {
            if (chatInput.value.trim()) {
                askGPT(chatInput.value.trim());
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && chatInput.value.trim()) {
                askGPT(chatInput.value.trim());
            }
        });
    }
});

// ===============================
// AI Report Generation
// ===============================

function generateAIReport() {
    const reportType = document.getElementById('reportType')?.value || 'daily';
    const reportQueries = {
        daily: 'Generate compliance report',
        weekly: 'Generate compliance report',
        age: 'Show age verification status',
        security: 'Security status'
    };

    // Switch to assistant tab and ask the query
    document.querySelector('[data-tab=assistant]').click();
    setTimeout(() => {
        askGPT(reportQueries[reportType]);
    }, 300);
}
