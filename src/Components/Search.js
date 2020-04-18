import React, { Component } from 'react'
import EditUser from './EditUser'

export class Search extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            giaTriTrungGian:'',
            userObj: {}
        }
    }

    getUserEditInfo = (info) => {
        this.setState({
            userObj: info
        })

        this.props.getUserEditInfoApp(info)
        //console.log(info)
    }

    isShowEditForm = () => {
        if(this.props.editUserStatus === true) {
            return <EditUser 
            getUserEditInfo={(info) => this.getUserEditInfo(info)}
            userEditObject={this.props.userEditObject}
            changeEditUserStatus={() => this.props.changeEditUserStatus()}/>
        }
    }
    

    hienThiNut = () => {
        if(this.props.hienThiForm === true) {
            return <div className="btn btn-block btn-outline-secondary" onClick={() => this.props.ketNoi()}>Close</div>
        } else {
            return <div className="btn btn-block btn-outline-info" onClick={() => this.props.ketNoi()}>Click to Add User</div>
        }
    }

    isChange = (event) => {
        console.log(event.target.value)
        this.setState({
            //gia tri nay se lay gia tri nguoi dung nhap vao va luu lai (thay vi rong nhu o tren)
            giaTriTrungGian: event.target.value
        });
        //goi ham cua component cha: App.js de khi nguoi dung type in search thi ket qua hien thi theo ben duoi luon (ko can nhan nut search nua)
        this.props.checkConnectionWithProps(this.state.giaTriTrungGian)
    }

    render() {
        return (
            <div className="col-12">
                {/* bat dau form phan edit user */}
                {this.isShowEditForm()}
                {/* ket thuc form edit user */}

                <div className="form-group">
                    <div className="btn-group">
                    <input onChange={(event) => this.isChange(event)} type="text" className="form-control" placeholder="Keywords" />
                    <div className="btn btn-info" onClick={(dl) => this.props.checkConnectionWithProps(this.state.giaTriTrungGian)}>Search</div>
                    </div>
                </div>
                <div>
                    {this.hienThiNut()}
                    
                </div>
                <hr/>
            </div>
        )
    }
}

export default Search
