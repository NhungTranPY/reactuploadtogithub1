import React, { Component } from 'react'
import TableDataRow from './TableDataRow'

export class TableData extends Component {

    deleteButtonClick = (idUser) => {
        this.props.deleteUser(idUser);
    }

    mapingDataUser = () => this.props.dataUserProps.map((value,key) => (
        <TableDataRow 
        deleteButtonClick={(idUser) => this.deleteButtonClick(idUser)}

        key={key} 
        stt={key} 
        userName={value.name} 
        tel={value.tel} 
        permission={value.permission}
        id={value.id} 
        //de sua thong tin user thi phai nhan dc thong tin cua user do thong qua ham ben duoi, value chinh la tat ca gia tri cua 1 user khi mapping
        editFunClick={(user) => this.props.editFun(value)} 
        //bai 82: tao ham thay doi trang thai hien thi cua form
        changeEditUserStatus={() => this.props.changeEditUserStatus()}
        />
    ))

    render() {
        //console.log(this.props.dataUserProps)
        return (
            <div className="col">
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.mapingDataUser()}
                    </tbody>
                </table>
                </div>

        )
    }
}

export default TableData
