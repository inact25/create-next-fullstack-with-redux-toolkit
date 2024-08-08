import {NextRequest, NextResponse} from 'next/server';

interface Post {
    id: number;
    title: string;
    content: string;
}

let posts: Post[] = [
    {id: 1, title: 'First Post', content: 'This is the content of the first post'},
    {id: 2, title: 'Second Post', content: 'This is the content of the second post'},
];

export async function GET() {
    return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
    const newPost: Post = {id: Date.now(), ...await req.json()};
    posts.push(newPost);
    return NextResponse.json(newPost, {status: 201});
}

export async function PUT(req: NextRequest) {
    const updatedPost: Post = await req.json();
    posts = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
    return NextResponse.json(updatedPost);
}

export async function DELETE(req: NextRequest) {
    const {id} = await req.json();
    posts = posts.filter((post) => post.id !== id);
    return NextResponse.json({}, {status: 204});
}
