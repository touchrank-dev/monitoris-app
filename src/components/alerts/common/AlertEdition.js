import React, { useEffect, useState } from 'react';
import { Alert, Divider } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import FilterConditionTree from 'components/filters/FilterConditionTree';
import AlertForm from 'components/alerts/common/AlertForm';
import NotificationTable from 'components/alerts/common/NotificationTable';
import { getConfig } from 'config/Config';
import { getAlertNotificationFields } from 'data/DataAlertNotificationFields';
import { getRedisFields } from 'data/DataRedisFields';
import { useInterval } from 'hooks/UseInterval';
import { AlertPropType } from 'proptypes/AlertPropTypes';

function AlertEdition({ alert, updateAlert, testNotification }) {
    const [seconds, setSeconds] = useState(-1);

    const updateSecondsRemaining = () => {
        const s = moment().diff(moment(alert.updateDate), 'second');

        if (s < getConfig().alertUpdateDelay) {
            setSeconds(getConfig().alertUpdateDelay - s);
        } else {
            setSeconds(-1);
        }
    };

    useEffect(() => {
        updateSecondsRemaining();
    }, [alert]); // eslint-disable-line react-hooks/exhaustive-deps

    useInterval(() => {
        updateSecondsRemaining();
    }, 5000);

    const onUpdateNotifications = async notifications => {
        await updateAlert({
            ...alert,
            notifications
        });
    };

    return (
        <React.Fragment>
            {seconds >= 0 && (
                <Alert
                    message={`The alert has been updated less than 5 minutes ago and is therefore not active yet. The updated alert will become active in ${moment.duration(seconds * 1000).humanize()}.`}
                    type="info"
                    showIcon
                    style={{ marginBottom: 20 }} />
            )}
            <AlertForm
                alert={alert}
                updateAlert={updateAlert} />
            <Divider>Filters</Divider>
            <FilterConditionTree
                filter={alert}
                context={{
                    fields: getRedisFields()
                }}
                updateFilter={updateAlert} />
            <Divider>Notifications</Divider>
            <NotificationTable
                notifications={alert.notifications || []}
                notificationFields={getAlertNotificationFields()}
                updateNotifications={onUpdateNotifications}
                testNotification={testNotification}
                orderSettingPrefix="alertNotificationColumnOrder_"
                widthSettingPrefix="alertNotificationColumnWidth_" />
        </React.Fragment>
    );
}

AlertEdition.propTypes = {
    alert: AlertPropType.isRequired,
    updateAlert: PropTypes.func.isRequired,
    testNotification: PropTypes.func.isRequired
};

export default AlertEdition;