import React, { Component } from 'react';
import styles from './Styles/SubjectList.module.css';

class SubjectList extends Component {
  render() { 
    return ( <div>
      <table className={styles.table}>
        <thead className={styles.th}>
          <tr className={styles.tr}>
            <th>Ten hoc phan</th>
            <th>Ma hoc phan</th>
            <th>Ngay thi</th>
            <th>Ca thi</th>
            <th>Phong thi</th>
            <th>SL</th>
          </tr>
        </thead>

        <tbody id=""></tbody>
      </table>
    </div> );
  }
  
}
 
export default SubjectList;