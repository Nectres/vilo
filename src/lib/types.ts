interface Message {
	user: string;
    created_on: Date;
	id: string;
	content: string;
}

interface User {
	icon: string;
	name: string;
    created_on: Date;
	id: string;
}

interface Space {
	icon: string;
	name: string;
	id: string;
	members: string[];
    maxMembers: number
    created_on: Date;
}

export type { Message, User, Space };
