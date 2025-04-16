import { nanoid } from 'nanoid';

const generatedDestinationKey = 'generatedDestinations';
const generatedDestinations = sessionStorage.getItem(generatedDestinationKey)
    ? JSON.parse(sessionStorage.getItem(generatedDestinationKey))
    : {};

function saveDestination(destination) {
    const id = nanoid();
    generatedDestinations[id] = destination;
    sessionStorage.setItem(
        generatedDestinationKey,
        JSON.stringify(generatedDestinations),
    );

    return id;
}

function getDestination(id) {
    return generatedDestinations[id];
}

export { saveDestination, getDestination };
