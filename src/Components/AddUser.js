import React, { Component } from 'react'

export class AddUser extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             id:"",
             name:"",
             tel:"",
             permission:""
        }
    }
    

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        //console.log(name);
        //console.log(value);

        //luu tat ca du lieu nguoi dung nhap vao 1 mang [name] co gia tri value (o tren) vao state
        this.setState({
            [name] : value
        })

        //sau do dong goi thanh 1 doi tuong
        // let item = {};
        // item.id = this.state.id;
        // item.name = this.state.name;
        // item.tel = this.state.tel;
        // item.permission = this.state.permission;
        // console.log(item)
    }

    kiemTraTrangThai = () => {
        if(this.props.hienThiForm === true) {
            return (
                <div className="col">
                <form method="post">
                <div className="card border-primary mb-3 mt-2">
                    <div className="card-header">Add New User</div>
                    <div className="card-body text-primary">
                        <div className="form-group">
                            {/* luu y: name trong input & select o day nen trung voi ten da dat trong Data.json */}
                        <input onChange={(event) => this.isChange(event)} type="text" name="name" className="form-control" placeholder="User Name" />
                        </div>
                        <div className="form-group">
                        <input onChange={(event) => this.isChange(event)} type="text" name="tel" className="form-control" placeholder="Phone Number" />
                        </div>
                        <div className="form-group">
                        <select onChange={(event) => this.isChange(event)} className="custom-select" name="permission" required>
                            <option value="chon" defaultValue>Action</option>
                            <option value="admin">Admin</option>
                            <option value="moderator">Moderator</option>
                            <option value="normal">Normal</option>
                        </select>
                        </div>
                        <div className="form-group">
                        <input type="reset" className="btn btn-block btn-primary" onClick={(name, tel, permission) => this.props.add(this.state.name, this.state.tel, this.state.permission)} value="Add New User" />
                        </div>
                    </div>
                </div>
                </form>
                </div>
            )
        }
    }

    render() {
        //thu in ra xem du lieu nhap vao co duoc luu vao state hay ko
        //console.log(this.state)
        return (
            
                <div>

                    {/* {this.hienThiNut()} */}
                    {this.kiemTraTrangThai()}
                    
                    
                </div>
                
        )
    }
}

export default AddUser
