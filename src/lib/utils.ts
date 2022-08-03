import type { User } from "./types";

export function getUserIcon(user:User) {
    return user.icon ?? `https://avatars.dicebear.com/api/jdenticon/${user.id}.svg`

}