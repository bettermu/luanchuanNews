/**
 * getVNInfoMapList接口字段转换
 * @export {Object} 原接口字段对象
 * @param {Object} obj 新接口字段对象
 */
export function getVNInfoMapList(obj) {
    return {
        ID: obj.gid,
        SSName: obj.gName,
        X: obj.xCoordinate,
        Y: obj.yCoordinate,
        boundary: obj.boundary,
        SSRadius: obj.radius,
        ZHAudioPath: obj.gSummaryFilePath || '',
		ENAudioPath: obj.egSummaryFilePath || '',
        ZHIntroduce: obj.gSummary,
        RelationSSIID: "",
        RootSSIID: "",
        CreateTime: "",
        SSAddress: "",
        CreateAccount: "",
        isParent: "",
        sdImg: "",
        bzImg: "",
        xqImg: ""
    }
}

export function getVnInfoVoForHome(obj) {
    return {
        ID: obj.gid,
        SSName: obj.gName,
        X: obj.xCoordinate,
        Y: obj.yCoordinate,
        SSRadius: obj.radius,
        Status: obj.checkStatus,
        ZHIntroduce: obj.gSummary,
        ENIntroduce: obj.egSummary,
        RootSSIID: "",
        RelationSSIID: "",
        ZHAudioPath: obj.gSummaryFilePath,
        ENAudioPath: obj.egSummaryFilePath,
        CreateTime: "",
        SSAddress: obj.addres,
        CreateAccount: "",
        isParent: "",
        sdImg: "",
        bzImg: "",
        xqImg: obj.detailImgList
    }
}