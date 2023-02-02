import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
  reservedWords,
  appWords,
  defaultWords,
  alternateWords,
  CodeDisplay,
  findColor,
} from '../src';

const codeSnippet = {
  name: 'Fetch',
  contents: `import avion from 'avion'
  async function getEmployees(url, apikey, searchPhrase){
    let json = await avion({
      method: 'GET',
      cors: true,
      headers: {
        'Content-Type':'application/json'
      },
      url: url + 'users/list',
      params: {
        apikey,
        searchPhrase
      }
    })
    return json;
  }`,
};

describe('CodeDisplay tests', () => {
  test('should render correctly', () => {
    const { container } = render(<CodeDisplay code={codeSnippet.contents} />);
    expect(container).toMatchSnapshot();
  });

  test('should copy code to clipboard with failure', () => {
    jest.useFakeTimers();
    const { container } = render(<CodeDisplay code={codeSnippet.contents} />);
    const div = container.querySelector(
      '.c5-editor-clipboard'
    ) as HTMLDivElement;
    fireEvent.click(div);
    jest.advanceTimersByTime(5000);
  });

  test('should copy code to clipboard with success', () => {
    document.execCommand = jest.fn();
    jest.useFakeTimers();
    const { container } = render(<CodeDisplay code={codeSnippet.contents} />);
    const div = container.querySelector(
      '.c5-editor-clipboard'
    ) as HTMLDivElement;
    fireEvent.click(div);
    jest.advanceTimersByTime(5000);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  test('should format the code', () => {
    render(<CodeDisplay code={codeSnippet.contents} format={true} />);
  });

  test('should handle non-raw data', () => {
    const container = render(<CodeDisplay code={''} />);
    expect(container).toMatchSnapshot();
  });

  test('should handle not formatting the code', () => {
    const container = render(
      <CodeDisplay code={codeSnippet.contents} format={false} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render custom reserved words', () => {
    const { container } = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        customReserveWords={reservedWords}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render customAppWords', () => {
    const { container } = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        customAppWords={appWords}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render custom default words', () => {
    const { container } = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        customDefaults={defaultWords}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render custom alternate words', () => {
    const { container } = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        customAlternatives={alternateWords}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle not showing line number', () => {
    const { container } = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        showLineNumbers={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableOperator color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableOperatorColor={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableAlternated color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableAlternates={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableDefault color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableDefault={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableApp color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableAppColor={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableReserved color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableReserved={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableCodeElemtn color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableCodeElem={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableParens color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableParens={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableInsideParens color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableInsideParens={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableCodeSingle color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableCodeSingle={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableBetweenSingleQuotes color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableBetweenSingleQuotes={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableCodeQuote color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableCodeQuote={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableCodeStr color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableCodeStr={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableCurlyBracesColor color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableCurlyBracesColor={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable enableDestructured color', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        enableDestructured={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should disable colorInterfaceContents', () => {
    const container = render(
      <CodeDisplay
        code={codeSnippet.contents}
        format={true}
        colorInterfaceContents={false}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should fail to format the code', () => {
    const code = `hello 'mike'`;
    const container = render(<CodeDisplay code={code} />);
    expect(container).toMatchSnapshot();
  });
});

describe('findColor tests', () => {
  test('should  not find the color', () => {
    const result = findColor('someNonExistingColor');
    expect(result).toEqual('');
  });
});
