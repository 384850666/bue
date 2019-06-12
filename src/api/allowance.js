/* 津贴 */
import request from '@/common/js/request'

//首页今日统计
export function getStatistics() {
    return request({
        method: 'get',
        url: '/statistics'
    })
}

//补贴资金申领排行
export function getRankData(year) {
    return request({
        method: 'get',
        url: `/rankTable/${year}`
    })
}

//历年补贴统计柱状图数据
export function getSubsidyChart() {
    return request({
        method: 'get',
        url: '/subsidyChart'
    })
}

//历年人数统计折线图数据
export function getPeopleChart() {
    return request({
        method: 'get',
        url: '/peopleChart'
    })
}