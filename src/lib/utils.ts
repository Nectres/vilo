import type { User } from "./types";

export function getUserIcon(user:User) {
    return user.icon ?? `https://avatars.dicebear.com/api/jdenticon/${user.id}.svg`

}

export function splitAndCapitalize(str:string) {
    return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}