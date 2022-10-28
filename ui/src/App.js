import React from "react";
import LoginForm from './LoginForm.js';
import UrlShortener from './UrlShortener.js';
import "./App.css";

const API_URL = 'http://localhost:4000';

class App extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      user_id: null,
      isLoggedIn: false,
      requestSent: false,
      urls: [],
      errors: []
    }

    this.setErrorMessages = this.setErrorMessages.bind(this);
    this.onLogin          = this.onLogin.bind(this);
    this.onLogout         = this.onLogout.bind(this);
    this.onNewUrl         = this.onNewUrl.bind(this);
    this.onDeleteUrl        = this.onDeleteUrl.bind(this);
  }

  componentDidMount(){
    const user_id = sessionStorage.getItem("user_id");

    if(user_id){
      this.setState({requestSent: true});
      fetch(`${API_URL}/users/${user_id}/urls`)
        .then(res => res.json())
        .then(respData => {console.log(respData); this.setState({ user_id: user_id, urls: respData.data, requestSent: false, isLoggedIn: true });});
    } else {
      this.setState({ user_id: user_id, isLoggedIn: (user_id != null) });
    }
  }

  onLogin(event) {
    event.preventDefault();

    var { email } = event.target;
    this.setState({ requestSent: true });

    fetch(`${API_URL}/users/register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({'email': email.value})
    }).then(res =>res.json())
      .then(userData => {
        sessionStorage.setItem("user_id", userData.id);
        sessionStorage.setItem("user_email", userData.email);
        this.setState({user_id: userData.id, isLoggedIn: true});
      })
      .catch(error => {
        this.setState({
          requestSent: false,
          errors: [error],
        });
      });
  };

  onDeleteUrl(url_id) {
    console.log("remove " + url_id);
  }

  onNewUrl(data) {
    this.setState({ requestSent: true });

    fetch(`${API_URL}/urls/shorten`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({url: data.url, name: data.name, user_id: this.state.user_id})
    }).then(res =>res.json())
      .then(urlData => {
        if(urlData.valid) {
          let urls= this.state.urls;
          urls.push(urlData._doc);

          this.setState({
            requestSent: false,
            urls: urls,
            errors: [],
          });
        } else {
          this.setState({requestSent: false, errors: [urlData.message]});
        }
      })
      .catch(error => this.setState({requestSent: false, errors: [error]}));
  };

  setErrorMessages(message) {
    this.setState({errors: [message]});
  }

  onLogout(event){
    event.preventDefault();
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_email");
    this.setState({isLoggedIn: false, user_id: null});
  };

  render(){
    return (
      <div className="app">
        <div className="errors">{this.state.errors}</div>
        { this.state.isLoggedIn
          ? <UrlShortener setErrorMessages={this.setErrorMessages}
                          logout={this.onLogout}
                          onNewUrl={this.onNewUrl}
                          onDeleteUrl={this.onDeleteUrl}
                          urls={this.state.urls}
                          apiUrl={API_URL}/>
          : <LoginForm handleSubmit={this.onLogin}
                       setErrorMessages={this.setErrorMessages}/>
        }
      </div>
    );
  }
}

export default App;
