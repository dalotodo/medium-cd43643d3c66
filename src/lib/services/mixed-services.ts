import { from, lastValueFrom } from 'rxjs'
import axios from 'axios'

export function getPostsUsingBoth() {
    const url = 'https://jsonplaceholder.typicode.com/posts'
    const ajax$ = from( axios.get(url) ).pipe(

    )
    return lastValueFrom(ajax$)
}
