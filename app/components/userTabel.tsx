import React from 'react';
import { Button } from './ui/button';

const UserTable = ({ users, onEdit, onDelete }: any) => {
    console.log(users);

    return (
        <table border={1}>
            <thead>
                <tr>
                    <th className='w-[200px] text-left'>ID</th>
                    <th className='w-[200px] text-left'>Name</th>
                    <th className='w-[200px] text-left'>Email</th>
                    <th className='w-[400px] text-left'>Address</th>
                    <th className='w-[200px] text-left'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: any) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            {user.street} {user.streetNumber}, {user.city}, {user.country} (Floor: {user.Floor})
                        </td>
                        <td className='flex gap-4'>
                            <Button onClick={() => onEdit(user)}>Edit</Button>
                            <Button onClick={() => onDelete(user.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;
