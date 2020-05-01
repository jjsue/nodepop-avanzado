function tagValidator(tagArray, databaseArray) {
    let validationPass = true;
    let subValidationPass = false;
    for (let i = 0; i < tagArray.length; i++) {
        for (let j = 0; j < databaseArray.length; j++) {
            if (tagArray[i] === databaseArray[j]) {
                subValidationPass = true;
                break;
            }
        }
        if (!subValidationPass) {
            validationPass = false;
            break;
        }
        subValidationPass = false;
    }
    return validationPass;
}

module.exports = tagValidator;