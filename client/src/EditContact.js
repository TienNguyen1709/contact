import React, {useState} from "react";

function Edit({contact, updateContact, deleteContact}) {
    const [edit, setEdit] = useState(false);
    let editContent;
    if (edit) {
        editContent = (
            <div>
                <input
                    placeholder='Tên'
                    value={contact.name}
                    onChange={e => {
                        updateContact({
                            ...contact,
                            name: e.target.value
                        });
                    }}
                />
                <input
                    placeholder='Số điện thoại'
                    value={contact.phone}
                    onChange={e => {
                        updateContact({
                            ...contact,
                            phone: e.target.value
                        });
                    }}
                />
                <input
                    placeholder='Email'
                    value={contact.email}
                    onChange={e => {
                        updateContact({
                            ...contact,
                            email: e.target.value
                        });
                    }}
                />
                <input
                    placeholder='Địa chỉ'
                    value={contact.address}
                    onChange={e => {
                        updateContact({
                            ...contact,
                            address: e.target.value
                        });
                    }}
                />
                <button onClick={() => setEdit(false)}>Lưu</button>
            </div>
        )
    } else {
        editContent = (
            <div>
                {contact.name}
                <button onClick={() => setEdit(true)}>
                    Sửa
                </button>
            </div>
        );
    }
    return (
        <div>
            {editContent}
            <button onClick={() => deleteContact(contact.id)}>Xóa</button>
        </div>
    )
}

export default function EditContact({infos, updateContact, deleteContact}) {
    return (
        <ul>
            {infos.map(info => (
                <li key={info.id}>
                    <Edit
                        contact={info}
                        updateContact={updateContact}
                        deleteContact={deleteContact}
                    />
                </li>
            ))}
        </ul>
    );
}