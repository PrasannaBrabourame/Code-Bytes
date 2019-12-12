import React from "react";
import ReactDOM from "react-dom";
import axios from "axios"
import './scss/app.scss'

class UrlShorter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bindval: '',
            hasVal: false
        }
        this.shortlink = this.shortlink.bind(this)
        this.sumChange = this.sumChange.bind(this)
    }

    shortlink(data) {
        axios.post('https://rel.ink/api/links/', {
            url: `${this.state.bindval}`,
        })
            .then((response) => {
                this.setState({ bindval: '', hasVal: true, shortval : `https://rel.ink/${response.data.hashid}`})
            }, (error) => {
                console.log(error);
            });
    }

    sumChange(e) {
        this.setState({ bindval: e.currentTarget.value })
    }

    render() {
        return <div id="landing" className="pt-8 pb-11 pt-md-9 pb-md-12 py-lg-14 bg-light bg-between" >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-7 text-center" data-aos="fade-up">
                        <h1 className="display-2 font-weight-bold">
                            URL Shortener
                                </h1>
                        <p className="font-size-lg text-muted mb-6 mb-md-8">Secure and reliable short links -
                                    <a href="https://github.com/PrasannaBrabourame">
                                Prasanna Brabourame
                                    </a>
                        </p>
                        <div id="shorten">
                            <div className="form-group">
                                <input type="text" aria-describedby="URL" placeholder="Enter URL" className="form-control text-center" onChange={(event) => this.sumChange(event)} />
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" onClick={(event) => this.shortlink(event)} >SUBMIT</button>
                                </div>
                            </div>
                        </div>
                        {this.state.hasVal ? <div><h1>{this.state.shortval}</h1></div> : ``}
                    </div>
                </div>
            </div>
        </div>
    }
}

let App = document.getElementById("app");

ReactDOM.render(<UrlShorter />, App);