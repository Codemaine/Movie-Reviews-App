import './tailwind.output.css';
import './App.css';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_reviews: [],
      search: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMap = this.handleMap.bind(this);
  }

  handleChange(event) {
    this.setState({ search: [event.target.value] })
    console.log(this.state.search)
    fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${this.state.search}&api-key=94Ib5kpQ6xKNnxurFbxhXJaXKf3hhLrK`)
      .then(res => res.json())
      .then(movies => {
        console.log(movies)
        this.setState({ movie_reviews: movies.results })
        console.log(this.state.movie_reviews)
      }).catch((err) => {
        console.log(err)
      })
  }


  handleMap(event) {
    if (Array.isArray(this.state.movie_reviews) === true) {
      return this.state.movie_reviews.map((movie) => {
        return (<div className="mb-5 mt-5">
          <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{movie.display_title}</div>
              <p class="text-gray-700 text-base">
                {movie.summary_short}
              </p>
            </div>
            <div class="px-6 pb-4">
              <a href={movie.link.url} className="text-indigo-600">{movie.link.suggested_link_text}</a>
            </div>
          </div>
        </div>)
      })
    } else {
      return <div></div>
    }
  }


  handleSubmit(event) {
    event.preventDefault();
    console.log(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${this.state.search}&api-key=94Ib5kpQ6xKNnxurFbxhXJaXKf3hhLrK`)
    fetch(`https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${this.state.search}&api-key=94Ib5kpQ6xKNnxurFbxhXJaXKf3hhLrK`)
      .then(res => res.json())
      .then(movies => {
        console.log(movies)
        this.setState({ movie_reviews: movies.results })
        console.log(this.state.movie_reviews)
      }).catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    fetch('https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=94Ib5kpQ6xKNnxurFbxhXJaXKf3hhLrK')
      .then(res => res.json())
      .then(movies => {
        console.log(movies)
        this.setState({ movie_reviews: movies.results })
        console.log(this.state.movie_reviews)
      }).catch((err) => {
        console.log(err)
      })
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" placeholder="Search for movies"></input>
        </form>
        <div className="grid sm:grid-cols-2">
          {this.handleMap()}
        </div>
      </div>
    )
  }
}

export default App;
