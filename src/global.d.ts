/// <reference path="./utils/redux.d.ts" />

declare module "*.scss"
declare var require: any
declare var process: any

type Named = { id: string; name: string }
type TMap<TKey extends string, TValue> = { [K in TKey]: TValue }
type SMap<TValue> = TMap<string, TValue>

type Casted<T, S> = { [P in keyof T]: S }
type Subtype<T> = { [P in keyof T]?: T[keyof T] }
type CastedSubtype<T, S> = { [P in keyof T]?: S }

type F0<RT = void> = () => RT
type F1<T, RT = void> = (arg: T) => RT
type F2<T, T2, RT = void> = (arg1: T, arg2: T2) => RT

type Nothing = { type: "nothing" }
type Some<T> = { type: "some"; value: T }
type Maybe<T> = Some<T> | Nothing

type Ok<T> = { type: "Ok"; value: T }
type Err<T> = { type: "Err"; error: T }
type Result<Value, Error> = Ok<Value> | Err<Error>

type User = {
    real_name: string
    avatar_url: string
    name: string
    id: string
}

type ServerThx = {
    receivers: User[]
    giver: User
    id: number
    created_at: string
    love_count: number
    confetti_count: number
    clap_count: number
    wow_count: number
    text: string
}

type Thx = {
    receivers: User[]
    giver: User
    id: number
    createdAt: string
    loveCount: number
    confettiCount: number
    clapCount: number
    wowCount: number
    chunks: TextChunk[]
}

type Emoji = { type: "emoji"; url: string; caption: string }
type TextChunk = { type: "text"; caption: string } | { type: "nickname"; caption: string } | Emoji

type RootState = { app: AppState; reducer: any }

type Lists = { thxList: Thx[]; recentThxList: Thx[]; lastThxId: number }
type ApiState = "TokenNotChecked" | "InvalidToken" | "NoResponse"
type AppState = Lists & {
    notifications: AppNotification[]
    token: string
    apiState: Maybe<ApiState>
    isTokenFresh: boolean
}
type AppNotification = { text: string; notificationId: string }
