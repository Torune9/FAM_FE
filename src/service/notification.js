import {useNotification } from "@kyvg/vue3-notification";

const notification = useNotification()

const info = (message)=>{
    notification.notify({
        title : 'Success',
        text  :message
    })
}

const infoSuccess = (message)=>{
    notification.notify({
        title : 'Success',
        text  :message,
        type : 'Success'
    })
}

const infoWarning = (message)=>{
    notification.notify({
        title : 'Warning',
        text  :message,
        type : 'warn'
    })
}

const infoError = (message)=>{
    notification.notify({
        title : 'Failed',
        text  :message,
        type : 'error'
    })
}

export { info,infoSuccess,infoWarning,infoError}