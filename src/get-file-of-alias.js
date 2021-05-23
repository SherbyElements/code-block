const getFileOfAlias = (language) => {
  switch (language) {
    case 'g4':
      return 'antlr4';

    case 'adoc':
      return 'asciidoc';

    case 'shell':
      return 'bash';

    case 'shortcode':
      return 'bbcode';

    case 'rbnf':
      return 'bnf';

    case 'oscript':
      return 'bsl';

    case 'coffee':
      return 'coffeescript';

    case 'jinja2':
      return 'django';

    case 'dockerfile':
      return 'docker';

    case 'gitignore':
    case 'hgignore':
    case 'npmignore':
      return 'ignore';

    case 'js':
      return 'javascript';

    case 'webmanifest':
      return 'json';

    case 'kt':
    case 'kts':
      return 'kotlin';

    case 'tex':
    case 'context':
      return 'latex';

    case 'ly':
      return 'lilypond';

    case 'elisp':
    case 'emacs':
    case 'emacs-lisp':
      return 'lisp';

    case 'md':
      return 'markdown';

    case 'html':
    case 'mathml':
    case 'svg':
    case 'xml':
    case 'ssml':
    case 'atom':
    case 'rss':
      return 'markup';

    case 'moon':
      return 'moonscript';

    case 'n4jsd':
      return 'n4js';

    case 'nani':
      return 'naniscript';

    case 'objc':
      return 'objectivec';

    case 'objectpascal':
      return 'pascal';

    case 'px':
      return 'pcaxis';

    case 'pcode':
      return 'peoplecode';

    case 'pq':
    case 'mscript':
      return 'powerquery';

    case 'pbfasm':
      return 'purebasic';

    case 'purs':
      return 'purescript';

    case 'py':
      return 'python';

    case 'rkt':
      return 'racket';

    case 'rpy':
      return 'renpy';

    case 'rb':
      return 'ruby';

    case 'smlnj':
      return 'sml';

    case 'sol':
      return 'solidity';

    case 'rq':
      return 'sparql';

    case 'trig':
      return 'turtle';

    case 'ts':
      return 'typescript';

    case 'tsconfig':
      return 'typoscript';

    case 'vb':
    case 'vba':
      return 'visual-basic';

    case 'yml':
      return 'yaml';

    default:
      return language;
  }
};

export { getFileOfAlias };
