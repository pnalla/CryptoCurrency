import axios from 'axios'

export default {
    getData(url) {
        let result = {}
        axios.get(url)
            .then((response) => {
                result = response
            })
            .catch((e) => {
                console.log('Error in getting currency data: ' + e)
                result = e
            })
        return result
    }
}