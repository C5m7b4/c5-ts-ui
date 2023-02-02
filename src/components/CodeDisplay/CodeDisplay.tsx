import React, { useState, useEffect } from 'react';
import { Parsers } from '../../types';
import {
  reservedWords,
  htmlEncode,
  appWords,
  defaultWords,
  alternateWords,
  operators,
  copyTextToClipboard,
  findColor,
} from '../../utils';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { clipboard } from './Clipboard';

export interface CodeDisplayProps {
  code: string;
  showLineNumbers?: boolean;
  format?: boolean;
  parserType?: Parsers;
  colorInterfaceContents?: boolean;
  interfaceKey?: string;
  interfaceValue?: string;
  enableDestructured?: boolean;
  destructured?: string;
  curlyBracesColor?: string;
  enableCurlyBracesColor?: boolean;
  codeStr?: string;
  enableCodeStr?: boolean;
  codeQuote?: string;
  enableCodeQuote?: boolean;
  betweenSingleQuotes?: string;
  enableBetweenSingleQuotes?: boolean;
  codeSingle?: string;
  enableCodeSingle?: boolean;
  insideParens?: string;
  enableInsideParens?: boolean;
  parens?: string;
  enableParens?: boolean;
  codeElem?: string;
  enableCodeElem?: boolean;
  reserved?: string;
  enableReserved?: boolean;
  appColor?: string;
  enableAppColor?: boolean;
  defaultColor?: string;
  enableDefault?: boolean;
  alternates?: string;
  enableAlternates?: boolean;
  customReserveWords?: string[];
  customAppWords?: string[];
  customDefaults?: string[];
  customAlternatives?: string[];
  enableOperatorColor?: boolean;
  operatorColor?: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = (props) => {
  const [lines, setLines] = useState<string[]>([]);
  let { code } = props;
  const {
    showLineNumbers = true,
    format = true,
    parserType = 'babel',
    colorInterfaceContents = true,
    interfaceKey = findColor('interface-key'),
    interfaceValue = findColor('interface-value'),
    enableDestructured = true,
    destructured = findColor('destructured'),
    curlyBracesColor = findColor('curly-braces'),
    enableCurlyBracesColor = true,
    codeStr = findColor('code-str'),
    enableCodeStr = true,
    codeQuote = findColor('code-quote'),
    enableCodeQuote = true,
    betweenSingleQuotes = findColor('between-single-quotes'),
    enableBetweenSingleQuotes = true,
    codeSingle = findColor('code-single'),
    enableCodeSingle = true,
    insideParens = findColor('inside-parens'),
    enableInsideParens = true,
    parens = findColor('parens'),
    enableParens = true,
    codeElem = findColor('code-elem'),
    enableCodeElem = true,
    reserved = findColor('reserved'),
    enableReserved = true,
    appColor = findColor('app-color'),
    enableAppColor = true,
    defaultColor = findColor('default-color'),
    enableDefault = true,
    alternates = findColor('alternates'),
    enableAlternates = true,
    customReserveWords = [],
    customAppWords = [],
    customDefaults = [],
    customAlternatives = [],
    enableOperatorColor = true,
    operatorColor = findColor('operator-color'),
  } = props;

  useEffect(() => {
    const raw = /<|'/g.test(code);

    if (raw) {
      if (format) {
        code = formatCode(code);
      }
      code = htmlEncode(code.slice(0, -1));
    }

    if (code.length > 0) {
      const l = code.split('\n');
      setLines(l);
    }
  }, [code, format, parserType]);

  const formatCode = (code: string): string => {
    try {
      const formatted = prettier.format(code, {
        parser: parserType,
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      });
      return formatted;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Could not parse your code using the babel parser');
      return code;
    }
  };

  const copy = (
    t: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    const { result, msg } = copyTextToClipboard(t);
    const div = document.createElement('div');
    div.classList.add('c5-editor-clipboard-result');
    div.style.position = 'absolute';
    div.style.top = e.clientY + 40 + 'px';
    div.style.left = e.clientX - 80 + 'px';
    /* istanbul ignore else */
    if (!e.view) {
      // do nothing
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      div.style.top = e.clientY + 40 + e.view.scrollY + 'px';
    }
    if (result == true) {
      div.style.color = 'limegreen';
      div.innerText = 'Code copied to clipboard';
    } else {
      div.style.color = 'red';
      div.innerText = msg;
    }

    document.body.appendChild(div);

    setTimeout(() => {
      document.body.removeChild(div);
    }, 4000);
  };

  const replace = (line: string): string => {
    if (colorInterfaceContents) {
      if (line.indexOf(':') > 0) {
        const pos = line.indexOf(':');
        const left = line.substring(0, pos);
        const right = line.substring(pos + 1);
        const regExp1 = new RegExp(left);
        line = line.replace(
          regExp1,
          `<span style="color: ${interfaceKey}">${left}</span>`
        );
        const regExp2 = new RegExp(right);
        line = line.replace(
          regExp2,
          `<span style="color:${interfaceValue}">${right}`
        );
      }
    }

    if (enableDestructured) {
      line = line.replace(
        /{(.*?)}/g,
        `<span style="color:${destructured}">{$1}</span>`
      );
    }

    if (enableCurlyBracesColor) {
      line = line.replace(
        /{/g,
        `<span style="color: ${curlyBracesColor}">{</span>`
      );
      line = line.replace(
        /}/g,
        `<span style="color:${curlyBracesColor}">}</span>`
      );
    }

    if (enableCodeStr) {
      line = line.replace(
        /&quot;(.*?)&quot;/g,
        `<span style="color:${codeStr}">&quot;$1&quot;</span>`
      );
    }

    if (enableCodeQuote) {
      line = line.replace(
        /&quot;/g,
        `<span style="color:${codeQuote}">&quot;</span>`
      );
    }

    if (enableBetweenSingleQuotes) {
      line = line.replace(
        /&#39;(.*?)&#39;/g,
        `<span style="color:${betweenSingleQuotes}">&#39;$1&#39;</span>`
      );
    }

    if (enableCodeSingle) {
      line = line.replace(
        /&#39;/g,
        `<span style="color:${codeSingle}">&#39;</span>`
      );
    }

    if (enableInsideParens) {
      line = line.replace(
        /\((.*?)\)/g,
        `<span style="color:${insideParens}">($1)</span>`
      );
    }

    if (enableParens) {
      line = line.replace(/\(/g, `<span style="color:${parens}">(</span>`);
      line = line.replace(/\)/g, `<span style="color:${parens}">)</span>`);
    }

    if (enableCodeElem) {
      line = line.replace(
        /&lt;(.*?)&gt;/g,
        `<span style="color:${codeElem}">&lt;$1&gt;</span>`
      );
    }

    if (enableReserved) {
      reservedWords.forEach((word) => {
        const re = new RegExp(word, 'gi');
        line = line.replace(
          re,
          `<span style="color:${reserved}">${word}</span>`
        );
      });
    }

    if (enableAppColor) {
      appWords.forEach((word) => {
        const re = new RegExp(word, 'g');
        line = line.replace(
          re,
          `<span style="color:${appColor}">${word}</span>`
        );
      });
    }

    if (enableDefault) {
      defaultWords.forEach((word) => {
        const re = new RegExp(word, 'g');
        line = line.replace(
          re,
          `<span style="color:${defaultColor}">${word}</span>`
        );
      });
    }

    if (enableAlternates) {
      alternateWords.forEach((word) => {
        const re = new RegExp(word, 'g');
        line = line.replace(
          re,
          `<span style="color: ${alternates}">${word}</span>`
        );
      });
    }

    if (customReserveWords.length > 0) {
      customReserveWords.forEach((word) => {
        /* istanbul ignore else */
        if (word.trim().length > 0) {
          const re = new RegExp(word, 'g');
          line = line.replace(
            re,
            `<span style="color:${reserved}">${word}</span>`
          );
        }
      });
    }

    if (customAppWords.length > 0) {
      customAppWords.forEach((word) => {
        /* istanbul ignore else */
        if (word.trim().length > 0) {
          const re = new RegExp(word, 'g');
          line = line.replace(
            re,
            `<span style="color:${appColor}">${word}</span>`
          );
        }
      });
    }

    if (customDefaults.length > 0) {
      customDefaults.forEach((word) => {
        /* istanbul ignore else */
        if (word.trim().length > 0) {
          const re = new RegExp(word, 'g');
          line = line.replace(
            re,
            `<span style="color:${defaultColor}">${word}</span>`
          );
        }
      });
    }

    if (customAlternatives.length > 0) {
      customAlternatives.forEach((word) => {
        /* istanbul ignore else */
        if (word.trim().length > 0) {
          const re = new RegExp(word, 'g');
          line = line.replace(
            re,
            `<span style="color:${alternates}">${word}</span>`
          );
        }
      });
    }

    if (enableOperatorColor) {
      operators.forEach((operator) => {
        const re = new RegExp(operator, 'g');
        line = line.replace(
          re,
          `<span style="color:${operatorColor}">${operator}</span>`
        );
      });
    }

    return line;
  };

  return (
    <code className="code">
      <div className="copy-to-clipboard">
        <div
          className="c5-editor-clipboard editor-tooltip"
          onClick={(e) => copy(code, e)}
        >
          {clipboard()}
          <span className="tooltiptext">Copy</span>
        </div>
      </div>
      <div className="editor-top-spacer">
        {showLineNumbers ? <div className="line-number"></div> : <div></div>}
      </div>
      {lines.length === 0 ? (
        <div className="editor-empty-line">
          {showLineNumbers ? <div className="line-number"></div> : <div></div>}
          <div className="code-line">Currently no code to display</div>
        </div>
      ) : (
        <React.Fragment>
          {lines &&
            Array.isArray(lines) &&
            lines.map((line, i) => {
              return (
                <div key={`cl-${i}`} className="code-content">
                  {showLineNumbers ? (
                    <div className="line-number">{i + 1} </div>
                  ) : (
                    <div></div>
                  )}
                  <div
                    className="code-line"
                    dangerouslySetInnerHTML={{ __html: replace(line) }}
                  ></div>
                </div>
              );
            })}
        </React.Fragment>
      )}
      <div className="editor-bottom-spacer">
        {showLineNumbers ? <div className="line-number"></div> : <div></div>}
        <div></div>
      </div>
    </code>
  );
};

export default CodeDisplay;
