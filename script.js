// Select the HTML, CSS, and JavaScript code areas
const htmlCode = CodeMirror.fromTextArea(document.getElementById("html-code"), {
    mode: "xml",
    theme: "monokai",
    lineNumbers: true,
});

const cssCode = CodeMirror.fromTextArea(document.getElementById("css-code"), {
    mode: "css",
    theme: "monokai",
    lineNumbers: true,
});

const jsCode = CodeMirror.fromTextArea(document.getElementById("js-code"), {
    mode: "javascript",
    theme: "monokai",
    lineNumbers: true,
});

const previewFrame = document.getElementById("preview");
const runButton = document.getElementById("run-btn");
const saveButton = document.getElementById("save-btn");

// Function to update code in CodeMirror from input fields
function updateCodeMirrorFromInput() {
    const htmlInput = document.getElementById("html-input");
    const cssInput = document.getElementById("css-input");
    const jsInput = document.getElementById("js-input");

    htmlCode.setValue(htmlInput.value);
    cssCode.setValue(cssInput.value);
    jsCode.setValue(jsInput.value);
    
    // Automatically run the code after update
    runCode();
}

// Function to run the code
function runCode() {
    const code = `
        <html>
            <head>
                <style>${cssCode.getValue()}</style>
            </head>
            <body>
                ${htmlCode.getValue()}
                <script>${jsCode.getValue()}<\/script>
            </body>
        </html>
    `;

    const iframeDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(code);
    iframeDocument.close();
}

// Event listeners to update the code live when text input changes

// Event listener for the "Run Code" button
runButton.addEventListener("click", runCode);

// Function to save the code snippet
function saveCode() {
    const codeSnippet = {
        html: htmlCode.getValue(),
        css: cssCode.getValue(),
        js: jsCode.getValue(),
    };

    localStorage.setItem("code-snippet", JSON.stringify(codeSnippet));
    alert("Code snippet saved successfully!");
}

// Event listener for the "Save Snippet" button
saveButton.addEventListener("click", saveCode);

// Load saved code snippet
window.addEventListener("load", () => {
    const savedCode = localStorage.getItem("code-snippet");
    if (savedCode) {
        const { html, css, js } = JSON.parse(savedCode);
        htmlCode.setValue(html);
        cssCode.setValue(css);
        jsCode.setValue(js);
    }
});
// Update the current year dynamically
document.getElementById("current-year").textContent = new Date().getFullYear();
