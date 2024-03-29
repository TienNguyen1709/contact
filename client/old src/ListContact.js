import React, {Component} from 'react';
import axios from 'axios';
import AddContact from "./AddContact";
import Modal from "react-modal";

export default class ListContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        }
    };

    componentDidMount() {
        axios.get('/api/user')
            .then(res => {
                const user = res.data;
                this.setState({user: user.user});
            })
            .catch(error => console.log(error));
    };

    //Delete
    handleDelete = (info) => {
        const newInfo = {
            id: info.id,
        };
        axios.post('/api/delete', newInfo)
            .then(res => {
                this.setState(del => ({
                    user: del.user.filter(d => d.id !== res)
                }));
            })
            .catch(error => console.log(error));
        window.location.reload();
    }
    //End delete

    //Update
    openModal = (info) => {
        this.setState({
            modalIsOpen: true,
            id: info.id,
            name: info.name,
            phone: info.phone,
            email: info.email,
            address: info.address,
        });
    };

    closeModal = () => {
        this.setState({
            modalIsOpen: false
        });
    };
    handleUpdate = (e) => {
        e.preventDefault();
        const newInfo = {
            id: this.state.id,
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address,
        };

        axios.post('/api/update', newInfo)
            .then(res => {
                let key = this.state.id;
                this.setState(update => ({
                    user: update.user.map(
                        info => info.id === key ? {
                            ...info,
                            name: this.state.name,
                            phone: this.state.phone,
                            email: this.state.email,
                            address: this.state.address,
                        } : res
                    )
                }))
            })
            .catch(error => console.log(error));
        window.location.reload();
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const phone = target.phone;
        const email = target.email;
        const address = target.address;
        this.setState({
            [name]: value,
            [phone]: value,
            [email]: value,
            [address]: value
        });
    }

    //End update
    render() {
        return (
            <div>
                <h1>Quản lý danh bạ</h1>
                <AddContact
                    onChange={this.handleInputChange}
                    onSubmit={this.handleInsertSubmit}
                />
                {this.state.user.map(info => (
                    <ul key={info.id}>
                        <li>
                            <h3>{info.name}</h3>
                            <h3>{info.phone}</h3>
                            <h3>{info.email}</h3>
                            <h3>{info.address}</h3>
                            <button onClick={() => this.openModal(info)}>Sửa</button>
                            <button onClick={() => this.handleDelete(info)}>Xóa</button>
                        </li>
                    </ul>
                ))}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    portalClassName="modal"
                    style={{
                        overlay: {
                            position: 'fixed',
                            margin: 'auto',
                            width: '400px',
                            height: '350px',
                            backgroundColor: 'rgba(255, 255, 255, 0.75)'
                        },
                    }}
                >
                    <button onClick={this.closeModal}>Đóng</button>
                    <div>
                        <form onSubmit={this.handleUpdate}>
                            <table>
                                <tbody>
                                <tr>
                                    <th>Tên</th>
                                    <td>
                                        <input
                                            name="name"
                                            type="text"
                                            value={this.state.name}
                                            onChange={this.handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại</th>
                                    <td>
                                        <input
                                            name="phone"
                                            type="text"
                                            value={this.state.phone}
                                            onChange={this.handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>
                                        <input
                                            name="email"
                                            type="text"
                                            value={this.state.email}
                                            onChange={this.handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>Địa chỉ</th>
                                    <td>
                                        <input
                                            name="address"
                                            type="text"
                                            value={this.state.address}
                                            onChange={this.handleInputChange}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <br/>
                            <button type="submit">Lưu</button>
                            <hr/>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}