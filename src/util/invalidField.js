export default function invalidFieldErr(arr, newObjErr, setErrState) {
    arr.forEach((element) => {
        if (Object.prototype.hasOwnProperty.call(newObjErr, element.path[0])) {
            newObjErr[element.path[0]] = element.message;
        }
    });
    setErrState(newObjErr);
}
