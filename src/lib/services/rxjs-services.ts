import { ajax } from 'rxjs/ajax'
import { map } from 'rxjs/operators'
import { lastValueFrom } from 'rxjs'

export async function getPostsUsingRxjs() {    
    const url = 'https://jsonplaceholder.typicode.com/posts'
    const ajax$ = ajax(url)
    return lastValueFrom(ajax$)
}