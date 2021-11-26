import React, { useState, useEffect } from 'react';
import DashboardScreen from './Component/dashboard';
import EndPoints from '../utils/apiEndPoints';
import { apiCall } from '../utils/httpClient';
import Loader from '../../component/Loader';
import _ from "lodash";

const DashboardView = () => {
    const [isloading, setisloading] = useState(false)
    const [tab, setTab] = useState(1);
    const [auditlist, setAuditlist] = useState([])
    const [search, setsearch] = useState('');
    const [searcharray, setsearcharray] = useState([])

    const handleTab = (value) => {
        setTab(value)
        setisloading(true)
        getauditListdata(value)
        setsearch("")
        setsearcharray([])
    }
    useEffect(() => {
        getauditListdata(1)
    }, [])

    useEffect(() => {
        getauditListdata(tab)
    }, [tab])

    const handleSearch = (val) => {
        setsearch(val);
        if (val.length > 0) {
            setsearcharray([])
            var a = [];
            if (tab == 1) {
                var a1 = _.filter(auditlist, (row) => row?.branch_name.toLowerCase().match(val.toLowerCase()))
                var a2 = _.filter(auditlist, (row) => row?.city_name.toLowerCase().match(val.toLowerCase()))
                var a3 = _.filter(auditlist, (row) => row?.auditor_name.toLowerCase().match(val.toLowerCase()))
                a = [...a1, ...a2, ...a3];
            } else {

                var a4 = _.filter(auditlist, (row) => {
                    var d = _.filter(row?.items, (items) => items?.branch_name.toLowerCase().match(val.toLowerCase()))
                    if (d.length > 0)
                        return d;
                })
                var a5 = _.filter(auditlist, (row) => {
                    var d = _.filter(row?.items, (items) => items?.city_name.toLowerCase().match(val.toLowerCase()))
                    if (d.length > 0)
                        return d;
                })
                var a6 = _.filter(auditlist, (row) => {
                    var d = _.filter(row?.items, (items) => items?.auditor_name.toLowerCase().match(val.toLowerCase()))
                    if (d.length > 0)
                        return d;
                })
                a = [...a4, ...a5, ...a6];
            }
            setsearcharray(a);
        } else
            getauditListdata(tab)
    }
    async function getauditListdata(val) {
        try {
            const params = { audit_type: val }
            const { data } = await apiCall('post', EndPoints.AUDITLIST, params)
            if (data.status = 200) {
                setAuditlist(data.data);
                setisloading(false)
            } else {
                setAuditlist([]);
                setisloading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {/* {isloading && <Loader/>} */}
            <DashboardScreen
                handleTab={handleTab}
                tab={tab}
                auditlist={auditlist}
                search={search}
                handleSearch={handleSearch}
                searcharray={searcharray}
            />
        </>
    )
}
export default DashboardView;