import React, {Component} from "react";
import 'semantic-ui-css/semantic.min.css';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VidList';
import VideoDetail from './VideoDetail';


class App extends Component {

    state = {
        videos: [],
        selectedVideo: null
    };

    // when app first time loads (rendered) it is going to be by default
    componentDidMount() {
        this.onTermSubmit('buildings');
    }

    onTermSubmit =  async term => {
         const response = await youtube.get('/search', {
             params: {
                 q: term
             }
         });
       return this.setState({
           videos: response.data.items,
           selectedVideo: response.data.items[0]
       });
     };

     onVideoSelect = video => {
         this.setState({selectedVideo: video})

     }

    render() {
        return (
            <div className="ui container">
                <SearchBar onFormSubmit={this.onTermSubmit}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail
                                video={this.state.selectedVideo}
                            />
                        </div>
                        <div className="five wide column">
                            <VideoList
                                videos={this.state.videos}
                                onVideoSelect={this.onVideoSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;