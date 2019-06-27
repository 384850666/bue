/* tree数据 */
import request from '@/common/js/request'

//安全日志
export function getTreeData() {
    return request({
        method: 'get',
        url: '/getTreeData'
    })
}

export function addNode(form) {
    return request({
        method: 'post',
        url: '/addNode',
        data: form
    })
}

export function editNode(form) {
    return request({
        method: 'put',
        url: '/editNode',
        data: form
    })
}

export function deleteNode(node) {
    return request({
        method: 'delete',
        url: '/deleteNode',
        data: node
    })
}

export function moveNode(nodes) {
    return request({
        method: 'post',
        url: '/moveNode',
        data: nodes
    })
}