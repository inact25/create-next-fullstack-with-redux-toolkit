import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  email: string;
  password: string;
}

const users: User[] = [];

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, 'your_jwt_secret') as {
        id: number;
        email: string;
      };
      const user = users.find((u) => u.id === decoded.id);
      if (user) {
        return NextResponse.json({ id: user.id, email: user.email });
      } else {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 },
        );
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
  } else {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }
}
