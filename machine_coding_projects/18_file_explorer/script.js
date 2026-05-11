const fileSystemData = {
    name: "root",
    isFolder: true,
    children: [
        {
            name: "src",
            isFolder: true,
            children: [
                { name: "api", isFolder: true, children: [
                    { name: "fetcher.js", isFolder: false },
                    { name: "auth.js", isFolder: false }
                ]},
                { name: "components", isFolder: true, children: [
                    { name: "Navbar.js", isFolder: false },
                    { name: "Sidebar.js", isFolder: false },
                    { name: "Footer.css", isFolder: false }
                ]},
                { name: "utils", isFolder: true, children: [
                    { name: "formatters.js", isFolder: false },
                    { name: "validators.js", isFolder: false }
                ]},
                { name: "App.js", isFolder: false },
                { name: "index.html", isFolder: false }
            ]
        },
        {
            name: "tests",
            isFolder: true,
            children: [
                { name: "unit", isFolder: true, children: [
                    { name: "sum.test.js", isFolder: false }
                ]},
                { name: "e2e.spec.js", isFolder: false }
            ]
        },
        {
            name: "public",
            isFolder: true,
            children: [
                { name: "images", isFolder: true, children: [
                    { name: "banner.png", isFolder: false },
                    { name: "icon.ico", isFolder: false }
                ]},
                { name: "robots.txt", isFolder: false }
            ]
        },
        { name: "package.json", isFolder: false },
        { name: "README.md", isFolder: false },
        { name: ".gitignore", isFolder: false }
    ]
};

const rootContainer = document.getElementById('explorer-container');

const renderFileTree = (dataNode, parentTarget) => {
    dataNode.children.forEach(item => {
        const wrapper = document.createElement('div');
        wrapper.className = 'node-wrapper';

        const itemRow = document.createElement('div');
        itemRow.className = `node-item ${item.isFolder ? 'folder-item' : 'file-item'}`;
        
        const icon = item.isFolder ? '<span class="icon icon-folder">▶</span>' : '<span class="icon icon-file">📄</span>';
        
        itemRow.innerHTML = `${icon}<span>${item.name}</span>`;
        wrapper.appendChild(itemRow);

        if (item.isFolder && item.children) {
            const childrenContainer = document.createElement('div');
            childrenContainer.className = 'children-container';
            
            renderFileTree(item, childrenContainer);
            wrapper.appendChild(childrenContainer);

            itemRow.addEventListener('click', (e) => {
                e.stopPropagation();
                childrenContainer.classList.toggle('visible');
            });
        }
        parentTarget.appendChild(wrapper);
    });
};

if (rootContainer) {
    renderFileTree(fileSystemData, rootContainer);
}
