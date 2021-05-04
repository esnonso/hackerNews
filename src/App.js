import React, {Component} from 'react'; 
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      stories:[]
    }
  }

componentDidMount(){
  const topStories = "https://hacker-news.firebaseio.com/v0/topstories.json";
  const storyUrlBase ="https://hacker-news.firebaseio.com/v0/item/" //the story url base is not complete because after we make the request we need to 
  //parse the ids to the storyUrlBase
  fetch(topStories)
  .then(data => data.json())
  .then(data => data.map(id => {
    const url = `${storyUrlBase}${id}.json`
    return fetch(url).then(data => data.json())
  })) 
  .then(promises => Promise.all(promises)) //since we used a map it returns a promise so I use promise chaining to take the array and pass it to promise.all to resolve all promises
  .then(stories => this.setState({stories}))
}

  render(){
      let views = "Loading..."
      const { stories } = this.state;
      if(stories && stories.length> 0){
        views = stories.map((story, index) =>(
          <p key={index}>
            <a href={story.url}><strong>{story.title}</strong></a>
          </p>
        ))
      }
    return(
      <div className="App">
        <h4>Hacker News</h4>
        {views}
      </div>
    )
  }
}

export default App;
