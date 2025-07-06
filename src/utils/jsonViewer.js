// JSON Viewer Utility Functions
class JsonViewer {
    constructor(data, container) {
        this.data = data;
        this.container = container;
        this.originalContent = null;
        this.isShowingJson = false;
    }

    syntaxHighlight(json) {
        if (!json) return "";

        // Escape HTML
        json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        // Apply syntax highlighting
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\"])*"(\s*:)?|\b(true|false|null)\b|\d+)/g,
            (match) => {
                let className = "json-number";

                if (/^"/.test(match)) {
                    className = /:$/.test(match) ? "json-key" : "json-string";
                } else if (/true|false/.test(match)) {
                    className = "json-boolean";
                } else if (/null/.test(match)) {
                    className = "json-null";
                }

                return `<span class="${className}">${match}</span>`;
            }
        );
    }

    showJsonView() {
        if (!this.originalContent) {
            this.originalContent = this.container.innerHTML;
        }

        const jsonData = JSON.stringify(this.data, null, 2);
        const highlightedJson = this.syntaxHighlight(jsonData);

        this.container.innerHTML = `
            <div class="json-viewer-container">
                <div class="json-viewer-header">
                    <button id="json-back-btn" class="json-back-btn">Back to CV</button>
                </div>
                <div class="json-content">${highlightedJson}</div>
            </div>
        `;

        // Attach back button event
        document.getElementById("json-back-btn").onclick = () => this.showCvView();
        this.isShowingJson = true;
    }

    showCvView() {
        if (this.originalContent) {
            this.container.innerHTML = this.originalContent;
            this.isShowingJson = false;

            // Re-attach toggle button event
            setTimeout(() => {
                const toggleBtn = document.getElementById("show-json-btn");
                if (toggleBtn) {
                    toggleBtn.onclick = (e) => {
                        e.preventDefault();
                        this.showJsonView();
                    };
                }
            }, 0);
        }
    }

    toggle() {
        if (this.isShowingJson) {
            this.showCvView();
        } else {
            this.showJsonView();
        }
    }
}

// Export for use
window.JsonViewer = JsonViewer;
