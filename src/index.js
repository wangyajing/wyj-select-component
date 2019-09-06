import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import './index.css';
import format from './locale'

class SearchSelect extends PureComponent {
  constructor() {
    super();
    this.state = {
      display: false,
      value: '',
      selectedIndex: 0
    }
  }

  focus = () => {
    this.expand(true);
    this.props.onFocus && this.props.onFocus();
  }

  blur = () => {
    this.expand(false);
    this.setState({
      selectedIndex: 0
    })
    this.props.onBlur && this.props.onBlur();
  }

  expand(flag) {
    this.setState({
      display: flag
    });
  }

  handleMouseDown = value => {
    this.setState({
      value: value,
    });
    this.props.onChange && this.props.onChange(value);
  }

  handleChange = e => {
    const inputValue = e.target.value;
    this.setState({
      selectedIndex: 0,
      value: inputValue
    })
  }

  handleKeyDown = (filteredList, e) => {
    const { keyCode } = e;
    if (keyCode === 13 && this.selectedIndex !== -1) {
      let { value } = filteredList[this.state.selectedIndex]
      this.setState({
        value
      });
      this.props.onChange && this.props.onChange(value);
    }
  }

  onMouseover = (index) => {
    if (this.state.selectedIndex !== index) {
      this.setState({
        selectedIndex: index
      })
    }
  }

  render() {
    const filteredList = this.props.list.filter(
      item => item.value.toLowerCase().indexOf(this.state.value.toLowerCase()) > -1
    )

    let { holder, messages, theme } = this.props;

    return (
      <div className="select-container">
        <div className="select-section">
          <input
            placeholder={format(holder, messages)}
            autoComplete="false"
            type="text"
            onFocus={this.focus}
            onBlur={this.blur}
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={e => this.handleKeyDown(filteredList, e)}
          />
        </div>
        <ul style={{ display: this.state.display ? 'block' : 'none' }} className="drop-list">
          {filteredList.map((item, index) => (
            <li
              className={`drop-menu-item  ${this.state.selectedIndex === index ? `${theme?theme+'-':''}drop-menu-item-select` : ''}`}
              key={index}
              onMouseDown={() => this.handleMouseDown(item.value)}
              onMouseOver={() => this.onMouseover(index)}
            >
              {item.value}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

SearchSelect.PropTypes = {
  list: PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.string
  }),
  holder: PropTypes.string,
  theme: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  lang: PropTypes.string,
  messages: PropTypes.object.isRequired
}
export default SearchSelect;
