import React, {Component} from 'react';
import axios from "axios";

class AddContact extends Component {
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const phone = target.phone;
        this.setState({
            [name]: value,
            [phone]: value
        });
    }
    handleInsertSubmit = (e) => {
        e.preventDefault();
        const newInfo = {
            id: '',
            name: this.state.name,
            phone: this.state.phone,
        };
        axios.post('/api/add', newInfo)
            .then(res => {
                const user = res.data
                this.setState({user: user.user});
            })
            .catch(error => console.log(error));
        window.location.reload();
    };

    render() {
        return (
            <div>
                <h2>Thêm danh bạ</h2>
                <form onSubmit={this.handleInsertSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <th>Tên</th>
                            <td>
                                <input
                                    name="name"
                                    type="text"
                                    onChange={this.handleInputChange}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Số điện thoại</th>
                            <td>
                                <input
                                    name="phone"
                                    type="text"
                                    onChange={this.handleInputChange}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <br/>
                    <button type="submit">Thêm</button>
                    <hr/>
                </form>
            </div>
        )
    }
}

export default AddContact;