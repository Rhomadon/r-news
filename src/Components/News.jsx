import React, { Component } from 'react'
import axios from 'axios'

export default class News extends Component {

    constructor(props) {
        super(props)
        this.state = {
            srch: '',
            arr: [],
            
          }
        console.log('constructor');
    }
    

    componentDidMount() {
        const url = 'https://newsapi.org/v2/top-headlines?apiKey=54da94e5bdee433caf334ae91c37f642&country=id'
        axios.get(url)
        .then(res => {
            const news = res.data
            let arr = news.articles
            this.setState({ arr })
        })
        console.log('else')
        
    }

    getSnapshotBeforeUpdate() {
        if (this.state.srch != '') {
            const url = 'https://newsapi.org/v2/top-headlines?apiKey=54da94e5bdee433caf334ae91c37f642&country=id&q='
            axios.get(url + this.state.srch).then(res => {
            const news = res.data
            let arr = news.articles
            this.setState({ arr })
        })
        } else {
            const url = 'https://newsapi.org/v2/top-headlines?apiKey=54da94e5bdee433caf334ae91c37f642&country=id'
            axios.get(url).then(res => {
            const news = res.data
            let arr = news.articles
            this.setState({ arr })
            })
        }
    }

  render() {
    return (
        <div className='news'>
            {console.log('render')}
        <nav class="navbar fixed-top navbar-light bg-light">
            <div className="container">
            <h1 class="navbar-brand">RNews</h1>
          <form class="d-flex">
              <input type="text" class="form-control me-2" name="srch" onChange={r => this.setState({ srch: r.target.value}, () => console.log(this.state) )} placeholder="Search" aria-label="Search" />
          </form>
          </div>
        </nav>
        <div class="container"> 
            <div class="row row-cols-1 row-cols-md-4 g-4">
                
                {
                this.state.arr.map( (r, idx) => 
                <div key={idx} class="col">
                    <div class="card">
                        <img src={r.urlToImage} class="card-img-top" alt={r.urlToImage} />
                        <div class="card-body">
                            <h5 class="card-title">{r.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{r.author}</h6>
                            <p class="card-text"><small class="text-muted">{r.publishedAt}</small></p>
                            <p class="card-text">{r.description}</p>
                            <button href={r.url} class="btn btn-primary" >Selengkapnya</button>
                            
                        </div>
                    </div>
                </div>
                 ) 
                }
                
            </div>
        </div>
    </div>
    )
  }
}
