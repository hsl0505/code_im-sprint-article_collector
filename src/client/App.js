import React, { Component } from 'react';
import './app.css';

export default class App extends Component {
  state = {
    nowEditing: false,
    nowSaving: false,
    currentItem: {
      id: null,
      body: null,
      status: null
    }
  };

  componentDidMount() {
    fetch('/api/source')
      .then(res => res.text())
      .then((t) => {
        this.setState({ sources: t });
      });
  }

  handleClickSaveSource() {
    this.toggleMode();
    fetch('/api/source',
      {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'text/plain'
        },
        body: this.state.sources
      });
  }

  handleClickItem(i) {
    fetch(`/api/data/${i}`)
      .then(res => res.json())
      .then((json) => {
        this.setState(prevState => ({
          currentItem: {
            ...prevState.currentItem,
            ...json
          }
        }));
      });
  }

  handleClickSaveItem() {
    this.setState({ nowSaving: true });

    fetch(`/api/data/${this.state.currentItem.id}`,
      {
        method: 'POST',
        headers: {
          Accept: 'text/plain',
          'Content-Type': 'text/plain'
        }
      })
      .then(res => res.text())
      .then((text) => {
        if (text === 'ok') {
          this.setState({ nowSaving: false });
          this.handleClickItem(this.state.currentItem.id);
        }
      });
  }

  handleChangeValue(e) {
    this.setState({ sources: e.target.value });
  }

  handleClickCancel() {
    this.setState({
      currentItem: {
        id: null,
        body: null,
        status: null
      }
    });
  }

  toggleMode() {
    this.setState(prevState => ({ nowEditing: !prevState.nowEditing }));
  }

  render() {
    const { sources } = this.state;
    let lis = '';

    if (sources) {
      lis = sources.split('\n').map((line, i) => (
        <li className={this.state.currentItem.id === String(i) ? 'active' : ''} key={i}>
          <a onClick={this.handleClickItem.bind(this, i)}>{decodeURIComponent(line)}</a>
        </li>));
    }

    return (
      <div>
        <h3>article collector (for medium blog)</h3>
        <div className={this.state.nowEditing ? 'hidden' : ''}>
          <header>
            <button onClick={this.toggleMode.bind(this)}>??????</button>
          </header>
          <ul>
            {lis}
          </ul>
          <code id="content" className={this.state.currentItem.status === 'nonexist' ? 'hidden' : ''}>{this.state.currentItem.body}</code>
          <div id="modal" className={this.state.currentItem.status === 'nonexist' ? '' : 'hidden'}>
            <div className="modal-content">
              <p>?????? ???????????? ???????????????. ?????? ??? ????????? ?????????????????????????</p>
              <button disabled={this.state.nowSaving} onClick={this.handleClickSaveItem.bind(this)}>
                ?????? ??? ??????
              </button>
              <button disabled={this.state.nowSaving} onClick={this.handleClickCancel.bind(this)}>
                ??????
              </button>
              <span className={this.state.nowSaving ? '' : 'hidden'}>?????? ???...</span>
            </div>
          </div>
        </div>

        <div className={this.state.nowEditing ? '' : 'hidden'}>
          <header>
            <button onClick={this.handleClickSaveSource.bind(this)}>??????</button>
          </header>
          <div>
            <p>
              ????????? ?????????
              <a href="https://medium.com/" target="_blank">Medium</a>
              post URL??? ????????? ???????????????.
            </p>
            <p>
              ???:
              <code>https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4</code>
            </p>
          </div>
          <textarea value={sources} onChange={this.handleChangeValue.bind(this)} />
        </div>
      </div>
    );
  }
}
