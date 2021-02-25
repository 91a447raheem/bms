import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import IconButton from "@material-ui/core/IconButton";

class ExportToExcel extends React.Component {
    componentDidMount() {

    }
    render() {

        const {posts, fileName, sheetName, dataTable,btnName} = this.props;
        return (
            <div>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="export"
                    table="table-to-xls"
                    filename={fileName}
                    //  sheet={sheetName}
                    buttonText={
                       <IconButton  style={{backgroundColor:"#4caf50",color:"#FFF",width:"50px",height:"50px"}}><i className="material-icons"
                                                    style={{marginTop: 10}}>get_app</i>
                       </IconButton>
                    }
                />

                <table id="table-to-xls" style={{display: "none"}}>

                    <tr>
                        {
                            dataTable.column.map(post => {
                                    return (
                                        <th>{post.Header}</th>
                                    )
                                }
                            )
                        }
                    </tr>
                    <tbody>

                    {
                        posts.map(post => {
                                return (
                                    <tr>
                                        {
                                            dataTable.column.map(prop => {
                                                    return (
                                                        <td>{post[prop.accessor]}</td>
                                                    )
                                                }
                                            )
                                        }
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </table>
            </div>
        );

    }
}


export default ExportToExcel;