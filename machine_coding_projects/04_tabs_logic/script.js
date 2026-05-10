const tabWrapper = document.getElementById('tabs-wrapper');
        
tabWrapper.addEventListener('click', (e) => {
    // Guard clause: ignore clicks that aren't strictly on buttons
    if(e.target.tagName !== 'BUTTON') return; 

    // 1. Clean current active visual states
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // 2. Assign active class to target button and corresponding ID content
    e.target.classList.add('active');
    
    const targetContentId = e.target.getAttribute('data-id');
    document.getElementById(targetContentId).classList.add('active');
});
