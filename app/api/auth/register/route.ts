import {NextRequest, NextResponse} from 'next/server';
import jwt from 'jsonwebtoken';

interface User {
    id: number;
    email: string;
    password: string;
}

let users: User[] = [];

export async function POST(req: NextRequest) {
    const {email, password} = await req.json();
    const userExists = users.some(u => u.email === email);

    if (userExists) {
        return NextResponse.json({message: 'User already exists'}, {status: 400});
    } else {
        const newUser: User = {id: Date.now(), email, password};
        users.push(newUser);
        const token = jwt.sign({id: newUser.id, email: newUser.email}, 'your_jwt_secret', {expiresIn: '1h'});
        return NextResponse.json({token, user: {id: newUser.id, email: newUser.email}}, {status: 201});
    }
}
