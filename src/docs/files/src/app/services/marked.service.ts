import { Injectable } from '@angular/core';

import * as prism from 'prismjs';

import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-csharp';

import { marked } from 'marked';
import { environment } from '../../environments/environment';

@Injectable()
export class MarkedService {
  private renderer = new marked.Renderer();

  private highlight = (code: string, lang: string) => prism.highlight(code, prism.languages[lang || 'js'], lang || 'js');

  constructor() {
    marked.setOptions({
      baseUrl: environment.server,
      renderer: this.renderer,
      highlight: this.highlight,
      gfm: true,
      smartLists: true
    });

    this.renderer.code = (code, lang) => {
      code = this.highlight(code, lang as string);

      if (!lang) {
        return `<pre><code>${code}</code></pre>`;
      }

      const langClass = `language-${lang}`;

      return `<pre class="prism-theme ${langClass}"><code>${code}</code></pre>`;
    };
  }

  private checkRelative = (href: string): boolean => href.charAt(0) === '.' || href.charAt(0) === '/' || href.charAt(0) === '#';

  private checkAnchor = (href: string): boolean => href.charAt(0) === '#';

  private setBreadcrumbs = (href: string, breadcrumbs: string[]) => `${breadcrumbs.join('/')}/${href}`;

  private updateImage = (breadcrumbs: string[]) => {
    if (breadcrumbs) {
      return (href: string, title: string, text: string) => {
        if (this.checkRelative(href)) {
          const link = `${environment.server}${this.setBreadcrumbs(href, breadcrumbs)}`;
          return this.renderImage(link, title, text);
        } else {
          return this.renderImage(href, title, text);
        }
      };
    } else {
      return (href: string, title: string, text: string) => this.checkRelative(href)
        ? this.renderImage(`${environment.server}${href}`, title, text)
        : this.renderImage(href, title, text);
    }
  }

  private renderImage = (src: string, title: string, alt: string): string => title
    ? `<img src="${src}" title="${title}" alt="${alt}"/>`
    : `<img src="${src}" alt="${alt}"/>`

  private updateLink = (doc: string, breadcrumbs: string[]) => {
    if (breadcrumbs) {
      return (href: string, title: string, text: string) => {
        if (this.checkRelative(href)) {
          const link = href.toLowerCase().endsWith('.md')
            ? `${this.setBreadcrumbs(href, breadcrumbs)}`
            : this.checkAnchor(href)
              ? `${this.setBreadcrumbs(`${doc}${href}`, breadcrumbs)}`
              : `${environment.server}${this.setBreadcrumbs(`${href}`, breadcrumbs)}`;

          return this.renderLink(link, title, text);
        } else {
          return this.renderLink(href, title, text);
        }
      };
    } else {
      return (href: string, title: string, text: string) => {
        if (this.checkRelative(href)) {
          return href.toLowerCase().endsWith('.md')
            ? this.renderLink(href, title, text)
            : this.checkAnchor(href)
              ? this.renderLink(`${doc}${href}`, title, text)
              : this.renderLink(`${environment.server}${href}`, title, text);
        } else {
          return this.renderLink(href, title, text);
        }
      };
    }
  }

  private renderLink = (href: string, title: string, text: string) => title
    ? `<a href="${href}" title="${title}">${text}</a>`
    : `<a href="${href}">${text}</a>`

  private updateRenderer = (doc: string, breadcrumbs: string[]) => {
    this.renderer.image = this.updateImage(breadcrumbs);
    this.renderer.link = this.updateLink(doc, breadcrumbs);
  }

  convert = (markdown: string, doc: string, breadcrumbs: string[]) => {
    this.updateRenderer(doc, breadcrumbs);
    return marked.parse(markdown);
  }
}
