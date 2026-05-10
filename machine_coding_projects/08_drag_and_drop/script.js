const token = document.getElementById('master-token');
const zones = document.querySelectorAll('.drop-zone');

// 1. SOURCE ELEMENT LOGIC
token.addEventListener('dragstart', (e) => {
    // Save the unique identifier of the node we're currently dragging
    e.dataTransfer.setData('text/plain', token.id);
});

// 2. DROP TARGET ZONES LOGIC
zones.forEach(zone => {
    // DRAG OVER: Required to permit an item to drop!
    zone.addEventListener('dragover', (e) => {
        e.preventDefault(); // Blocks browser cancellation default
        zone.classList.add('drag-over');
    });

    // LEAVE: Cleans up aesthetic highlight states
    zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
    });

    // DROP: Executes the movement transaction
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        
        // Retrieve data ref and relocate element node to newly selected parent
        const elementId = e.dataTransfer.getData('text/plain');
        const elementNode = document.getElementById(elementId);
        
        zone.appendChild(elementNode);
    });
});
