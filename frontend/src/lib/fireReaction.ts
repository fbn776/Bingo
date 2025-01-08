import {confetti} from "@tsparticles/confetti";


function fineOneReaction(emoji: string[], pos: "left" | "right") {
    confetti({
        particleCount: 1,
        angle: pos === "left" ? -70 : -110,
        spread: 100,
        startVelocity: 10,
        flat: true,
        origin: {x: pos === 'left' ? 0.01 : 0.91, y: 0},
        shapes: ["emoji"],
        shapeOptions: {
            emoji: {
                value: emoji
            },
        },
        scalar: 4,
        gravity: 3
    });
}

export default function fireReaction(pos: "left" | "right", emoji: string[], count: number, delay = 100) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            fineOneReaction(emoji, pos);
        }, i * delay);
    }
}