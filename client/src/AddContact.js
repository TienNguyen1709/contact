import React, {useState} from 'react';

export default function AddContact({addContact}) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
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
            <button onClick={() => {
                setName('');
                setPhone('');
                setEmail('');
                setAddress('');
                addContact([name], [phone], [email], [address]);
            }}> Thêm </button>
        </div>
    )
}

