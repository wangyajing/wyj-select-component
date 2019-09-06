import React, { Fragment } from 'react';
import { render } from 'react-dom';
import SearchSelect from '../../src/index';
// Main.js
import zh_CN from "../locales/zh_CN"     // import defined messages in Chinese
import en_US from "../locales/en_US"
const messages = {
  en: en_US,
  zh: zh_CN
}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [
        { value: 'apple', Text: '苹果' },
        { value: 'orange', Text: '橘子' },
        { value: 'banana', Text: '香蕉' },
      ],
      lang: 'zh'
    }
  }

  toggleLang = () => {
    this.setState(({ lang }) => ({
      lang: lang === 'zh' ? 'en' : 'zh'
    }))
  }
  toggleTheme = () => {
    this.setState({
      theme: 'dark'
    })
  }
  onChange = value => {
    console.log(`selected ${value}`);
  }

  onBlur = () => {
    console.log('blur');
  }

  onFocus = () => {
    console.log('focus');
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.toggleLang}>切换语言</button>
        <button onClick={this.toggleTheme}>深色主题</button>
        <SearchSelect
          holder="select"
          lang={this.state.lang}
          theme={this.state.theme}
          messages={messages[this.state.lang]}
          list={this.state.list}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </Fragment>

    )
  }
}
render(<App />, document.getElementById("root"));
