let devices = [];

// Notify parent frame of content height for iframe resizing
function notifyParentOfHeight() {
    const height = document.body.scrollHeight - 40; // Adjust for back to documentation link
    window.parent.postMessage({ type: 'microsim-resize', height: height }, '*');
}

function getEfficiencyClass(eff) {
    if (eff >= 80) return 'eff-high';
    if (eff >= 60) return 'eff-med-high';
    if (eff >= 40) return 'eff-med';
    if (eff >= 20) return 'eff-low';
    return 'eff-very-low';
}

function renderDevices(filter = 'all') {
    const grid = document.getElementById('deviceGrid');
    grid.innerHTML = '';

    const filtered = filter === 'all'
        ? devices
        : devices.filter(d => d.category === filter);

    filtered.sort((a, b) => b.efficiency - a.efficiency);

    filtered.forEach(device => {
        const effDisplay = device.efficiency > 100 ? device.efficiency + '%*' : device.efficiency + '%';
        const barWidth = Math.min(device.efficiency, 100);
        const waste = device.efficiency <= 100 ? (100 - device.efficiency) : 0;

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-header">
                <span class="card-icon">${device.icon}</span>
                <span class="card-title">${device.name}</span>
            </div>
            <div class="efficiency-value" style="color: ${device.efficiency >= 60 ? '#2e7d32' : device.efficiency >= 30 ? '#f9a825' : '#c62828'}">${effDisplay}</div>
            <div class="efficiency-bar">
                <div class="efficiency-fill ${getEfficiencyClass(device.efficiency)}" style="width: ${barWidth}%">
                    ${barWidth}%
                </div>
            </div>
            ${waste > 0 ? `<div class="waste-label">${waste}% wasted as heat</div>` : '<div class="waste-label">*COP: Moves more heat than energy input</div>'}
            <div class="card-detail">${device.detail}<br><br><strong>Per 100J input:</strong> ${Math.min(device.efficiency, 100)}J useful output</div>
        `;
        card.onclick = () => card.classList.toggle('expanded');
        grid.appendChild(card);
    });

    // Update summary
    const regularDevices = devices.filter(d => d.efficiency <= 100);
    const avg = (regularDevices.reduce((s, d) => s + d.efficiency, 0) / regularDevices.length).toFixed(0);
    const most = devices.reduce((a, b) => a.efficiency > b.efficiency ? a : b);
    const least = regularDevices.reduce((a, b) => a.efficiency < b.efficiency ? a : b);

    document.getElementById('avgEff').textContent = avg + '%';
    document.getElementById('mostEff').textContent = most.name;
    document.getElementById('leastEff').textContent = least.name;
}

function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderDevices(btn.dataset.filter);
        };
    });
}

// Load data and initialize
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        devices = data.devices;
        initFilters();
        renderDevices();
        notifyParentOfHeight();
    })
    .catch(error => {
        console.error('Error loading data:', error);
        document.getElementById('deviceGrid').innerHTML = '<p>Error loading device data.</p>';
    });
