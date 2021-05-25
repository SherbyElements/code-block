import { css, html, LitElement } from 'lit';
import 'prismjs/prism.js';
import { getFileOfAlias } from './get-file-of-alias';
import { getLanguageName } from './get-language-name';

export class CodeBlock extends LitElement {
  static get properties() {
    return {
      defaultLanguage: { type: String },
      language: { type: String },
      languageFileTemplate: { type: String },
      theme: { type: String },
      themeFileTemplate: { type: String },
    };
  }

  constructor() {
    super();
    this.defaultLanguage ??= 'markdown';
    this.languageFileTemplate ??= `/node_modules/prismjs/components/prism-{LANGUAGE}.min.js`;
    this.themeFileTemplate ??= `/node_modules/prismjs/themes/prism-{THEME}.css`;
  }

  async __loadLanguage() {
    const language = this.language || this.defaultLanguage;
    const languageFile = this.languageFileTemplate.replace('{LANGUAGE}', getFileOfAlias(language));
    await import(languageFile);
  }

  async firstUpdated() {
    await this.__loadLanguage();

    const nodes = this.shadowRoot.querySelector('#code').assignedNodes();
    let code = '';

    for (let index = 0, len = nodes.length; index < len; ++index) {
      const values = nodes[index].nodeValue.split('\n').map((x) => x.trimEnd());

      // Remove empty lines at the beginning and at the end
      if (!values[values.length - 1].trim()) {
        values.pop();
      }

      if (!values[0].trim()) {
        values.shift();
      }

      const numberOfSpacesOfFirstLine = values[0].search(/\S|$/);
      const spacesRegex = new RegExp(` {${numberOfSpacesOfFirstLine}}`);

      values.forEach((value) => {
        code += value.replace(spacesRegex, '') + '\n';
      });
    }

    // Set to our styled block
    const language = this.language || this.defaultLanguage;
    this.shadowRoot.querySelector('#output').innerHTML = Prism.highlight(code, Prism.languages[language], language);
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

      pre:not([data-language-name='']) {
        padding-top: 2em;
      }

      pre:not([data-language-name='']):before {
        content: attr(data-language-name);
        color: var(--code-block-language-color);
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif,
          Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        font-weight: 700;
        letter-spacing: 1px;
        position: absolute;
        right: 1em;
        top: 0.45em;
        z-index: 1;
      }
    `;
  }

  render() {
    const isDefaultTheme = !this.theme;
    const searchValue = isDefaultTheme ? '-{THEME}' : '{THEME}';
    const themeFile = this.themeFileTemplate.replace(searchValue, this.theme || '');
    const language = this.language || this.defaultLanguage;
    const languageName = this.language ? getLanguageName(language) : '';

    return html`
      <link rel="stylesheet" href="${themeFile}" />
      <pre class="language-${language}" data-language-name="${languageName}"><code id="output"></code></pre>

      <div id="hide">
        <slot id="code"></slot>
      </div>
    `;
  }
}
