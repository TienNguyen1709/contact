import React, {useState} from 'react';
import axios from "axios";

export default function AddContact({addContact}) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const newInfo = {
            id: '',
            name: name,
            phone: phone,
            email: email,
            address: address,
        }
        axios.post('/api/add', newInfo)
            .then(res => {
                const user = res.data
                this.setState({user: user.user});
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h2>Thêm danh bạ</h2>
            <input
                placeholder='Tên'
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <br/>
            <input
                placeholder='Số điện thoại'
                value={phone}
                onChange={e => setPhone(e.target.value)}
            />
            <br/>
            <input
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <br/>
            <input
                placeholder='Địa Chi'
                value={address}
                onChange={e => setAddress(e.target.value)}
            />
            <br/>
            <button onClick={handleSubmit}>Thêm</button>
        </div>
    )
}

