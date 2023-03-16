import React from 'react';
import axios from 'axios';
import AddContact from "./AddContact";

export default function ListContact() {
    function handleInputChange(e) {
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
    function showUser() {
        axios.get('/api/user')
            .then(res => {
                const user = res.data;
                this.setState({user: user.user});
            })
            .catch(error => console.log(error));
    }
    return (
        <div>
            <h1>Quản lý danh bạ</h1>
            <AddContact
                addContact={handleInputChange}
            />
            {showUser}
        </div>
    )
}