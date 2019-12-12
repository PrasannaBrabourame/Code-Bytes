import React, { Component } from 'react';
import './scss/app.scss';


const searchClient = `{'B1G2GM9NG0',
'aadef574be1f9252bb48d4ea09b5cfe5'}`




class AppPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listdata: ['car', 'bike', 'scooty', 'bus'],
            productList: {

            }
        };
        this.productList = this.productList.bind(this)
    }

    productList(data) {

        return (<div className="product-area-box">
            <div className="img-div">
                <img src="https://media.zigcdn.com/media/model/2019/Oct/fz-s-fi-version-3-right-side-view_600x400.jpg" />
            </div>
            <div className="desc-div">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
    of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>)

    }

    render() {
        return (
            <div className="sample">
                <div className="filter-area">
                    <h2>Vehicle</h2>
                    <ul>{this.state.listdata.map(function (item, i) {
                        console.log('test');
                        return (<li key={i}><input type="checkbox" name="vehicle1" value="car" />{item}</li>)
                    })}

                        {/* <li><input type="checkbox" name="vehicle1" value="car" /> car</li>
                        <li><input type="checkbox" name="vehicle2" value="bike" /> bike</li>
                        <li><input type="checkbox" name="vehicle3" value="scooty" /> scooty</li>
                        <li><input type="checkbox" name="vehicle4" value="bus" /> bus</li> */}
                    </ul>
                </div>
                <div className="product-area">
                    <div className="product-area-inner">
                        <div className="product-area-search">
                            <input type="text" />
                        </div>
                        {this.productList()}
                    </div>
                </div>
            </div>
        );
    }
}
export default AppPage;