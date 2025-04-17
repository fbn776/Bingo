// async function convertImageToBase64(url: string) {
//     const response = await fetch(url);
//     const blob = await response.blob();
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result);
//         reader.onerror = reject;
//         reader.readAsDataURL(blob);
//     });
// }

// async function doStuff() {
//     const data = {};
//
//     for (const item in REACTION_EMOJI) {
//         // console.log("ITEM:", item);
//         const arr = await Promise.all(REACTION_EMOJI[item].map(async (emoji) => {
//             const base64 = await convertImageToBase64(emoji);
//             return base64
//         }))
//
//         data[item] = arr;
//     }
//
//     console.log(data)
// }
//
// doStuff()
