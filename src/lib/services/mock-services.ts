import { delay, lastValueFrom, of } from "rxjs";


const ITEMS = new Array(100).fill(0).map( (x,index)=>({
  id: `post-${index}`,
  title: `This is post #${index}`
}))

export function getPostsUsingMock(seconds: number) {
  const query$ = of(ITEMS).pipe(
    delay(seconds)
  )
  return lastValueFrom(query$);
}
