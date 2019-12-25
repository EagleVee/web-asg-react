import React, { Component } from 'react';
import { Table } from 'antd';

class ShiftPage extends Component {
    state = {  }
    render() { 
        return ( <div>{this.renderTable()}</div> );
    }

    renderTable() {
        
        const columns = [
          {
            title: "Ca thi",
            dataIndex: "shift",
            key: "shift"
          },
          
          {
              title: "Ngay thi",
              dataIndex: "date",
              key: "date"
            },

            {
              title: "Phong thi",
              dataIndex: "room",
              key: "room"
            },
      
            {
              title: " Ma hoc phan",
              dataIndex: "code",
              key: "code"
            }
          ];

        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
              console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
              name: record.name,
            }),
          }; 
          
        return (
            <Table rowSelection = {rowSelection} columns = {columns} dataSource = {[{shift: "7h-9h", date: "1/1/2019", room: "PM-101", code: "INT1234"}]} />
        );
    }
}
 
export default ShiftPage;