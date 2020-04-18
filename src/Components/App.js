import React, { Component } from 'react'
import './../App.css';
import Header from './Header';
import Search from './Search';
import TableData from './TableData';
import AddUser from './AddUser';
import DataUser from './Data.json'

//tao unique ID cho truong hop khong co back end
import { v4 as uuidv4 } from 'uuid';



class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       hienThiForm: true,
       data: DataUser,
       giaTriTextSearch:'',
       editUserStatus: false,
       userEditObject: {}
    }
  }


  deleteUser = (idUser) => {
    //xoa thong tin nguoi dung su dung ham filter
    //console.log(idUser);
    //in ra mang moi tempData ma chua cac phan tu co id khong trung voi idUser (id cua phan tu bi xoa)
    let tempData = this.state.data.filter(item => item.id !== idUser);
    //xoa xong the set lai du lieu cho data nhu sau
    this.setState({
      data: tempData
    })
    //console.log(tempData);
    // tempData.forEach((value, key) => {
    //   if(value.id === idUser) {
    //     console.log(key)
    //   }
    // })

    //day du lieu moi vao localStorage
    localStorage.setItem('userData', JSON.stringify(tempData))
  }

  getUserEditInfoApp = (info) => {
    //console.log('Thong tin da sua xong la ' + info.name)
    //thay doi new info cho user sau khi nhan nut edit theo noi dung moi ma nguoi dung nhap vao
    this.state.data.forEach((value, key) => {
      //console.log(value.name)
      if(value.id === info.id) {
        value.name = info.name;
        value.tel = info.tel;
        value.permission = info.permission;
      }
    })
  }

  editUser = (user) => {
    //console.log("ket noi thanh cong");
    this.setState({
      userEditObject: user
    })
    //console.log(user);
  }

  changeEditUserStatus = () => {
    this.setState({
      editUserStatus: !this.state.editUserStatus
    })
  }

  //ham lay du lieu nguoi dung nhap vao ve tu component con AddUser.js thong qua tham so va de truyen vao component con thong qua props
  getNewUserData = (name, tel, permission) => {
    //chua lay dc id vi ko co back end de tu sinh ra id nen tam thoi de trong
    let item = {};
    item.id = uuidv4();
    item.name = name;
    item.tel = tel;
    item.permission = permission;

    //cap nhat thong tin thanh vien moi vao du lieu json
    let items = this.state.data;

    items.push(item);

    //cap nhat ra giao dien luon new user vua nhap
    this.setState({
      data: items
    })
    //console.log(this.state.data);
  }

  //lay du lieu khi nguoi dung nhap vao key word
  getTextSearch = (dl) => {
    this.setState({
      //dl la tham so de lay du lieu tu component con: search.js (ben duoi). tat ca cac gia tri thay doi se duoc luu vao day
      //khong can khai bao giaTriTextSearch trong state phia tren cung dc. No tu hieu ngam la gia tri rong neu ko cho gia tri mac ding
      giaTriTextSearch: dl
    });
    //console.log(' du lieu component cha nhan duoc la ' + this.state.giaTriTextSearch)
  }
  
  doiTrangThai = () => {
    this.setState({
      //thay doi hien thi khi click
      hienThiForm: !this.state.hienThiForm
    });
  }

  render() {
    //localStorage.setItem('userData', JSON.stringify(DataUser));

    //console.log(this.state.data)
    //dau tien la khai bao 1 mang de luu ket qua 
    let ketqua = [];
    //tiep theo la dung ham forEach de luc trong data
    this.state.data.forEach((item) => {
      //neu gia tri nguoi dung nhap vao (this.state.giaTriTextSearch) co mat (xuat hien) hoac trung voi "name" trong data (Data.json)
      // -1 co nghia la khong co => !== -1 co nghia la co (neu co thi indexOf se tra ve vi tri cua tu do: o day ta ko xet den trong hop nay)
      if(item.name.indexOf(this.state.giaTriTextSearch) !== -1) {
        //thi dua gia tri trung do vao mang ketqua
        ketqua.push(item);
      }
    })
    //console.log(ketqua);

    return (
      <div>
        <Header />
        <div className="searchForm">
          <div className="container">
            <div className="row">
              <Search 
              getUserEditInfoApp={(info) => this.getUserEditInfoApp(info)}
              ketNoi={() => this.doiTrangThai()} 
              hienThiForm={this.state.hienThiForm}
              checkConnectionWithProps = {(dl) => this.getTextSearch(dl)}
              editUserStatus={this.state.editUserStatus}
              changeEditUserStatus={() => this.changeEditUserStatus()}
              userEditObject={this.state.userEditObject}
              />
              {/* in ra mang ketqua o tren sau khi thuc hien chuc nang thanh tim kiem thay vi in het tat ca du lieu */}
              <TableData 
              deleteUser={(idUser) => this.deleteUser(idUser)}
              dataUserProps={ketqua} 
              editFun={(user) => this.editUser(user)} 
              changeEditUserStatus={() => this.changeEditUserStatus()} />

              <AddUser add={(name, tel, permission) => this.getNewUserData(name, tel, permission)} hienThiForm={this.state.hienThiForm}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default App;

