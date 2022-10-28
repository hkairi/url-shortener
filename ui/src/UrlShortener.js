import React from 'react';

import UrlList from './UrlList.js';

class UrlShortener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', url: ''};

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onNewUrl(this.state);
  };

  render() {
    return (
      <div className="url-shortener">
        <a href="#/logout" onClick={this.props.logout}> Log out</a>
        <form onSubmit={this.handleSubmit}>
          <div className="title">Url Shortener</div>
          <input type="text" required placeholder="Give it a name" value={this.state.name} onChange={this.handleNameChange} />
          <br/>
          <input type="text" required placeholder="Enter the url you want to shorten"value={this.state.url} onChange={this.handleUrlChange} />
          <br/>
          <input type="submit" value="Submit" />
        </form>

        <UrlList items={this.props.urls}
                 deleteUrl={this.props.onDeleteUrl}
                 api_url={this.props.apiUrl}/>
      </div>
    );
  }
}
export default UrlShortener;
