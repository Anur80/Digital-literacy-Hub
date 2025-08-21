// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        // Hide all views
        document.querySelectorAll('#dashboard-view, #lesson-plans-view, #presentations-view, #progress-view, #resources-view, #settings-view')
            .forEach(view => view.classList.add('hidden'));

        // Show the selected view
        const target = this.getAttribute('data-target');
        document.getElementById(`${target}-view`).classList.remove('hidden');

        // Update page title
        const pageTitle = this.querySelector('span').textContent;
        document.getElementById('page-title').textContent = pageTitle;
    });
});

// Lesson form toggle
document.getElementById('create-lesson').addEventListener('click', function() {
    document.getElementById('lesson-form').classList.remove('hidden');
    this.classList.add('hidden');
});

document.getElementById('cancel-lesson').addEventListener('click', function() {
    document.getElementById('lesson-form').classList.add('hidden');
    document.getElementById('create-lesson').classList.remove('hidden');
});

// View all lessons button
document.getElementById('view-all-lessons').addEventListener('click', function() {
    // Set lessons view as active
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
        if (nav.getAttribute('data-target') === 'lesson-plans') {
            nav.classList.add('active');
        }
    });
    
    // Hide all views
    document.querySelectorAll('[id$="-view"]').forEach(view => {
        view.classList.add('hidden');
    });
    
    // Show lesson plans view
    document.getElementById('lesson-plans-view').classList.remove('hidden');
    
    // Update page title
    document.getElementById('page-title').textContent = 'Lesson Plans';
});

// Form submission
document.getElementById('lesson-plan-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Remove sample lesson cards
    document.querySelectorAll('.lesson-card.sample-lesson').forEach(card => card.remove());

    // Get form values
    const title = document.getElementById('lesson-title').value;
    const duration = document.getElementById('lesson-duration').value || '60';
    const objective = document.getElementById('lesson-objective').value;
    const description = document.getElementById('lesson-description').value;
    const materials = document.getElementById('lesson-materials').value;

    // Add new lesson card to the lesson list
    const lessonList = document.querySelector('#lesson-plans-view .lesson-list');
    const newCard = document.createElement('div');
    newCard.className = 'lesson-card';
    newCard.innerHTML = `
        <div class="lesson-content">
            <div class="lesson-title">${title}</div>
            <div class="lesson-meta">
                <span><i class="fas fa-clock"></i> ${duration} min</span>
                <span><i class="fas fa-user"></i> Trainer (You)</span>
            </div>
            <p><strong>Objective:</strong> ${objective}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Materials Needed:</strong> ${materials}</p>
            <div class="lesson-actions mt-20">
                <button class="btn btn-outline">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn">
                    <i class="fas fa-eye"></i> View
                </button>
            </div>
        </div>
    `;
    lessonList.appendChild(newCard);

    // Reset form and hide
    this.reset();
    document.getElementById('lesson-form').classList.add('hidden');
    document.getElementById('create-lesson').classList.remove('hidden');
});

// Simulate progress updates
setInterval(() => {
    const progressElements = document.querySelectorAll('.progress-fill');
    progressElements.forEach(el => {
        const currentWidth = parseInt(el.style.width);
        if (currentWidth < 95) {
            const newWidth = Math.min(currentWidth + 5, 100);
            el.style.width = `${newWidth}%`;
            const progressText = el.closest('.progress-container').querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = `${newWidth}% Complete`;
            }
        }
    });
}, 5000);
// Resource and home page navigation
// Navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        // Hide all views
        document.querySelectorAll('#dashboard-view, #lesson-plans-view, #presentations-view, #progress-view, #resources-view, #settings-view')
            .forEach(view => view.classList.add('hidden'));

        // Show the selected view
        const target = this.getAttribute('data-target');
        document.getElementById(`${target}-view`).classList.remove('hidden');

        // Update page title
        const pageTitle = this.querySelector('span').textContent;
        document.getElementById('page-title').textContent = pageTitle;
    });
});

// Handle resource download buttons
document.querySelectorAll('.resource-actions .btn').forEach(button => {
    button.addEventListener('click', function() {
        const resourceCard = this.closest('.resource-card');
        const resourceTitle = resourceCard.querySelector('.resource-title').textContent;
        
        if (this.querySelector('.fa-download')) {
            alert(`Downloading: ${resourceTitle}\n\nThis would initiate the download process in a real application.`);
        } else if (this.querySelector('.fa-eye')) {
            alert(`Previewing: ${resourceTitle}\n\nThis would show a preview of the resource in a real application.`);
        }
    });
});

// Handle settings toggles
document.querySelectorAll('.switch input').forEach(toggle => {
    toggle.addEventListener('change', function() {
        const settingName = this.closest('.toggle-container').querySelector('.toggle-label').textContent;
        const action = this.checked ? 'enabled' : 'disabled';
        console.log(`${settingName} ${action}`);
    });
});

// Handle save button in account settings
document.querySelector('.setting-card .btn:not(.btn-outline)').addEventListener('click', function() {
    const userName = document.getElementById('user-name').value;
    alert(`Account settings saved for: ${userName}`);
});

// Helper: Show modal with lesson details
function showLessonModal(card) {
    // Create modal if not exists
    let modal = document.getElementById('lesson-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lesson-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="modal-body"></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    // Fill modal with lesson details
    const content = card.querySelector('.lesson-content').cloneNode(true);
    modal.querySelector('.modal-body').innerHTML = '';
    modal.querySelector('.modal-body').appendChild(content);
    modal.style.display = 'block';
}

// Delegate click events for lesson cards
document.querySelector('#lesson-plans-view .lesson-list').addEventListener('click', function(e) {
    const card = e.target.closest('.lesson-card');
    if (!card) return;

    // View button
    if (e.target.closest('.btn:not(.btn-outline)')) {
        showLessonModal(card);
    }

    // Edit button
    if (e.target.closest('.btn-outline')) {
        // Fill form with lesson details
        const title = card.querySelector('.lesson-title').textContent;
        const duration = card.querySelector('.lesson-meta span:first-child').textContent.replace(/\D/g, '') || '60';
        const objective = card.querySelector('p').textContent.replace('Objective:', '').trim();

        document.getElementById('lesson-title').value = title;
        document.getElementById('lesson-duration').value = duration;
        document.getElementById('lesson-objective').value = objective;

        // Show form
        document.getElementById('lesson-form').classList.remove('hidden');
        document.getElementById('create-lesson').classList.add('hidden');

        // Optionally, remove the card being edited after saving
        card.remove();
    }
});