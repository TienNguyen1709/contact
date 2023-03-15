import React, {useState} from 'react';
import axios from 'axios';
import AddContact from "./AddContact";

export default function ListContact() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

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

    function addContact() {
        axios.post(`/api/add`, {handleInputChange})
            .then(name => {
                console.log(name);
            })
    }

    return (
        <div>
            <h1>Quản lý danh bạ</h1>
            <AddContact
                addContact={addContact}
            />
        </div>
    )
}