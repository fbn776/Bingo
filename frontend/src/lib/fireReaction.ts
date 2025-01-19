import {confetti} from "@tsparticles/confetti";
import {getRandomNumber} from "@/lib/utils.ts";
import {REACTION_EMOJI} from "@/lib/data.ts";

/*
"shape": {
      "type": "image",
      "options": {
        "image": [
          {
            "src": "https://particles.js.org/images/fruits/apple.png",
            "width": 32,
            "height": 32,
            "particles": {
              "size": {
                "value": 16
              }
            }
          },
       ]

 */

// const EMOJI_IMAGE_MAP = {
//     '<emoji>': [
//         "src": "/512.webp",
//     "width": 32,
//     "height": 32,
//     "particles": {
//     "size": {
//         "value": 16
//     }
// }
//     ]
// }

function fireReactionInstance(emoji: string[], x: number, y: number, angle: number, gravity = 3) {
    confetti({
        particleCount: 1,
        angle,
        spread: 100,
        startVelocity: 10,
        flat: true,
        origin: {x, y},
        shapes: ["image"],
        shapeOptions: {
            "image": emoji.map(item => ({
                src: item
            })),
            size: {
                value: { min: 3, max: 10 }, // Size range for random sizes
            },
        },

        scalar: Math.floor(getRandomNumber(4, 7)),
        gravity
    })
}

export default function fireReaction(place: "left" | "right" | "bottom", emoji: string, count: number, delay = 100) {
    const emojiList: string[] = REACTION_EMOJI[emoji] || [];

    const xPos = (place === 'left' ? 0.01 : 0.91);
    const yPos = place === "bottom" ? 0.9 : 0;
    const angle = place === "bottom" ? 90 : (place === "left" ? -70 : -110)
    const gravity = place === "bottom" ? -3 : 3;

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            fireReactionInstance(emojiList, xPos, yPos, angle, gravity);
        }, i * delay);
    }
}