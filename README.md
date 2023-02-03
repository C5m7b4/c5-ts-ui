# c5-ts-ui

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/C5m7b4/c5-ts-ui/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/C5m7b4/c5-ts-ui/tree/master)
[![codecov](https://codecov.io/gh/C5m7b4/c5-ts-ui/branch/master/graph/badge.svg?token=ZIXZC15B6Z)](https://codecov.io/gh/C5m7b4/c5-ts-ui)
![CircleCI](https://img.shields.io/circleci/build/github/C5m7b4/c5-ts-ui/master?style=plastic)
![GitHub repo file count](https://img.shields.io/github/directory-file-count/C5m7b4/c5-ts-ui?style=plastic)
![GitHub package.json version](https://img.shields.io/github/package-json/v/C5m7b4/c5-ts-ui?style=plastic)
![GitHub](https://img.shields.io/github/license/C5m7b4/c5-ts-ui?style=plastic)

These are the components that we currently support

[Button](#button)

[CodeDisplay](#codedisplay)

[OutlineButton](#outlinebutton)

[RippleButton](#ripplebutton)

[SelectField](#selectfield)

[TextField](#textfield)

## components

### Button


| name | optional | datatype | description |
|------|:--------:|:--------|:-----------|
|label| [ ]|string|The text to appear on the button|
|style| ✅ | CSSProperties | any additional css styles|
|onClick| ✅ | MouseEvent | Callback for button click||
|disabled|✅|boolean|used to disable the button|
|type| ✅ | 'normal', 'green', 'purple', 'danger', 'info', 'success', 'error'| different behaviors for the buttoon|
|size| ✅ | 'small', 'medium', 'large'|size of the button|

### RippleButton

|name|optional|datatype|description|
|----|:------:|:------|:----------|
|text| [] | string | the test to appear on the button|
|onClick| ✅ | MouseEvent | the callback for the button click event|
|color| ✅ | string|the color scheme for the button|
|textColor| ✅ |string|the color of the text|
|hoverColor| ✅ | string |the hover color|
|style| ✅ | CSSProperties|any additional css styles|
|type| ✅ | 'green', 'purple', 'danger', 'success', 'info'|the style of the button|

### OutlineButton

|name|optional|datatype|description|
|----|:------:|:------|:----------|
|text| [ ] |string|test for the button|
|onClick| [ ]|MouseEvent|callback for the button click event|
|type| [ ] | 'success','dark','info','error','warning','danger','default'|type of button schema|
|style| ✅ | CSSProperties| any additional styling|

### TextField

|name|optional|datatype|description|
|----|:------:|:------|:----------|
|id| [ ]|string|unique id|
|name|[ ]|string|name of the button|
|label|[ ]|string|label text associated with the button|
|onChange| [ ] |ChangeEvent|event when the text changes|
|type| [ ] |'text', 'number'|type of input for the textfield|
|placeholder| ✅ | string |placeholder text for empty inputfield|
|value| [ ] |'string', 'number'|value to assign to the field|
|error| ✅ | string | error message to display under the field|
|readOnly| ✅ | boolean | used to disable the field|
|autocomplete| ✅ | 'on', 'off', string|used to disable auto completes|
|theme| ✅ | 'light', 'dark'|theme for the background|

### SelectField

|name|optional|datatype|description|
|----|:------:|:------|:----------|
|id| [ ] |string|unique id|
|name| [ ] |string|name of the field|
|label| [ ] | string|label associated with the field|
|onChange| [ ] |ChangeEvent|event when the option changes|
|valueField| [ ] | Field from data|field to assign to the value from the data|
|displayField| [ ] | Field from data|field to display as the option from the data|
|error| ✅ | string | error to display under the field|
|emptyMsg| [ ] | string| default value when the component loads|
|data| [ ]|data|data to assign to the field|
|theme| ✅ | 'light', 'dark'|theme for the background|

### CodeDisplay

all booleans default to true

|name|optional|datatype|description|
|----|:------:|:------|:----------|
|code| [ ] | string | the code to process|
|showLineNumbers| ✅ | boolean | defaults to true to show line numbers|
|format| ✅ | boolean | whether to format the code with prettier|
|parserType| ✅ | 'babel', 'css', 'json', 'flow', 'babel-flow', 'babel-ts', 'typescript', 'json', 'markdown', 'html'|format to use for prettier|
|colorInterfaceContents| ✅ | boolean | anything seperated by a color|
|interfaceKey| ✅ | color | color of the left hand assignment|
|interfaceValue | ✅ | color | color of the right hand assignment|
|enableDestructured| ✅ | boolean | color destructured props|
|destructured| ✅ | color | color of destructured props|
|curlyBracesColor| ✅ | color | color of curly braces|
|enableCurlyBracesColor | ✅ | boolean | enable or disable the coloring|
|codeStr| ✅ | color | anything between quotes|
|enableCodeStr | ✅ | boolean | enable or disable the coloring|
|codeQuote | ✅ | color | color of quotation marks|
|enableCodeQuote | ✅ | boolean | enable or disable the coloring|
|betweenSingleQuotes | ✅ | color | anything between single quotes|
|enableBetweenSingleQuotes | ✅ | boolean | enable or disable coloring|
|codeSingle | ✅ | color | color of single quotes|
|enableCodeSingle | ✅ | boolean | enable or disable the coloring|
|insideParens | ✅ | color | anything between parenthesis|
|enableInsideParens | ✅ | boolean | enable or disable the coloring|
|parens | ✅ | color | color of parenthesis|
|enableParens | ✅ | boolean | enable or disable the coloring|
|codElem | ✅ | color | anything between < and >|
|enableCodeElem | ✅ | boolean | enable or disable the coloring|
|reserved | ✅ | color | color of reserved words|
|enableReserved | ✅ | boolean | enable or disable the coloring|
|appColor | ✅ | color | color of app related words |
|enableAppColor | ✅ | boolean | enable or disable the coloring|
|defaultColor | ✅ | color | color of default words|
|enableDefault | ✅ | boolean | enable or disable the coloring|
|alternates | ✅ | color | color of alternate words|
|enableAlternates | ✅ | boolean | enable or disable the coloring|
|customReservedWords | ✅ | string array | your list of reserved words|
|customAppWords | ✅ | string array | your list of app words|
|customDefaults | ✅ | string array | your list of default words|
|customAlternatives | ✅ | string array | your list of alternate words|
|enableOperatorColor | ✅ | boolean | enable or disable coloring|
|operatorColor| ✅ | color | color of operators|