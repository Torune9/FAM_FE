const validateFile = (file) => {
    const type = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.template"
    ]
    const MAX_SIZE = 1000000

    if (file.size > MAX_SIZE) {
        return `Max size is 1mb`
    }
    if (!type.includes(file.type)) {
        return `File is not .pdf or .doc`
    }
}

export default validateFile