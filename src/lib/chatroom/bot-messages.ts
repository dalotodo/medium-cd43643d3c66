import { filter, interval, map, range } from "rxjs"


const MESSAGES : string[] = [
  'Have you tried Quasar Framework?',
  'Hey, take a look at Vue 3'
]

export function randomMessages$(time: number) {
  return interval(time).pipe(
    map( ()=> Math.floor(Math.random()*MESSAGES.length)),
    filter(i=>(i>=0)&&(i<MESSAGES.length)),
    map( (i)=>MESSAGES[i]),
  )
}
