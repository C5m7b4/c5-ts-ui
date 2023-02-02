import React from 'react';
import { Story, Meta } from '@storybook/react';
import '../../dist/css/c5-editor.css';
import { CodeDisplay, CodeDisplayProps } from '../components';

export default {
  title: 'CodeDisplay',
  componend: CodeDisplay,
} as Meta;

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

const codeSnippet1 = {
  name: 'RC',
  contents: `const myFn = ({prop1, prop2, prop3}) => {
    return (
      <div style={"color: black"}>
      {prop1}, {prop2}, {prop3}
      </div>
    )
  }`,
};

const Template: Story<CodeDisplayProps> = (args) => <CodeDisplay {...args} />;

export const CodeDisplayExample = Template.bind({});
CodeDisplayExample.args = {
  showLineNumbers: true,
  code: codeSnippet.contents,
};

export const CodeDisplayExample1 = Template.bind({});
CodeDisplayExample1.args = {
  showLineNumbers: true,
  code: codeSnippet1.contents,
};
