const output = document.getElementById("output");
const runBtn = document.getElementById("runBtn");
const editorElement = document.getElementById("editor");

const editorHtmlElement = document.getElementById("editor-html");
const editorJsElement = document.getElementById("editor-js");
const editorCssElement = document.getElementById("editor-css");

const editors = {
    html: CodeMirror.fromTextArea(editorHtmlElement, {
        mode: "htmlmixed",
        theme: "material",
        lineNumbers: true,
        indentUnit: 2,
        tabSize: 2,
    }),
    js: CodeMirror.fromTextArea(editorJsElement, {
        mode: "javascript",
        theme: "material",
        lineNumbers: true,
        indentUnit: 2,
        tabSize: 2,
    }),
    css: CodeMirror.fromTextArea(editorCssElement, {
        mode: "css",
        theme: "material",
        lineNumbers: true,
        indentUnit: 2,
        tabSize: 2,
    })
};

let activeTab = "html";

function switchTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.tab[data-tab="' + tab + '"]').classList.add('active');
    ["html", "js", "css"].forEach(t => {
        const cm = editors[t].getWrapperElement();
        cm.style.display = (t === tab) ? "block" : "none";
    });
}

document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', e => switchTab(btn.dataset.tab));
});

function runCode() {
    const html = editors.html.getValue();
    const js = editors.js.getValue();
    const css = editors.css.getValue();
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    output.innerHTML = '';
    output.appendChild(iframe);
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`);
    doc.close();
}

runBtn.addEventListener("click", runCode);

// Resizer logic
const resizer = document.getElementById("resizer");
const container = document.getElementById("container");

resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopResize);
});

function resize(e) {
    const containerRect = container.getBoundingClientRect();
    let newEditorWidth = e.clientX - containerRect.left;
    const minWidth = 100;
    const maxWidth = containerRect.width - 100;
    newEditorWidth = Math.max(minWidth, Math.min(newEditorWidth, maxWidth));
    // Resize hanya editor aktif
    const cm = editors[activeTab];
    cm.getWrapperElement().style.flexBasis = newEditorWidth + 'px';
    cm.setSize(newEditorWidth, null);
}

function stopResize() {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
}

// Inisialisasi: tampilkan hanya editor HTML
switchTab('html');

// Setelah inisialisasi editors
editors.html.setValue(editorHtmlElement.value);
editors.js.setValue(editorJsElement.value);
editors.css.setValue(editorCssElement.value);