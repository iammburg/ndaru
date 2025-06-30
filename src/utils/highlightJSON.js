export function highlightJSON(json) {
    if (typeof json !== "string") {
        json = JSON.stringify(json, null, 2);
    }
    return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
            let cls = "json-number";
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = "json-key";
                } else {
                    cls = "json-string";
                }
            } else if (/true|false/.test(match)) {
                cls = "json-boolean";
            } else if (/null/.test(match)) {
                cls = "json-null";
            }
            return `<span class="${cls}">${match}</span>`;
        }
    );
}