import {axiosClient} from "./ApiClient";

function getMetadata() {
    return axiosClient.get('/metadata');
}

export default { getMetadata };