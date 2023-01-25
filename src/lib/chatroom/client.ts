import { map, Observable, Subject, Subscription } from "rxjs";
import { randomMessages$ } from "./bot-messages";
import { ChatMessage } from "./models";

export interface Chatter {
  readonly id: string;
  readonly messages$: Observable<ChatMessage>;
}

export interface InteractiveChatter extends Chatter {
  send(message: string):void;
}

class BotChatter implements Chatter {
  private readonly _id: string;
  private readonly _messages$ = new Subject<ChatMessage>();

  constructor(id: string, delay: number) {
    this._id = id;
    const generator$ = randomMessages$(delay)
    generator$.pipe(
      map( (text)=>({ from: this._id, text }) )
    ).subscribe( this._messages$ )
  }

  get id() {
    return this._id;
  }

  get messages$() {
    return this._messages$.asObservable();
  }
}

class UserInteractiveChatter implements InteractiveChatter {
  private readonly _id: string;
  private readonly _messages$ = new Subject<ChatMessage>();

  constructor(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  get messages$() {
    return this._messages$.asObservable();
  }

  send(text: string) {
    this._messages$.next( { from: this._id, text });
  }
}

type Channel = {
  subscription: Subscription;
  chatter: Chatter;
};

class ChatRoom {
  private readonly _messages$ = new Subject<ChatMessage>();
  private readonly _chatters = new Map<string, Channel>();

  get messages$() {
    return this._messages$.asObservable();
  }

  join(chatter: Chatter) {
    const subscription = chatter.messages$.subscribe(this._messages$);
    const channel : Channel = { chatter, subscription }
    this._chatters.set(chatter.id, channel);
  }

  leave(chatter: Chatter) {
    const channel = this._chatters.get(chatter.id);
    if (!channel) throw new Error(`Chatter ${chatter.id} is not in the room`);
    channel.subscription.unsubscribe();
    this._chatters.delete(chatter.id)
  }
}

export function createChatbot(id: string, delay: number) {
  return new BotChatter(id, delay);
}

export function createChatter(id: string) {
  return new UserInteractiveChatter(id);
}

export function createChatRoom() {
  return new ChatRoom();
}
