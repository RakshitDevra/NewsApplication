import React, { Component } from 'react'
import NewsItem from './NewsItem.js'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export  class News extends Component {
  static defaultProps={
    pageSize:10,
    country:"in",
    category:"general"

  }
  static propTypes={
    pageSize:PropTypes.number,
    country:PropTypes.string,
    category:PropTypes.string
  }
  capitalizeFirstLetter=(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
 
  // articles is an array(array of objects) jisko this.articles kaeke access kiya ja sakta hai
  // articles= [
  //   {
  //     "source": {
  //       "id": "fox-sports",
  //       "name": "Fox Sports"
  //     },
  //     "author": "John Fanta",
  //     "title": "A boring NCAA Tournament? San Diego State, FAU dash that notion in Final Four thriller",
  //     "description": "In a jaw-dropping Final Four contest on Saturday, San Diego State and FAU reminded the sports world why the NCAA Tournament is the best sporting event on the planet",
  //     "url": "http://www.foxsports.com/stories/college-basketball/a-boring-ncaa-tournament-san-diego-state-fau-dash-that-notion-in-final-four-thriller",
  //     "urlToImage": "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2023/04/1408/814/butler-wide-040123.jpg?ve=1&tl=1",
  //     "publishedAt": "2023-04-02T00:59:37Z",
  //     "content": "HOUSTON ARE YOU NOT ENTERTAINED?!\r\nSorry, I couldn't resist leading off with that sentence. Not after what happened in the opening game of the Final Four on Saturday.\r\nTrailing 71-70, Brian Dutcher e… [+4549 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "fox-sports",
  //       "name": "Fox Sports"
  //     },
  //     "author": null,
  //     "title": "April Fools' Day 2023: Best sports posts, highlights featuring Snoop Dogg, more",
  //     "description": "The Steelers \"signed\" Snoop Dogg as a wide reciver, Caleb Love wants fans to know that he is not actually joining Duke, and more!",
  //     "url": "http://www.foxsports.com/stories/nfl/april-fools-day-2023-best-sports-posts-highlights-featuring-snoop-dogg-more",
  //     "urlToImage": "https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2023/04/1408/814/04.01.23_April-Fools-Day-Sports-Roundup_Horizontal.jpg?ve=1&tl=1",
  //     "publishedAt": "2023-04-02T00:15:45Z",
  //     "content": "April Fools' Day is upon us, and plenty of famous players and teams are getting in on the action with some good-natured pranking. Here are some of the most viral posts from around the sports world Sa… [+1826 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "bleacher-report",
  //       "name": "Bleacher Report"
  //     },
  //     "author": null,
  //     "title": "☄️ New &#x27;Hero Ball&#x27; Episode ☄️",
  //     "description": "Fan easier, fan faster and fan better with Bleacher Report. Keep up with the latest storylines, expert analysis, highlights and scores for all your favorite sports.",
  //     "url": "https://bleacherreport.com/videos/371669-hero-ball-2023-allstar-special",
  //     "urlToImage": null,
  //     "publishedAt": "2023-02-22T21:52:16.6066431Z",
  //     "content": null
  //   },
  //   {
  //     "source": {
  //       "id": "bleacher-report",
  //       "name": "Bleacher Report"
  //     },
  //     "author": null,
  //     "title": "&#x27;The Voncast&#x27; with Myles Garrett",
  //     "description": "Fan easier, fan faster and fan better with Bleacher Report. Keep up with the latest storylines, expert analysis, highlights and scores for all your favorite sports.",
  //     "url": "https://bleacherreport.com/videos/304730-the-voncast-with-myles-garrett",
  //     "urlToImage": null,
  //     "publishedAt": "2022-12-01T18:52:49.4768049Z",
  //     "content": "Myles Garrett and Von Miller talk playing in the NBA, pick their dream NFL defense and more"
  //   },
  //   {
  //     "source": {
  //       "id": "the-washington-times",
  //       "name": "The Washington Times"
  //     },
  //     "author": "The Washington Times https://www.washingtontimes.com",
  //     "title": "Latest Quizzes",
  //     "description": "Take a break from the hard news of the day and enjoy a quiz on entertainment, sports, history and politics only from The Washington Times.",
  //     "url": "https://www.washingtontimes.com/quiz/",
  //     "urlToImage": null,
  //     "publishedAt": "2022-08-30T16:37:43.8583104Z",
  //     "content": "Featured Quizzes\r\nTake the challenge to learn about the life and career highlights of famed nonagenarian actress and comedian Betty White.\r\n Shares \r\nRead our synopsis and correctly identify a litera… [+32510 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "nrk",
  //       "name": "NRK"
  //     },
  //     "author": "NRK",
  //     "title": "De siste sportsnyhetene fra NRK",
  //     "description": "Her får du de siste sportsnyhetene fra NRK.",
  //     "url": "https://www.nrk.no/sport/sportsnyheter-1.14660227#1.16362236.1.16362236",
  //     "urlToImage": "https://gfx.nrk.no/7kT5zGoE2E-GnUKLojH1PQ0I1Nze4Ypu8lxM-oBjubQw.jpg",
  //     "publishedAt": "2019-08-14T09:09:42Z",
  //     "content": "2. april2023kl.13:57Det oppstod fullt kaos etter at Bahrain Victorious-rytter Filip Maciejuk kjørte ut på siden i et klissvått gress og mistet balansen.\r\nDet førte til at han kjørte inn i et stort fe… [+937 chars]"
  //   }
  // ]
  constructor(props){
    super(props);
    
    this.state={
      articles:[] ,// this.articles dosen't exist now.
      loading:true,
      page:1,
      totalResults:0

    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }
  async updateNews(){
    this.props.setProgress(10);
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data= await fetch(url);
     this.props.setProgress(30);
    // this.setState({
    //   loading:true
    // })
    let parsedData =await data.json()
    this.props.setProgress(70);
    // console.log(parsedData);
    this.setState({articles : parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false

    })
    this.props.setProgress(100);

  }

  async componentDidMount(){
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9c229bb4dead4886a9f38f9078780836&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading:true
    // })
    // let data= await fetch(url);
    // let parsedData= await data.json()
    // console.log(parsedData);
    // this.setState({articles:parsedData.articles,
    //   totalResults:parsedData.totalResults,
    // loading:false})
    this.updateNews();
    
  }
  handlePreviousClick= async () =>{

    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9c229bb4dead4886a9f38f9078780836&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({
    //   loading:true
    // })
    // let data= await fetch(url);
    // let parsedData= await data.json()
    // console.log(parsedData);
   
    // this.setState({
    //   articles:parsedData.articles,
    //   page:this.state.page -1,
    //   loading:false
    // })
    this.setState({page : this.state.page - 1})
    this.updateNews();
  }
  handleNextClick= async () =>{
    // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    // }else{
    //   let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9c229bb4dead4886a9f38f9078780836&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({
    //     loading:true
    //   })
    //   let data= await fetch(url);
    //   let parsedData= await data.json()
     
     
    //   this.setState({
    //     articles:parsedData.articles,
    //     page:this.state.page + 1,
    //     loading:false
    //   })
    // }
    this.setState({page : this.state.page + 1});
      this.updateNews();
    
  }
  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({page:this.state.page + 1})
    this.setState({loading:true});
    let data= await fetch(url);
    let parsedData =await data.json()
    this.setState({
      articles : this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      loading:false
    

    })

  
  };
  
  
  
  render() {
    return (
      <>
      
      
      <h1 className='text-center' style={{margin:'40px 0px',marginTop:'90px'}}>News Monkey-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
      {/* {this.state.loading && <Spinner />} */}
      <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length <=this.state.totalResults}
          loader={ this.state.loading&&<Spinner/>}
        >
        <div className='container'>
     
      <div className='row'>
      {  this.state.articles.map((element,i)=>{
        return  < div className='col-md-3' key={element.title}>
        <NewsItem  title={element.title!=null?element.title.slice(0,45):""} description={element.description!=null?element.description.slice(0,50):"No Description available"} imageUrl={element.urlToImage!=null?element.urlToImage:"https://fdn.gsmarena.com/imgroot/news/23/04/realme-narzo-n55-charging-speed/-952x498w6/gsmarena_001.jpg"} newsUrl={element.url} author={element.author!=null?element.author:"Unknown"} date={element.publishedAt} source={element.source.name}/>
        </div> })}
        </div>
       
        {/* < div className='col-md-3'>
        <NewsItem title="mytitle2" description="mydesc2"/>
        </div>
        < div className='col-md-3'>
        <NewsItem title="mytitle3" description="mydesc3"/>
        </div>
        < div className='col-md-3'>
        <NewsItem title="mytitle4" description="mydesc4"/>
        </div>
        < div className='col-md-3'>
        <NewsItem title="mytitle5" description="mydesc5"/>
        </div>
        < div className='col-md-3'>
        <NewsItem title="mytitle6" description="mydesc6"/>
        </div>
        < div className='col-md-3'>
        <NewsItem title="mytitle7" description="mydesc7"/>
        </div>
        
        < div className='col-md-3'> 
        <NewsItem title="mytitle8" description="mydesc8"/>
        </div> */}
        
        </div>
        </InfiniteScroll>
       {/* <div className='container d-flex justify-content-between' >
       <button disabled ={this.state.page<=1} type="button" className="btn btn-dark " onClick={this.handlePreviousClick}>&larr; Previous</button>
       <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
       </div> */}
       </>
      
     
    )
  }
}

export default News
