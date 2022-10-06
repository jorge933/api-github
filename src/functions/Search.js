import { NotFound } from "./NotFound.js";
import { Result } from "./Result.js";

export async function Search(user) {
    const fetchUser = await fetch(`https://api.github.com/users/${user}`);
    
    if (fetchUser.status === 200) {
        Result(await fetchUser.json())
    } else return NotFound()
}