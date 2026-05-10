const container = document.getElementById('scroll-box');
let counter = 0;
let isFetching = false; // Prevents duplicate spam firing while waiting for delay

const createItems = (count = 5) => {
    for (let i = 0; i < count; i++) {
        const div = document.createElement('div');
        div.className = 'scroll-item';
        div.innerText = `Post Item #${++counter}`;
        container.appendChild(div);
    }
};

// Initial boot load
createItems(6);

container.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = container;

    // THRESHOLD CHECK: Are we within 5 pixels of the bottom absolute limit?
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        
        if (!isFetching) {
            isFetching = true;
            
            // Provide visible feedback loader
            const loader = document.createElement('div');
            loader.className = 'loading-indicator';
            loader.innerText = 'Loading more items...';
            container.appendChild(loader);

            // Simulate network latency
            setTimeout(() => {
                loader.remove(); // Destroy loading flag
                createItems(4); // Append fresh entries
                isFetching = false; // Ready for next cycle
            }, 500);
        }
    }
});
