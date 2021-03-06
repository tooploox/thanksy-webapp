import * as React from "react"
import { bind } from "../utils/bem"
import "./TextChunks.scss"

const Emoji: React.SFC<{ src: string; alt: string }> = p => {
    const [empty, setEmpty] = React.useState(false)
    return empty ? <Text>{p.alt}</Text> : <img src={p.src} alt={p.alt} onError={() => setEmpty(true)} />
}
const Nickname: React.SFC = p => <mark>{p.children}</mark>
const Text: React.SFC = p => <span>{p.children}</span>

export const TextChunk: React.SFC<{ value: TextChunk }> = ({ value }) => {
    switch (value.type) {
        case "emoji":
            return <Emoji alt={value.caption} src={value.url} />
        case "nickname":
            return <Nickname>{value.caption}</Nickname>
        case "text":
            return <Text>{value.caption}</Text>
    }
}

const { Block } = bind("TextChunks")
export const TextChunks: React.SFC<{ chunks: TextChunk[]; centred?: boolean; light?: boolean }> = p => (
    <Block modifiers={{ centred: p.centred || false, light: p.light || false }}>
        {p.chunks.map((value, key) => (
            <TextChunk key={key} value={value} />
        ))}
    </Block>
)
