import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { faSquareCheck } from '@fortawesome/free-regular-svg-icons'

export default {
    install(){
        library.add(faEye,faEyeSlash,faSquareCheck)
    }
}