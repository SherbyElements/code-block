import { css, html, LitElement } from 'lit';
import 'prismjs/prism.js';
import { getLanguageOfAlias } from './get-language-of-alias';
import { getLanguageName } from './get-language-name';

export class CodeBlock extends LitElement {
  static get properties() {
    return {
      language: { type: String },
      languageFileTemplate: { type: String },
      theme: { type: String },
      themeFileTemplate: { type: String },
    };
  }

  constructor() {
    super();
    this.language = 'markdown';
    this.languageFileTemplate = `/node_modules/prismjs/components/prism-{LANGUAGE}.min.js`;
    this.theme = 'twilight';
    this.themeFileTemplate = `/node_modules/prismjs/themes/prism-{THEME}.css`;
  }

  async __loadLanguage() {
    const languageFile = this.languageFileTemplate.replace('{LANGUAGE}', getLanguageOfAlias(this.language));
    await import(languageFile);
  }

  async firstUpdated() {
    await this.__loadLanguage();

    const nodes = this.shadowRoot.querySelector('#code').assignedNodes();
    let codeCombined = '';
    for (let index = 0, len = nodes.length; index < len; ++index) {
      codeCombined += nodes[index].nodeValue;
    }

    // Strip the lead/end newlines so they don't look horrible
    const grammar = Prism.languages[this.language];
    const codeClean = codeCombined.replace(/^\s+|\s+$/g, '');

    // Set to our styled block
    this.shadowRoot.querySelector('#output').innerHTML = Prism.highlight(codeClean, grammar, this.language);
  }

  static get styles() {
    return css`
      :host {
        --code-block-language-color: #4ab9f8;
      }

      #hide {
        display: none !important;
      }

      pre {
        position: relative;
      }

      pre:before {
        content: attr(data-language-name);
        color: var(--code-block-language-color);
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif,
          Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        font-weight: 700;
        letter-spacing: 1px;
        position: absolute;
        right: 0.75em;
        top: 0.75em;
        z-index: 1;
      }
    `;
  }

  render() {
    const themeFile = this.themeFileTemplate.replace('{THEME}', this.theme);
    return html`
      <link rel="stylesheet" href="${themeFile}" />
      <pre
        class="language-${this.language} line-numbers"
        data-language-name="${getLanguageName(this.language)}"
      ><code id="output"></code></pre>

      <div id="hide">
        <slot id="code"></slot>
      </div>
    `;
  }
}
