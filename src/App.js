import './App.css';
import React from 'react';

class AddTorrent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      torrent: '',
      result: ''
    }
  }
  
  handleInput = (event) => {
    const name = event.target.name
    const newState = {}
    newState[name] = event.target.value
    this.setState(newState)
    event.preventDefault()
  }

  handleSubmit = (event) => {
    fetch("/add_torrent", {
      method: "POST",
      headers: {
      'Content-Type' : 'application/json'
      },
      body: JSON.stringify(this.state)
      })
      .then(response => {
        const newState = {}
        if (response.ok) {
          newState['result'] = "Torrent added"    
        }
        else {
          newState['result'] = "Something went wrong"
        }
        this.setState(newState)
      });
    
    const newState = {}
    newState['torrent'] = ""
    newState['password'] = ""
    this.setState(newState)
    event.preventDefault();
  }

  render () {
    return ( 
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.state.result} <br/>
        </label>
        <label>
          Password:<br />
        </label>
        <input type="password" name="password" value={this.state.password} onChange={this.handleInput}></input><br/>
        <label>
          Link to be added:<br />
        </label>
        <input type="text" name="torrent" value={this.state.torrent} onChange={this.handleInput}></input><br />
        <input type="submit"></input>
      </form>
    )
  }
}

class TorrentStatus extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      torrent_list: '',
      refresh_time: ''
    }
  }

  getTorrentList() {
    fetch('/torrent_list')
    .then((response) => response.json())
    .then(data => {
        this.setState({ 
          torrent_list: data.torrent_list,
          refresh_time: data.refresh_time
        });
    });
  }

  componentDidMount() {
    this.getTorrentList()

    setInterval(() => {
      this.getTorrentList()
    }, 5000);
  }

  render () { 
    return (
      <>
      {this.state.torrent_list} <br/>
      Last refreshed: {this.state.refresh_time} <br />
      </>
    )
  }
}

class RemoveTorrent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      torrent: '',
      result: ''
    }
  }

  handleInput = (event) => {
    const name = event.target.name
    const newState = {}
    newState[name] = event.target.value
    this.setState(newState)
    event.preventDefault()
  }

  handleSubmit = (event) => {
    fetch("/remove_torrent", {
      method: "POST",
      headers: {
      'Content-Type' : 'application/json'
      },
      body: JSON.stringify(this.state)
      })
      .then(response => {
        const newState = {}
        if (response.ok) {
          newState['result'] = "Torrent removed"    
        }
        else {
          newState['result'] = "Something went wrong"
        }
        this.setState(newState)
      });
    
    const newState = {}
    newState['torrent'] = ""
    newState['password'] = ""
    this.setState(newState)
    event.preventDefault();
  }

  render () {
    return ( 
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.state.result} <br/>
        </label>
        <label>
          Password:<br />
        </label>
        <input type="password" name="password" value={this.state.password} onChange={this.handleInput}></input><br/>
        <label>
          Torrent to be removed:<br />
        </label>
        <input type="number" name="torrent" value={this.state.torrent} onChange={this.handleInput}></input><br />
        <input type="submit"></input>
      </form>
    )
  }
}

function App() {
  return (
    <>
    <AddTorrent />
    <br />
    <div style={{whiteSpace: "pre-wrap"}}>
    <TorrentStatus />
    </div>
    <br />
    <RemoveTorrent />
    </>
  );
}

export default App;
