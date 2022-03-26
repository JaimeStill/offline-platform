# Documentation!

## Markdown Options

```ts
constructor(
  @Optional() private config: ServerConfig
) {
  marked.setOptions({
    baseUrl: config.server,
    renderer: this.renderer,
    highlight: this.highlight,
    gfm: true,
    smartLists: true
  });

  this.renderer.code = (code, lang) => {
    code = this.highlight(code, lang);

    if (!lang) {
      return `<pre><code>${code}</code></pre>`;
    }

    const langClass = `language-${lang}`;

    return `<pre class="prism-theme ${langClass}"><code>${code}</code></pre>`;
  };
}
```
