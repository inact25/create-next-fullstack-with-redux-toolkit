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
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const token = jwt.sign({id: user.id, email: user.email}, 'your_jwt_secret', {expiresIn: '1h'});
        return NextResponse.json({token, user: {id: user.id, email: user.email}});
    } else {
        return NextResponse.json({message: 'Invalid credentials'}, {status: 401});
    }
}
