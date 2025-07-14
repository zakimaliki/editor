const output = document.getElementById("output");
const runBtn = document.getElementById("runBtn");
const editorElement = document.getElementById("editor");

const editor = CodeMirror.fromTextArea(editorElement, {
    mode: "javascript",
    theme: "material",
    lineNumbers: true,
    indentUnit: 2,
    tabSize: 2,
});

function runCode() {
    const code = editor.getValue();
    try {
        const result = eval(code);
        output.textContent = String(result ?? "✅ Kode berhasil dijalankan.");
    } catch (err) {
        output.textContent = `❌ Error: ${err.message}`;
    }
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
    // Hitung posisi mouse relatif terhadap container
    const containerRect = container.getBoundingClientRect();
    let newEditorWidth = e.clientX - containerRect.left;
    // Batasi minimum dan maksimum lebar
    const minWidth = 100;
    const maxWidth = containerRect.width - 100;
    newEditorWidth = Math.max(minWidth, Math.min(newEditorWidth, maxWidth));
    // Atur flex-basis editor agar bisa di-resize
    editorElement.parentElement.querySelector('.CodeMirror').style.flexBasis = newEditorWidth + 'px';
    editorElement.style.flexBasis = newEditorWidth + 'px';
    // Resize CodeMirror
    editor.setSize(newEditorWidth, null);
}

function stopResize() {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopResize);
}