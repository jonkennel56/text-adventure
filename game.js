const textElement = document.querySelector("#text");
const optionButtonsElement = document.querySelector("#option-buttons");

let state = {};

function startGame() {
    state = {};
    showTextNode(1);
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button");
            button.innerText = option.text;
            button.classList.add("btn");
            button.addEventListener("click", () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

const textNodes = [
    {
        id: 1,
        text: "You wake up on the dirty floor of a bathroom. The smell in this room is disgusting and causes you to gag. You look around and notice a toilet, a sink, and a door.",
        options: [
            {
                text: "Examine the toilet",
                nextText: 2 
            },
            {
                text: "Examine the sink",
                nextText: 2
            },
            {
                text: "Open the door",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "You examine the toilet. It's extremely dirty as if it hasn't been cleaned in years. Upon further inspection, you notice that it's missing it's handle. There is a note resting on top of the toilet tank. You open the lid and see that the water inside the toilet bowl is murky and black.",
        options: [
            {
                text: "Read the note",
                nextText: 3
            },
            {
                text: "Reach inside the toilet bowl",
                nextText: 4
                
            },
            {
                text: "Open the toilet tank",
                nextText: 5
            },
            {
                text: "Go back to looking around bathroom",
                nextText: 1
            }
        ]
    },
    {
        id: 3,
        text: "The note reads, \"Beware the black water.\" ",
        options: [
            {
                text: "Go back to toilet",
                nextText: 2
            }
        ]
    },
    {
        id: 4,
        text: "You decide to stick your hand into the toilet bowl. The water inside is warm and surprisingly thick; thicker than normal water. Perhaps it isn't water at all. You feel around the inside but there's nothing there. You retract your hand from the bowl and notice that the black toilet water has stained your hand. As you inspect your stained hand you notice that the stain appears to be growing and expanding down your arm. Your hand and forearm are now throbbing in pain. You try to turn on the sink to wash this substance off your hand but the sink's faucet pours the same black substance. You try to open the door but it's locked and by the time you realize that, the black substance has coated most of your body and has reached your neck, with only your face exposed. Your limbs begin to feel heavy and you collapse on the floor. The black substance crawls over your face rendering you unable to breathe. You struggle for a moment and then finally suffocate to death. GAME OVER.",
        options: [
            {
                text: "Click to restart game",
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: "You set aside the note and manage to lift the toilet tank cover off. You carefully place the cover on the floor and look inside the toilet tank. It's remarkably clean and completely empty except for what looks like a plastic bag resting on the bottom.",
        options: [
            {
                text: "Open the plastic bag",
                nextText: 6
            },
            {
                text: "Go back to toilet",
                nextText: 2
            }
        ]
    },
    {
        id: 6,
        text: "After carefully opening the plastic bag, you find a small key. You put the key in your pocket.",
        // need to setState = { key: true; }
        options: [
            {
                text: "Go back to toilet",
                nextText: 2
            }
        ]
    }
];


startGame();