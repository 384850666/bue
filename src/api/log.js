/* 津贴 */
import request from '@/common/js/request'

//安全日志
export function getLog(data) {
    return request({
        method: 'post',
        url: '/log',
        data: data
    })
}

export function createLog(form) {
    return request({
        method: 'post',
        url: '/createLog',
        data: form
    })
}

export function updateLog(form) {
    return request({
        method: 'put',
        url: '/updateLog',
        data: form
    })
}

export function deleteLog(rows) {
    return request({
        method: 'delete',
        url: '/deleteLog',
        data: rows
    })
}

// 删除前判断检测
export function checkStatus(rows) {
    return request({
        method: 'post',
        url: '/checkStatus',
        data: rows
    })
}

//获取所有日志类型
export function getLogType() {
    return request({
        method: 'post',
        url: '/logType'
    })
}